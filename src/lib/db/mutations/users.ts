import { eq } from 'drizzle-orm';
import { db } from '../db';
import { user_settings, users } from '../schema';

export async function createUser() {}

export async function setUserSubscription(user_id: string, subscription: JSON) {
	await db.update(users).set({ pushSubscription: subscription }).where(eq(users.id, user_id));
}

export async function setUserTheme(user_id: string, theme: string) {
	await db.update(user_settings).set({ theme: theme }).where(eq(user_settings.user_id, user_id));
}
