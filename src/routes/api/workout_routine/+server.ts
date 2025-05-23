import { deleteWorkoutByID } from '$lib/db/mutations/workout_routine';
import { convertWorkoutFromPercent, getAllUserWorkouts } from '$lib/db/queries/workout_routine';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { action, workout_routine_id } = await request.json();

	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	const data = await deleteWorkoutByID(workout_routine_id, user_id);

	if (data.rowCount > 0) {
		return json({ success: true });
	} else {
		return json({ success: false });
	}
};

export const GET: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	let data = await getAllUserWorkouts(user_id);

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
