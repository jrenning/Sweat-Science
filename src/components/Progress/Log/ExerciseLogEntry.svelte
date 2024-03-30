<script lang="ts">
	import type { ExerciseLogWithExercises, ExerciseRoutine } from '$lib/db/schema';
	import { prettifyDate } from '../../../helpers/datetime';
	import { calcOneRepMax } from '../../../helpers/rep_max';

	export let log_entry: ExerciseLogWithExercises;

</script>

	{#if log_entry.type == 'Weight'}
		<table class=" bg-surface-200 mx-2 p-2 rounded-xl shadow-2xl ">
			<tr>
				<th class="font-semibold p-2">Weight</th>
				{#each log_entry.weight as weight}
					<td class="p-2">{weight} {"lb"}</td>
				{/each}
			</tr>
			<tr>
				<th class="font-semibold">Reps</th>
				{#each log_entry.reps as rep}
					<td class="p-2">{rep}</td>
				{/each}
			</tr>
		</table>
	{:else if log_entry.type == 'Distance'}
		<div class="flex flex-col bg-surface-200 mx-2 p-2 rounded-xl shadow-2xl">
			<div class="font-semibold">Distance</div>
			<div>{log_entry.distance}</div>
		</div>
	{:else if log_entry.type == 'Duration'}
		<div class="flex flex-col">
			<div class="font-semibold">Duration</div>
			<div>{log_entry.duration}</div>
		</div>
	{/if}
