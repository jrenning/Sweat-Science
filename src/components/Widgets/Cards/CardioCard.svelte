<script lang="ts">
	import type { ExerciseLogWithExercises, ExerciseRoutineWithExercise } from "$lib/db/schema";
	import ClockIcon from "../../Icons/ClockIcon.svelte";
	import RulerIcon from "../../Icons/RulerIcon.svelte";

    export let exercise: ExerciseLogWithExercises

    

</script>

<div class="flex-grow-0 flex-shrink-0 flex-auto dark:text-black bg-tertiary-300 w-[160px] h-[150px] p-2 border border-white rounded-md shadow-md">

<div class="font-semibold">{exercise.exercise.name}</div>
<div class="mt-4 space-y-4">
<div class="flex flex-row space-x-4 items-center">
    <div class="h-5 w-5"><RulerIcon /></div>
<div>{exercise.distance} {exercise.distance_units}</div>
</div>
{#if exercise.duration.length > 0}
<div class="flex flex-row space-x-4">
    <div class="h-5 w-5"><ClockIcon /></div>
<div>{exercise.duration} {exercise.duration_units}</div>
</div>
{/if}

</div>


</div>