<script lang="ts">
	import type { WorkoutRoutine } from '$lib/db/schema';

	export let workout: WorkoutRoutine;
	export let onSelection: (workout: WorkoutRoutine) => void;
</script>

<button
	class="rounded-md bg-surface-300 w-[16rem] cursor-pointer flex justify-center shadow-md"
	on:click={() => onSelection(workout)}
>
	<div class="font-semibold text-lg">{workout.name}</div>
</button>
