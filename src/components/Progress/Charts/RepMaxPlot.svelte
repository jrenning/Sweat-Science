<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import { calcAverageMax } from '../../../helpers/rep_max';
	import { cssVar } from '../../../helpers/colors';

	interface Props {
		exercise_data: ExerciseLogWithExercises[];
	}

	let { exercise_data }: Props = $props();

	const DESKTOP_WINDOW = 12;
	const MOBILE_WINDOW = 10;

	const BAR_WIDTH_DESKTOP = 40;
	const BAR_WIDTH_MOBILE = 28;

	let repMaxData = exercise_data.map((e) => e.estimated_max).reverse();
	let avgRepMaxData = exercise_data.map((e) => calcAverageMax(e.weight, e.reps)).reverse();
	let labels = exercise_data.map((e) => prettifyDate(e.created_at)).reverse();

	let canvas: HTMLCanvasElement;
	let scrollContainer: HTMLDivElement;
	let chart: Chart;

	let windowSize = MOBILE_WINDOW;
	let barWidth = BAR_WIDTH_MOBILE;

	if (typeof window !== 'undefined' && window.innerWidth >= 640) {
		windowSize = DESKTOP_WINDOW;
		barWidth = BAR_WIDTH_DESKTOP;
	}

	const chartWidth = Math.max(labels.length * barWidth, windowSize * barWidth);
	const primaryColor = cssVar('--color-surface-300');
	const secondaryColor = cssVar('--color-secondary-300');

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Rep Max',
						data: repMaxData,
						backgroundColor: primaryColor,
						borderRadius: 6,
						barThickness: 8
					},
					{
						label: 'Average Rep Max',
						data: avgRepMaxData,
						backgroundColor: secondaryColor,
						borderRadius: 6,
						barThickness: 8
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				animation: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						mode: 'index',
						intersect: false
					}
				},
				scales: {
					x: {
						grid: { display: false }
					},
					y: {
						grid: { color: 'rgba(0,0,0,0.05)' },
						min: Math.min(...avgRepMaxData) - 5
					}
				}
			}
		});

		// Auto-scroll to most recent window
		requestAnimationFrame(() => {
			scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
		});
	});
</script>

<!-- Card -->
<div class="rounded-xl bg-transparent space-y-3 mt-6">
	<!-- Header row -->
	<!-- Header -->
	<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
		<!-- Legend -->
		<div class="flex items-center gap-4 text-xs text-gray-600">
			<div class="flex items-center gap-1">
				<span class="w-3 h-3 rounded bg-surface-300 shrink-0"></span>
				<span>Rep Max</span>
			</div>
			<div class="flex items-center gap-1">
				<span class="w-3 h-3 rounded bg-secondary-300/70 shrink-0"></span>
				<span>Avg</span>
			</div>
		</div>
	</div>

	<!-- Fixed window -->
	<div
		bind:this={scrollContainer}
		class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300"
		style={`max-width: ${windowSize * barWidth}px`}
	>
		<div style={`width: ${chartWidth}px; height: 280px`}>
			<canvas bind:this={canvas}></canvas>
		</div>
	</div>
	<!-- 
	<div class="text-xs text-gray-500 text-right">
		Scroll left to view older history
	</div> -->
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>
