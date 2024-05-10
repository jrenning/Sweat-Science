<script lang="ts">
	import '../app.postcss';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import Footer from '../components/UI/Footer.svelte';
	import { LightSwitch, Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { currentTheme } from '../stores/theme';
	import { browser } from '$app/environment';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// init skeleton
	initializeStores();

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	let todayString = mm + '/' + dd + '/' + yyyy;


	$: {if (browser) {
		if ($page.data.theme) {
			$currentTheme = $page.data.theme
		}
		document.body.setAttribute("data-theme", $currentTheme)
	}}
</script>

<Modal />
<Toast />
<header
	class="flex flex-row items-center mt-6 justify-around mb-10 relative text-center w-full bg-surface-50 dark:bg-surface-900"
>
	{#if $page.data.session}
		<div class="flex flex-row justify-center space-x-5">
			<div
				class="rounded-full w-10 h-10 font-bold bg-gray-300 flex justify-center items-center text-black text-2xl"
			>
				J
			</div>
			<div class="flex justify-center font-semibold items-center">Jack Renning</div>
		</div>
		<!-- <button
			on:click={() => signOut()}
			class="rounded-md bg-primary-500 text-black shadow-md px-2 py-1">Sign out</button
		> -->
		<div />
	{:else}
		<button on:click={() => signIn('google')} class="rounded-md bg-primary-500 shadow-md px-2 py-1"
			>Sign In with Google</button
		>
	{/if}

	<div class="flex flex-col">
		<div class="text-right font-semibold text-gray-400 italic">Today</div>
		<div class="font-semibold text-xl">
			{todayString}
		</div>
	</div>
</header>

<slot />

<Footer />
