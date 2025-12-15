
import type { PageServerLoad } from "./$types";
import { getAllUserWorkouts } from "$lib/db/queries/workout_routine";
import { getLastWorkout, getLastWorkoutMetrics } from "$lib/db/queries/logs";
import { getCurrentGoalData, getUserGoals } from "$lib/db/queries/goals";
import { getActiveWorkoutPlan, getAllUserWorkoutPlans, getCompletedWorkoutsInPlan } from "$lib/db/queries/workout_plan";
import type { WorkoutLogWithExercises } from "$lib/db/schema";



export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.getSession()
    const user_id = session?.user?.id ? session.user.id : '';
    const workout = await getLastWorkout(user_id);
    const workouts = await getAllUserWorkouts(user_id)
    const workout_plans = await getAllUserWorkoutPlans(user_id)
    // goals
    const goals = await getUserGoals(user_id)


    //@ts-ignore
   const goal_data = await Promise.all(goals.map(async (g) => {return {...g, current_val: await getCurrentGoalData(g)}}))
    const current_workout_plan = await getActiveWorkoutPlan(user_id)
    let workout_plan_workout_data: WorkoutLogWithExercises[] = []
    if (current_workout_plan) {
        //@ts-ignore
        workout_plan_workout_data =  await getCompletedWorkoutsInPlan(current_workout_plan.id, current_workout_plan.start_date, user_id)
    }

    const last_workout = await getLastWorkout(user_id)

    return {
        data: {
            last_workout: last_workout,
            last_workout_metrics: await getLastWorkoutMetrics(last_workout, user_id),
            all_workouts: workouts,
            goal_data: goal_data,
            workout_plans,
            current_plan: current_workout_plan,
            plan_workout_data: workout_plan_workout_data
        }
    }
}