<script lang="ts">
	import { Chart } from 'chart.js';
	import type { ExerciseLogWithExercises, ExerciseRoutine } from '$lib/db/schema';
	import { onMount } from 'svelte';
	import { calcOneRepMax } from '../../../helpers/rep_max';
	import BarChart from './BarChart.svelte';

	export let log_data: ExerciseLogWithExercises;

	let data: number[] = [];
	let labels: string[] = [];
	for (let i = 0; i < log_data.weight.length; i++) {
		const reps = log_data.reps[i];
		const weight = log_data.weight[i];
		if (reps && weight) {
			//@ts-ignore
			data.push(calcOneRepMax(weight, reps));
			labels.push(`${i + 1}`);
		}
	}

	let average = data.reduce((a, b) => a + b) / data.length;


</script>

<BarChart data={data} labels={labels} />
<div class="text-right">Avg: {average}</div>


<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
