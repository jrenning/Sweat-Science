<script lang="ts">
	import { goto } from '$app/navigation';
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { popup } from '@skeletonlabs/skeleton';
	import AddWorkoutCard from '../../../components/AddWorkoutPlan/AddWorkoutCard.svelte';
	import BackButton from '../../../components/UI/Buttons/BackButton.svelte';
	import FormButton from '../../../components/UI/Buttons/FormButton.svelte';
	import type { PageData } from './$types';
	import AddWorkoutOptions from '../../../components/Popups/AddWorkoutOptions.svelte';

	export let data: PageData;
</script>

<div>
	<div class="flex justify-evenly">
		<BackButton link="/add_workout_plan?page=2" />
		<div class="italic font-semibold text-2xl">Day {data.day}</div>
		<div />
	</div>
	{#if data.workouts}
	<div class="space-y-6">
		<h2 class="font-semibold text-2xl mx-4">Workouts</h2>
		{#each data.workouts as workout}
			<AddWorkoutCard {workout} day={data.day} />
		{/each}
	</div>
	{/if}
	<div class="flex justify-center mt-10">
		<button
			use:popup={{
				event: 'click',
				target: 'workoutAddOptions',
				placement: 'bottom'
			}}
			class="btn rounded-md shadow-md bg-surface-500 text-white font-semibold"
		>Add Workout</button>
		<AddWorkoutOptions plan_id={data.plan_id} day={data.day} />
	</div>
</div>
