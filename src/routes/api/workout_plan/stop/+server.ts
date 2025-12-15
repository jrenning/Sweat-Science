import { json, type RequestHandler } from '@sveltejs/kit';
import { startNewWorkoutPlan, updatePlanStatus } from '$lib/db/mutations/workout_plan';

export const POST: RequestHandler = async ({ locals, request }) => {
    const session = await locals.getSession();
    const user_id = session?.user?.id ? session.user.id : '';
    const { plan_id } = await request.json();


    const data = await updatePlanStatus(plan_id, "Completed")

    return json({ message: "success" });
};
