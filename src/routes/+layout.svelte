<script>
	import '../app.postcss';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<header
	class="flex flex-row items-center justify-around shadow-md relative text-center w-full bg-red-300 h-[58px] mb-[10px]"
>	<div></div>
	<h1 class="text-3xl text-white">Workout Planner</h1>
	  {#if $page.data.session}
    <button on:click={() => signOut()} class="rounded-md bg-blue-200 shadow-md px-2 py-1">Sign out</button>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <button on:click={() => signIn("google")} class="rounded-md bg-blue-200 shadow-md px-2 py-1">Sign In with Google</button>
  {/if}
</header>

<slot />
