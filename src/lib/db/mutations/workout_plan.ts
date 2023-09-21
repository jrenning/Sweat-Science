import { eq } from "drizzle-orm";
import { db } from "../db";
import { exercise_routine, workout_plans, workout_routine, type InsertFullWorkoutPlan, type InsertWorkoutPlan } from "../schema";







export async function upsertWorkoutRoutineBasic(input: InsertWorkoutPlan) {
	return await db
		.insert(workout_plans)
		.values({
			...input,
			status: 'Pending'
		})
		.onConflictDoNothing();
}