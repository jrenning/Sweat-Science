<script lang="ts">
	import type {
		WorkoutLogWithExercises,
		WorkoutPlan,
		WorkoutPlanWithWorkouts,
		WorkoutRoutineWithExercises
	} from '$lib/db/schema';
	import { convertToUTC, getDaysDiff, prettifyDate } from '../../helpers/datetime';
	import WorkoutPlanOptions from '../Popups/WorkoutPlanOptions.svelte';

	interface Props {
		current_plan: WorkoutPlanWithWorkouts;
		current_workouts: WorkoutLogWithExercises[];
	}

	let { current_plan, current_workouts }: Props = $props();
	// figure out which day it is and get the right workout
	let today = new Date();
	let past = current_plan.start_date;

	//@ts-ignore
	let diff = getDaysDiff(today, past);

	let current_workout: WorkoutRoutineWithExercises | undefined = $state();

	for (let i = 0; i < current_plan.workouts.length; i++) {
		if (current_plan.workouts[i].days?.includes(diff + 1)) {
			current_workout = current_plan.workouts[i];
		}
	}

	// get all days that have been completed
	let days = current_workouts.map((w) => w.plan_day);
	// if one matches the current day mark completed as true
	let completed = days.includes(diff + 1);
</script>

<div class="rounded-xl bg-surface-400 border shadow-sm p-5 flex flex-col gap-5">
	<!-- Header -->
	<div class="flex items-start justify-between">
		<h2 class="text-2xl md:text-3xl font-bold text-gray-900">
			{current_plan.name}
		</h2>

		<WorkoutPlanOptions
			id={current_plan.id}
			start_date={current_plan.start_date}
		/>
	</div>

	<!-- Status Row -->
	<div class="flex items-center justify-between gap-4 flex-wrap">
		{#if current_workout}
			<div class="flex items-center gap-2 rounded-lg bg-surface-100 px-3 py-2">
				<span class="text-sm font-medium text-gray-500">
					Day {diff + 1}
				</span>
				<span class="text-gray-400">•</span>
				<span class="text-sm font-semibold text-gray-900 italic">
					{current_workout.name}
				</span>
			</div>

			{#if completed}
				<a href="/progress">
					<button
						class="rounded-lg bg-secondary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 transition"
					>
						Completed
					</button>
				</a>
			{:else}
				<a href={`/active_workout/${current_workout.id}?day=${diff + 1}`}>
					<button
						class="rounded-lg bg-secondary-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
					>
						Start Workout →
					</button>
				</a>
			{/if}
		{:else if diff > -1}
			<div class="flex items-center gap-2 rounded-lg bg-surface-100 px-3 py-2">
				<span class="text-sm font-medium text-gray-500">
					Day {diff + 1}
				</span>
				<span class="text-gray-400">•</span>
				<span class="text-sm font-semibold text-gray-600 italic">
					Rest Day
				</span>
			</div>
		{:else}
			<div class="flex items-center gap-2 rounded-lg bg-surface-100 px-3 py-2">
				<span class="text-sm text-gray-500">
					Starts on
				</span>
				<span class="text-gray-400">•</span>
				<span class="text-sm font-semibold text-gray-900 italic">
					{prettifyDate(convertToUTC(past))}
				</span>
			</div>
		{/if}
	</div>
</div>
