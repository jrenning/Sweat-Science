import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { workout_routine, type InsertWorkoutRoutineWithExercises } from '../schema';
import { addExerciseRoutineToWorkout } from './exercise_routine';

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
				let parent_id: number | null = null
				input.exercises.forEach(async (exercise) => {
					parent_id = await addExerciseRoutineToWorkout(routine[0].id, exercise, parent_id);
				});
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
			let parent_id = null
			for(let i=0; i<input.exercises.length; i++) {
				parent_id = await addExerciseRoutineToWorkout(routine[0].id, input.exercises[i], parent_id);

			}
		}
	});
}
