import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../db';
import { workout_folders } from '../schema';

export async function getParentFolders(user_id: string) {
	return await db
		.select()
		.from(workout_folders)
		.where(and(eq(workout_folders.user_id, user_id), isNull(workout_folders.parent_folder_id)));
}

export async function getChildFolders(user_id: string, parent_id: number) {
	return await db
		.select()
		.from(workout_folders)
		.where(
			and(eq(workout_folders.user_id, user_id), eq(workout_folders.parent_folder_id, parent_id))
		);
}
