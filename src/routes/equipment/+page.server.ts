import { getAllEquipment } from "$lib/db/queries/equipment";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const data = await getAllEquipment()
	return {
		data: data
	};
};
