<script lang="ts">
	import type { ExerciseRoutineWithExercise } from '$lib/db/schema';

	export let current_exercise: ExerciseRoutineWithExercise;
	export let exercise: number;
	export let form: any;
</script>

{#if current_exercise.type == 'Weight'}
	<div class="text-3xl">
		{current_exercise.weight}
		{current_exercise.weight_units} <span>x</span>
		{current_exercise.reps}
	</div>
{:else if current_exercise.type == 'Duration'}
	<div class="text-5xl">
		{current_exercise.duration}
		{current_exercise.duration_units}
	</div>
{:else}
	<div class="flex flex-row justify-center items-center">
		<input class="text-3xl w-10" type="number" value={current_exercise.distance} />
		<div>
			{current_exercise.distance_units}
		</div>
	</div>
{/if}
