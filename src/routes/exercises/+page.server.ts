import { getAllEquipment } from "$lib/db/queries/equipment";
import { getExercisesWithEquipment, getPossibleExercises } from "$lib/db/queries/exercise";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const data = await getExercisesWithEquipment(session ? session.user.id : '')
	const equipment = await getAllEquipment()
	return {
		data: {
			exercises: data,
			equipment: equipment
		}
	};
};
