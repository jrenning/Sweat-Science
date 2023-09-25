import { getAllEquipment } from "$lib/db/queries/equipment";
import { setError, superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "../$types";
import { insertEquipmentSchema } from "$lib/db/schema";
import type { Actions } from '../$types';

import { fail } from '@sveltejs/kit';
import { addEquipment } from '$lib/db/mutations/equipment';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const data = await getAllEquipment()

	const form = superValidate(insertEquipmentSchema)
	return {
		form,
		data: data
	};
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		console.log('Here');
		const equipmentForm = await superValidate(request, insertEquipmentSchema);
		const session = await locals.getSession();
		// pass in workout plan id
		// TODO pass in param for id
		const user_id = session?.user.id ? session.user.id : '';

		console.log(equipmentForm)

		if (!equipmentForm.valid) return fail(400, { equipmentForm });

		// validate stuff

		if (equipmentForm.data.name.length < 1) {
			const err = setError(equipmentForm, "Name is too short")
			console.log(equipmentForm.errors)
			return err
		}

		
		await addEquipment(equipmentForm.data);

		return { equipmentForm };
	}
};