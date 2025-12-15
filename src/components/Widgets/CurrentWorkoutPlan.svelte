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

<div class="card bg-surface-400 rounded-md p-4 flex flex-col space-y-4">
	<div class="flex justify-end p-2">
		<WorkoutPlanOptions id={current_plan.id} start_date={current_plan.start_date} />
	</div>
	<div class="md:text-4xl text-3xl font-bold">{current_plan.name}</div>

	<div class="flex justify-between">
		{#if current_workout}
			<div class=" flex rounded-md bg-surface-200 p-1 space-x-2">
				<span>Day {diff + 1}</span>
				<span>--</span>
				<span class="font-bold italic"> {current_workout.name}</span>
			</div>
			{#if completed}
				<a href={`/progress`}>
					<button class="bg-secondary-500 px-4 mr-2 py-1 rounded-md shadow-md">Completed</button>
				</a>
			{:else}
				<a href={`/active_workout/${current_workout.id}?day=${diff + 1}`}
					><button class="bg-secondary-500 px-4 mr-2 py-1 rounded-md shadow-md">➤</button></a
				>
			{/if}
		{:else if diff > -1}
			<div class=" flex rounded-md bg-surface-200 p-1 space-x-2">
				<span>Day {diff + 1}</span>
				<span>--</span>
				<span class="font-bold italic">Rest</span>
			</div>
		{:else}
			<div class=" flex rounded-md bg-surface-200 p-1 space-x-2">
				<span>Starting on </span>
				<span>--</span>
				<span class="font-bold italic"> {prettifyDate(convertToUTC(past))}</span>
			</div>
		{/if}
	</div>
</div>
