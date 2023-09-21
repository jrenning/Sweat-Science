import { eq } from 'drizzle-orm';
import { db } from '../db';
import { workout_routine, type InsertWorkoutRoutineWithExercises } from '../schema';
import { addExerciseRoutineToWorkout } from './exercise_routine';

export async function addWorkoutToPlan(plan_id: number, input: InsertWorkoutRoutineWithExercises) {
	return await db.transaction(async (tx) => {
		const routine = await tx
			.insert(workout_routine)
			.values({
				name: input.name,
				user_id: input.user_id,
				workout_plan_id: plan_id,
				days: input.days
			})
			.onConflictDoNothing({ target: workout_routine.name }).returning({id: workout_routine.id});

        // add exercises 
        if (input.exercises) {
            input.exercises.forEach(async (exercise)=> {
                await addExerciseRoutineToWorkout(routine[0].id, exercise)
            })
        }
	});
}
