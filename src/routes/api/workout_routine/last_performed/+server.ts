
import { getLastTimeWorkoutPerformed } from "$lib/db/queries/logs";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, request }) => {
    const { workout_name} = await request.json();

    const session = await locals.getSession();
    const user_id = session?.user.id ? session.user.id : '';
    const data = await getLastTimeWorkoutPerformed(workout_name, user_id);

    return json(data);
};
