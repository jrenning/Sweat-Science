
import {
	getEstimatedOneRepMax,
	getExerciseById,
	getExerciseWeightsByName
} from '$lib/db/queries/exercise';
import { getLastPerformedExercisesforWorkout, getRankingofWorkoutExercises, getUserExerciseLogById, getWorkoutLogById } from '$lib/db/queries/logs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user?.id ? session.user.id : '';
	const workout_id = Number(params.workout_id) ? Number(params.workout_id) : 0;
	const data = await getWorkoutLogById(user_id, workout_id)

	//@ts-ignore
	const last_performed_data = await getLastPerformedExercisesforWorkout(data?.id, user_id)
	return {
		data,
		last_performed_data,
	};
};
