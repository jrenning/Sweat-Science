
import { getRecentWorkouts } from "$lib/db/queries/workout_routine";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	const data = await getRecentWorkouts(user_id);

	return json(data);
};
