import { setUserTheme } from '$lib/db/mutations/users';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const { theme } = await request.json();

	const res = await setUserTheme(user_id, theme)
		.then(() => {
			return {success: true};
		})
		.catch((err) => {
			return {error: err};
		});

	return json(res);
};
