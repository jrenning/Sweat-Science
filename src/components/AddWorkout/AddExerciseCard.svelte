<script lang="ts">
	import EditIcon from '../Icons/EditIcon.svelte';
	import DeleteIcon from '../Icons/DeleteIcon.svelte';
	import type {
		ExerciseRoutineWithExercise,
		InsertExerciceRoutineWithExercises,

		insertExerciseRoutineSchema

	} from '$lib/db/schema';
	import { invalidateAll } from '$app/navigation';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import ExerciseSelectionForm from '../Exercises/ExerciseSelectionForm.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let exercise: InsertExerciceRoutineWithExercises;
	export let workout_id: number;
	export let exerciseForm: SuperValidated<typeof insertExerciseRoutineSchema>

	async function deleteExercise() {
		const data = {
			action: 'delete',
			exercise_routine_id: exercise.id,
			workout_routine_id: workout_id
		};

		await fetch('/api/exercise_routine', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		// refresh page data
		await invalidateAll();
	}

	const modal = getModalStore();

    exerciseForm.data = exercise

    console.log(exerciseForm.data)

	const modalComponentExercise: ModalComponent = {
		ref: ExerciseSelectionForm,
		props: { data: exerciseForm, post_link: `/edit_exercise_routine/${exercise.id}` }
	};
	const exerciseModal: ModalSettings = {
		type: 'component',
		title: 'Edit Exercise',
		component: modalComponentExercise
	};
</script>

<div class="rounded-md bg-surface-300 px-2 py-4 shadow-md border-surface-700 border">
	<div class="flex justify-between items-center">
		<div class="text-2xl font-semibold">{exercise.exercise.name}</div>
		<div class="flex flex-row space-x-6">
			<button on:click={() => modal.trigger(exerciseModal)} type="button" class="w-4 h-4"><EditIcon /></button>
			<button type="button" class="w-4 h-4" on:click={() => deleteExercise()}><DeleteIcon /></button
			>
		</div>
	</div>
	<div>{exercise.sets} Sets</div>
</div>
