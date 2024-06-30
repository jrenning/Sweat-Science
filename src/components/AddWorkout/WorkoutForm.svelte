<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import ExerciseSelectionForm from '../Exercises/ExerciseSelectionForm.svelte';
	import type {
		Equipment,
		Exercise,
		insertExerciseRoutineSchema,
		WorkoutRoutineWithExercises
	} from '$lib/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { newWorkoutRoutineSchema } from '../../routes/add_workout/schemas';
	import AddExerciseCard from './AddExerciseCard.svelte';
	import BackButton from '../UI/Buttons/BackButton.svelte';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';

	/* EXPORTS */
	export let exerciseForm: SuperValidated<typeof insertExerciseRoutineSchema>;
	export let editExerciseForm: SuperValidated<typeof insertExerciseRoutineSchema>;
	export let workoutForm: SuperValidated<typeof newWorkoutRoutineSchema>;
	export let workout_routine: WorkoutRoutineWithExercises;
	export let type: 'Update' | 'Add';
	/*        */

	const exercise_post_link =
		type == 'Add'
			? `/add_workout?/add_exercise`
			: `/edit_workout/${workout_routine.id}?/add_exercise`;

	const post_link = type == 'Add' ? '?/add_workout' : '?/edit_workout';

	const modalStore = getModalStore();

	const _form = superForm(workoutForm, {
		id: "add",
		dataType: 'json'
	});

	const { form, enhance, errors } = _form;

	const modalComponentExercise: ModalComponent = {
		ref: ExerciseSelectionForm,
		props: { data: exerciseForm, post_link: exercise_post_link }
	};
	const addExerciseModal: ModalSettings = {
		type: 'component',
		title: `${type} Exercise`,
		component: modalComponentExercise
	};
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
		<input type="text" class="text-2xl" id="name" name="name" bind:value={$form.name} />
		{#if $errors.name}<span class="text-red-400">{$errors.name}</span>{/if}
		<button
			type="button"
			class="btn-sm rounded-md variant-outline-surface text-md"
			on:click={() => {
				modalStore.trigger(addExerciseModal);
			}}>Add Exercise</button
		>
		{#if workout_routine}
			{#each workout_routine.exercises as exercise}
				<AddExerciseCard
					{exercise}
					workout_id={workout_routine.id}
					exerciseForm={editExerciseForm}
				/>
			{/each}
		{/if}
		<button class="btn variant-outline-surface">{type} Workout</button>
	</form>
</div>
