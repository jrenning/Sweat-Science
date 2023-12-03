
import {
	getEstimatedOneRepMax,
	getExerciseById,
	getExerciseWeightsByName
} from '$lib/db/queries/exercise';
import { getUserExerciseLogById, getWorkoutLogById } from '$lib/db/queries/logs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const workout_id = Number(params.workout_id) ? Number(params.workout_id) : 0;
	const data = await getWorkoutLogById(user_id, workout_id)

	return {
		data
	};
};
