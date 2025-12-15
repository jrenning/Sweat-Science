import { and, arrayContains, desc, eq, isNotNull } from 'drizzle-orm';
import {
	Status,
	workout_plans,
	workout_routine,
	workoutLog,
	type WorkoutPlanWithWorkouts,
	type WorkoutRoutineWithExercises
} from '../schema';
import { db } from '../db';

export async function getWorkoutPlanByID(user_id: string, plan_id: number) {
	return await db
		.select()
		.from(workout_plans)
		.where(and(eq(workout_plans.user_id, user_id), eq(workout_plans.id, plan_id)));
}

export async function getWorkoutPlanWithWorkoutsByID(user_id: string, plan_id: number) {
	let data = await db.query.workout_plans.findFirst({
		with: {
			workouts: {
				with: {
					exercises: {
						columns: {
							exercise_routine_id: false,
							workout_routine_id: false
						},
						with: {
							exercise_routine: {
								with: {
									exercise: true
								}
							}
						}
					}
				}
			}
		},
		where: and(eq(workout_plans.user_id, user_id), eq(workout_plans.id, plan_id))
	});

	if (data) {
		//@ts-ignore
		let new_data: WorkoutPlanWithWorkouts = {};
		let new_workouts: WorkoutRoutineWithExercises[] = [];
		for (let i = 0; i < data.workouts.length; i++) {
			let exercises = data.workouts[i].exercises.map((exercise) => exercise.exercise_routine);
			new_workouts.push({ ...data.workouts[i], exercises: exercises });
		}
		new_data = { ...data, workouts: new_workouts };

		return new_data;
	}
}

export async function getAllUserWorkoutPlans(user_id: string) {
	return await db
		.select()
		.from(workout_plans)
		.where(and(eq(workout_plans.user_id, user_id), eq(workout_plans.status, 'Completed')));
}

export async function getActiveWorkoutPlan(user_id: string) {
	let data = await db.query.workout_plans.findFirst({
		with: {
			workouts: {
				with: {
					exercises: {
						columns: {
							exercise_routine_id: false,
							workout_routine_id: false
						},
						with: {
							exercise_routine: {
								with: {
									exercise: true
								}
							}
						}
					}
				}
			}
		},
		where: and(eq(workout_plans.user_id, user_id), eq(workout_plans.status, 'Current'))
	});

	if (data) {
		//@ts-ignore
		let new_data: WorkoutPlanWithWorkouts = {};
		let new_workouts: WorkoutRoutineWithExercises[] = [];
		for (let i = 0; i < data.workouts.length; i++) {
			let exercises = data.workouts[i].exercises.map((exercise) => exercise.exercise_routine);
			new_workouts.push({ ...data.workouts[i], exercises: exercises });
		}
		new_data = { ...data, workouts: new_workouts };

		return new_data;
	}
}

export async function getWorkoutsInPlan(plan_id: number, user_id: string) {
	let data = await db.query.workout_routine.findMany({
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		},
		where: and(eq(workout_routine.workout_plan_id, plan_id), eq(workout_routine.user_id, user_id))
	});
	if (data) {
		let new_data = [];
		for (let i = 0; i < data.length; i++) {
			let exercises = data[i].exercises.map((exercise) => exercise.exercise_routine);
			new_data.push({ ...data[i], exercises: exercises });
		}
		return new_data;
	}
}

export async function getWorkoutsInPlanOnDay(plan_id: number, user_id: string, day: number) {
	let data = await db.query.workout_routine.findMany({
		with: {
			exercises: {
				columns: {
					exercise_routine_id: false,
					workout_routine_id: false
				},
				with: {
					exercise_routine: {
						with: {
							exercise: true
						}
					}
				}
			}
		},
		where: and(
			eq(workout_routine.workout_plan_id, plan_id),
			eq(workout_routine.user_id, user_id),
			arrayContains(workout_routine.days, [day])
		)
	});
	if (data) {
		let new_data = [];
		for (let i = 0; i < data.length; i++) {
			let exercises = data[i].exercises.map((exercise) => exercise.exercise_routine);
			new_data.push({ ...data[i], exercises: exercises });
		}
		return new_data;
	}
}

export async function getPendingPlans(user_id: string) {
	const data = await db
		.select({ id: workout_plans.id })
		.from(workout_plans)
		.limit(1)
		.where(and(eq(workout_plans.status, 'Pending'), eq(workout_plans.user_id, user_id)));
	return data;
}

export async function getCopyIDInPlan(plan_id: number) {
	let data = await db
		.select({ copy_id: workout_routine.copy_id, id: workout_routine.id })
		.from(workout_routine)
		.where(and(eq(workout_routine.workout_plan_id, plan_id), isNotNull(workout_routine.copy_id)));

	return data;
}

export async function getCompletedWorkoutsInPlan(
	plan_id: number,
	start_date: Date,
	user_id: string
) {
	return await db.query.workoutLog.findMany({
		with: {
			exercise_routines: {
				with: {
					exercise: true
				}
			}
		},
		where: and(
			eq(workoutLog.user_id, user_id),
			eq(workoutLog.plan_id, plan_id),
			eq(workoutLog.plan_start_date, start_date)
		),
		orderBy: desc(workoutLog.created_at)
	});
}
