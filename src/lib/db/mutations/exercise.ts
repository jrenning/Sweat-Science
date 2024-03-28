import { db } from "../db";
import { exercises, type InsertExercise } from "../schema";


export async function addExercise(input: InsertExercise) {
    return await db.insert(exercises).values(input)
}