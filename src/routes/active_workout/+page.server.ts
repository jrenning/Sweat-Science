import { createLogFromWorkout } from '$lib/db/mutations/logs';
import { getWorkoutById } from '$lib/db/queries/workout_routine';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { insertWorkoutLogSchema } from '$lib/db/schema';
import { addWorkoutLogSchema } from './schemas';
import { getPossibleExercises } from '$lib/db/queries/exercise';

export const load: PageServerLoad = async ({ locals, url, params }) => {
	const session = await locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

    const exercises = await getPossibleExercises(user_id, "")
	const workoutForm = await superValidate(
		addWorkoutLogSchema
	);
	return {
        exercises,
		workoutForm
	};
};

export const actions: Actions = {
	default: async ({ request, locals, url, params }) => {
		const workoutForm = await superValidate(request, addWorkoutLogSchema);

		if (!workoutForm.valid) return fail(400, { workoutForm });

		const session = await locals.getSession();
		const user_id = session?.user.id ? session.user.id : '';

		await createLogFromWorkout({ user_id: user_id, ...workoutForm.data });

		throw redirect(303, '/');
	}
};
