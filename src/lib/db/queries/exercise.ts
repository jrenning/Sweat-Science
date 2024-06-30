import { and, asc, desc, eq, gt, isNull, or } from 'drizzle-orm';
import { db } from '../db';
import {
	exercise_info,
	exercise_routine,
	exerciseLog,
	exercises,
	type ExerciseWithEquipment
} from '../schema';
import { getEquipmentById } from './equipment';
import { calcOneRepMax } from '../../../helpers/rep_max';

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

export async function getExerciseWeightsByName(name: string) {
	const data = await db.select().from(exercise_info).where(eq(exercise_info.exercise_name, name));

	return data;
}

export async function getEstimatedOneRepMax(user_id: string, exercise_id: number) {
	const data = await db
		.select({
			estimated_max: exerciseLog.estimated_max
		})
		.from(exerciseLog)
		.where(and(eq(exerciseLog.exercise_id, exercise_id), eq(exerciseLog.user_id, user_id)))
		.orderBy(desc(exerciseLog.estimated_max))
		.limit(1)
		.catch((err) => console.log(err));

	if (!data || !data[0]) {
		return undefined;
	}
	if (!data[0].estimated_max) {
		return undefined;
	}
	return data[0].estimated_max;
}

export async function getCurrentOneRepMax(user_id: string, exercise_id: number) {
	// gets the last three maxes on an exercise and returns the highest one

	const data = await db
		.select({
			estimated_max: exerciseLog.estimated_max
		})
		.from(exerciseLog)
		.where(and(eq(exerciseLog.exercise_id, exercise_id), eq(exerciseLog.user_id, user_id)))
		.orderBy(desc(exerciseLog.created_at))
		.limit(3)
		.catch((err) => console.log(err));

	console.log(data)

	if (data) {
		const maxes = data.map((max) => max.estimated_max);
		//@ts-ignore
		return Math.max(...maxes);
	} else {
		return undefined;
	}
}
