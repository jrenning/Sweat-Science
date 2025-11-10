<script lang="ts">
	import { Chart } from 'chart.js';
	import type { ExerciseLogWithExercises, ExerciseRoutine } from '$lib/db/schema';
	import { onMount } from 'svelte';
	import { calcOneRepMax } from '../../../helpers/rep_max';
	import BarChart from './BarChart.svelte';

	interface Props {
		log_data: ExerciseLogWithExercises;
	}

	let { log_data }: Props = $props();

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
		else if (reps) {
			data.push(0)
			labels.push(`${i + 1}`);
		}
	}
	console.log(data)
	let average = Math.round((data.reduce((a, b) => a + b) / data.length)*100) / 100;


</script>

<BarChart data={data} labels={labels} />
<div class="text-right mr-2">Avg: {average}</div>


<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
