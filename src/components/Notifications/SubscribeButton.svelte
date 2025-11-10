<script lang="ts">
    import { PUBLIC_WEB_PUSH_PUBLIC_KEY } from '$env/static/public';
	const base64ToUint8Array = (base64: string) => {
		const padding = '='.repeat((4 - (base64.length % 4)) % 4);
		const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

		const rawData = window.atob(b64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	};

	const Subscribe = async () => {
		const status = await Notification.requestPermission();
		if (status == 'granted') {
			const options = {
				userVisibleOnly: true,
				applicationServerKey: base64ToUint8Array(
					//@ts-ignore
					PUBLIC_WEB_PUSH_PUBLIC_KEY
				)
			};
			navigator.serviceWorker.ready.then((reg) => {

				reg.pushManager
					.subscribe(options)
					.then( async (pushSubscription) => {
						const result = await fetch('/api/subscribe', {
							method: 'POST',
							headers: {
								'Content-type': 'application/json'
							},
							body: JSON.stringify(pushSubscription)
						});
					})
					.catch((err) => {
						console.error(err);
						alert(err);
					});
			});
		} else {
			console.error('Permission was weird');
		}
	};
</script>

<div class="mt-6 flex items-center justify-center">
	<button
		onclick={() => Subscribe()}
		class="mb-2 px-4 py-2 rounded-md bg-blue-300 text-xl font-semibold hover:bg-blue-100"
	>
		Test Notifications
	</button>
</div>
