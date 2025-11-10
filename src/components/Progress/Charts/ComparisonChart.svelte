<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { ExerciseLogWithExercises } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import { calcOneRepForWholeExercise, calculateOneRepFromArray } from '../../../helpers/rep_max';

	export let exercise_data: ExerciseLogWithExercises;
    export let comparison_data: ExerciseLogWithExercises

    console.log(comparison_data)
    console.log(exercise_data)
	let data = calcOneRepForWholeExercise(exercise_data.weight, exercise_data.reps)
    let last_data = calcOneRepForWholeExercise(comparison_data.weight, comparison_data.reps)
	let labels = []
    for (let i=0; i<data.length; i++) {
        labels.push(`${i + 1}`);
    }

	let ctx;
	let canvas: HTMLCanvasElement;

    let combined_data = data.concat(last_data).filter((a)=> a > 0)

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
						},
						{
							label: "Last Rep Max",
							data: last_data
						}
					]
				},
				options: {
					scales: {
						y: {
							//@ts-ignore
							min: Math.min(...combined_data)-5
						}
					}
				}
			});
		}
	});


</script>


<div class="relative">
	<div class={`w-[365px] overflow-x-scroll flex justify-center`}>
		<canvas bind:this={canvas} width={32} height={32}/>
	</div>
	
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>