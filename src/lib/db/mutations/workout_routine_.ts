import { eq } from "drizzle-orm";
import { db } from "../db";
import { workout_routine } from "../schema";

export async function getLastWorkout(id: string) {
    return await db.query.workout_routine.findFirst({
        where: eq(workout_routine.user_id, id),
        with: {
            exercises: {
                columns: {
                    exercise_routine_id: false,
                    workout_routine_id: false
                },
                with: {
                    exercise_routine: {
                        with: {
                            exercise: true
                        }
                    }
                }
            }
        }
    })
}