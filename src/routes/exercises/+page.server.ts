import { getAllEquipment } from '$lib/db/queries/equipment';
import { getExercisesWithEquipment, getPossibleExercises } from '$lib/db/queries/exercise';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import { insertExerciseSchema } from '$lib/db/schema';

import type { Actions } from '../$types';

import { setError } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { addExercise } from '$lib/db/mutations/exercise';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const data = await getExercisesWithEquipment(session ? session.user.id : '');
	const equipment = await getAllEquipment();

	const form = await superValidate(insertExerciseSchema);

	return {
		form,
		data: {
			exercises: data,
			equipment: equipment
		}
	};
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
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
	}
};
