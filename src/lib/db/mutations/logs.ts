import { db } from "../db";
import { getWorkoutById } from "../queries/workout_routine";
import { exerciseLog, workoutLog, type InsertExerciseLog } from "../schema";

export async function createLogFromWorkout(workout_id: number, user_id: string, notes: string) {
    const workout = await getWorkoutById(user_id, workout_id)

    if (workout) {
    // create initial log
    await db.insert(workoutLog).values({
        name: workout.name,
        user_id: user_id,
        notes: notes

    })

    // attach exercise logs 
    workout.exercises.forEach((exercise)=> {
        createExerciseLog({...exercise.exercise_routine, created_at: new Date()})
    })
    }   

}

export async function createExerciseLog(input: InsertExerciseLog) {
    return await db.insert(exerciseLog).values(input)
}