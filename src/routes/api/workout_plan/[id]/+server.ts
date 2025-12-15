import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getWorkoutsInPlan } from '$lib/db/queries/workout_plan';
import { convertWorkoutFromPercent } from '$lib/db/queries/workout_routine';

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.getSession();
	const user_id = session?.user?.id ? session.user.id : '';
	let id = Number(params.id) ? Number(params.id) : 0;

	const data = await getWorkoutsInPlan(id, user_id);

    // let res = data?.map(async (w)=>  await convertWorkoutFromPercent(w, user_id))

    // let converted_workouts = await Promise.all(res)

	return json(data);
};
