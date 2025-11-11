import { getLastNthTimeExercisePerformed, getLastTimeWorkoutPerformed } from "$lib/db/queries/logs";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, request }) => {
    const { exercise_id} = await request.json();

    const session = await locals.getSession();
    const user_id = session?.user?.id ? session.user.id : '';
    const data = await getLastNthTimeExercisePerformed(exercise_id, user_id, 1);

    return json(data);
};