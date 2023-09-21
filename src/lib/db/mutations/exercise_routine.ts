import { backInOut } from 'svelte/easing';
import { db } from '../db';
import { exercise_routine, workoutToExerciseRoutines, type InsertExerciseRoutine } from '../schema';

export async function addExerciseRoutineToWorkout(
	workout_routine_id: number,
	input: InsertExerciseRoutine
) {
	return await db.transaction(async (tx) => {
		const routine = await tx.insert(exercise_routine).values({
			exercise_id: input.exercise_id,
			sets: input.sets,
			name: input.name,
			user_id: input.user_id,
			reps: input.reps,
			weight: input.weight,
			weight_units: input.weight_units,
			distance: input.distance,
			distance_units: input.distance_units,
			duration: input.duration,
			duration_units: input.duration_units
		}).returning({id: exercise_routine.id});

        // add to joined table
        await tx.insert(workoutToExerciseRoutines).values({
            workout_routine_id: workout_routine_id,
            exercise_routine_id: routine[0].id
        })
	});
}
