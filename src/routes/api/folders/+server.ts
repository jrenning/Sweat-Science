import { changeWorkoutFolder, deleteFolder } from '$lib/db/mutations/folders';
import { getAllFolders } from '$lib/db/queries/folders';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	const data = await getAllFolders(user_id);

	return json(data);
};

export const POST: RequestHandler = async ({locals, request}) => {
		const session = await locals.getSession();
		const user_id = session?.user.id ? session.user.id : '';
		const {folder_id} = await request.json()

		const data = await deleteFolder(user_id, folder_id)

		return json(data)
}

