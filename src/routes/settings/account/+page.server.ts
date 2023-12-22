import { getUserAccountSettings } from "$lib/db/queries/users";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	const account_settings = await getUserAccountSettings(user_id);

	return { account_settings: account_settings[0] };
};
