import { and, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { db } from '../db';
import {
	ExerciseLogWithExercises,
	exerciseLog,
	exercise_routine,
	workoutLog,
	type WorkoutLogWithExercises
} from '../schema';
import { convertToUTC } from '../../../helpers/datetime';

export async function getUserWorkoutLogs(user_id: string) {
	return await db.query.workoutLog.findMany({
		with: {
			exercise_routines: {
				with: {
					exercise: true
				}
			}
		},
		where: eq(workoutLog.user_id, user_id),
		orderBy: desc(workoutLog.created_at)
	});
}

export async function getWorkoutLogById(user_id: string, id: number) {
	return await db.query.workoutLog.findFirst({
		with: {
			exercise_routines: {
				with: {
					exercise: true
				}
			}
		},
		where: and(eq(workoutLog.user_id, user_id), eq(workoutLog.id, id))
	});
}

export async function getUserExerciseLogById(user_id: string, exercise_id: number) {
	let data = await db.query.exerciseLog.findMany({
		where: and(eq(exerciseLog.exercise_id, exercise_id), eq(exerciseLog.user_id, user_id)),
		with: {
			exercise: true
		},
		orderBy: desc(exerciseLog.created_at)
	});

	// fix the dates
	return data;
}

export async function getExerciseLogByID(log_id: number) {
	let data = await db.query.exerciseLog.findFirst({
		where: eq(exerciseLog.id, log_id)
	});

	return data;
}

export async function getLastWorkout(user_id: string) {
	return await db.query.workoutLog.findFirst({
		where: eq(workoutLog.user_id, user_id),
		orderBy: desc(workoutLog.created_at),
		with: {
			exercise_routines: {
				with: {
					exercise: true
				}
			}
		}
	});
}

export async function getLastTimeWorkoutPerformed(workout_name: string, user_id: string) {
	return await db.query.workoutLog.findFirst({
		with: {
			exercise_routines: {
				with: {
					exercise: true
				}
			}
		},
		where: and(eq(workoutLog.user_id, user_id), eq(workoutLog.name, workout_name)),
		orderBy: desc(workoutLog.created_at)
	});
}

export async function getLastPerformedExercisesforWorkout(workout_id: number, user_id: string) {
	const workout_data = await getWorkoutLogById(user_id, workout_id);

	// get data for all exercises
	let performed_exercises: ExerciseLogWithExercises[][] = [];

	if (workout_data) {
		for (let i = 0; i < workout_data?.exercise_routines.length; i++) {
			performed_exercises.push(
				await getUserExerciseLogById(user_id, workout_data.exercise_routines[i].exercise_id)
			);
		}
	}

	return performed_exercises;
}

//mostly used for getting the last time an exercise was performed for summary (n=2 to get one before one being summarized)
export async function getLastNthTimeExercisePerformed(
	exercise_id: number,
	user_id: string,
	n: number = 2
) {
	const past_performed = await db.query.exerciseLog.findMany({
		with: {
			exercise: true
		},
		where: and(eq(exerciseLog.user_id, user_id), eq(exerciseLog.exercise_id, exercise_id)),
		orderBy: desc(exerciseLog.created_at)
	});
	if (past_performed) {
		return past_performed[n - 1];
	} else {
		return null;
	}
}

export async function getRankingofWorkoutExercises(
	workout_data: WorkoutLogWithExercises,
	after_date: Date
) {
	// get all the exercise ids and then get ranks
	let rank_data = [];
	for (let i = 0; i < workout_data.exercise_routines.length; i++) {
		let exercise_log_id = workout_data.exercise_routines[i].id;
		let exercise_id = workout_data.exercise_routines[i].exercise_id;
		//@ts-ignore
		rank_data.push(
			await getRankOfPerformedExercise(
				exercise_log_id,
				exercise_id,
				workout_data.user_id,
				after_date
			)
		);
	}

	return rank_data;
}

export async function getRankOfPerformedExercise(
	id: number,
	exercise_id: number,
	user_id: string,
	after_date: Date,
	all_time: boolean = false
) {
	const exercise = await getExerciseLogByID(id);
	let data;
	if (!all_time) {
		data = await db
			.select({
				id: exerciseLog.id,
				exercise_id: exerciseLog.exercise_id,
				average_max: exerciseLog.average_max,
				rank: sql<number>`RANK() OVER (
			PARTITION BY ${exerciseLog.exercise_id}
			ORDER BY ${exerciseLog.average_max} DESC
			)`,
				total: sql<number>`COUNT(*) OVER (
				PARTITION BY ${exerciseLog.exercise_id}
			)`
			})
			.from(exerciseLog)
			.where(
				and(
					// eq(exerciseLog.id, id),
					eq(exerciseLog.exercise_id, exercise_id),
					gte(exerciseLog.created_at, after_date),
					lte(exerciseLog.created_at, exercise?.created_at),
					eq(exerciseLog.user_id, user_id)
				)
			);
	} else {
		data = await db
			.select({
				id: exerciseLog.id,
				exercise_id: exerciseLog.exercise_id,
				average_max: exerciseLog.average_max,
				rank: sql<number>`RANK() OVER (
			PARTITION BY ${exerciseLog.exercise_id}
			ORDER BY ${exerciseLog.average_max} DESC
			)`,
				total: sql<number>`COUNT(*) OVER (
				PARTITION BY ${exerciseLog.exercise_id}
			)`
			})
			.from(exerciseLog)
			.where(
				and(
					// eq(exerciseLog.id, id),
					eq(exerciseLog.exercise_id, exercise_id),
					gte(exerciseLog.created_at, after_date),
					eq(exerciseLog.user_id, user_id)
				)
			);
	}

	if (data) {
		// filter needs to happen after the query or it wont rank right
		let result = data.filter((d) => d.id == id);
		return result[0];
	}
}
