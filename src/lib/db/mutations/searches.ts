import { db } from "../db";
import { searches, type InsertSearch } from "../schema";

export async function addSearch(input: InsertSearch) {
    await db.insert(searches).values(input)
}