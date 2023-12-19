import { backInOut } from 'svelte/easing';
import { db } from '../db';
import { exercise_routine, type InsertExerciseRoutine } from '../schema';
import { eq } from 'drizzle-orm';
import {
	getExerciseRoutinesAfterPosition,
	getLastExerciseRoutinePosition
} from '../queries/exercise_routine';

export async function appendExerciseRoutinetoWorkout(
	workout_routine_id: number,
	input: InsertExerciseRoutine
) {
	// get max position
	const position = await getLastExerciseRoutinePosition(workout_routine_id);
	if (position.length > 0) {
		return await addExerciseRoutineToWorkout(workout_routine_id, input, position[0].position + 1);
	} else {
		return await addExerciseRoutineToWorkout(workout_routine_id, input, 0);
	}
}

export async function addExerciseRoutineToWorkout(
	workout_routine_id: number,
	input: InsertExerciseRoutine,
	position: number
) {
	return await db.transaction(async (tx) => {
		const routine = await tx
			.insert(exercise_routine)
			.values({
				exercise_id: input.exercise_id,
				workout_routine_id: workout_routine_id,
				sets: input.sets,
				type: input.type,
				rest: input.rest,
				rest_units: input.rest_units,
				user_id: input.user_id,
				reps: input.reps,
				weight: input.weight,
				weight_units: input.weight_units,
				distance: input.distance,
				distance_units: input.distance_units,
				duration: input.duration,
				duration_units: input.duration_units,
				position: position,
				percent_max: input.percent_max
			})
			.returning({ id: exercise_routine.id });

		return routine[0].id;
	});
}

export async function insertExerciseRoutinetoWorkout(
	workout_routine_id: number,
	input: InsertExerciseRoutine,
	position: number
) {
	return await db.transaction(async (tx) => {
		const routine = await tx
			.insert(exercise_routine)
			.values({
				exercise_id: input.exercise_id,
				workout_routine_id: workout_routine_id,
				sets: input.sets,
				type: input.type,
				rest: input.rest,
				rest_units: input.rest_units,
				user_id: input.user_id,
				reps: input.reps,
				weight: input.weight,
				weight_units: input.weight_units,
				distance: input.distance,
				distance_units: input.distance_units,
				duration: input.duration,
				duration_units: input.duration_units,
				position: position,
				percent_max: input.percent_max
			})
			.returning({ id: exercise_routine.id });

		// get exercises that need to be changed
		const data = await getExerciseRoutinesAfterPosition(workout_routine_id, position);

		// set new positions
		for (let i = 0; i < data.length; i++) {
			await setExercisePosition(data[i].id, data[i].position + 1);
		}

		return routine[0].id;
	});
}

export async function setExercisePosition(exercise_routine_id: number, position: number) {
	await db
		.update(exercise_routine)
		.set({ position: position })
		.where(eq(exercise_routine.id, exercise_routine_id));
}

export async function updateExerciseRoutine(input: InsertExerciseRoutine) {
	if (input.id) {
		await db.update(exercise_routine).set(input).where(eq(exercise_routine.id, input.id));
	}
}
