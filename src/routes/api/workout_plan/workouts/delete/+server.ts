
import { deleteWorkoutFromPlan } from '$lib/db/mutations/workout_plan';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const { plan_id, workout_id, day } = await request.json();


	const data = await deleteWorkoutFromPlan(user_id, plan_id, workout_id, day)
		.then(() => new Response(JSON.stringify({ success: true })))
		.catch((err: any) => new Response(JSON.stringify({ error: err })));

	return data;
};
