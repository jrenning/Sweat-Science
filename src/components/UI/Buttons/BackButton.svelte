<script lang="ts">
	export let link: string | undefined = undefined;
</script>

{#if link}
<a href={link}><button class="text-2xl rotate-180">&#x279F;</button></a>
{:else}
<button on:click={()=> history.back()}><button class="text-2xl rotate-180">&#x279F;</button></button>
{/if}
