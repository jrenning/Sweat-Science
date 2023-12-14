import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../schema';

export async function createUser() {}

export async function setUserSubscription(user_id: string, subscription: JSON) {
	await db
		.update(users)
		.set({ pushSubscription: subscription })
		.where(eq(users.id, user_id))
}
