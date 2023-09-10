import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/db/db';

export const handle = SvelteKitAuth({
    adapter: DrizzleAdapter(db),
	providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })]
});
