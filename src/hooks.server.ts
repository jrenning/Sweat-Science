import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/db/db';
import type { Handle } from '@sveltejs/kit';

// export const trpcHandle: Handle = createTRPCHandle({ router, createContext });
export const {handle, signIn, signOut} = SvelteKitAuth(async (event) => {
	const authOptions = {
		adapter: DrizzleAdapter(db),
		providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
		callbacks: {
			async session({ session, user }) {
				if (session.user) {
					session.user.id = user.id;
				}
				return Promise.resolve(session);
			}
		}
	};
	return authOptions;
});
