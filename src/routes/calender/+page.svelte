<script lang="ts">
	import WorkoutLogs from '../../components/Progress/Log/WorkoutLogs.svelte';
	import { calculateCalories } from '../../helpers/calories';
	import { convertToUTC, firstDayOfWeek } from '../../helpers/datetime';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
	let today = new Date();
	let start_of_week = firstDayOfWeek(today, 0);
	let selected_day = $state(days[today.getDay()]);
	let idx = $derived(days.indexOf(selected_day));
	let workouts_this_week = $derived(data.workouts.filter(
		(workout) => workout.created_at.getTime() > start_of_week.getTime()
	));
	//@ts-ignore
	let workouts = $derived(workouts_this_week.filter((workout) =>convertToUTC(workout.created_at).getDay() == idx));


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

<div class="space-y-6 pb-24">
	<!-- Header -->
	<div class="flex items-center justify-between px-4">
		<h1 class="text-2xl font-bold">This Week</h1>
		<button class="text-sm text-gray-400">My Plans</button>
	</div>

	<!-- Day Selector -->
	<div class="mx-4 rounded-xl bg-secondary-500 p-1 shadow-md">
		<div class="grid grid-cols-7 text-center text-white font-semibold">
			{#each days as day}
				<button
					class={`py-2 rounded-lg transition ${
						day === selected_day
							? 'bg-white text-secondary-600'
							: 'opacity-80 hover:opacity-100'
					}`}
					onclick={() => (selected_day = day)}
				>
					{day}
				</button>
			{/each}
		</div>
	</div>

	<!-- Workouts -->
	{#if workouts.length > 0}
		<div class="px-2">
			<WorkoutLogs {workouts} />
		</div>
	{:else}
		<div class="mt-16 text-center text-gray-400">
			No workouts logged for this day
		</div>
	{/if}

	<!-- Weekly Summary -->
	<div class="mt-16 space-y-6 px-4">
		<h2 class="text-xl font-semibold text-center">Weekly Summary</h2>

		<!-- Stats Cards -->
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
			<!-- Total Workouts -->
			<div class="rounded-xl bg-surface-100 p-4 shadow-sm flex flex-col items-center">
				<div class="text-xs text-gray-500">Workouts</div>
				<div class="text-3xl font-bold">{workouts_this_week.length}</div>
			</div>

			<!-- Total Exercises -->
			<div class="rounded-xl bg-surface-100 p-4 shadow-sm flex flex-col items-center">
				<div class="text-xs text-gray-500">Exercises</div>
				<div class="text-3xl font-bold">{getExerciseTotal()}</div>
			</div>

			<!-- Strength Trend (Placeholder) -->
			<div class="rounded-xl bg-surface-100 p-4 shadow-sm flex flex-col items-center">
				<div class="text-xs text-gray-500">Strength Trend</div>
				<div class="text-lg font-semibold text-green-500"></div>
			</div>

			<!-- Consistency (Placeholder) -->
			<div class="rounded-xl bg-surface-100 p-4 shadow-sm flex flex-col items-center">
				<div class="text-xs text-gray-500">Consistency</div>
				<!-- TODO dont just assume one per day -->
				<div class="text-lg font-semibold">{workouts.length} / 7 days</div>
			</div>
		</div>

		<!-- Graphics Section -->
		<div class="rounded-xl bg-surface-100 p-6 shadow-sm">
			<div class="text-sm font-semibold mb-3 text-gray-600">
				Progress Overview
			</div>

			<!-- Graphic Placeholder -->
			<div class="h-40 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
			</div>
		</div>
	</div>
</div>
