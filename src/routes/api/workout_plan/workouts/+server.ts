import { getWorkoutsInPlanOnDay } from "$lib/db/queries/workout_plan";
import { json, type RequestHandler } from "@sveltejs/kit";
import { current_plan_id } from "../../../../stores/workout_plan";
import { get } from "svelte/store";

export const POST: RequestHandler = async ({ locals, request }) => {
    	const session = await locals.getSession();
			const user_id = session?.user.id ? session.user.id : '';
    const {day} = await request.json()

    const data = await getWorkoutsInPlanOnDay(get(current_plan_id), user_id, day)

    return json({workouts: data.length})


}