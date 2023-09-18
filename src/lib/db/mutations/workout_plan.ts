import { eq } from "drizzle-orm";
import { db } from "../db";
import { exercise_routine, workout_plans, workout_routine, type InsertFullWorkoutPlan } from "../schema";



export async function createWorkoutPlan(id: string, plan: Omit<InsertFullWorkoutPlan, "user_id"> ) {

    

    return await db.insert(workout_plans).values({
        ...plan,
        user_id: id
    })

}

export async function getWorkoutsInPlan(plan_id: number, user_id: string) {
    return await db.query.workout_routine.findMany({
        with: {
            exercises: true
        },
        where: eq(workout_routine.workout_plan_id, plan_id)
    })
}