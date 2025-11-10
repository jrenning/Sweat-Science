<script lang="ts">
	import type { WorkoutRoutine } from '$lib/db/schema';
	import DumbbellIcon from '../Icons/DumbbellIcon.svelte';
	import { goto, invalidateAll } from '$app/navigation';

	import WorkoutOptions from '../Popups/WorkoutOptions.svelte';

	interface Props {
		workout: WorkoutRoutine;
	}

	let { workout }: Props = $props();
</script>

<div
	class="flex flex-row space-x-6 w-full items-center rounded-md border py-1 border-secondary-300"
>
	<div class="w-8 h-8 ml-2"><DumbbellIcon /></div>

	<div class="text-xl font-semibold">{workout.name}</div>

	<div
		class="flex space-x-1"
	>
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
	</div>
	<WorkoutOptions name={workout.name} id={workout.id} />

	<div class="flex grow justify-end">
		<button class="bg-secondary-500 px-4 mr-2 py-1 rounded-md shadow-md" onclick={()=> goto(`/active_workout/${workout.id}`)}>➤</button>
	</div>
</div>
