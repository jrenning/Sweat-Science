import { and, eq } from "drizzle-orm";
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