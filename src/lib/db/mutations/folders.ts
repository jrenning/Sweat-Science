import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { workout_folders, workout_routine, type InsertWorkoutFolder } from '../schema';

export async function deleteFolder(user_id: string, folder_id: number) {

	await db.transaction(async (tx)=> {
		await tx
			.delete(workout_folders)
			.where(and(eq(workout_folders.user_id, user_id), eq(workout_folders.id, folder_id)));

		// set all children folders of the deleted folder to have null parents

		await tx
			.update(workout_folders)
			.set({ parent_folder_id: null })
			.where(eq(workout_folders.parent_folder_id, folder_id));
		// set all children workouts to have null folder is handled by database schema
	})

}




export async function updateFolderParent(folder_id: number, parent_id: number) {
	await db
		.update(workout_folders)
		.set({ parent_folder_id: parent_id })
		.where(eq(workout_folders.id, folder_id));
}

export async function editFolderName(user_id: string, folder_id: number, name: string) {
	await db
		.update(workout_folders)
		.set({ name: name })
		.where(and(eq(workout_folders.user_id, user_id), eq(workout_folders.id, folder_id)));
}

export async function changeWorkoutFolder(
	user_id: string,
	workout_id: number,
	folder_id: number | null
) {
	await db
		.update(workout_routine)
		.set({ folder_id: folder_id })
		.where(and(eq(workout_routine.user_id, user_id), eq(workout_routine.id, workout_id)));
}

export async function addFolder(input: InsertWorkoutFolder) {
	await db.insert(workout_folders).values(input);
}
