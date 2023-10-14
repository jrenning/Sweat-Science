import { and, asc, desc, eq, isNull, or } from 'drizzle-orm';
import { db } from '../db';
import { exercises, type ExerciseWithEquipment } from '../schema';
import { getEquipmentById } from './equipment';

export async function getPossibleExercises(user_id: string, search_term: string) {
	const data = await db
		.select()
		.from(exercises)
		.orderBy(asc(exercises.name))
		.where(or(eq(exercises.user_id, user_id), isNull(exercises.user_id)));
	return data;
}

export async function getExercisesWithEquipment(user_id: string) {
	const data = await db.query.exercises.findMany({
		where: or(eq(exercises.user_id, user_id), isNull(exercises.user_id)),
		with: {
			equipment: true
		}
	});


	return data;
}

export async function getExerciseById(id: number, user_id: string) {
		const data = await db.query.exercises.findFirst({
			where: and(or(eq(exercises.user_id, user_id), isNull(exercises.user_id)), eq(exercises.id, id)),
		
			with: {
				equipment: true
			}
		});

		return data;
}
