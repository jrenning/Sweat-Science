import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {

    // set user theme 
    



    return {
        session: await event.locals.getSession()
    }
}