<script lang="ts">
	import EditIcon from '../Icons/EditIcon.svelte';
	import DeleteIcon from '../Icons/DeleteIcon.svelte';
	import type {
		ExerciseRoutineWithExercise,
		InsertExerciceRoutineWithExercises,

		InsertExerciseRoutine,

		insertExerciseRoutineSchema

	} from '$lib/db/schema';
	import { invalidateAll } from '$app/navigation';
	import ExerciseSelectionForm from '../Exercises/ExerciseSelectionForm.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';

	interface Props {
		exercise: InsertExerciceRoutineWithExercises;
		workout_id: number;
		exerciseForm: SuperValidated<InsertExerciseRoutine>;
	}

	let { exercise, workout_id, exerciseForm = $bindable() }: Props = $props();

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


    exerciseForm.data = exercise
	let editExerciseForm = exerciseForm

</script>

<div class="rounded-md bg-surface-300 px-2 py-4 shadow-md border-surface-700 border">
	<div class="flex justify-between items-center">
		<div class="text-2xl font-semibold">{exercise.exercise.name}</div>
		<div class="flex flex-row space-x-6">
			<button type="button" class="w-4 h-4"><EditIcon /></button>
			<button type="button" class="w-4 h-4" onclick={() => deleteExercise()}><DeleteIcon /></button
			>
		</div>
	</div>
	<div>{exercise.sets} Sets</div>
</div>
