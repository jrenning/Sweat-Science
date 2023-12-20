import { and, desc, eq, gte } from 'drizzle-orm';
import { db } from '../db';
import {
	workout_routine,
	type InsertWorkoutRoutineWithExercises,
	exercise_routine
} from '../schema';
import { addExerciseRoutineToWorkout, setExercisePosition } from './exercise_routine';
import { getExerciseRoutinesAfterPosition } from '../queries/exercise_routine';

export async function addWorkoutToPlan(plan_id: number, input: InsertWorkoutRoutineWithExercises) {
	return await db.transaction(async (tx) => {
		// if input has an id just do an update
		if (input.id) {
			await tx.update(workout_routine).set(input).where(eq(workout_routine.id, input.id));
		} else {
			const routine = await tx
				.insert(workout_routine)
				.values({
					name: input.name,
					user_id: input.user_id,
					workout_plan_id: plan_id,
					days: input.days
				})
				.returning({ id: workout_routine.id });

			// add exercises
			if (input.exercises) {
				let position = 0;
				// need for loop to maintain order
				for (let i = 0; i < input.exercises.length; i++) {
					await addExerciseRoutineToWorkout(routine[0].id, input.exercises[i], position);
					position += 1;
				}
			}
		}
	});
}

export async function deleteWorkoutByID(id: number, user_id: string) {
	return await db
		.delete(workout_routine)
		.where(and(eq(workout_routine.id, id), eq(workout_routine.user_id, user_id)));
}

export async function addWorkout(input: InsertWorkoutRoutineWithExercises) {
	return await db.transaction(async (tx) => {
		const routine = await tx
			.insert(workout_routine)
			.values({
				name: input.name,
				user_id: input.user_id,
				days: input.days,
				status: input.status
			})
			.onConflictDoNothing({ target: workout_routine.name })
			.returning({ id: workout_routine.id });

		// add exercises
		if (input.exercises) {
			let position = 0;
			// for loop to maintain order
			for (let i = 0; i < input.exercises.length; i++) {
				await addExerciseRoutineToWorkout(routine[0].id, input.exercises[i], position);
				position += 1;
			}
		}
	});
}

export async function completeWorkoutRoutineForm(
	name: string,
	plan_id: number | undefined | null,
	days: number[] | undefined | null,
	workout_id: number
) {
	const data = await db
		.update(workout_routine)
		.set({ name: name, status: 'Completed', workout_plan_id: plan_id, days: days })
		.where(eq(workout_routine.id, workout_id))
		.then(() => 'success')
		.catch((err) => err);

	return data;
}

export async function createPendingWorkout(user_id: string) {
	const data = db
		.insert(workout_routine)
		.values({
			name: '',
			status: 'Pending',
			user_id: user_id
		})
		.returning({ id: workout_routine.id });

	return data;
}

export async function deleteExerciseFromWorkout(exercise_id: number, workout_id: number) {
	return await db.transaction(async (tx) => {
		const position = await tx
			.delete(exercise_routine)
			.where(eq(exercise_routine.id, exercise_id))
			.returning({ position: exercise_routine.position });

		// get id's of exercises in greater positions
		const data = await tx
			.select({ id: exercise_routine.id, position: exercise_routine.position })
			.from(exercise_routine)
			.where(
				and(
					eq(exercise_routine.workout_routine_id, workout_id),
					// use gte to reuse function for insert operation
					gte(exercise_routine.position, position[0].position)
				)
			);

		// set new positions
		for (let i = 0; i < data.length; i++) {
			await tx
				.update(exercise_routine)
				.set({ position: data[i].position + 1 })
				.where(eq(exercise_routine.id, data[i].id));
		}
	});
}

export async function deleteWorkoutsInFolder(user_id: string, folder_id: number) {}
