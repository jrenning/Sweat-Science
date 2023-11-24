<script lang="ts">
	import type { Exercise } from '$lib/db/schema';
	import { prettifyDate } from '../../helpers/datetime';

	export let exercise: Exercise;
	export let rep_max: number | undefined;
</script>

<div class="space-y-6">
	<div>
		Created At: {prettifyDate(exercise.created_at)}
	</div>

	<div>Times Performed: 236</div>
	{#if exercise.muscle_groups}
		<div>
			Muscle Groups

			<ul class="list">
				{#each exercise.muscle_groups as muscle_group}
					<li>{muscle_group}</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="space-y-4">
		<div>Estimated 1RM</div>
		{#if rep_max}
			<div class="text-3xl flex justify-center">{rep_max ? rep_max : 'Unknown'} lb</div>
		{:else}
			<div class="text-3xl flex justify-center">Unknown</div>
		{/if}
	</div>
</div>
