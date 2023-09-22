
import { z } from 'zod';
import type {  Actions } from '../$types';
import type { PageServerLoad } from './$types';

import {superValidate} from "sveltekit-superforms/server"
import { insertExerciseRoutineSchema} from '$lib/db/schema';
import { getWorkoutsInPlan } from '$lib/db/queries/workout_plan';
import { getPossibleExercises } from '$lib/db/queries/exercise';
import { fail } from '@sveltejs/kit';


const newWorkoutRoutineSchema = z.object({
    name: z.string(),
    exercises: z.array(insertExerciseRoutineSchema)

})


export const load: PageServerLoad = async (event) =>  {

    const session = await event.locals.getSession();
    // pass in workout plan id
    // TODO pass in param for id 
    const user_id = session?.user.id ? session.user.id : '';
    const data = await getWorkoutsInPlan(1, user_id)

    const exercise_choices = await getPossibleExercises(user_id, "")


    const plan_id = Number(event.url.searchParams.get("plan_id"))






    // super forms 
    const form = await superValidate(event, newWorkoutRoutineSchema)

	return {form, data, exercise_choices, plan_id}
}

export const actions: Actions = {
    default: async ({request}) => {
        const workoutForm = await superValidate(request, newWorkoutRoutineSchema);
        console.log(workoutForm);
        if (!workoutForm.valid) return fail(400, {workoutForm})




        return {workoutForm}
        
    }
}
