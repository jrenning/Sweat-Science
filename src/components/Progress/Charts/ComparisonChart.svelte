<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import { calcOneRepForWholeExercise, calculateOneRepFromArray } from '../../../helpers/rep_max';
	import { cssVar } from '../../../helpers/colors';

	interface Props {
		exercise_data: ExerciseLogWithExercises;
		comparison_data: ExerciseLogWithExercises;
	}

	let { exercise_data, comparison_data }: Props = $props();

	let data = calcOneRepForWholeExercise(exercise_data.weight, exercise_data.reps);
	let last_data = calcOneRepForWholeExercise(comparison_data.weight, comparison_data.reps);
	let labels = [];
	for (let i = 0; i < data.length; i++) {
		labels.push(`${i + 1}`);
	}

	let ctx;
	//@ts-ignore
	let canvas: HTMLCanvasElement = $state();

	let combined_data = data.concat(last_data).filter((a) => a > 0);
	const primaryColor = cssVar('--color-surface-300');
	const secondaryColor = cssVar('--color-secondary-300');

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (ctx) {
			var chart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Current Workout',
							data: data,
							backgroundColor: primaryColor,
							borderRadius: 6,
							barThickness: 16
						},
						{
							label: 'Previous Workout',
							data: last_data,
							backgroundColor: secondaryColor,
							borderRadius: 6,
							barThickness: 16
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							position: 'top',
							labels: {
								usePointStyle: true,
								pointStyle: 'rectRounded',
								font: {
									size: 11,
									weight: '500'
								}
							}
						},
						tooltip: {
							backgroundColor: '#111827',
							titleColor: '#fff',
							bodyColor: '#fff',
							padding: 10,
							cornerRadius: 6
						}
					},
					scales: {
						x: {
							grid: {
								display: false
							},
							ticks: {
								font: {
									size: 11
								}
							}
						},
						y: {
							grid: {
								color: 'rgba(0,0,0,0.05)'
							},
							ticks: {
								font: {
									size: 11
								}
							},
							min: Math.min(...combined_data) - 5
						}
					}
				}
			});
		}
	});
</script>

<div class="max-w-lg mx-auto">
	<div class="rounded-xl bg-transparent p-4">
		<!-- Header -->
		<div class="mb-4">
			<h3 class="text-sm font-semibold text-gray-900">Estimated Rep Max Comparison</h3>
		</div>

		<!-- Chart -->
		<div class="relative h-64">
			<canvas bind:this={canvas}></canvas>
		</div>
	</div>
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>
