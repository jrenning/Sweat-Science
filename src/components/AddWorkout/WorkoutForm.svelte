<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ExerciseSelectionForm from '../Exercises/ExerciseSelectionForm.svelte';
	import type {
		Equipment,
		Exercise,
		InsertExerciseRoutine,
		insertExerciseRoutineSchema,
		WorkoutRoutineWithExercises
	} from '$lib/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type {
		newWorkoutRoutine,
		newWorkoutRoutineSchema
	} from '../../routes/add_workout/schemas';
	import AddExerciseCard from './AddExerciseCard.svelte';
	import BackButton from '../UI/Buttons/BackButton.svelte';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	import type { zod4 } from 'sveltekit-superforms/adapters';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import DeleteIcon from '../Icons/DeleteIcon.svelte';
	import ExerciseForm from '../Exercises/ExerciseForm.svelte';

	interface Props {
		/* EXPORTS */
		exerciseForm: SuperValidated<InsertExerciseRoutine>;
		editExerciseForm: SuperValidated<InsertExerciseRoutine>;
		//@ts-ignore
		workoutForm: SuperValidated<typeof newWorkoutRoutineSchema>;
		workout_routine: WorkoutRoutineWithExercises;
		type: 'Update' | 'Add';
	}

	let { exerciseForm, editExerciseForm, workoutForm, workout_routine, type }: Props = $props();
	/*        */

	const exercise_post_link =
		type == 'Add'
			? `/add_workout?/add_exercise`
			: `/edit_workout/${workout_routine.id}?/add_exercise`;

	const post_link = type == 'Add' ? '?/add_workout' : '?/edit_workout';

	const _form = superForm(workoutForm, {
		id: 'add',
		dataType: 'json'
	});

	const { form, enhance, errors } = _form;
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex flex-row w-[90%] justify-between mb-4">
		<BackButton />
	</div>
	<input
		type="text"
		class="text-3xl text-center bg-transparent mb-6 flex justify-center items-center"
		id="name"
		name="name"
		placeholder="Workout Name"
		bind:value={$form.name}
	/>

	<form class="space-y-4 flex flex-col" use:enhance method="POST" action={post_link}>
		<label for="name">Name</label>
		<input type="text" class="text-2xl border-b-2" id="name" name="name" bind:value={$form.name} />
		{#if $errors.name}<span class="text-red-400">{$errors.name}</span>{/if}
		<Dialog>
			<Dialog.Trigger type="button" class="btn-sm rounded-md border-secondary-200 border-1 text-md"
				>Add Exercise
			</Dialog.Trigger>
			<Portal>
				<Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center p-4">
					<Dialog.Content
						class="card bg-surface-100-900 w-full max-w-xl p-4 space-y-4 shadow-xl"
					>
						<ExerciseSelectionForm post_link={exercise_post_link} data={exerciseForm} />
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog>
		{#if workout_routine}
			{#each workout_routine.exercises as exercise}
				<AddExerciseCard
					{exercise}
					workout_id={workout_routine.id}
					exerciseForm={editExerciseForm}
				/>
			{/each}
		{/if}
		<button class="btn bg-surface-300">{type} Workout</button>
	</form>
</div>
