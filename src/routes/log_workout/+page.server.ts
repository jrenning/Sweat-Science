import { getPossibleExercises } from '$lib/db/queries/exercise.js';
import { getAllUserWorkouts } from '$lib/db/queries/workout_routine.js';
import { insertWorkoutLogSchema } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { addWorkoutLogSchema } from '../active_workout/schemas.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	// super forms
	const workoutLogForm = await superValidate(
		addWorkoutLogSchema
	);

	// get possible workouts to copy
	const workouts = await getAllUserWorkouts(user_id);

	const exercise_choices = await getPossibleExercises(user_id, '');

	return { workoutLogForm, exercise_choices, workouts };
}

/** @type {import('./$types').Actions} */
export const actions = {
	workout_plan: async ({ request }) => {
		const logForm = await superValidate(request, insertWorkoutLogSchema);

		if (!logForm.valid) return fail(400, { logForm });

		return { logForm };
	}
};
