import { getExerciseById } from '$lib/db/queries/exercise';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import { insertEquipmentSchema } from '$lib/db/schema';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const exercise_id = Number(url.searchParams.get('exercise_id'));
	const exercise = await getExerciseById(exercise_id, user_id);
	const form = await superValidate(insertEquipmentSchema);
	return {
		form,
		data: exercise
	};
};
