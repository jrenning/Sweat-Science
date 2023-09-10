<script>
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>SvelteKit Auth Example</h1>
<p>
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <span
        style="background-image: url('{$page.data.session.user.image}')"
        class="avatar"
      />
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <button on:click={() => signOut()} class="button">Sign out</button>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <button on:click={() => signIn("google")} class="rounded-md bg-blue-200 px-2 py-1">Sign In with Google</button>
  {/if}

  
</p>
<h1>{data.data[0].name}</h1>
