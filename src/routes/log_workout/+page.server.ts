import { getPossibleExercises } from '$lib/db/queries/exercise.js';
import { convertWorkoutFromPercent, getAllUserWorkouts } from '$lib/db/queries/workout_routine.js';
import { insertWorkoutLogSchema } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod, zod4 } from 'sveltekit-superforms/adapters';
import { addWorkoutLogSchema } from '../active_workout/schemas.js';
import { createLogFromWorkout } from '$lib/db/mutations/logs.js';
import { convertToUTC } from '../../helpers/datetime.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async(event) => {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user?.id ? session.user.id : '';

	// super forms
	const workoutLogForm = await superValidate(zod4(addWorkoutLogSchema));

	// get possible workouts to copy
	let workouts = await getAllUserWorkouts(user_id);
	let updated_workouts
	if (workouts) {
		// convert percentage to actual
		updated_workouts = workouts.map(async (workout) => {
			workout = await convertWorkoutFromPercent(workout, user_id);
			return workout
		});
	}

	const exercise_choices = await getPossibleExercises(user_id, '');

	return { workoutLogForm, exercise_choices, updated_workouts };
}


export const actions: Actions = {
	log_workout: async ({ request, locals }) => {
		const session = await locals.getSession();
		const user_id = session?.user?.id ? session.user.id : '';

		const logForm = await superValidate(request, zod4(addWorkoutLogSchema));

		if (!logForm.valid) return fail(400, { logForm });

		logForm.data.user_id = user_id;

		const id = await createLogFromWorkout(logForm.data);

		redirect(303, `/progress/workouts/${id}`);
	}
};
