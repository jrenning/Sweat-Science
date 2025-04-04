import { deleteGoal } from '$lib/db/mutations/goals';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const { goal_id } = await request.json();
	console.log(goal_id);
	const data = await deleteGoal(user_id, goal_id);

	return json(data);
};
