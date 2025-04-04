import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { goals, InsertGoal } from '../schema';

export async function addGoal(goal: InsertGoal) {
	await db.insert(goals).values(goal);
}

export async function deleteGoal(user_id: string, goal_id: number) {
	await db.delete(goals).where(and(eq(goals.user_id, user_id), eq(goals.id, goal_id)));
}
