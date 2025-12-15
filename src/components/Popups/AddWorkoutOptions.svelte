<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	import AddExistingWorkout from '../AddWorkoutPlan/AddExistingWorkout.svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import WorkoutSelection from './WorkoutSelection/WorkoutSelection.svelte';
	import type { WorkoutRoutine } from '$lib/db/schema';

	interface Props {
		plan_id: number;
		day: number | number[];
	}

	let { plan_id, day }: Props = $props();

	let selected_workout: WorkoutRoutine | undefined = $state();

	async function onWorkoutAdd() {
		if (selected_workout) {
			const data = {
				workout_id: selected_workout.id,
				plan_id: plan_id,
				day: day
			};

			console.log(data)
			// add the workout
			const res = await fetch('/api/workout_plan/workouts/add', {
				method: 'POST',
				body: JSON.stringify(data)
			});

			const json = await res.json();

			await invalidateAll();
		}
	}

	async function setSelectedWorkout(workout: WorkoutRoutine) {
		selected_workout = workout;
	}
</script>

<div class="card flex flex-col space-y-4 p-4 bg-surface-300 rounded-md">
	<a href={`/add_workout?plan_id=${plan_id}&day=${day}`}><button>Add New</button></a>
	<Dialog>
		<Dialog.Trigger class="flex flex-col space-y-1">Add Existing</Dialog.Trigger>
		<Portal>
			<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
			<Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center p-4">
				<Dialog.Content class="card bg-surface-100-900 w-full max-w-xl p-4 space-y-4 shadow-xl">
					<Dialog.Title class="text-2xl flex justify-center font-bold">Select Workout</Dialog.Title>
					<WorkoutSelection onSelection={setSelectedWorkout} parent={false} />
					{#if selected_workout}
						<div class="flex justify-center font-bold text-lg">{selected_workout.name}</div>
					{/if}
					<div class="flex justify-center">
						<button class="btn preset-tonal-error" onclick={() => onWorkoutAdd()}>Add</button>
					</div>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog>
</div>
