import { z } from 'zod';
import type { Actions } from '../$types';
import type { PageServerLoad } from './$types';

import { setError, superValidate } from 'sveltekit-superforms/server';
import { insertExerciseRoutineSchema } from '$lib/db/schema';
import { getWorkoutsInPlan } from '$lib/db/queries/workout_plan';
import { getPossibleExercises } from '$lib/db/queries/exercise';
import { fail } from '@sveltejs/kit';
import { addWorkout, addWorkoutToPlan } from '$lib/db/mutations/workout_routine_';

const newWorkoutRoutineSchema = z.object({
	name: z.string(),
	exercises: z.array(insertExerciseRoutineSchema)
});

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';
	const data = await getWorkoutsInPlan(1, user_id);

	const exercise_choices = await getPossibleExercises(user_id, '');

	// super forms
	const form = await superValidate(event, newWorkoutRoutineSchema);

	return { form, data, exercise_choices };
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const workoutForm = await superValidate(request, newWorkoutRoutineSchema);
		const plan_id = Number(url.searchParams.get('plan_id'));
		const session = await locals.getSession();
		// pass in workout plan id
		// TODO pass in param for id
		const user_id = session?.user.id ? session.user.id : '';

		if (!workoutForm.valid) return fail(400, { workoutForm });

		// validate stuff

        for (let i=0; i<workoutForm.data.exercises.length; i++) {
            if (workoutForm.data.exercises[i].weight.length !== workoutForm.data.exercises[i].reps.length) {
                return setError(workoutForm, "Weight and rep count doesn't match")
            }
        }



		// insert workout
		// const data = {
		// 	...workoutForm.data,
		// 	user_id: user_id
		// };

		// if (plan_id) {
		// 	await addWorkoutToPlan(plan_id, data);
		// } else {
		// 	// no days required if not in workout plan

		// 	await addWorkout(data);
		// }

		return { workoutForm };
	}
};
