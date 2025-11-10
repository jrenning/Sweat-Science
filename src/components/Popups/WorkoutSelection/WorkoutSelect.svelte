<script lang="ts">
	import type { WorkoutRoutine } from '$lib/db/schema';

	interface Props {
		workout: WorkoutRoutine;
		onSelection: (workout: WorkoutRoutine) => void;
	}

	let { workout, onSelection }: Props = $props();
</script>

<button
	class="rounded-md bg-surface-300 w-[16rem] cursor-pointer flex justify-center shadow-md"
	onclick={() => onSelection(workout)}
>
	<div class="font-semibold text-lg">{workout.name}</div>
</button>
