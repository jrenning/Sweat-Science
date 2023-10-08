import { and, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { workoutLog } from "../schema";


export async function getUserWorkoutLogs(user_id: string) {
    return await db.query.workoutLog.findMany({
        with: {
            exercise_routines: true
        },
        where: eq(workoutLog.user_id, user_id)
    }
    )
}

export async function getLastWorkout(user_id: string) {
    return await db.query.workoutLog.findFirst({
        where: eq(workoutLog.user_id, user_id),
        orderBy: desc(workoutLog.created_at),
        with: {
            exercise_routines: {
                with: {
                    exercise: true
                }
            }
        }
    })
}