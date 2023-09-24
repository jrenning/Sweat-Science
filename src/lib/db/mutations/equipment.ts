import { db } from '../db';
import { equipment, type InsertEquipment } from '../schema';

export async function seedEquipmentData() {

	type newEquipment = typeof equipment.$inferInsert;

    // TODO fill this better
	const values: newEquipment[] = [
		{
			name: 'Barbell',
			type: 'Barbell'
		},
		{
            name: "Body Weight",
            type: 'Body Weight'
        },
        {
            name: "Dumbbell",
            type: "Barbell"
        },
        {
            name: "Other",
            type: "Other"
        },
        {
            name: "Treadmill",
            type: "Machine"
        }
	];

	await db.insert(equipment).values(values);
}


export async function addEquipment(input: InsertEquipment) {
    return await db.insert(equipment).values(input)
}