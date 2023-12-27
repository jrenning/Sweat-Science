import { getPossibleExercises } from "$lib/db/queries/exercise";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	const data = await getPossibleExercises(user_id, "")

	return json({exercises: data});
};
