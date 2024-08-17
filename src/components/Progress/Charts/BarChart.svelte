<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';


	export let data: number[]
	export let labels: string[]
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
	<div class={`w-[365px] overflow-x-scroll h-[150px] flex justify-center`}>
		<canvas bind:this={canvas} />
	</div>
	
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>
