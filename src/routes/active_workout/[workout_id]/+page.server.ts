import { createLogFromWorkout } from '$lib/db/mutations/logs';
import { convertWorkoutFromPercent, getWorkoutById } from '$lib/db/queries/workout_routine';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { insertWorkoutLogSchema } from '$lib/db/schema';
import { addWorkoutLogSchema } from '../schemas';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals, url, params }) => {
	const session = await locals.auth();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user?.id ? session.user.id : '';

	let workout = await getWorkoutById(
		user_id,
		Number(params.workout_id) ? Number(params.workout_id) : 0
	);
	if (workout) {
		// sort workout
		workout.exercises.sort((a, b) => {
			if (a.position > b.position) {
				return 1;
			}
			return -1;
		});

		// adjust for percents
		workout = await convertWorkoutFromPercent(workout, user_id);

		let workoutExercises = workout.exercises

		let logExercises = workoutExercises.map((w)=> ({...w, overall_pace_seconds: []}))

		const workoutForm = await superValidate(
			{ name: workout.name, exercises: logExercises, workout_time_seconds: 0},
			zod4(addWorkoutLogSchema)
		);

		return {
			workout,
			workoutForm
		};
	}
	redirect(300, "/");
};

export const actions: Actions = {
	default: async ({ request, locals, url, params }) => {
		const workoutForm = await superValidate(request, zod4(addWorkoutLogSchema));
		if (!workoutForm.valid) return fail(400, { workoutForm });

		const session = await locals.getSession();
		const user_id = session?.user?.id ? session.user.id : '';

		await createLogFromWorkout({ user_id: user_id, ...workoutForm.data });

		redirect(303, '/');
	}
};
