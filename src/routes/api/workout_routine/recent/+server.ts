import { convertWorkoutFromPercent, getRecentWorkouts } from '$lib/db/queries/workout_routine';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	const user_id = session?.user?.id ? session.user.id : '';

	let data = await getRecentWorkouts(user_id);

	if (data) {
		data = await Promise.all(
			data.map(async (d) => {
				let workout = await convertWorkoutFromPercent(d, user_id);
				return workout;
			})
		);
	}

	return json(data);
};
