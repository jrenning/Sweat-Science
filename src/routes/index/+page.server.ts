import { getAllEquipment } from '$lib/db/queries/equipment';
import { getExercisesWithEquipment, getPossibleExercises } from '$lib/db/queries/exercise';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import { insertEquipmentSchema, insertExerciseSchema } from '$lib/db/schema';

import type { Actions } from '../$types';

import { setError } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { addExercise } from '$lib/db/mutations/exercise';
import { addEquipment } from '$lib/db/mutations/equipment';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const data = await getExercisesWithEquipment(session ? session.user.id : '');
	const equipment = await getAllEquipment();

	const equipmentForm = await superValidate(insertExerciseSchema);
	const exerciseForm = await superValidate(insertEquipmentSchema);
	return {
		equipmentForm,
		exerciseForm,
		data: {
			exercises: data,
			equipment: equipment
		}
	};
};


export const actions: Actions = {
	exercise_form: async ({ request, locals, url }) => {
		const exerciseForm = await superValidate(request, insertExerciseSchema);
		const session = await locals.getSession();
		// pass in workout plan id
		// TODO pass in param for id
		const user_id = session?.user.id ? session.user.id : '';

		if (!exerciseForm.valid) return fail(400, { exerciseForm });

		// validate stuff

		//@ts-ignore
		await addExercise(exerciseForm.data);

		return { exerciseForm };
	},
	equipment_form: async ({ request, locals, url }) => {
		console.log('Here');
		const equipmentForm = await superValidate(request, insertEquipmentSchema);
		const session = await locals.getSession();
		// pass in workout plan id
		// TODO pass in param for id
		const user_id = session?.user.id ? session.user.id : '';

		console.log(equipmentForm);

		if (!equipmentForm.valid) return fail(400, { equipmentForm });

		// validate stuff

		if (equipmentForm.data.name.length < 1) {
			const err = setError(equipmentForm, 'Name is too short');
			console.log(equipmentForm.errors);
			return err;
		}

		await addEquipment(equipmentForm.data);

		return { equipmentForm };
	}
};