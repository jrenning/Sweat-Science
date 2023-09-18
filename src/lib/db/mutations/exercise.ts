import { and, eq, isNull } from "drizzle-orm";
import { db } from "../db";
import { exercises } from "../schema";

export async function getPossibleExercises(user_id: string, search_term: string) {
    return await db.select({
        name: exercises.name
    }).from(exercises).where(and(
        eq(exercises.user_id, user_id),
        isNull(exercises.user_id)
    ))
}