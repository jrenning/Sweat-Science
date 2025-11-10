import { and, desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { ExerciseLogWithExercises, exerciseLog, exercise_routine, workoutLog } from '../schema';
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
