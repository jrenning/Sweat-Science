<script lang="ts">
	import { goto } from '$app/navigation';
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';

	export let workout: WorkoutRoutineWithExercises;
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const exercisePopup: PopupSettings = {
		event: "click",
		target: `exercisePopup${workout.name}`
	}
</script>

<div
	class="flex-grow-0 flex-shrink-0 md:space-y-10 space-y-4 flex-auto rounded-md bg-red-100 dark:bg-red-300 border border-black shadow-md md:w-[300px] w-[250px] h-[250px] md:h-[300px]"
>
	<div class="flex justify-center items-center">
		<h2 class="md:text-4xl text-2xl font-semibold mt-2">{workout.name}</h2>
	</div>
	<div class="flex justify-center items-center mt-2">
		<button class="badge md:text-lg text-sm variant-filled-surface" use:popup={exercisePopup}>
			{workout.exercises.length} Exercises
		</button>
			{#if workout.exercises.length > 0}
		<div class="card p-2" data-popup={`exercisePopup${workout.name}`}>
			<ol class="list mx-2 mt-2">
				{#each workout.exercises as exercise, index}
					<li>
						<span class="rounded-full variant-filled-secondary px-2 py-1">{index + 1}.</span>
						<span class="flex-auto text-md">{exercise.exercise_routine.exercise.name}</span>
					</li>
				{/each}
			</ol>
		</div>
	{/if}
	</div>
	<div class="flex justify-center items-center mt-8">
		<button
			class="btn-md variant-filled-primary rounded-md shadow-md"
			on:click={() => goto(`/active_workout/${workout.id}`)}>Start workout</button
		>
	</div>

</div>
