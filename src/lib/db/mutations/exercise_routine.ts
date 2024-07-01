import { backInOut } from 'svelte/easing';
import { db } from '../db';
import { exercise_routine, workoutToExerciseRoutines, type InsertExerciseRoutine } from '../schema';
import { eq } from 'drizzle-orm';
import {
	getLastExerciseRoutinePosition
} from '../queries/exercise_routine';

export async function appendExerciseRoutinetoWorkout(
	workout_routine_id: number,
	input: InsertExerciseRoutine
) {
	// get max position
	const position = await getLastExerciseRoutinePosition(workout_routine_id);
	if (position > 0) {
		return await addExerciseRoutineToWorkout(workout_routine_id, input, position + 1);
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
				...input,
				position
			})
			.returning({ id: exercise_routine.id });

		// add to group table

		await tx
			.insert(workoutToExerciseRoutines)
			.values({ workout_routine_id: workout_routine_id, exercise_routine_id: routine[0].id });

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
				...input,
				position
			})
			.returning({ id: exercise_routine.id });

		await tx
			.insert(workoutToExerciseRoutines)
			.values({ workout_routine_id: workout_routine_id, exercise_routine_id: routine[0].id });

		// get exercises that need to be changed
		// get one entry of the exercise in group relation table to find siblings
		const workout = await tx
			.select({ workout_id: workoutToExerciseRoutines.workout_routine_id })
			.from(workoutToExerciseRoutines)
			.where(eq(workoutToExerciseRoutines.exercise_routine_id, routine[0].id));

		// get all from the first result
		let siblings = await tx.query.workoutToExerciseRoutines.findMany({
			where: eq(workoutToExerciseRoutines.workout_routine_id, workout[0].workout_id),
			with: {
				exercise_routine: true
			}
		});

		siblings = siblings.filter(
			(sibling) => sibling.exercise_routine.position >= position
		);

		// set new positions
		for (let i = 0; i < siblings.length; i++) {
			await setExercisePosition(siblings[i].exercise_routine.id, siblings[i].exercise_routine.position + 1);
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
		await db.update(exercise_routine).set(input).where(eq(exercise_routine.id, input.id)).returning({id: exercise_routine.id});
	}
}
