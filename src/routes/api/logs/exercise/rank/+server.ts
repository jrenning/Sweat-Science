import { getRankOfPerformedExercise } from "$lib/db/queries/logs";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, request }) => {
    const { id, exercise_id, after_date, all_time} = await request.json();

    let used_date = new Date(after_date)

    const session = await locals.getSession();
    const user_id = session?.user?.id ? session.user.id : '';
    const data = await getRankOfPerformedExercise(id, exercise_id, user_id, used_date, all_time)

    return json(data);
};