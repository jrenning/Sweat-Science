import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	exercise_routine,
	workout_plans,
	workout_routine,
	type InsertFullWorkoutPlan,
	type InsertWorkoutPlan
} from '../schema';
import {Status} from "../schema"

export async function addWorkoutPlanBasic(input: InsertWorkoutPlan) {
	if (input.id) {
		return await db.update(workout_plans).set({...input, status: "Pending"}).where(eq(workout_plans.id, input.id)).returning({id: workout_plans.id});
	} else {
		const data =  await db
			.insert(workout_plans)
			.values({
				...input,
				status: 'Pending'
			}).returning({id: workout_plans.id})
			.onConflictDoUpdate({target: workout_plans.name, set: input})
		return data
			
	}
}

export async function updatePlanDays(plan_id: number, days: number) {
	return await db
		.update(workout_plans)
		.set({ total_days: days })
		.where(eq(workout_plans.id, plan_id));
}

export async function updatePlanStaus(plan_id: number, status: "Pending" | "Completed" | "Current") {
	return await db.update(workout_plans).set({status: status}).where(eq(workout_plans.id, plan_id))
}
