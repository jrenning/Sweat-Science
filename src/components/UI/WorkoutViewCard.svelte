
<script lang="ts">
	import type { WorkoutRoutineWithExercises } from "$lib/db/schema";


    export let workout: WorkoutRoutineWithExercises
</script>




<div class="flex-grow-0 flex-shrink-0 flex-auto rounded-md bg-red-100 border border-black shadow-md w-[200px] h-[200px]">
    <div class="flex justify-center items-center">
    <h2 class="text-lg font-semibold">{workout.name}</h2>
        </div>
    <div class="flex justify-center items-center mt-2">
    <div class="badge variant-filled-surface">
        {workout.exercises.length} Exercises
    </div>
    </div>
    <div class="card overflow-y-scroll">
        <ol class="list mx-2 mt-2">
            {#each workout.exercises as exercise, index}
                <li>
                    <span class="rounded-full variant-filled-secondary px-2 py-1">{index+1}.</span>
                    <span class="flex-auto text-md">{exercise.exercise_routine.exercise.name}</span>
                </li>
            {/each}
        </ol>
    </div>
</div>