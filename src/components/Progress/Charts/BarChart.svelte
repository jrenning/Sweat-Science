<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';


	interface Props {
		data: number[];
		labels: string[];
	}

	let { data, labels }: Props = $props();
	let ctx;
	let canvas: HTMLCanvasElement = $state();



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
	<div class={`w-[365px] overflow-x-scroll h-[150px] flex justify-center`}>
		<canvas bind:this={canvas}></canvas>
	</div>
	
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>
