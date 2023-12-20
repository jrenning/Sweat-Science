
import { createPendingWorkoutPlan } from '$lib/db/mutations/workout_plan.js';
import { getPendingPlans, getWorkoutPlanByID, getWorkoutsInPlan } from '$lib/db/queries/workout_plan.js';
import {
	insertWorkoutPlanSchema,
} from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { fullWorkoutPlanSchema } from './schemas.js';
import { getPossibleExercises } from '$lib/db/queries/exercise.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';
	console.log(1)
	// get pending workouts
	let pending_id = await getPendingPlans(user_id);
	console.log(2)
	if (pending_id.length == 0) {
		// create new workout routine
		pending_id = await createPendingWorkoutPlan(user_id);
	}
	// get pending data
	const workout_plan = await getWorkoutPlanByID(user_id, pending_id[0].id);

	// super forms
	const formWorkoutPlan = await superValidate(workout_plan[0], insertWorkoutPlanSchema);

	// get workouts in plan 
	const workouts = await getWorkoutsInPlan(pending_id[0].id, user_id)

	const exercise_choices = await getPossibleExercises(user_id, '');

	return { formWorkoutPlan, exercise_choices, workouts };
}

/** @type {import('./$types').Actions} */
export const actions = {
	workout_plan: async ({ request }) => {
		const planForm = await superValidate(request, fullWorkoutPlanSchema);

		if (!planForm.valid) return fail(400, { planForm });

		// TODO add big form handling

		return { planForm };
	},
	confirm: async ({ request, locals }) => {}
};
