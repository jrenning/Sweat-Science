<script lang="ts">
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import WorkoutSelection from '../../components/Popups/WorkoutSelection/WorkoutSelection.svelte';
	import BackButton from '../../components/UI/Buttons/BackButton.svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import FormButton from '../../components/UI/Buttons/FormButton.svelte';
	import Label from '../../components/UI/Form/Label.svelte';
	import type { PageData } from './$types';
	import ExerciseSelector from '../../components/UI/ExerciseSelector.svelte';

	export let data: PageData;
	let selected_workout: WorkoutRoutineWithExercises | undefined;
	let existing_exercise: boolean = false;
	let page: number = 1;

	function handleWorkoutTypeChange() {
		if (!existing_exercise) {
			selected_workout = undefined;
			$form.exercises = [];
		}
	}

	/* MODAL */
	const modalStore = getModalStore();

	function setSelectedWorkout(workout: WorkoutRoutineWithExercises) {
		selected_workout = workout;
		$form.exercises = selected_workout.exercises;
	}

	const modalComponentWorkout: ModalComponent = {
		ref: WorkoutSelection,
		props: { onSelection: setSelectedWorkout }
	};
	const workoutModal: ModalSettings = {
		type: 'component',
		title: `Choose Workout`,
		component: modalComponentWorkout
	};

	/* FORM */
	const { form, enhance } = superForm(data.workoutLogForm, {
		dataType: 'json'
	});
</script>

<div class="flex flex-col justify-center w-full">
	<div class="flex w-full justify-evenly space-x-6 mb-10">
		<BackButton link="/progress" />
		<h2 class="text-3xl font-bold">Log Workout</h2>
		<div />
	</div>
	{#if page === 1}
		<div class="mx-20 flex flex-col space-y-4">
			<Label For="date" text="Date" />
			<input class="input" id="date" type="date" bind:value={$form.created_at} />
			<div class="flex space-x-6">
				<Label For="type" text="Existing Exercise" />
				<input
					class="input w-6 h-6"
					type="checkbox"
					bind:checked={existing_exercise}
					on:change={() => handleWorkoutTypeChange()}
				/>
			</div>
		</div>
		{#if existing_exercise}
			<div class="mx-20 flex flex-col justify-center items-center space-y-4 mt-10">
				<div class="">
					<FormButton text="Select Workout" action={() => modalStore.trigger(workoutModal)} />
				</div>
				{#if selected_workout}
					<div class="rounded-md w-40 flex justify-center bg-slate-100 p-2 shadow-md">
						<div id="test" class="font-semibold text-lg">{selected_workout.name}</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="mx-20 flex flex-col space-y-6 mt-6">
				<Label For="name" text="Workout Name" />
				<input class="input" />
			</div>
		{/if}
		<div class="flex justify-center mt-10">
			<FormButton text="To Exercises" />
		</div>
	{:else if page === 2}

	{#if existing_exercise}

		<ExerciseSelector />
	{/if}
	
	{/if}
</div>
