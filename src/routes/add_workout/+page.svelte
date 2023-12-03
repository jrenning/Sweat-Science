<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import BackButton from '../../components/UI/Buttons/BackButton.svelte';
	import ExerciseSelectionForm from '../../components/Exercises/ExerciseSelectionForm.svelte';
	import AddExerciseCard from '../../components/AddWorkout/AddExerciseCard.svelte';
	export let data: PageData;
	const modalStore = getModalStore();
	const equipment_names = data.equipment_choices.map((equip) => {
		return { name: equip.name, id: equip.id };
	});

	const _form = superForm(data.form, {
		dataType: 'json'
	});
	const { form, enhance, errors } = _form;

	let exercises = 0;
	const modalComponentExercise: ModalComponent = {
		ref: ExerciseSelectionForm,
		props: { exercise_options: data.exercise_choices, data: data.exerciseForm, index: exercises, post_link: "/add_workout?/add_exercise" }
	};
	const exerciseModal: ModalSettings = {
		type: 'component',
		title: 'Add Exercise',
		component: modalComponentExercise
	};
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex flex-row w-[90%] justify-between mb-4">
		<BackButton link="/" />
	</div>
	<input
		type="text"
		class="text-3xl text-center bg-transparent mb-6 flex justify-center items-center"
		id="name"
		name="name"
		placeholder="Workout Name"
		bind:value={$form.name}
	/>


	<form class="space-y-4 flex flex-col" use:enhance method="POST" action="?/add_workout">
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
		{#if data.workout_routine}
			{#each data.workout_routine.exercises as exercise}
				<AddExerciseCard {exercise} />
			{/each}
		{/if}
		<button class="btn variant-outline-surface">Add Workout</button>
	</form>
</div>
