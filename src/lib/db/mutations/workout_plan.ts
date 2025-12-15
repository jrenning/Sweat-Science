import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { getActiveWorkoutPlan, getCopyIDInPlan } from '../queries/workout_plan';
import { getWorkoutById } from '../queries/workout_routine';
import { workout_plans, type InsertWorkoutPlan } from '../schema';
import {
	addWorkoutToPlan,
	deleteWorkoutByID,
	deleteWorkoutDay,
	updateWorkoutDays
} from './workout_routine';

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

export async function finishWorkoutPlanCreation(input: InsertWorkoutPlan) {
	if (input.id) {
		return await db
			.update(workout_plans)
			.set({ ...input, status: 'Completed' })
			.where(eq(workout_plans.id, input.id))
			.returning({ id: workout_plans.id });
	}
}

export async function createPendingWorkoutPlan(user_id: string) {
	return await db
		.insert(workout_plans)
		.values({ user_id: user_id, name: '', status: 'Pending', total_days: 0 })
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
		// get all ids of workouts in plan that have been copied from another workout
		const copied_ids = await getCopyIDInPlan(plan_id);

		console.log('Copying workout with id:', data.id, ' Name: ', data.name);
		console.log("Copied id's fetched: ", copied_ids);
		let ids = copied_ids.map((id) => id.copy_id);
		// if the list of copied ids includes the workout being added
		if (ids.includes(data.id)) {
			copied_ids.forEach(async (id_pair) => {
				if (id_pair.copy_id == data.id) {
					// add new day to list of days for certain workout
					await updateWorkoutDays(id_pair.id, day);
				}
			});
		} else {
			const copyData = {
				...data,
				copy_id: data.id,
				id: undefined,
				folder_id: null,
				days: [day]
			};

			return await addWorkoutToPlan(plan_id, copyData);
		}
	}

	// throw Error("workout wasn't found");
}

export async function deleteWorkoutFromPlan(
	user_id: string,
	plan_id: number,
	workout_id: number,
	day: number
) {
	// get data
	const data = await getWorkoutById(user_id, workout_id);

	if (data?.days?.length == 1) {
		await deleteWorkoutByID(workout_id, user_id);
	} else {
		await deleteWorkoutDay(workout_id, day);
	}
}

export async function startNewWorkoutPlan(plan_id: number, start_date: Date, user_id: string) {
	// see if there is a current plan in use, then set it to be not active
	const plan = await getActiveWorkoutPlan(user_id);

	if (plan) {
		await updatePlanStatus(plan.id, 'Completed');
	}

	// update chosen plan start date and status
	return await db
		.update(workout_plans)
		.set({ status: 'Current', start_date: start_date })
		.where(and(eq(workout_plans.id, plan_id), eq(workout_plans.user_id, user_id)));
}
