import { getUserDefaultSettings } from "$lib/db/queries/users";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user?.id ? session.user.id : '';


    const default_settings = await getUserDefaultSettings(user_id)

    return {default_settings: default_settings[0]}
}