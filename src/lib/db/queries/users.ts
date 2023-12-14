import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../schema';

export async function getUserSubsscription(user_id: string) {
	return await db
		.select({ subscription: users.pushSubscription })
		.from(users)
		.where(eq(users.id, user_id));
}
