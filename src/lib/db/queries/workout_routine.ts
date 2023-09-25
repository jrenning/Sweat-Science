import { asc, desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { workout_routine } from '../schema';

export async function getLastWorkout(id: string) {
	return await db.query.workout_routine.findMany({
		where: eq(workout_routine.user_id, id),
		orderBy: desc(workout_routine.created_at),
		limit: 1,
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
}

export async function getAllUserWorkouts(user_id: string) {
	return await db.query.workout_routine.findMany({
		where: eq(workout_routine.user_id, user_id),
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
	})
}
