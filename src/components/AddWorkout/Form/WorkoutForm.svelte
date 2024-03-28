<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import ExerciseSelectionForm from '../../Exercises/ExerciseSelectionForm.svelte';
	import type {
		Equipment,
		Exercise,
		insertExerciseRoutineSchema,
		WorkoutRoutineWithExercises
	} from '$lib/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { newWorkoutRoutineSchema } from '../../../routes/add_workout/schemas';
	import AddExerciseCard from '../AddExerciseCard.svelte';
	import BackButton from '../../UI/Buttons/BackButton.svelte';

	/* EXPORTS */
	export let exerciseForm: SuperValidated<typeof insertExerciseRoutineSchema>;
	export let workoutForm: SuperValidated<typeof newWorkoutRoutineSchema>;
	export let workout_routine: WorkoutRoutineWithExercises;
    export let post_link: string
    export let exercise_post_link: string
    export let type: "Update" | "Add"
	/*        */


	const modalStore = getModalStore();


	const _form = superForm(workoutForm, {
		dataType: 'json'
	});
	const { form, enhance, errors } = _form;

	let exercises = 0;
	const modalComponentExercise: ModalComponent = {
		ref: ExerciseSelectionForm,
		props: { data: exerciseForm, index: exercises, post_link: exercise_post_link }
	};
	const exerciseModal: ModalSettings = {
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
				modalStore.trigger(exerciseModal);
			}}>Add Exercise</button
		>
		{#if workout_routine}
			{#each workout_routine.exercises as exercise}
				<AddExerciseCard {exercise} workout_id={workout_routine.id} {exerciseForm} />
			{/each}
		{/if}
		<button class="btn variant-outline-surface">{type} Workout</button>
	</form>
</div>
