<script lang="ts">
	import { DaysOfWeek, type ExerciseLogWithExercises } from '$lib/db/schema';
	import PercentChangeSnippet from './PercentChangeSnippet.svelte';
	import RankInfoSnippet from './RankInfoSnippet.svelte';

	interface Props {
		log: ExerciseLogWithExercises;
		last_performed: ExerciseLogWithExercises;
	}

	let { log, last_performed }: Props = $props();

	let last_month = new Date(log.created_at);
	let last_quarter = new Date(log.created_at);
	let last_year = new Date(log.created_at);
	// This is OVERALL of all workouts that were done before or after this one
	// the rest are in context of the workout, i.e in the year that workout was performed
	let overall_time = new Date();

	last_year.setFullYear(last_year.getFullYear() - 1);
	last_quarter.setMonth(last_quarter.getMonth() - 3);
	last_month.setMonth(last_month.getMonth() - 1);
	overall_time.setFullYear(last_year.getFullYear() - 100);
</script>

<div class="max-w-4xl mx-auto mt-8 space-y-6">
	<h3 class="text-lg font-semibold text-gray-900 text-center">
		Ranking Performance
	</h3>

	<!-- Time-Based Rankings -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
		<div class="rounded-xl border bg-white p-4 shadow-sm text-center">
			<div class="text-xs font-medium text-gray-500 mb-2">Year</div>
			<RankInfoSnippet
				id={log.id}
				exercise_id={log.exercise_id}
				all_time={false}
				after_date={last_year}
			/>
		</div>

		<div class="rounded-xl border bg-white p-4 shadow-sm text-center">
			<div class="text-xs font-medium text-gray-500 mb-2">Quarter</div>
			<RankInfoSnippet
				id={log.id}
				exercise_id={log.exercise_id}
				all_time={false}
				after_date={last_quarter}
			/>
		</div>

		<div class="rounded-xl border bg-white p-4 shadow-sm text-center">
			<div class="text-xs font-medium text-gray-500 mb-2">Month</div>
			<RankInfoSnippet
				id={log.id}
				exercise_id={log.exercise_id}
				all_time={false}
				after_date={last_month}
			/>
		</div>

		<div class="rounded-xl border bg-white p-4 shadow-sm text-center">
			<div class="text-xs font-medium text-gray-500 mb-2">Last</div>
			<RankInfoSnippet
				id={log.id}
				exercise_id={log.exercise_id}
				all_time={false}
				after_date={last_performed.created_at}
			/>
		</div>
	</div>

	<!-- All Time Ranking -->
	<div class="flex items-center justify-center gap-4 rounded-xl border bg-gray-50 p-4">
		<span class="text-sm font-medium text-gray-600">All-Time Rank</span>
		<RankInfoSnippet
			id={log.id}
			exercise_id={log.exercise_id}
			all_time={true}
			after_date={overall_time}
		/>
	</div>
</div>