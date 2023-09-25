<script lang="ts">
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
import HorizontalScrollBox from './HorizontalScrollBox.svelte';
import WorkoutViewCard from './WorkoutViewCard.svelte';



export let workouts: WorkoutRoutineWithExercises[]
</script>

<HorizontalScrollBox>
		{#each workouts as workout}
		<WorkoutViewCard workout={workout}/>
		{/each}
</HorizontalScrollBox>

