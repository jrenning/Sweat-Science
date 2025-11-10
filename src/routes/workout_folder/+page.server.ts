import { getAllFolders, getParentFolders, getParentWorkouts } from '$lib/db/queries/folders';
import { superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from '../$types';
import { insertWorkoutFolderSchema } from '$lib/db/schema';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { addFolder } from '$lib/db/mutations/folders';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const user_id = session?.user?.id ? session.user.id : '';
	const folders = await getParentFolders(user_id);
	const workouts = await getParentWorkouts(user_id);
	const folderForm = superValidate(zod4(insertWorkoutFolderSchema));
	
	return {
		folders,
		workouts,
		folderForm
	};
};

export const actions: Actions = {
	add_folder: async ({ request, locals, url }) => {
		const folderForm = await superValidate(request, zod4(insertWorkoutFolderSchema));
		const session = await locals.getSession();
		const user_id = session?.user?.id ? session.user.id : '';

		if (!folderForm.valid) return fail(400, { folderForm });

		const data = {
			...folderForm.data,
			user_id: user_id
		};
		await addFolder(data);
	}
};
