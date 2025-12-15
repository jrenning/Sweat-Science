import { getPendingPlans, getWorkoutPlanByID, getWorkoutsInPlanOnDay } from '$lib/db/queries/workout_plan';
import { current_plan_id } from '../../../stores/workout_plan';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url, params }) => {
    const session = await locals.getSession();
    // pass in workout plan id
    // TODO pass in param for id
    const user_id = session?.user?.id ? session.user.id : '';

    let pending_id = await getPendingPlans(user_id);
    let plan_id = pending_id[0] ? pending_id[0].id : 0


    return { plan_id };
};
