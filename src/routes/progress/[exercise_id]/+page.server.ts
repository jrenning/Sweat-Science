import { getExerciseById } from "$lib/db/queries/exercise";
import { getUserExerciseLogById } from "$lib/db/queries/logs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
    const exercise_id = Number(params.exercise_id) ? Number(params.exercise_id) : 0;
	const log = await getUserExerciseLogById(user_id, exercise_id)
    const exercise = await getExerciseById(exercise_id, user_id)
	return {
		log,
        exercise
	};
};
