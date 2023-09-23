import { db } from '$lib/db/db';
import { addWorkoutPlanBasic, updatePlanDays } from '$lib/db/mutations/workout_plan.js';
import { getPendingPlans } from '$lib/db/queries/workout_plan.js';
import { insertWorkoutPlanSchema, insertWorkoutRoutine, users } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const insertPlanSecond = z.object({
	days: z.number()
});

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	// super forms
	const formWorkoutPlan = await superValidate(event, insertWorkoutPlanSchema);
	const formPlanSecond = await superValidate(event, insertPlanSecond);

	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	return { formWorkoutPlan, formPlanSecond };
}

/** @type {import('./$types').Actions} */
export const actions = {
	workout_plan: async ({ request }) => {
		const planForm = await superValidate(request, insertWorkoutPlanSchema);

		console.log(planForm);

		if (!planForm.valid) return fail(400, { planForm });

		const id = await addWorkoutPlanBasic(planForm.data);

		planForm.data.id = id[0].id

		throw redirect(303, "/add_workout_plan/?page=2")
	},
	workout_plan_two: async ({ request, locals }) => {
		const planSecondForm = await superValidate(request, insertPlanSecond);

		if (!planSecondForm.valid) return fail(400, { planSecondForm: planSecondForm });

		const session = await locals.getSession();
		// pass in workout plan id
		// TODO pass in param for id
		const user_id = session?.user.id ? session.user.id : '';

		// get pending workout plan
		// TODO make this not rely on this
		const data = await getPendingPlans(user_id);
		await updatePlanDays(data[0].id, planSecondForm.data.days);

		return { planSecondForm };
	},
	confirm: async({request, locals}) => {

		
	}
};
