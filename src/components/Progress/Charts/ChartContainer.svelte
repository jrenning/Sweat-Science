
<canvas id="chart_1" class="w-full h-[300px]"></canvas>


<script lang="ts">
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import ScatterPlot from './ScatterPlot.svelte';
    import Chart from 'chart.js/auto';

	export let exerciseLogs: ExerciseLogWithExercises[];

	type Point = {
		x: number;
		y: number;
	};
	let points: Point[] = [];

	for (let i = 0; i < exerciseLogs.length; i++) {
		points.push({ x: i + 1, y: Math.max(...exerciseLogs[i].weight) });
	}

	const ctx = document.getElementById('chart_1');
    //@ts-ignore
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [
				{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					borderWidth: 1
				}
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
</script>


