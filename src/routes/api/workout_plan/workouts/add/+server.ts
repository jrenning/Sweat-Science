import { addExistingWorkoutToPlan } from '$lib/db/mutations/workout_plan';
import { addWorkoutToPlan } from '$lib/db/mutations/workout_routine';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const { plan_id, workout_id, day } = await request.json();
	console.log("Here")
	const data = await addExistingWorkoutToPlan(user_id, plan_id, workout_id, day)
		.then(() => new Response(JSON.stringify({ success: true })))
		.catch((err: any) => new Response(JSON.stringify({ error: err })));

	return data;
};
