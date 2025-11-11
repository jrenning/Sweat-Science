import { AUTH_SECRET, GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";
import { db } from "$lib/db/db";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { SvelteKitAuth } from "@auth/sveltekit";

export const {handle, signIn, signOut} = SvelteKitAuth(
    {
        secret: AUTH_SECRET,
        basePath: "/auth",
        trustHost: true,
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
    }
);