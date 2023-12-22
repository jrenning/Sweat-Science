import { and, desc, eq, gte } from 'drizzle-orm';
import { db } from '../db';
import { exercise_routine, workoutToExerciseRoutines } from '../schema';

// export async function getExerciseRoutinesAfterPosition(workout_id: number, position: number) {
// 	const data = await db
// 		.select({ id: exercise_routine.id, position: exercise_routine.position })
// 		.from(exercise_routine)
// 		.where(
// 			and(
// 				eq(exercise_routine.workout_routine_id, workout_id),
// 				// use gte to reuse function for insert operation
// 				gte(exercise_routine.position, position)
// 			)
// 		);

// 	return data;
// }

export async function getLastExerciseRoutinePosition(workout_id: number) {
	const data = await db
		.select()
		.from(workoutToExerciseRoutines)
		.where(eq(workoutToExerciseRoutines.workout_routine_id, workout_id));

	return data.length - 1
}

export async function getExerciseRoutineById(exercise_routine_id: number, user_id: string) {
	const data = await db
		.select()
		.from(exercise_routine)
		.where(
			and(eq(exercise_routine.id, exercise_routine_id), eq(exercise_routine.user_id, user_id))
		);

	return data;
}
