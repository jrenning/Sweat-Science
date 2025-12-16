<script lang="ts">
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import ComparisonChart from '../Charts/ComparisonChart.svelte';
	import ExerciseLogEntryChart from '../Charts/ExerciseLogEntryChart.svelte';
	import PercentChangeInfo from '../PercentChangeInfo.svelte';
	import RankInfo from '../RankInfo.svelte';
	import ExerciseLogEntry from './ExerciseLogEntry.svelte';

	interface Props {
		log: ExerciseLogWithExercises;
		type: 'Date' | 'Exercise';
		chart?: boolean;
		comparison_data?: ExerciseLogWithExercises[];
	}

	let { log, type, chart = true, comparison_data = [] }: Props = $props();

	// get last performed time before current item
	function findMatchingIdx() {
		for (let i = 0; i < comparison_data.length; i++) {
			if (comparison_data[i].id == log.id) {
				return i;
			}
		}
	}
	//@ts-ignore
	let last_idx = findMatchingIdx() + 1;

</script>

<div class={'flex  flex-col justify-center flex-center space-y-6 '}>
	{#if type == 'Date'}
		<a href={`/progress/workouts/${log.workout_log_id}`}><div class="underline mx-2 text-xl font-bold">{prettifyDate(log.created_at)}</div></a>
	{:else if type == 'Exercise'}
		<div class=" mx-2 text-xl font-bold">{log.exercise.name}</div>
	{/if}
	<ExerciseLogEntry log_entry={log} />

	{#if comparison_data.length > 1 && last_idx < comparison_data.length}
		{#if log.exercise.category === 'Strength' && chart}
			<ComparisonChart exercise_data={log} comparison_data={comparison_data[last_idx]} />
		{/if}

		<!-- // if there is a point to compare against (2 total) -->
		<PercentChangeInfo exercise_data={comparison_data} current_data={log}/>
		<RankInfo log={log} last_performed={comparison_data[last_idx]}/>
	{:else if log.exercise.category === 'Strength' && chart}
		<ExerciseLogEntryChart log_data={log} />
	{/if}
</div>
