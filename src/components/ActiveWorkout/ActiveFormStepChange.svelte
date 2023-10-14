<script lang="ts">
	export let exercise: number;
	export let exercise_total: number;
</script>

<div class="flex flex-row space-x-4">
	{#if exercise > 0}
		<button
			type="button"
			class="btn-md rounded-md variant-filled-primary shadow-md"
			on:click={() => (exercise -= 1)}>Previous</button
		>
	{/if}
	{#if exercise + 1 < exercise_total}
		<button
			type="button"
			class="btn-md rounded-md variant-filled-primary shadow-md"
			on:click={() => (exercise += 1)}>Next</button
		>
	{/if}
	{#if exercise + 1 == exercise_total}
		<button
			type="button"
			class="btn-md rounded-md variant-filled-secondary shadow-md"
			on:click={() => (exercise += 1)}>Finish</button
		>
	{/if}
</div>
