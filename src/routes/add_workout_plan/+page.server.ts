

import { db } from '$lib/db/db';
import { insertWorkoutPlanSchema, insertWorkoutRoutine, users } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';



/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	// super forms
	const formWorkoutPlan = await superValidate(event, insertWorkoutPlanSchema);
	const formWorkout = await superValidate(event, insertWorkoutRoutine)

	return { formWorkoutPlan, formWorkout };
}

/** @type {import('./$types').Actions} */
export const actions = {
	workout_plan: async ({ request }) => {
		const planForm = await superValidate(request, insertWorkoutPlanSchema);

		console.log(planForm)
		console.log("Heree")

		if (!planForm.valid) return fail(400, {planForm})


		// TODO add insert
	},
	workout_routine: async ({ request }) => {
		const workoutForm = await superValidate(request, insertWorkoutRoutine);

		if (!workoutForm.valid) return fail(400, { workoutForm });

	}
};