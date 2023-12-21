import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	exercise_routine,
	workout_plans,
	workout_routine,
	type InsertFullWorkoutPlan,
	type InsertWorkoutPlan
} from '../schema';
import { Status } from '../schema';
import { getWorkoutById } from '../queries/workout_routine';
import { addWorkoutToPlan, updateWorkoutDays } from './workout_routine';

export async function addWorkoutPlanBasic(input: InsertWorkoutPlan) {
	if (input.id) {
		return await db
			.update(workout_plans)
			.set({ ...input, status: 'Pending' })
			.where(eq(workout_plans.id, input.id))
			.returning({ id: workout_plans.id });
	} else {
		const data = await db
			.insert(workout_plans)
			.values({
				...input,
				status: 'Pending'
			})
			.returning({ id: workout_plans.id })
			.onConflictDoUpdate({ target: workout_plans.name, set: input });
		return data;
	}
}

export async function updatePlanDays(plan_id: number, days: number) {
	return await db
		.update(workout_plans)
		.set({ total_days: days })
		.where(eq(workout_plans.id, plan_id));
}

export async function updatePlanStatus(
	plan_id: number,
	status: 'Pending' | 'Completed' | 'Current'
) {
	return await db
		.update(workout_plans)
		.set({ status: status })
		.where(eq(workout_plans.id, plan_id));
}

export async function createPendingWorkoutPlan(user_id: string) {
	console.log('hello');
	return await db
		.insert(workout_plans)
		.values({ user_id: user_id, name: '', status: 'Pending' })
		.returning({ id: workout_plans.id });
}

export async function addExistingWorkoutToPlan(
	user_id: string,
	plan_id: number,
	workout_id: number,
	day: number
) {
	// get data to copy
	const data = await getWorkoutById(user_id, workout_id);
	// make new copy with plan id and day
	if (data) {
		if (data.workout_plan_id == plan_id) {
			if (data.days?.includes(day)) {
				throw Error("Can't add the same workout to the same day");
			} else {
				await updateWorkoutDays(data.id, day);
			}
		} else {
			const copyData = {
				...data,
				exercises: data.exercises.map((exercise) => {
					return { ...exercise, id: undefined };
				}),
				copy_id: data.id,
				id: undefined,
				folder_id: null,
				days: [day]
			};

			return await addWorkoutToPlan(plan_id, copyData);
		}
	}

	throw Error("workout wasn't found");
}
