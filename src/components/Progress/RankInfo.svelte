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

<div class="flex flex-col justify-center items-center">
	<div class="grid gap-10 grid-cols-4 justify-center">
		<RankInfoSnippet
			id={log.id}
			exercise_id={log.exercise_id}
			all_time={false}
			after_date={last_year}
		/>
		<RankInfoSnippet
			id={log.id}
			exercise_id={log.exercise_id}
			all_time={false}
			after_date={last_quarter}
		/>
		<RankInfoSnippet
			id={log.id}
			exercise_id={log.exercise_id}
			all_time={false}
			after_date={last_month}
		/>
		<RankInfoSnippet
			id={log.id}
			exercise_id={log.exercise_id}
			all_time={false}
			after_date={last_performed.created_at}
		/>
	</div>
	<div class="flex space-x-8 mt-6">
		<div>All Time:</div>
		<RankInfoSnippet
			id={log.id}
			exercise_id={log.exercise_id}
			all_time={true}
			after_date={overall_time}
		/>
	</div>
</div>
