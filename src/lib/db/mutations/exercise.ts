import { db } from "../db";
import { exercises, type InsertExercise } from "../schema";


// TODO Add user id to this when done adding basics 
export async function addExercise(input: InsertExercise) {
    return await db.insert(exercises).values(input)
}