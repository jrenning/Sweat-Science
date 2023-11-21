import { deleteWorkoutByID } from '$lib/db/mutations/workout_routine.js'
import { json } from '@sveltejs/kit'

export async function POST(event) {
    const data = await event.request.json()

    console.log(data)

    const id = data["id"]
    const user_id = data["user_id"]

    if (id && user_id) {
        await deleteWorkoutByID(Number(id), user_id as string)

        return json({success: true})
    }

    return json({success: false})
}