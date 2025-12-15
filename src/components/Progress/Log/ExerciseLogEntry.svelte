<!-- @migration-task Error while migrating Svelte code: `<tr>` is invalid inside `<table>` -->
<script lang="ts">
	import type { ExerciseLogWithExercises, ExerciseRoutine } from '$lib/db/schema';
	import { formatTime, prettifyDate } from '../../../helpers/datetime';
	import { calcOneRepMax } from '../../../helpers/rep_max';

	export let log_entry: ExerciseLogWithExercises;
</script>

{#if log_entry.type == 'Weight'}
	<div class="mx-2 my-3 rounded-xl border bg-surface-200 shadow-sm overflow-x-auto">
		<table class="w-full text-sm">
			<tbody>
				<tr class="border-t">
					<td class="px-4 py-2 font-medium text-gray-600">
						Weight (lb)
					</td>
					{#each log_entry.weight as weight}
						<td class="px-4 py-2 text-center font-semibold text-gray-900">
							{weight}
						</td>
					{/each}
				</tr>
				<tr class="border-t bg-surface-200">
					<td class="px-4 py-2 font-medium text-gray-600">
						Reps
					</td>
					{#each log_entry.reps as rep}
						<td class="px-4 py-2 text-center text-gray-700">
							{rep}
						</td>
					{/each}
				</tr>
			</tbody>
		</table>
	</div>
{:else if log_entry.type == 'Distance'}
	<div class="mx-2 my-3 rounded-xl border bg-surface-200 p-4 shadow-sm">
		<div class="grid grid-cols-2 gap-4 text-center">
			<div>
				<div class="text-xs font-medium uppercase text-gray-500 mb-1">
					Distance
				</div>
				<div class="text-lg font-semibold text-gray-900">
					{log_entry.distance}
				</div>
			</div>

			{#if log_entry.overall_pace_seconds}
				<div>
					<div class="text-xs font-medium uppercase text-gray-500 mb-1">
						Pace
					</div>
					<div class="space-y-1">
						{#each log_entry.overall_pace_seconds as time}
							<div class="text-sm text-gray-700">
								{formatTime(time)}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{:else if log_entry.type == 'Duration'}
	<div class="mx-2 my-3 rounded-xl border bg-surface-200 p-4 shadow-sm">
		<div class="grid grid-cols-2 gap-4 text-center">
			<div>
				<div class="text-xs font-medium uppercase text-gray-500 mb-1">
					Duration
				</div>
				<div class="text-lg font-semibold text-gray-900">
					{log_entry.duration}
				</div>
			</div>

			{#if log_entry.overall_pace_seconds}
				<div>
					<div class="text-xs font-medium uppercase text-gray-500 mb-1">
						Pace
					</div>
					<div class="space-y-1">
						{#each log_entry.overall_pace_seconds as time}
							<div class="text-sm text-gray-700">
								{formatTime(time)}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
