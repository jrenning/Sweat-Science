import { createPendingWorkoutPlan, finishWorkoutPlanCreation } from '$lib/db/mutations/workout_plan.js';
import {
	getPendingPlans,
	getWorkoutPlanByID,
	getWorkoutsInPlan
} from '$lib/db/queries/workout_plan.js';
import { insertWorkoutPlanSchema } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { fullWorkoutPlanSchema } from './schemas.js';
import { getPossibleExercises } from '$lib/db/queries/exercise.js';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { ConsoleLogWriter } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user?.id ? session.user.id : '';

	// get pending workouts
	let pending_id = await getPendingPlans(user_id);
	if (pending_id.length == 0) {
		// create new workout routine
		pending_id = await createPendingWorkoutPlan(user_id);
	}
	// get pending data
	const workout_plan = await getWorkoutPlanByID(user_id, pending_id[0].id);

	// super forms
	const formWorkoutPlan = await superValidate(workout_plan[0], zod4(insertWorkoutPlanSchema));

	// get workouts in plan
	const workouts = await getWorkoutsInPlan(pending_id[0].id, user_id);

	const exercise_choices = await getPossibleExercises(user_id, '');

	return { formWorkoutPlan, exercise_choices, workouts };
};

export const actions: Actions = {
	workout_plan: async ({ request }) => {
		console.log(request.body)
		const planForm = await superValidate(request, zod4(insertWorkoutPlanSchema));
		console.log("HERE")
		if (!planForm.valid) return fail(400, { planForm });
		console.log(planForm.data)
		// TODO add big form handling
		await finishWorkoutPlanCreation(planForm.data)

		redirect(303, '/');
	}
};
