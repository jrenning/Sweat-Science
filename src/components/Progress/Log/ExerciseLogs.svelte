<script lang="ts">
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import ExerciseLogFull from './ExerciseLogFull.svelte';




	interface Props {
		logs: ExerciseLogWithExercises[];
		type: 'Date' | 'Exercise';
		chart?: boolean;
		comparison_data?: ExerciseLogWithExercises[][];
	}

	let {
		logs,
		type,
		chart = true,
		comparison_data = []
	}: Props = $props();
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
