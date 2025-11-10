<!-- @migration-task Error while migrating Svelte code: `<button>` is invalid inside `<button>` -->
<script lang="ts">
	export let link: string | undefined = undefined;
</script>

{#if link}
<a href={link}><button class="text-2xl rotate-180">➟</button></a>
{:else}
<button on:click={()=> history.back()}><div class="text-2xl rotate-180">➟</div></button>
{/if}
