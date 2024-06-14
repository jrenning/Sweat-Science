import { getUserTheme } from '$lib/db/queries/users';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	// set user theme

	const session = await event.locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

    const theme = await getUserTheme(user_id)
	let user_theme = "sahara"
	if (theme[0] && theme[0].theme) {
		user_theme = theme[0].theme
	}
	return {
        theme: user_theme,
		session: await event.locals.getSession()
	};
};
