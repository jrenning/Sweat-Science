import { eq } from 'drizzle-orm';
import { db } from '../db';
import { equipment, type InsertEquipment } from '../schema';

export async function addEquipment(input: InsertEquipment) {
	return await db.insert(equipment).values(input);
}

export async function deleteEquipmentById(id: number) {
	return await db.delete(equipment).where(eq(equipment.id, id));
}

export async function updateEquipment(input: InsertEquipment, id: number) {
	return await db.update(equipment).set(input).where(eq(equipment.id, id));
}
