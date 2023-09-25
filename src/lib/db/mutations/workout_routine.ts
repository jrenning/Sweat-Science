import { eq } from 'drizzle-orm';
import { db } from '../db';
import { workout_routine, type InsertWorkoutRoutineWithExercises } from '../schema';
import { addExerciseRoutineToWorkout } from './exercise_routine';

export async function addWorkoutToPlan(plan_id: number, input: InsertWorkoutRoutineWithExercises) {
	return await db.transaction(async (tx) => {
		// if input has an id just do an update
		if (input.id) {
			await tx.update(workout_routine).set(input).where(
				eq(workout_routine.id, input.id)
			)

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
				input.exercises.forEach(async (exercise) => {
					await addExerciseRoutineToWorkout(routine[0].id, exercise);
				});
			}
		}
	});
}

export async function addWorkout(input: InsertWorkoutRoutineWithExercises) {
	return await db.transaction(async (tx) => {
		const routine = await tx
			.insert(workout_routine)
			.values({
				name: input.name,
				user_id: input.user_id,
				days: input.days,
				status: input.status,
				
			})
			.onConflictDoNothing({ target: workout_routine.name })
			.returning({ id: workout_routine.id });

		// add exercises
		if (input.exercises) {
			input.exercises.forEach(async (exercise) => {
				await addExerciseRoutineToWorkout(routine[0].id, exercise);
			});
		}
	});
}
