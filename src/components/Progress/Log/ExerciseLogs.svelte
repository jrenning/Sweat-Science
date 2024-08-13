<script lang="ts">
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import ExerciseLogEntryChart from '../Charts/ExerciseLogEntryChart.svelte';
	import ExerciseLogEntry from './ExerciseLogEntry.svelte';

	export let logs: ExerciseLogWithExercises[];

	export let type: 'Date' | 'Exercise';
</script>

<div class="flex flex-col space-y-6">
	{#each logs as log}
		{#if type == 'Date'}
			<div class=" mx-2 text-xl font-bold">{prettifyDate(log.created_at)}</div>
		{:else if type == 'Exercise'}
			<div class=" mx-2 text-xl font-bold">{log.exercise.name}</div>
		{/if}
		<ExerciseLogEntry log_entry={log} />
		{#if log.exercise.category === "Strength"}
		<ExerciseLogEntryChart log_data={log} />
		{/if}
	{/each}
</div>
