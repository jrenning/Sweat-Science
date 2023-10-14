import { insertExerciseLogSchema, insertWorkoutLogSchema } from "$lib/db/schema";
import { z } from "zod";

export const addWorkoutLogSchema = insertWorkoutLogSchema.extend({
    exercises: z.array(insertExerciseLogSchema)
})

export type addWorkoutLogSchema = typeof addWorkoutLogSchema