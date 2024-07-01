<script lang="ts">
	import WorkoutLogs from '../../components/Progress/Log/WorkoutLogs.svelte';
	import { calculateCalories } from '../../helpers/calories';
	import { firstDayOfWeek } from '../../helpers/datetime';
	import type { PageData } from './$types';

	export let data: PageData;
	let days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
	let today = new Date();
	let start_of_week = firstDayOfWeek(today, 0);
	let selected_day = days[today.getDay()];
	$: idx = days.indexOf(selected_day);
	$: workouts_this_week = data.workouts.filter(
		(workout) => workout.created_at.getTime() > start_of_week.getTime()
	);

	$: workouts = workouts_this_week.filter((workout) => workout.created_at.getDay() == idx);

	function getExerciseTotal() {
		let total = 0;

		workouts_this_week.forEach((workout) => (total += workout.exercise_routines.length));

		return total;
	}


	function getTimeTotal() {
		let total = 0
		workouts_this_week.forEach((workout)=> (total += workout.workout_time_seconds ? workout.workout_time_seconds/60 : 0))

		return Math.round(total*100)/100
	}

	function getCalorieTotal() {
		return calculateCalories(getTimeTotal(), 70.5)

	}
</script>

<div>
	<div class="flex justify-evenly w-full">
		<div class="text-2xl">This Week</div>
		<div />
		<div class="text-lg text-gray-400">My Plans</div>
	</div>

	<div class="flex justify-evenly my-4 font-semibold text-white shadow-md rounded-md mx-2 bg-secondary-500 px-1">
		{#each days as day}
			{#if day == selected_day}
				<button class="text-surface-600">{day}</button>
			{:else}
				<button on:click={() => (selected_day = day)}>{day}</button>
			{/if}
		{/each}
	</div>
	{#if workouts.length > 0}
	<WorkoutLogs {workouts} />
	{:else}
	<div class="mt-10 flex justify-center items-center">No workouts today...</div>
	{/if}

	<div class="mt-20 flex justify-center items-center flex-col">
		<div class="text-2xl mb-6 font-semibold mx-4">Summary</div>
		<div class="flex text-lg space-x-20 justify-evenly">
			<div>{getExerciseTotal()} Exercise</div>
			<div>{getCalorieTotal()} cal</div>
			<div>{getTimeTotal()}  min</div>
		</div>
	</div>

	<!-- <div class="mx-4 rounded-md bg-surface-400 py-2 mt-8">
		<div class="flex justify-center">3 New Achievements</div>
	</div> -->
</div>
