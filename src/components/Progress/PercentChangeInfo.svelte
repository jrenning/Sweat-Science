<script lang="ts">
	import { DaysOfWeek, type ExerciseLogWithExercises } from '$lib/db/schema';
	import { getPercentChangeOverTime } from '../../helpers/datetime';
	import { calcAverageMax } from '../../helpers/rep_max';
	import PercentChangeSnippet from './PercentChangeSnippet.svelte';

	export let exercise_data: ExerciseLogWithExercises[];
	let data = exercise_data.map((exercise) => exercise.estimated_max).reverse();
	let average_data = exercise_data
		.map((exercise) => calcAverageMax(exercise.weight, exercise.reps))
		.reverse();
	let dates = exercise_data.map((exercise) => exercise.created_at).reverse();

	let yearChange = getPercentChangeOverTime(average_data, dates, 'Year');
	let quarterChange = getPercentChangeOverTime(average_data, dates, 'Quarter');
	let monthChange = getPercentChangeOverTime(average_data, dates, 'Month');
	let lastChange = getPercentChangeOverTime(average_data, dates, "Last Performed")
</script>

<div class="flex space-x-10 justify-center">
	<PercentChangeSnippet value={yearChange} name="Year" />
    <PercentChangeSnippet value={quarterChange} name="Quarter" />
    <PercentChangeSnippet value={monthChange} name="Month" />
	<PercentChangeSnippet value={lastChange} name="Last" />
</div>
