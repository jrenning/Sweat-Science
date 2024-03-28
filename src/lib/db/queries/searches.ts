import { desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { exercises, searches } from '../schema';

export async function getRecentSearches(user_id: string) {
	const sq = db
		.selectDistinctOn([searches.exercise_id], {exercise_id: exercises.id, exercise_name: exercises.name, created_at: searches.created_at})
		.from(searches)
		.where(eq(searches.user_id, user_id))
		.limit(5)
		.orderBy(desc(searches.exercise_id))
		.innerJoin(exercises, eq(searches.exercise_id, exercises.id)).as("sq")
    const data = await db.select().from(sq).orderBy(desc(sq.created_at))

    // const result = data.map((search)=> search.exercises)
	return data;
}
