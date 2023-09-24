import { eq } from "drizzle-orm";
import { db } from "../db";
import { equipment } from "../schema";

export async function getEquipmentById(id: number) {
    return await db.select().from(equipment).where(
        eq(equipment.id, id)
    )
}

export async function getAllEquipment() {
    return db.select().from(equipment)
}