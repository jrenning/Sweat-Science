<script lang="ts">
	import type { WorkoutLogWithExercises } from "$lib/db/schema";



export let workouts: WorkoutLogWithExercises[]

</script>

<div class="flex flex-col space-y-4">
    {#each workouts as workout}

    <div class="flex flex-row space-x-6 rounded-md variant-outline-secondary mx-4 p-4">

    <div>
        <div class="font-semibold">{workout.name ? workout.name : "Unnamed Workout"}</div>
        <div>{workout.created_at.toDateString()}</div>
    </div>

    </div>

    {/each}


</div>