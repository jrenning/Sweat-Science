import { eq } from "drizzle-orm";
import { workout_routine } from "../schema";
import { db } from "../db";

export async function getWorkoutsInPlan(plan_id: number, user_id: string) {
	return await db.query.workout_routine.findMany({
		with: {
			exercises: true
		},
		where: eq(workout_routine.workout_plan_id, plan_id)
	});
}
