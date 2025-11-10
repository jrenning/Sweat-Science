<script lang="ts">
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import ComparisonChart from '../Charts/ComparisonChart.svelte';
	import ExerciseLogEntryChart from '../Charts/ExerciseLogEntryChart.svelte';
	import PercentChangeInfo from '../PercentChangeInfo.svelte';
	import ExerciseLogEntry from './ExerciseLogEntry.svelte';

	export let log: ExerciseLogWithExercises;

	export let type: 'Date' | 'Exercise';

	export let chart = true;

	export let comparison_data: ExerciseLogWithExercises[] = [];

	// get last performed time before current item
	function findMatchingIdx() {
		for (let i = 0; i < comparison_data.length; i++) {
			if (comparison_data[i].id == log.id) {
				return i;
			}
		}
	}

    let last_idx = findMatchingIdx()+1

    console.log(last_idx)



</script>

<div class={'flex  flex-col justify-center flex-center space-y-6 '}>
	{#if type == 'Date'}
		<div class=" mx-2 text-xl font-bold">{prettifyDate(log.created_at)}</div>
	{:else if type == 'Exercise'}
		<div class=" mx-2 text-xl font-bold">{log.exercise.name}</div>
	{/if}
	<ExerciseLogEntry log_entry={log} />

	{#if comparison_data.length > 1 && last_idx < comparison_data.length}
		{#if log.exercise.category === 'Strength' && chart}
			<ComparisonChart
				exercise_data={log}
				comparison_data={comparison_data[last_idx]}
			/>
		{/if}

		<!-- // if there is a point to compare against (2 total) -->
		<PercentChangeInfo exercise_data={comparison_data} />
	{:else if log.exercise.category === 'Strength' && chart}
		<ExerciseLogEntryChart log_data={log} />
	{/if}
</div>
