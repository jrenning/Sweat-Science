<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import DeleteIcon from '../Icons/DeleteIcon.svelte';
	import EditIcon from '../Icons/EditIcon.svelte';

	export let workout: WorkoutRoutineWithExercises;
	export let day: number
    const modal = getModalStore()

	async function deleteWorkout() {
		const data = {
			plan_id: workout.workout_plan_id,
			workout_id: workout.id,
			day: day
		};

		await fetch('/api/workout_plan/workouts/delete', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		// refresh page data
		await invalidateAll();
	}

	const deleteModal: ModalSettings = {
		type: 'confirm',
		title: 'Delete Workout?',
		response: async (r) => {
			if (r) {
				await deleteWorkout();
			}
		}
	};
</script>

<div class="rounded-md bg-surface-300 mx-2 px-2 py-4 shadow-md border-surface-700 border">
	<div class="flex justify-between items-center">
		<div class="text-2xl font-semibold">{workout.name}</div>
		<div class="flex flex-row space-x-6">
			<a href={`/edit_workout/${workout.id}`} class="w-4 h-4"><EditIcon /></a>
			<button type="button" class="w-4 h-4" on:click={() => modal.trigger(deleteModal)}><DeleteIcon /></button>
		</div>
	</div>
	<div>{workout.exercises.length} Exercises</div>
</div>
