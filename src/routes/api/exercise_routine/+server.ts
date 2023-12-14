
import { deleteExerciseFromWorkout } from "$lib/db/mutations/workout_routine";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async({request}) => {

    const {action, exercise_routine_id, workout_routine_id} = await request.json()



    const data = await deleteExerciseFromWorkout(exercise_routine_id, workout_routine_id)


    return json({success: true})
}