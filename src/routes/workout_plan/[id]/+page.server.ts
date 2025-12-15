import { addSearch } from '$lib/db/mutations/searches';
import {
	getCurrentOneRepMax,
	getEstimatedOneRepMax,
	getExerciseById,
	getExerciseWeightsByName
} from '$lib/db/queries/exercise';
import { getUserExerciseLogById } from '$lib/db/queries/logs';
import {
	getCompletedWorkoutsInPlan,
	getWorkoutPlanWithWorkoutsByID
} from '$lib/db/queries/workout_plan';
import type { WorkoutLogWithExercises } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const session = await locals.auth();
	const user_id = session?.user?.id ? session.user.id : '';
	const plan_id = Number(params.id) ? Number(params.id) : 0;
	const start_date = url.searchParams.get('start_date');

	const plan = await getWorkoutPlanWithWorkoutsByID(user_id, plan_id);

    console.log(plan)
	let completed_workouts: WorkoutLogWithExercises[] = [];
	if (start_date) {
		completed_workouts = await getCompletedWorkoutsInPlan(plan_id, new Date(start_date), user_id);
	}

	return {
		plan,
		completed_workouts
	};
};
