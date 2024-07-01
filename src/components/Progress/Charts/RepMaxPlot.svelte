<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';

	export let exercise_data: ExerciseLogWithExercises[];
	let data = exercise_data.map((exercise) => exercise.estimated_max).reverse();
	let labels = exercise_data.map((exercise) => prettifyDate(exercise.created_at)).reverse();

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
							data: data
						}
					]
				},
				options: {
					scales: {
						y: {
							//@ts-ignore
							min: Math.min(...data)-5
						}
					}
				}
			});
		}
	});
</script>

<div class="relative">
	<div class="w-[365px] overflow-x-scroll">
		<canvas bind:this={canvas} width={32} height={32} />
	</div>
	
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>
