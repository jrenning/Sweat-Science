import type { RequestHandler } from '@sveltejs/kit';
import webPush from 'web-push';
import { WEB_PUSH_EMAIL, WEB_PUSH_PRIVATE_KEY } from '$env/static/private';
import { PUBLIC_WEB_PUSH_PUBLIC_KEY } from '$env/static/public';
import { getUserSubsscription } from '$lib/db/queries/users';

webPush.setVapidDetails(
	`mailto:${WEB_PUSH_EMAIL}`,
	PUBLIC_WEB_PUSH_PUBLIC_KEY,
	WEB_PUSH_PRIVATE_KEY
);

export const POST: RequestHandler = async (event) => {
	const session = await event.locals.getSession();
	const user_id = session?.user.id ? session.user.id : '';

	const {delay} = await event.request.json()

	const res = await getUserSubsscription(user_id);
	//@ts-ignore
	const subscription = res[0].subscription;
	console.log('notify sent');
	const notification_data = {
		delay: delay,
		subscription: subscription
	}
    const data = await fetch('https://notifyserver-production.up.railway.app/api/notification', {
			method: 'POST',
			body: JSON.stringify(notification_data),
			headers: {
				"Content-Type": "application/json"
			}
		});
	return data;
};
