<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	interface Props {
		data: number[];
		labels: string[];
	}

	let { data, labels }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart;



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
						data,
						backgroundColor: 'rgba(59, 130, 246, 0.75)',
						borderRadius: 6,
						barThickness: 18
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						intersect: false,
						mode: 'index'
					}
				},
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							maxRotation: 0,
							autoSkip: true
						}
					},
					y: {
						grid: {
							color: 'rgba(0,0,0,0.05)'
						},
						min: Math.min(...data) - 5
					}
				}
			}
		});
	});
</script>

<!-- Card container -->
<div class="rounded-xl bg-transparent p-4">
	<h3 class="text-sm font-semibold text-gray-700 mb-3">
		Rep Max
	</h3>

	<!-- Horizontal scroll area -->
	<div class="overflow-x-auto">
		<div style={`width: full; height: 200px;`}>
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
