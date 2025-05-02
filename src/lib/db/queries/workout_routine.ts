import { and, asc, desc, eq, inArray, isNull, ne } from 'drizzle-orm';
import { db } from '../db';
import {
	exercise_routine,
	workout_routine,
	workoutLog,
	workoutToExerciseRoutines,
	type WorkoutRoutineWithExercises
} from '../schema';
import { getEstimatedOneRepMax } from './exercise';
import { roundtoNearestFive } from '../../../helpers/weight';

export async function getAllUserWorkouts(user_id: string) {
	let data = await db.query.workout_routine.findMany({
		where: and(
			eq(workout_routine.user_id, user_id),
			ne(workout_routine.status, 'Pending'),
			isNull(workout_routine.workout_plan_id)
		),
		orderBy: desc(workout_routine.created_at),
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		}
	});

	if (data) {
		let new_data: WorkoutRoutineWithExercises[] = [];
		for (let i = 0; i < data.length; i++) {
			let exercises = data[i].exercises.map((exercise) => exercise.exercise_routine);
			new_data.push({ ...data[i], exercises: exercises });
		}
		return new_data;
	}
}

export async function getWorkoutById(user_id: string, id: number) {
	const data = await db.query.workout_routine.findFirst({
		where: and(eq(workout_routine.id, id), eq(workout_routine.user_id, user_id)),
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		}
	});

	if (data) {
		let exercises = data.exercises.map((exercise) => exercise.exercise_routine);

		return {
			...data,
			exercises: exercises
		};
	}
}

export async function getPendingWorkouts(user_id: string) {
	const data = await db
		.select({ id: workout_routine.id, days: workout_routine.days })
		.from(workout_routine)
		.where(and(eq(workout_routine.user_id, user_id), eq(workout_routine.status, 'Pending')));

	// filter out ones present in a workout plan
	// TODO: remove
	const result = data.filter((workout) => !workout.days);

	return result;
}

export async function getRecentWorkouts(user_id: string) {
	let initial_data = await db.query.workoutLog.findMany({
		where: eq(workoutLog.user_id, user_id),
		limit: 10,
		orderBy: desc(workout_routine.created_at),
	});
	let names = initial_data.map((i) => {
		if (i.name) {
			return i.name;
		}
		else {
			return ""
		}
	});

	// get the rest of the data (have to use name as the workout log doesn't store the workout id and I don't want to change it now)
	let data = await db.query.workout_routine.findMany({
		where: and(eq(workout_routine.user_id, user_id), inArray(workout_routine.name, names)),
		limit: 10,
		orderBy: asc(workout_routine.created_at),
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		}
	});


	// filter out duplicate names (not in sql because it cause issues/complex queries)
	// found: https://stackoverflow.com/questions/32634736/javascript-object-array-removing-objects-with-duplicate-properties
	data = data.reduce(function (p, c) {
		// if the next object's id is not found in the output array
		// push the object into the output array
		if (
			!p.some(function (el) {
				//@ts-ignore
				return el.name === c.name;
			})
		)
			//@ts-ignore
			p.push(c);
		return p;
	}, []);

	// fix stupid column stuff
	if (data) {
		let new_data = [];
		for (let i = 0; i < data.length; i++) {
			let exercises = data[i].exercises.map((exercise) => exercise.exercise_routine);
			new_data.push({ ...data[i], exercises: exercises });
		}
		return new_data;
	}
}

export async function getFavoriteWorkouts(user_id: string) {
	let data = await db.query.workout_routine.findMany({
		where: and(eq(workout_routine.user_id, user_id), eq(workout_routine.favorite, true)),
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		}
	});

	// fix stupid column stuff
	if (data) {
		let new_data = [];
		for (let i = 0; i < data.length; i++) {
			let exercises = data[i].exercises.map((exercise) => exercise.exercise_routine);
			new_data.push({ ...data[i], exercises: exercises });
		}
		return new_data;
	}
}

export async function convertWorkoutFromPercent(
	workout: WorkoutRoutineWithExercises,
	user_id: string
) {
	for (let i = 0; i < workout.exercises.length; i++) {
		const rep_max = await getEstimatedOneRepMax(user_id, workout.exercises[i].exercise_id);
		let exercise = workout.exercises[i];
		if (exercise.type == 'Weight') {
			for (let k = 0; k < exercise.weight.length; k++) {
				if (exercise.percent_max[k] && rep_max) {
					workout.exercises[i].weight[k] = roundtoNearestFive((exercise.weight[k] / 100) * rep_max);
				} else if (exercise.percent_max[k]) {
					workout.exercises[i].weight[k] = 0;
				}
			}
		} else if (exercise.type == 'Distance') {
			for (let k = 0; k < exercise.distance.length; k++) {
				if (exercise.percent_max[k] && rep_max) {
					workout.exercises[i].distance[k] = roundtoNearestFive(
						(exercise.distance[k] / 100) * rep_max
					);
				} else if (exercise.percent_max[k]) {
					workout.exercises[i].distance[k] = 0;
				}
			}
		} else if (exercise.type == 'Duration') {
			for (let k = 0; k < exercise.duration.length; k++) {
				if (exercise.percent_max[k] && rep_max) {
					workout.exercises[i].duration[k] = roundtoNearestFive(
						(exercise.duration[k] / 100) * rep_max
					);
				} else if (exercise.percent_max[k]) {
					workout.exercises[i].duration[k] = 0;
				}
			}
		}
	}
	return workout;
}

