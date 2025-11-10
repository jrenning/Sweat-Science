import type { Actions } from '../$types';
import type { PageServerLoad } from './$types';

import { appendExerciseRoutinetoWorkout } from '$lib/db/mutations/exercise_routine';
import {
	completeWorkoutRoutineForm,
	createPendingWorkout
} from '$lib/db/mutations/workout_routine';
import { getAllEquipment } from '$lib/db/queries/equipment';
import { getPossibleExercises } from '$lib/db/queries/exercise';
import { getPendingWorkouts, getWorkoutById } from '$lib/db/queries/workout_routine';
import { insertExerciseRoutineSchema, insertWorkoutRoutine } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ url, locals }) => {
	const session = await locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user?.id ? session.user.id : '';

	let plan_id_url = url.searchParams.get('plan_id');
	let day_url = url.searchParams.get('day');

	const plan_id = plan_id_url ? Number(plan_id_url) : undefined;
	const day = day_url ? Number(day_url) : undefined;

	// get pending workouts
	let pending_id = await getPendingWorkouts(user_id);

	if (pending_id.length == 0) {
		// create new workout routine
		//@ts-ignore
		pending_id = await createPendingWorkout(user_id, plan_id, day ? [day] : undefined);
	}
	// get pending data
	const workout_routine = await getWorkoutById(user_id, pending_id[0].id);

	const formData = {
		plan_id: plan_id,
		days: day ? [day] : undefined,
		...workout_routine
	};
	// super forms
	let workoutForm = await superValidate(formData, zod4(insertWorkoutRoutine));

	const exerciseForm = await superValidate(zod4(insertExerciseRoutineSchema));
	const editExerciseForm = await superValidate(zod4(insertExerciseRoutineSchema));
	return { workoutForm, plan_id, day, workout_routine, exerciseForm, editExerciseForm };
};

export const actions: Actions = {
	add_workout: async ({ request, locals, url }) => {
		const workoutForm = await superValidate(request, zod4(insertWorkoutRoutine));
		const session = await locals.getSession();
		const user_id = session?.user?.id ? session.user.id : '';
		if (!workoutForm.valid) return fail(400, { workoutForm });

		// get pending id
		let pending_id = await getPendingWorkouts(user_id);


		const workout_id = pending_id[0].id;

		// update workout
		await completeWorkoutRoutineForm(
			workoutForm.data.name,
			workout_id,
			workoutForm.data.workout_plan_id,
			workoutForm.data.days
		);
		if (workoutForm.data.workout_plan_id) {
			redirect(303, '/add_workout_plan');
		} else {
			redirect(303, '/');
		}
	},
	add_exercise: async ({ request, locals, url }) => {
		const session = await locals.getSession();
		const user_id = session?.user?.id ? session.user.id : '';
		let pending_id = await getPendingWorkouts(user_id);

		const workout_id = pending_id[0].id;

		const exerciseForm = await superValidate(request, zod4(insertExerciseRoutineSchema));

		if (!exerciseForm.valid) return fail(400, { exerciseForm });

		// temp fix for popup issue
		exerciseForm.data.id = undefined
		const input = {
			...exerciseForm.data,
			user_id: user_id
		};

		await appendExerciseRoutinetoWorkout(workout_id, input);
	}
};
