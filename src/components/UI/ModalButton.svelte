<script lang="ts">
	export let message: string;
	export let callback: () => void;
</script>

<button
	class="btn-sm variant-filled-surface shadow-md rounded-md text-md"
	on:click={() => callback}
>
	{message}
</button>
