
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../context"
import { deleteWorkoutByID } from "$lib/db/mutations/workout_routine"

export const workoutRouter = createTRPCRouter({
    deleteWorkout: publicProcedure
    .input(z.object({id: z.number(), user_id: z.string()}))
    .mutation(async ({ctx, input})=> {
        await deleteWorkoutByID(input.id, input.user_id)
    })
})