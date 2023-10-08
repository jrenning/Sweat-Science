<script lang="ts">
	import type { WorkoutLogWithExercises } from "$lib/db/schema";



export let workouts: WorkoutLogWithExercises[]

</script>

<div>
    {#each workouts as workout}

    <div class="flex flex-row space-x-6 rounded-md variant-outline-secondary p-4">

    <div>
        <div class="font-semibold">{workout.name}</div>
        <div>{workout.created_at.toDateString()}</div>
    </div>

    </div>

    {/each}


</div>