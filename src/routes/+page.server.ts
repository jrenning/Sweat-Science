
import { getSession } from "@auth/sveltekit";
import type { PageServerLoad } from "./$types";
import { getLastWorkout } from "$lib/db/queries/workout_routine";



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