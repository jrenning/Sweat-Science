import type { RequestHandler } from '@sveltejs/kit';
import  webPush from "web-push"
import { WEB_PUSH_EMAIL, WEB_PUSH_PRIVATE_KEY } from '$env/static/private';
import { PUBLIC_WEB_PUSH_PUBLIC_KEY } from '$env/static/public';

webPush.setVapidDetails(
	`mailto:${WEB_PUSH_EMAIL}`,
	PUBLIC_WEB_PUSH_PUBLIC_KEY,
	WEB_PUSH_PRIVATE_KEY
);
export const POST: RequestHandler = async (event) => {
	const subscription = await event.request.json();
    console.log(subscription)
	await webPush
		.sendNotification(
			subscription.pushSubscription,
			JSON.stringify({
				title: 'Hey Jack!',
				message: 'How are your workouts going today?'
			})
		)
		.then((response: any) => {
			console.log('here');
			return new Response(JSON.stringify({ success: true }), {
				status: 200
			});
		})
		.catch((err: any) => {
			return new Response(JSON.stringify({ error: err }), {
				status: 500
			});
		});
	return new Response(JSON.stringify({ success: true }), {
		status: 200
	});
};
