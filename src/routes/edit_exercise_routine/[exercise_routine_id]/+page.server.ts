import { getAllEquipment } from "$lib/db/queries/equipment";
import { getPossibleExercises } from "$lib/db/queries/exercise";
import { getExerciseRoutineById } from "$lib/db/queries/exercise_routine";
import { insertExerciseRoutineSchema } from "$lib/db/schema";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	// pass in workout plan id
	// TODO pass in param for id
	const user_id = session?.user.id ? session.user.id : '';

	// get workout id
	const exercise_routine_id = Number(event.params.exercise_routine_id) ? Number(event.params.exercise_routine_id) : 0;
	// get data
	const exercise_routine = await getExerciseRoutineById(exercise_routine_id, user_id);
	if (exercise_routine) {
		const exercise_choices = await getPossibleExercises(user_id, '');
		const equipment_choices = await getAllEquipment();

		// super forms
		const exerciseForm = await superValidate(
			exercise_routine[0],
			insertExerciseRoutineSchema
		);
		return { exercise_routine, exercise_choices, exerciseForm, equipment_choices };
	}
	return {};
};
