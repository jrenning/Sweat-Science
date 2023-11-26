import { and, asc, desc, eq, ne } from 'drizzle-orm';
import { db } from '../db';
import { exercise_routine, workout_routine } from '../schema';

export async function getAllUserWorkouts(user_id: string) {
	return await db.query.workout_routine.findMany({
		where: and(eq(workout_routine.user_id, user_id), ne(workout_routine.status, "Pending")),
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



