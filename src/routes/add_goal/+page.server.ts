import { superValidate } from "sveltekit-superforms/client";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { insertGoalSchema } from "$lib/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { addGoal } from "$lib/db/mutations/goals";
import { zod4 } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = await locals.getSession();
    // pass in workout plan id
    // TODO pass in param for id
    const user_id = session?.user?.id ? session.user.id : '';
    const goalForm = await superValidate(zod4(insertGoalSchema))

    return {goalForm}
}

export const actions: Actions = {
    add_goal: async ({ request, locals, url }) => {
        const goalForm = await superValidate(request,zod4(insertGoalSchema));
        const session = await locals.getSession();
        const user_id = session?.user?.id ? session.user.id : '';
        goalForm.data.user_id = user_id
        if (!goalForm.valid) {
                return fail(400, { goalForm});
        }
        await addGoal(goalForm.data)
        redirect(303, '/');
    }
}