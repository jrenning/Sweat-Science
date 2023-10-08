import { createLogFromWorkout } from '$lib/db/mutations/logs';
import { getWorkoutById } from '$lib/db/queries/workout_routine';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url, params }) => {
	const session = await locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	const workout = await getWorkoutById(
		user_id,
		Number(params.workout_id) ? Number(params.workout_id) : 0
	);

	console.log(workout);
	return {
		workout
	};
};

export const actions: Actions = {
	default: async ({ request, locals, url, params }) => {
		const session = await locals.getSession();

		const user_id = session?.user.id ? session.user.id : '';

		// TODO add actual creation of logs with new values
		await createLogFromWorkout(Number(params.workout_id), user_id, '');

		return redirect(303, "/")
	}
};
