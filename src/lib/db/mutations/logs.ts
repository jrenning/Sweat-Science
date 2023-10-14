import { db } from '../db';
import { getWorkoutById } from '../queries/workout_routine';
import { exerciseLog, workoutLog, type InsertExerciseLog, type AddWorkoutLog } from '../schema';

export async function createLogFromWorkout(input: AddWorkoutLog) {
	const data = await db.insert(workoutLog).values({
		name: input.name,
		user_id: input.user_id,
		notes: input.notes
	}).returning({id: workoutLog.id});

	// attach exercise logs
	input.exercises.forEach((exercise) => {
		createExerciseLog({ ...exercise, created_at: new Date(), id: undefined, workout_log_id: data[0].id, user_id: input.user_id});
	});
}

export async function createExerciseLog(input: InsertExerciseLog) {
	return await db.insert(exerciseLog).values(input);
}
