<script lang="ts">
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import DumbbellIcon from '../Icons/DumbbellIcon.svelte';
	import EditIcon from '../Icons/EditIcon.svelte';

	export let workout: WorkoutRoutineWithExercises;
</script>

<div class="flex flex-row space-x-6 w-full items-center rounded-md border py-1 border-secondary-300">
	<div class="w-8 h-8 ml-2"><DumbbellIcon /></div>

	<div class="text-xl font-semibold">{workout.name}</div>

    <div class="w-4 h-4"><EditIcon /></div>

	<a class="flex flex-grow justify-end"  href={`/active_workout/${workout.id}`}
		><button class="bg-secondary-500 px-4 mr-2 py-1 rounded-md shadow-md">&#x27A4;</button></a
	>


</div>
