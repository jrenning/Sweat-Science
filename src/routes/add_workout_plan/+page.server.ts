import { db } from '$lib/db/db';
import { addWorkoutPlanBasic, updatePlanDays } from '$lib/db/mutations/workout_plan.js';
import { getPendingPlans } from '$lib/db/queries/workout_plan.js';
import { insertExerciseRoutineSchema, insertWorkoutPlanSchema, insertWorkoutRoutine, users } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { fullWorkoutPlanSchema } from './schemas.js';
import { getPossibleExercises } from '$lib/db/queries/exercise.js';


/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	// super forms
	const formWorkoutPlan = await superValidate(event, fullWorkoutPlanSchema);

	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	const exercise_choices = await getPossibleExercises(user_id, '');

	return { formWorkoutPlan, exercise_choices };
}

/** @type {import('./$types').Actions} */
export const actions = {
	workout_plan: async ({ request }) => {
		const planForm = await superValidate(request, fullWorkoutPlanSchema);


		if (!planForm.valid) return fail(400, { planForm });


		// TODO add big form handling

		return {planForm}
	},
	confirm: async({request, locals}) => {


	}
};
