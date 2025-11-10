<script lang="ts">
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import ExerciseLogFull from './ExerciseLogFull.svelte';

	export let logs: ExerciseLogWithExercises[];

	export let type: 'Date' | 'Exercise';

	export let chart = true

	export let comparison_data: ExerciseLogWithExercises[][] = []
</script>

<div class="flex flex-col mt-6">
	{#each logs as log, i}
	{#if comparison_data}
		<ExerciseLogFull log={log} type={type} chart={chart} comparison_data={comparison_data[i]}/>
	{:else}
		<ExerciseLogFull log={log} type={type} chart={chart}/>
	{/if}
	{/each}
</div>
