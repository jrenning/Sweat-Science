import { changeWorkoutFolder } from "$lib/db/mutations/folders";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, request }) => {
	const { workout_id, folder_id } = await request.json();

	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';
	const data = await changeWorkoutFolder(user_id, workout_id, folder_id);

	return json(data);
};
