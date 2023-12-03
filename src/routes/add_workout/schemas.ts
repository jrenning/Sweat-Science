import { insertExerciseRoutineSchema, insertExerciseSchema } from "$lib/db/schema";
import { z } from "zod";


export const insertExerciseRoutineWithExercisesSchema = insertExerciseRoutineSchema.extend({
	exercise: insertExerciseSchema
})


export const newWorkoutRoutineSchema = z.object({
	name: z.string().min(1),
});

export type newWorkoutRoutine = typeof newWorkoutRoutineSchema