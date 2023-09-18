import { db } from '$lib/db/db';
import { z } from 'zod';
import type {  Actions } from '../$types';
import type { PageServerLoad } from './$types';

import {superValidate} from "sveltekit-superforms/server"
import { insertExerciseRoutineSchema} from '$lib/db/schema';
import { getWorkoutsInPlan } from '$lib/db/mutations/workout_plan';
import { getPossibleExercises } from '$lib/db/queries/exercise';


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

    // super forms 
    const form = await superValidate(event, newWorkoutRoutineSchema)

	return {form, data, exercise_choices}
}

export const actions: Actions = {
    default: async (event) => {

    }
}
