import { getLastWorkout } from "$lib/db/mutations/workout_routine_";
import { getSession } from "@auth/sveltekit";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.getSession()
    const workout = await getLastWorkout(session ? session.user.id : '');
    console.log(workout)
    return {
        data: {
            last_workout: await getLastWorkout(session ? session.user.id : "")
        }
    }
}