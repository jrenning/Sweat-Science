import { getPossibleExercises } from '$lib/db/queries/exercise.js';
import { getAllUserWorkouts } from '$lib/db/queries/workout_routine.js';
import { insertWorkoutLogSchema } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { addWorkoutLogSchema } from '../active_workout/schemas.js';
import { createLogFromWorkout } from '$lib/db/mutations/logs.js';
import { convertToUTC } from '../../helpers/datetime.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	// super forms
	const workoutLogForm = await superValidate(addWorkoutLogSchema);

	// get possible workouts to copy
	const workouts = await getAllUserWorkouts(user_id);

	const exercise_choices = await getPossibleExercises(user_id, '');

	return { workoutLogForm, exercise_choices, workouts };
}

/** @type {import('./$types').Actions} */
export const actions = {
	log_workout: async ({ request, locals }) => {
		const session = await locals.getSession();
		const user_id = session?.user.id ? session.user.id : '';

		const logForm = await superValidate(request, addWorkoutLogSchema);

		if (!logForm.valid) return fail(400, { logForm });

		logForm.data.user_id = user_id


		await createLogFromWorkout(logForm.data);
		throw redirect(303, '/progress');
	}
};
