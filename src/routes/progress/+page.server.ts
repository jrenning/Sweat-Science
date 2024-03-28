import { getPossibleExercises } from "$lib/db/queries/exercise";
import { getUserWorkoutLogs } from "$lib/db/queries/logs";
import { getRecentSearches } from "$lib/db/queries/searches";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const workouts = await getUserWorkoutLogs(user_id)
	const exercises = await getPossibleExercises(user_id, "")
	const searches = await getRecentSearches(user_id)
	return {
		workouts,
		exercises,
		searches
	};
};
