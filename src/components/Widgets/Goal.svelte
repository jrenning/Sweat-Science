<script lang="ts">
	import type { Goal } from '$lib/db/schema';
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	import { prettifyDate } from '../../helpers/datetime';
	import DeleteIcon from '../Icons/DeleteIcon.svelte';
	import { invalidateAll } from '$app/navigation';

	interface Props {
		goal: Goal & {
		current_val: number;
	};
	}

	let { goal }: Props = $props();
	//@ts-ignore
	let goal_string: string = $state();

	if (goal.goal_type == '1RM') {
		goal_string = '1RM';
	} else if (goal.goal_type == 'average_weight') {
		goal_string = 'Average Weight';
	} else if (goal.goal_type == 'weekly_exercise') {
		goal_string = 'Weekly Exercises';
	} else if (goal.goal_type == 'weekly_workout') {
		goal_string = 'Weekly Workouts';
	}


	async function handleDelete() {
		if (confirm("Are you sure you want to delete this goal?")) {
		const data = {
			goal_id: goal.id
		}
		const response = await fetch("/api/goals", {
			method: "DELETE",
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		})
		// invalidate not working
		location.reload()
	}
	}
</script>

<div class="flex items-center space-x-4">
	<div class="flex flex-col">
		<div class="md:text-lg text-sm">
			Get a {goal.goal_value}
			{goal_string} in {goal.exercise.name}
		</div>
		<div class="flex items-center space-x-4">
			<div class=" flex h-2 w-[100px] items-center rounded-md bg-gray-300 text-[0.7rem] md:text-lg">
				<div
					class="h-2 rounded-md bg-blue-300 w"
					style={`width: calc(100%*${goal.current_val / goal.goal_value}`}
				></div>
			</div>
			<div class="text-sm">{goal.current_val}/{goal.goal_value}</div>
		</div>
	</div>
	{#if goal.deadline}
		<div class="italic text-sm">
			{prettifyDate(goal.deadline)}
		</div>
	{/if}
	<button class="h-4 w-4" onclick={handleDelete}>
		<DeleteIcon />
	</button>
</div>
