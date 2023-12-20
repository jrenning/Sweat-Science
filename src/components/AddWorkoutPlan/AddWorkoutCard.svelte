<script lang="ts">
	import type { WorkoutRoutineWithExercises } from "$lib/db/schema";

    export let workout: WorkoutRoutineWithExercises

</script>

<div class="card rounded-md shadow-md p-4 flex flex-col space-y-6 bg-surface-300">
    <div class="font-semibold text-lg">{workout.name}</div>

    <div>{workout.exercises.length} Exercises</div>


</div>