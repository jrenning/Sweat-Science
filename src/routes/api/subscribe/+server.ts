import { setUserSubscription } from '$lib/db/mutations/users';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const subscription = await request.json();
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const result = await setUserSubscription(user_id, subscription)
		.then((res) => {
			return new Response(JSON.stringify({ success: true }), {
				status: 200
			});
		})
		.catch((err) => {
			return new Response(JSON.stringify({ error: err }), {
				status: 400
			});
		});

	return result;
};
