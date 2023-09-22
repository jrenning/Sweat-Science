import { and, eq, isNull, or } from 'drizzle-orm';
import { db } from '../db';
import { exercises } from '../schema';

export async function getPossibleExercises(user_id: string, search_term: string) {
    const data = await db
			.select({
				name: exercises.name,
				id: exercises.id
			})
			.from(exercises)
			.where(or(eq(exercises.user_id, user_id), isNull(exercises.user_id)));
	return data
}
