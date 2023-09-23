import { and, arrayContains, eq } from 'drizzle-orm';
import { workout_plans, workout_routine } from '../schema';
import { db } from '../db';

export async function getWorkoutsInPlan(plan_id: number, user_id: string) {
	return await db.query.workout_routine.findMany({
		with: {
			exercises: true
		},
		where: and(eq(workout_routine.workout_plan_id, plan_id), eq(workout_routine.user_id, user_id))
	});
}

export async function getWorkoutsInPlanOnDay(plan_id: number, user_id: string, day: number) {
	return await db.query.workout_routine.findMany({
		with: {
			exercises: true
		},
		where: and(
			eq(workout_routine.workout_plan_id, plan_id),
			eq(workout_routine.user_id, user_id),
			arrayContains(workout_routine.days, [day])
		)
	});
}

export async function getPendingPlans(user_id: string) {
	const data =  await db
		.select({ id: workout_plans.id })
		.from(workout_plans)
		.limit(1)
		.where(and(eq(workout_plans.status, 'Pending'), eq(workout_plans.user_id, user_id)));
	return data
}
