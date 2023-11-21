import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/db/db';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

export const trpcHandle: Handle = createTRPCHandle({ router, createContext });
export const authHandle = SvelteKitAuth({
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
});

export const handle = sequence(trpcHandle, authHandle)
