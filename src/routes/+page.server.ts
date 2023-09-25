
import { getSession } from "@auth/sveltekit";
import type { PageServerLoad } from "./$types";
import { getAllUserWorkouts, getLastWorkout } from "$lib/db/queries/workout_routine";



export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.getSession()
    const user_id = session ? session.user.id : '';
    const workout = await getLastWorkout(user_id);
    const workouts = await getAllUserWorkouts(user_id)
    return {
        data: {
            last_workout: await getLastWorkout(session ? session.user.id : ""),
            all_workouts: workouts
        }
    }
}