import { db } from "$lib/db/db"
import { users } from "$lib/db/schema"

type MainPageData = {
    content: string
}
/** @type {import('./$types').PageLoad} */
export async function load({content}: MainPageData) {
    return {
        data: await db.select().from(users) 
    }
}