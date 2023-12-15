import { getChildFolders, getParentFolders, getWorkoutsinFolder } from '$lib/db/queries/folders';
import { superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';
import { insertWorkoutFolderSchema } from '$lib/db/schema';

export const load: PageServerLoad = async ({ locals, url, params }) => {
	const session = await locals.getSession();
    const folder_id = Number(params.folder_id) ? Number(params.folder_id) : 0;
	const user_id = session?.user.id ? session.user.id : '';
	const folders = await getChildFolders(user_id, folder_id);
    const workouts = await getWorkoutsinFolder(user_id, folder_id)
	const folderForm = superValidate(insertWorkoutFolderSchema);
	return {
		folders,
        folder_id,
		folderForm,
        workouts
	};
};
