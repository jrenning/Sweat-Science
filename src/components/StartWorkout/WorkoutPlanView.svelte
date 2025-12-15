<script lang="ts">
	import type { WorkoutPlan, WorkoutRoutineWithExercises } from '$lib/db/schema';
	import NewActiveCard from '../ActiveWorkout/NewActiveCard.svelte';
	import WorkoutPlanViewCard from './WorkoutPlanViewCard.svelte';

	import WorkoutViewCard from './WorkoutViewCard.svelte';



	interface Props {
		workout_plans: WorkoutPlan[]
	}

	let { workout_plans }: Props = $props();
</script>

<div class="flex justify-center items-center">


	<div
		class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10"
	>	
		{#each workout_plans as workout_plan}
			<WorkoutPlanViewCard {workout_plan} />
		{/each}
	</div>
</div>