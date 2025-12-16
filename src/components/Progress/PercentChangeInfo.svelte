<script lang="ts">
	import { DaysOfWeek, type ExerciseLogWithExercises } from '$lib/db/schema';
	import { getPercentChangeOverTime } from '../../helpers/datetime';
	import { calcAverageMax } from '../../helpers/rep_max';
	import PercentChangeSnippet from './PercentChangeSnippet.svelte';

	interface Props {
		current_data?: ExerciseLogWithExercises;
		exercise_data: ExerciseLogWithExercises[];
	}

	let { exercise_data, current_data }: Props = $props();

	let data = exercise_data.map((exercise) => exercise.estimated_max).reverse();
	let average_data = exercise_data
		.map((exercise) => calcAverageMax(exercise.weight, exercise.reps))
		.reverse();
	let dates = exercise_data.map((exercise) => exercise.created_at).reverse();

	let d = current_data?.created_at;

	let yearChange = $state(0);
	let quarterChange = $state(0);
	let monthChange = $state(0);
	let lastChange = $state(0);

	if (current_data) {
		yearChange = getPercentChangeOverTime(average_data, dates, 'Year', d);
		quarterChange = getPercentChangeOverTime(average_data, dates, 'Quarter', d);
		monthChange = getPercentChangeOverTime(average_data, dates, 'Month', d);
		lastChange = getPercentChangeOverTime(average_data, dates, 'Last Performed', d);
	} else {
		yearChange = getPercentChangeOverTime(average_data, dates, 'Year');
		quarterChange = getPercentChangeOverTime(average_data, dates, 'Quarter');
		monthChange = getPercentChangeOverTime(average_data, dates, 'Month');
		lastChange = getPercentChangeOverTime(average_data, dates, 'Last Performed');
	}
</script>

<div class="max-w-4xl mx-auto mt-6">
	<h3 class="text-lg font-semibold text-center text-gray-900 mb-4">Progress Over Time</h3>

	<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
		<PercentChangeSnippet value={yearChange} name="Year" />
		<PercentChangeSnippet value={quarterChange} name="Quarter" />
		<PercentChangeSnippet value={monthChange} name="Month" />
		<PercentChangeSnippet value={lastChange} name="Last" />
	</div>
</div>
