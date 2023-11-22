<script lang="ts">
	import type { ExerciseLogWithExercises, ExerciseRoutineWithExercise } from '$lib/db/schema';
	import HandPointIcon from '../../Icons/HandPointIcon.svelte';
	import WeightIcon from '../../Icons/WeightIcon.svelte';

	export let exercise: ExerciseLogWithExercises
</script>

<div
	class=" flex-grow-0 flex-shrink-0 flex-auto dark:text-black bg-primary-300 w-[160px] h-[150px] p-2 border overflow-y-scroll border-white rounded-md shadow-md"
>
	<div class="font-semibold">{exercise.exercise.name}</div>
	<div class="mt-4 space-y-4">
		<div class="grid grid-cols-2 gap-1 justify-center items-center">
            {#if exercise.weight}
			<div class="flex justify-end flex-col text-right">
				{#each exercise.weight as weight}
					<div>{weight} {exercise.weight_units} x </div>
				{/each}
			</div>
            {/if}
            {#if exercise.reps}
			<div class="flex justify-start flex-col">
				{#each exercise.reps as rep}
					<div>{rep}</div>
				{/each}
			</div>
            {/if}
		</div>
	</div>
</div>
