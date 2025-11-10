
import type { PageServerLoad } from "./$types";
import { getAllUserWorkouts } from "$lib/db/queries/workout_routine";
import { getLastWorkout } from "$lib/db/queries/logs";
import { getCurrentGoalData, getUserGoals } from "$lib/db/queries/goals";



export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.getSession()
    const user_id = session?.user?.id ? session.user.id : '';
    const workout = await getLastWorkout(user_id);
    const workouts = await getAllUserWorkouts(user_id)

    // goals
    const goals = await getUserGoals(user_id)



   const goal_data = await Promise.all(goals.map(async (g) => {return {...g, current_val: await getCurrentGoalData(g)}}))


    return {
        data: {
            last_workout: await getLastWorkout(user_id),
            all_workouts: workouts,
            goal_data: goal_data
        }
    }
}