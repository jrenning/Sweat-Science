import { GoalTypes } from "$lib/db/schema";
import { z } from "zod";

export const GoalTypesZ = z.enum(["1RM", "average_weight", "weekly_workout", "weekly_exercise"])

export const newGoalSchema = z.object({
    goal_type: GoalTypesZ,
    goal_value: z.number(),
    exercise_id: z.number().optional(),
    deadline: z.date()
});
