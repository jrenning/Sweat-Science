import { getChildFolders, getParentFolders, getWorkoutsinFolder } from '$lib/db/queries/folders';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url, params }) => {
	const session = await locals.getSession();
    const folder_id = Number(params.folder_id) ? Number(params.folder_id) : 0;
	const user_id = session?.user.id ? session.user.id : '';
	const folders = await getChildFolders(user_id, folder_id);
    const workouts = await getWorkoutsinFolder(user_id, folder_id)
	return {
		folders,
        folder_id,
        workouts
	};
};
