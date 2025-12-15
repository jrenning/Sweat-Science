import { json, type RequestHandler } from '@sveltejs/kit';
import { startNewWorkoutPlan } from '$lib/db/mutations/workout_plan';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	const user_id = session?.user?.id ? session.user.id : '';
	const { plan_id, start_date } = await request.json();


	const data = await startNewWorkoutPlan(plan_id, new Date(start_date), user_id)

	return json({ message: "success" });
};
