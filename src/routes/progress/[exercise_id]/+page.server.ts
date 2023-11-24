import { getEstimatedOneRepMax, getExerciseById, getExerciseWeightsByName } from "$lib/db/queries/exercise";
import { getUserExerciseLogById } from "$lib/db/queries/logs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
    const exercise_id = Number(params.exercise_id) ? Number(params.exercise_id) : 0;
	const log = await getUserExerciseLogById(user_id, exercise_id)
    const exercise = await getExerciseById(exercise_id, user_id)
	const weight_data = await getExerciseWeightsByName(exercise ? exercise.name : "")
	const rep_max = await getEstimatedOneRepMax(exercise_id)

	console.log(rep_max)
	return {
		log,
        exercise,
		weight_data,
		rep_max
	};
};
