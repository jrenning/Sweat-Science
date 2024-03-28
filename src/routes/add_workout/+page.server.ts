import type { Actions } from '../$types';
import type { PageServerLoad } from './$types';

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
import { newWorkoutRoutineSchema } from './schemas';
import { getAllEquipment } from '$lib/db/queries/equipment';
import { insertEquipmentSchema, insertExerciseRoutineSchema, insertWorkoutRoutine } from '$lib/db/schema';
import { getPendingWorkouts, getWorkoutById } from '$lib/db/queries/workout_routine';
import { appendExerciseRoutinetoWorkout } from '$lib/db/mutations/exercise_routine';

export const load: PageServerLoad = async ({url, locals}) => {
	const session = await locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	let plan_id_url = url.searchParams.get('plan_id');
	let day_url = url.searchParams.get('day');

	const plan_id = plan_id_url ? Number(plan_id_url) : undefined
	const day = day_url ? Number(day_url) : undefined
	

	// get pending workouts
	let pending_id = await getPendingWorkouts(user_id);

	if (pending_id.length == 0) {
		// create new workout routine
		//@ts-ignore
		pending_id = await createPendingWorkout(user_id, plan_id, day ? [day] : undefined);
	}
	// get pending data
	const workout_routine = await getWorkoutById(user_id, pending_id[0].id);

	const exercise_choices = await getPossibleExercises(user_id, '');
	const equipment_choices = await getAllEquipment();


	const formData = {
		plan_id: plan_id,
		days: day ? [day] : undefined,
		...workout_routine
	};
	// super forms
	let workoutForm = await superValidate(formData, insertWorkoutRoutine);

	const exerciseForm = await superValidate(insertExerciseRoutineSchema);

	return { workoutForm, plan_id, day,  workout_routine, exercise_choices, exerciseForm, equipment_choices };
};

export const actions: Actions = {
	add_workout: async ({ request, locals, url }) => {
		const workoutForm = await superValidate(request, insertWorkoutRoutine);
		const session = await locals.getSession();
		const user_id = session?.user.id ? session.user.id : '';
		if (!workoutForm.valid) return fail(400, { workoutForm });

		// get pending id
		let pending_id = await getPendingWorkouts(user_id);

		const workout_id = pending_id[0].id;

		// update workout
		//@ts-ignore
		await completeWorkoutRoutineForm(workoutForm.data.name, workoutForm.data.workout_plan_id, workoutForm.data.days, workout_id);
		if (workoutForm.data.workout_plan_id) {
			throw redirect(303, "/add_workout_plan")
		}
		else {
		throw redirect(303, '/');
		}
	},
	add_exercise: async ({ request, locals, url }) => {
		const session = await locals.getSession();
		const user_id = session?.user.id ? session.user.id : '';
		let pending_id = await getPendingWorkouts(user_id);

		const workout_id = pending_id[0].id;

		const exerciseForm = await superValidate(request, insertExerciseRoutineSchema);

		if (!exerciseForm.valid) return fail(400, { exerciseForm });

		const input = {
			...exerciseForm.data,
			user_id: user_id
		};

		await appendExerciseRoutinetoWorkout(workout_id, input);
	}
};
