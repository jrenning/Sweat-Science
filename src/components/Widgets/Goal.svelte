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
		if (confirm('Are you sure you want to delete this goal?')) {
			const data = {
				goal_id: goal.id
			};
			const response = await fetch('/api/goals', {
				method: 'DELETE',
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json'
				}
			});
			// invalidate not working
			location.reload();
		}
	}
</script>

<div
	class="flex items-start justify-between gap-4 rounded-xl border bg-surface-100 p-4 shadow-sm hover:shadow-md transition-shadow"
>
	<!-- Left Content -->
	<div class="flex-1 space-y-2">
		<!-- Goal Text -->
		<div class="text-sm md:text-base font-medium text-gray-900">
			<span class="text-gray-500">Goal:</span>
			Get <span class="font-semibold">{goal.goal_value}</span>
			<span class="font-semibold">{goal_string}</span>
			in <span class="font-semibold">{goal.exercise.name}</span>
		</div>

		<!-- Progress -->
		<div class="flex items-center gap-3">
			<div class="relative h-2 w-full max-w-xs rounded-full bg-gray-200 overflow-hidden">
				<div
					class="absolute left-0 top-0 h-full rounded-full bg-secondary-500 transition-all"
					style={`width: ${Math.min(100, (goal.current_val / goal.goal_value) * 100)}%`}
				/>
			</div>

			<span class="text-xs font-medium text-gray-600">
				{goal.current_val} / {goal.goal_value}
			</span>
		</div>

		<!-- Deadline -->
		{#if goal.deadline}
			<div class="text-xs italic text-gray-500">
				Target date: {prettifyDate(goal.deadline)}
			</div>
		{/if}
	</div>

	<!-- Actions -->
	<button
		onclick={handleDelete}
		class="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
		aria-label="Delete goal"
	>
		<div class="w-4 h-4">
			<DeleteIcon />
		</div>
	</button>
</div>
