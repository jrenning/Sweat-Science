<script lang="ts">
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import NewActiveCard from '../ActiveWorkout/NewActiveCard.svelte';

	import WorkoutViewCard from './WorkoutViewCard.svelte';



	interface Props {
		workouts: WorkoutRoutineWithExercises[];
	}

	let { workouts }: Props = $props();
</script>

<div class="flex justify-center items-center">


	<div
		class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10"
	>	
		{#each workouts as workout}
			<WorkoutViewCard {workout} />
		{/each}
	</div>
</div>

