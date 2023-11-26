import { and, desc, eq, gte } from 'drizzle-orm';
import { db } from '../db';
import { exercise_routine } from '../schema';

export async function getExerciseRoutinesAfterPosition(workout_id: number, position: number) {
	const data = await db
		.select({ id: exercise_routine.id, position: exercise_routine.position })
		.from(exercise_routine)
		.where(
			and(
				eq(exercise_routine.workout_routine_id, workout_id),
				// use gte to reuse function for insert operation
				gte(exercise_routine.position, position)
			)
		);

	return data;
}

export async function getLastExerciseRoutinePosition(workout_id: number) {
	const data = await db
		.select({ position: exercise_routine.position })
		.from(exercise_routine)
		.where(eq(exercise_routine.workout_routine_id, workout_id))
		.orderBy(desc(exercise_routine.position))
		.limit(1);

	return data;
}
