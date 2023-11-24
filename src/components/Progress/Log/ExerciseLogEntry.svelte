<script lang="ts">
	import type { ExerciseRoutine } from '$lib/db/schema';
	import { calcOneRepMax } from '../../../helpers/rep_max';

	export let log_entry: ExerciseRoutine;

	let sourceData = [];
</script>

<div class="rounded-md bg-surface-400 items-center flex flex-row space-x-6">
	<div class="flex flex-col mx-4 space-y-4">
		<div class="font-semibold text-2xl">Type</div>
		<div class="text-xl">{log_entry.type}</div>
	</div>
	{#if log_entry.type == 'Weight'}
		<table class="table table-hover mx-2">
			<tr>
				<th class="font-semibold">Weight</th>
				{#each log_entry.weight as weight}
					<td>{weight} {log_entry.weight_units}</td>
				{/each}
			</tr>
			<tr>
				<th class="font-semibold">Reps</th>
				{#each log_entry.reps as rep}
					<td>{rep}</td>
				{/each}
			</tr>
		</table>
        <div class="flex flex-col">
            <div>1rm</div>
            <div>{calcOneRepMax(135, 5)}</div>
        </div>
	{:else if log_entry.type == 'Distance'}
		<div class="flex flex-col">
			<div class="font-semibold">Distance</div>
			<div>{log_entry.distance}</div>
		</div>
	{:else if log_entry.type == 'Duration'}
		<div class="flex flex-col">
			<div class="font-semibold">Duration</div>
			<div>{log_entry.duration}</div>
		</div>
	{/if}
</div>
