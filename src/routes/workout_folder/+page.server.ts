
import { getParentFolders } from '$lib/db/queries/folders';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const folders = await getParentFolders(user_id)
	return {
		folders
	};
};
