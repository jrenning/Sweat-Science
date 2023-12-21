import { and, asc, desc, eq, isNull, ne } from 'drizzle-orm';
import { db } from '../db';
import { exercise_routine, workout_routine, type WorkoutRoutineWithExercises } from '../schema';
import { getEstimatedOneRepMax } from './exercise';
import { roundtoNearestFive } from '../../../helpers/weight';

export async function getAllUserWorkouts(user_id: string) {
	return await db.query.workout_routine.findMany({
		where: and(eq(workout_routine.user_id, user_id), ne(workout_routine.status, 'Pending'), isNull(workout_routine.workout_plan_id)),
		orderBy: desc(workout_routine.created_at),
		with: {
			exercises: {
				with: {
					exercise: true
				}
			}
		}
	});
}

export async function getWorkoutById(user_id: string, id: number) {
	return await db.query.workout_routine.findFirst({
		where: and(eq(workout_routine.id, id), eq(workout_routine.user_id, user_id)),
		with: {
			exercises: {
				with: {
					exercise: true
				}
			}
		}
	});
}

export async function getPendingWorkouts(user_id: string) {
	const data = await db
		.select({ id: workout_routine.id })
		.from(workout_routine)
		.where(and(eq(workout_routine.user_id, user_id), eq(workout_routine.status, 'Pending')));

	return data;
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
					workout.exercises[i].weight[k] = roundtoNearestFive((workout.exercises[i].weight[k] / 100) * rep_max);
				} else if (exercise.percent_max[k]) {
					workout.exercises[i].weight[k] = 0;
				}
			}
		} else if (exercise.type == 'Distance') {
			for (let k = 0; k < exercise.distance.length; k++) {
				if (exercise.percent_max[k] && rep_max) {
					workout.exercises[i].distance[k] = roundtoNearestFive((workout.exercises[i].distance[k] / 100) * rep_max);
				} else if (exercise.percent_max[k]) {
					workout.exercises[i].distance[k] = 0;
				}
			}
		} else if (exercise.type == 'Duration') {
			for (let k = 0; k < exercise.duration.length; k++) {
				if (exercise.percent_max[k] && rep_max) {
					workout.exercises[i].duration[k] = roundtoNearestFive((workout.exercises[i].duration[k] / 100) * rep_max);
				} else if (exercise.percent_max[k]) {
					workout.exercises[i].duration[k] = 0;
				}
			}
		}
	}
	return workout;
}
