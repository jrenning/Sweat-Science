import { and, arrayContains, eq } from 'drizzle-orm';
import { workout_plans, workout_routine } from '../schema';
import { db } from '../db';

export async function getWorkoutPlanByID(user_id: string, plan_id: number) {
	return await db
		.select()
		.from(workout_plans)
		.where(and(eq(workout_plans.user_id, user_id), eq(workout_plans.id, plan_id)));
}

export async function getWorkoutsInPlan(plan_id: number, user_id: string) {
	let data = await db.query.workout_routine.findMany({
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		},
		where: and(eq(workout_routine.workout_plan_id, plan_id), eq(workout_routine.user_id, user_id))
	});
	if (data) {
		let new_data = [];
		for (let i = 0; i < data.length; i++) {
			let exercises = data[i].exercises.map((exercise) => exercise.exercise_routine);
			new_data.push({ ...data[i], exercises: exercises });
		}
		return new_data;
	}
}

export async function getWorkoutsInPlanOnDay(plan_id: number, user_id: string, day: number) {
	let data = await db.query.workout_routine.findMany({
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		},
		where: and(
			eq(workout_routine.workout_plan_id, plan_id),
			eq(workout_routine.user_id, user_id),
			arrayContains(workout_routine.days, [day])
		)
	});
	if (data) {
		let new_data = [];
		for (let i = 0; i < data.length; i++) {
			let exercises = data[i].exercises.map((exercise) => exercise.exercise_routine);
			new_data.push({ ...data[i], exercises: exercises });
		}
		return new_data;
	}
}

export async function getPendingPlans(user_id: string) {
	const data = await db
		.select({ id: workout_plans.id })
		.from(workout_plans)
		.limit(1)
		.where(and(eq(workout_plans.status, 'Pending'), eq(workout_plans.user_id, user_id)));
	return data;
}
