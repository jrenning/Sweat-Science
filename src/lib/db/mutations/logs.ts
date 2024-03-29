import { calculateOneRepFromArray } from '../../../helpers/rep_max';
import { db } from '../db';
import { getEstimatedOneRepMax } from '../queries/exercise';
import { getWorkoutById } from '../queries/workout_routine';
import { exerciseLog, workoutLog, type InsertExerciseLog, type AddWorkoutLog } from '../schema';

export async function createLogFromWorkout(input: AddWorkoutLog) {
	const data = await db
		.insert(workoutLog)
		.values({
			name: input.name,
			user_id: input.user_id,
			workout_time_seconds: input.workout_time_seconds,
			notes: input.notes
		})
		.returning({ id: workoutLog.id });

	// attach exercise logs
	input.exercises.forEach((exercise) => {
		createExerciseLog({
			...exercise,
			created_at: new Date(),
			id: undefined,
			workout_log_id: data[0].id,
			user_id: input.user_id
		});
	});
}

export async function createExerciseLog(input: InsertExerciseLog) {
	// TODO make work with duration and distance if you want
	return await db
		.insert(exerciseLog)
		.values({ estimated_max: calculateOneRepFromArray(input.weight, input.reps), ...input });
}
