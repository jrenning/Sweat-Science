import { and, desc, eq, gte } from 'drizzle-orm';
import { db } from '../db';
import { exercise_routine, workoutToExerciseRoutines } from '../schema';


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

export async function getWorkoutWithExercise(exercise_routine_id: number) {
	const data = await db.select().from(workoutToExerciseRoutines).where(eq(workoutToExerciseRoutines.exercise_routine_id, exercise_routine_id)).limit(1)

	return data[0].workout_routine_id
}
