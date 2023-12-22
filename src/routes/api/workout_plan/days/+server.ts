import { updatePlanDays } from '$lib/db/mutations/workout_plan';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const { plan_id, total_days } = await request.json();
	console.log('Here');
	const data = await updatePlanDays(plan_id, total_days)
		.then(() => new Response(JSON.stringify({ success: true })))
		.catch((err: any) => new Response(JSON.stringify({ error: err })));

	return data;
};
