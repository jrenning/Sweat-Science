<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';


	export let workout: WorkoutRoutineWithExercises;
	import {
		popup,
		type PopupSettings,
	} from '@skeletonlabs/skeleton';
	import WorkoutOptions from "../Popups/WorkoutOptions.svelte"



	const exercisePopup: PopupSettings = {
		event: 'click',
		target: `exercisePopup${workout.name}`
	};
</script>

<div
	class="flex-grow-0 flex-shrink-0 flex-auto rounded-md bg-[#C65F5F] border border-black shadow-md md:w-[300px] w-[250px] h-[250px] md:h-[300px]"
>
	<div class="flex justify-end items-center mr-2 mt-2 space-x-1">
		<div
			class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"
			use:popup={{
				event: 'click',
				target: `exerciseOptions${workout.name}`,
				placement: 'bottom'
			}}
		/>
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black" />
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black" />
	</div>
	<WorkoutOptions name={workout.name} id={workout.id}/>

	<div class="h-[50%]" />
	<div class="flex text-black ml-4">
		<h2 class="md:text-4xl text-3xl font-bold align-bottom">{workout.name}</h2>
	</div>
	<div class="flex mt-2 ml-4">
		<div class="flex justify-between w-full">
			<div class=" justify-start">
				<button class="badge md:text-lg text-sm variant-filled-surface" use:popup={exercisePopup}>
					{workout.exercises.length} Exercises
				</button>
			</div>
			<div />
			<a href={`/active_workout/${workout.id}`}
				><button class="bg-secondary-500 px-4 mr-2 py-1 rounded-md shadow-md">&#x27A4;</button></a
			>
		</div>
		{#if workout.exercises.length > 0}
			<div class="card p-2" data-popup={`exercisePopup${workout.name}`}>
				<ol class="list mx-2 mt-2">
					{#each workout.exercises as exercise, index}
						<li>
							<span class="rounded-full variant-filled-secondary px-2 py-1">{index + 1}.</span>
							<span class="flex-auto text-md">{exercise.exercise.name}</span>
						</li>
					{/each}
				</ol>
			</div>
		{/if}
	</div>
</div>
