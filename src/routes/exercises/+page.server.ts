import { getExercisesWithEquipment, getPossibleExercises } from "$lib/db/queries/exercise";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const data = await getExercisesWithEquipment(session ? session.user.id : '')
	console.log(data)
	return {
		data: {
			exercises: data
		}
	};
};
