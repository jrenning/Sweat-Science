import { getFavoriteWorkouts} from '$lib/db/queries/workout_routine';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	let data = await getFavoriteWorkouts(user_id);
	return json(data);
};
