import { eq } from 'drizzle-orm';
import { db } from '../db';
import { user_settings, users } from '../schema';

export async function getUserSubsscription(user_id: string) {
	return await db
		.select({ subscription: users.pushSubscription })
		.from(users)
		.where(eq(users.id, user_id));
}

export async function getUserDefaultSettings(user_id: string) {
	return await db
		.select({
			notify_after_set: user_settings.notify_after_set,
			theme: user_settings.theme
		})
		.from(user_settings)
		.where(eq(user_settings.user_id, user_id));
}

export async function getUserAccountSettings(user_id: string) {
	return await db
		.select({ weight: user_settings.weight, height: user_settings.height })
		.from(user_settings)
		.where(eq(user_settings.user_id, user_id));
}

export async function getUserTheme(user_id: string) {
	return await db
		.select({ theme: user_settings.theme })
		.from(user_settings)
		.where(eq(user_settings.user_id, user_id));
}
