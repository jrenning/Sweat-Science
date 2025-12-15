import { eq } from 'drizzle-orm';
import { db } from '../db';
import { type Goal, goals } from '../schema';
import { getCurrentAverageWeight, getCurrentOneRepMax } from './exercise';

type GoalTypes = '1RM' | 'average_weight' | 'weekly_workouts' | 'weekly_exercises';

export async function getUserGoals(user_id: string) {
	return await db.query.goals.findMany({
		where: eq(goals.user_id, user_id),
		with: {
			exercise: true
		}
	});
}

export async function getCurrentGoalData(goal: Goal) {        
	if (goal.user_id && goal.exercise_id) {
		if (goal.goal_type == '1RM') {
			return await getCurrentOneRepMax(goal.user_id, goal.exercise_id);
		} else if (goal.goal_type == 'average_weight') {
			return await getCurrentAverageWeight(goal.user_id, goal.exercise_id);
		}
	}
}
