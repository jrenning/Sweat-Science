<script lang="ts">
	import type { Exercise } from '$lib/db/schema';
	import { prettifyDate } from '../../helpers/datetime';

	export let exercise: Exercise;
	export let rep_max: number | undefined;
	export let times_performed: number
</script>

<div class="space-y-6">
	<div>
		<span class="font-semibold">Created At:</span> {prettifyDate(exercise.created_at)}
	</div>

	<div><span class="font-semibold">Times Performed:</span> {times_performed}</div>
	{#if exercise.muscle_groups}
		<div>
			<span class="font-semibold">Muscle Groups</span>

			<ul class="list">
				{#each exercise.muscle_groups as muscle_group}
					<li>{muscle_group}</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="space-y-4">
		<div class="font-semibold">Estimated 1RM</div>
		{#if rep_max}
			<div class="text-3xl flex justify-center">{rep_max ? rep_max : 'Unknown'} lb</div>
		{:else}
			<div class="text-3xl flex justify-center">Unknown</div>
		{/if}
	</div>
</div>
