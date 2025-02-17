import { db } from "../db";
import { searches, type InsertSearch } from "../schema";

export async function addSearch(input: InsertSearch) {

    if (input.exercise_id == 0) {
        return
    }

    const result = await db.insert(searches).values(input)

}