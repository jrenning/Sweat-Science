import { insertExerciseRoutineSchema, insertWorkoutPlanSchema } from "$lib/db/schema";
import { z } from "zod";

export const newWorkoutRoutineSchema = z.object({
	name: z.string(),
    day: z.number(),
	exercises: z.array(insertExerciseRoutineSchema)
});

export const fullWorkoutPlanSchema = insertWorkoutPlanSchema.extend({
	workout_routines: z.array(newWorkoutRoutineSchema)
});

export type fullWorkoutPlanSchema = typeof fullWorkoutPlanSchema
