import { insertExerciseRoutineSchema } from "$lib/db/schema";
import { z } from "zod";

export const newWorkoutRoutineSchema = z.object({
	name: z.string(),
	exercises: z.array(insertExerciseRoutineSchema)
});

export type newWorkoutRoutineSchema = typeof newWorkoutRoutineSchema
