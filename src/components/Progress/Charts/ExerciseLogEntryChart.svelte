<script lang="ts">
	import { Chart } from 'chart.js';
	import type { ExerciseLogWithExercises, ExerciseRoutine } from '$lib/db/schema';
	import { onMount } from 'svelte';
	import { calcOneRepMax } from '../../../helpers/rep_max';

	export let log_data: ExerciseLogWithExercises;

	let data: number[] = [];
	let labels: number[] = [];
	for (let i = 0; i < log_data.weight.length; i++) {
		const reps = log_data.reps[i];
		const weight = log_data.weight[i];
		if (reps && weight) {
			//@ts-ignore
			data.push(calcOneRepMax(weight, reps));
			labels.push(i + 1);
		}
	}

	let average = data.reduce((a, b) => a + b) / data.length;

	let ctx;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (ctx) {
			var chart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Rep Max',
							data: data,
							backgroundColor: '#6495ED'
						}
					]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						y: {
							min: Math.min(...data) - 5
						},
						x: {
							display: false
						}
					}
				}
			});
		}
	});
</script>

<div class="relative">
	<div class="w-[365px] flex justify-center md:w-[550px] h-[100px] overflow-x-scroll">
		<canvas class="bg-transparent" bind:this={canvas} />
	</div>
	<div class="text-right">Avg: {average}</div>
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
