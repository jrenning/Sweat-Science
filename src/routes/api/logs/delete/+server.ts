import { deleteLogByID } from "$lib/db/mutations/logs";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
	const { log_id} = await request.json();

	const session = await locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	const data = await deleteLogByID(log_id, user_id);

	if (data.rowCount > 0) {
		return json({ success: true });
	} else {
		return json({ success: false });
	}
};
