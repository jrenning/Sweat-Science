<script lang="ts">

	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import { calcAverageMax } from '../../../helpers/rep_max';
	import BarChart from './BarChart.svelte';

	export let exercise_data: ExerciseLogWithExercises[];
	let data = exercise_data.map((exercise) => calcAverageMax(exercise.weight, exercise.reps)).reverse();
	let labels = exercise_data.map((exercise) => prettifyDate(exercise.created_at)).reverse();


</script>

<BarChart data={data} labels={labels} />
