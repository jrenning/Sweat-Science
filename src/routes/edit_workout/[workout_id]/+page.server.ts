import type { Actions, PageServerLoad } from './$types';

import { setError, superValidate } from 'sveltekit-superforms/server';
import { getPendingPlans, getWorkoutsInPlan } from '$lib/db/queries/workout_plan';
import { getPossibleExercises } from '$lib/db/queries/exercise';
import { fail, redirect } from '@sveltejs/kit';
import {
	addWorkout,
	addWorkoutToPlan,
	completeWorkoutRoutineForm,
	createPendingWorkout
} from '$lib/db/mutations/workout_routine';
import { getAllEquipment } from '$lib/db/queries/equipment';
import { insertEquipmentSchema, insertExerciseRoutineSchema } from '$lib/db/schema';
import { getPendingWorkouts, getWorkoutById } from '$lib/db/queries/workout_routine';
import { appendExerciseRoutinetoWorkout } from '$lib/db/mutations/exercise_routine';
import { newWorkoutRoutineSchema } from '../../add_workout/schemas';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	// get workout id
	const workout_id = Number(event.params.workout_id) ? Number(event.params.workout_id) : 0;
	// get data
	const workout_routine = await getWorkoutById(user_id, workout_id);
	if (workout_routine) {

		// super forms
		const workoutForm = await superValidate(
			{ name: workout_routine.name },
			newWorkoutRoutineSchema
		);
		const exerciseForm = await superValidate(insertExerciseRoutineSchema);
		const editExerciseForm = await superValidate(insertExerciseRoutineSchema);
		return { workoutForm, workout_routine, exerciseForm, editExerciseForm};
	}
	return {}
};

export const actions: Actions = {
	edit_workout: async ({ request, locals, url, params }) => {
		const workoutForm = await superValidate(request, newWorkoutRoutineSchema);
		const plan_id = Number(url.searchParams.get('plan_id'));
		const day = Number(url.searchParams.get('day'));
		const session = await locals.getSession();
		// pass in workout plan id
		// TODO pass in param for id
		const user_id = session?.user.id ? session.user.id : '';
		if (!workoutForm.valid) return fail(400, { workoutForm });

		// get pending id
		const workout_id = Number(params.workout_id) ? Number(params.workout_id) : 0;

		// update workout
		await completeWorkoutRoutineForm(workoutForm.data.name, workout_id);

		throw redirect(303, '/');
	},
	add_exercise: async ({ request, locals, url, params }) => {
		const session = await locals.getSession();
		const user_id = session?.user.id ? session.user.id : '';

		const workout_id = Number(params.workout_id) ? Number(params.workout_id) : 0;


		const exerciseForm = await superValidate(request, insertExerciseRoutineSchema);

		if (!exerciseForm.valid) return fail(400, { exerciseForm });

		const input = {
			...exerciseForm.data,
			user_id: user_id
		};

		await appendExerciseRoutinetoWorkout(workout_id, input);
	}
};
