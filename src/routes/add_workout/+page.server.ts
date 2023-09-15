

import { db } from '$lib/db/db';
import { users } from '$lib/db/schema';


/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({cookies, request}) => {
		const data = await request.formData()
	}
};