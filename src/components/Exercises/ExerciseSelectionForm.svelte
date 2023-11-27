<script lang="ts">
	import type { Exercise, InsertExerciseRoutine } from '$lib/db/schema';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ExerciseSelector from '../UI/ExerciseSelector.svelte';
	import SetInput from './SetInput.svelte';
	import FormButton from '../UI/FormButton.svelte';
	import type { insertExerciseRoutineSchema } from '$lib/db/schema';

	export let data: SuperValidated<typeof insertExerciseRoutineSchema>;
	const _form = superForm(data, {
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type == 'success') {
				toastStore.trigger(success);
			} else {
				console.log('Help');
			}
		}
	});
	const { form, enhance, errors } = _form;
	export let index: number;

	export let exercise_options: Exercise[];

	const toastStore = getToastStore();

	const success: ToastSettings = {
		message: 'Exercise Added'
	};

	let sets = 1;
	let actual_sets = 1;
	let sets_same = false;
	$form.sets = actual_sets;

	//@ts-ignore
	function updateExerciseId(value) {
		$form.exercise_id = value;
	}

	function updateSetsToSame() {
		if ($form.type == 'Weight') {
			for (let i = 1; i < $form.sets; i++) {
				$form.weight[i] = $form.weight[0];
				$form.reps[i] = $form.reps[0];
			}
		} else if ($form.type == 'Distance') {
			for (let i = 1; i < $form.sets; i++) {
				$form.distance[i] = $form.distance[0];
			}
		} else {
			for (let i = 1; i < $form.sets; i++) {
				$form.duration[i] = $form.duration[0];
			}
		}
	}

	function toggleSameSets() {
		sets_same = !sets_same;
		if (sets_same) {
			sets = 1;
			// update form values
			updateSetsToSame();
		} else {
			sets = actual_sets;
		}
	}

	function removeSet() {
		if (actual_sets > 1) {
			if (!sets_same) {
				sets -= 1;
			}
			actual_sets -= 1;
		}
		$form.sets = actual_sets;
		if (sets_same) {
			updateSetsToSame();
		}

		console.log($form);
	}

	function addSet() {
		if (!sets_same) {
			sets += 1;
		}
		actual_sets += 1;
		$form.sets = actual_sets;
		if (sets_same) {
			updateSetsToSame();
		}

		console.log($form);
	}
</script>

<div class="card py-4 px-14 flex flex-col">
	<div class="flex justify-center items-center font-bold text-lg">Add Exercise</div>
	<form
		class="resize-y flex flex-col space-y-6 justify-center items-center"
		method="POST"
		action="/add_workout?/add_exercise"
		use:enhance
	>
		<ExerciseSelector exercises={exercise_options} callback={updateExerciseId} />
		<div class="flex flex-row space-x-6 mt-6">
			<label class="label" for="weight">Weight</label>
			<input type="radio" class="radio" name="type" value="Weight" bind:group={$form.type} />
			<label for="distance">Distance</label>
			<input type="radio" class="radio" name="type" value="Distance" bind:group={$form.type} />
			<label for="time">Time</label>
			<input type="radio" class="radio" name="type" value="Duration" bind:group={$form.type} />
		</div>
		<div class="flex space-x-4 justify-start w-full">
			<label class="text-xl font-semibold">Rest</label>
			<input class=" w-10 input" type="number" bind:value={$form.rest} />
			<span class="font-bold">s</span>
		</div>
		<div class="justify-start flex flex-col w-full space-y-4">
			<div class="flex justify-between">
				<div class="text-xl text-left font-semibold">Sets</div>

				<div class="flex space-x-4">
					<input type="checkbox" class="checkbox" name="same" on:click={() => toggleSameSets()} />
					<label for="same">All Sets the same</label>
				</div>
			</div>
			<div class="flex justify-between items-center">
				<FormButton text="+" action={() => addSet()} />
				{actual_sets}
				<FormButton text="-" action={() => removeSet()} />
			</div>
			{#each { length: sets } as set, i}
				{#if $form.type == 'Weight'}
					<SetInput type="Weight" bind:weight={$form.weight[i]} bind:reps={$form.reps[i]} />
				{:else if $form.type == 'Distance'}
					<SetInput type="Distance" bind:distance={$form.distance[i]} />
				{:else if $form.type == 'Duration'}
					<SetInput type="Duration" bind:duration={$form.duration[i]} />
				{/if}
			{/each}
			{#each { length: actual_sets - sets } as set, i}
				{#if $form.type == 'Weight'}
					<SetInput
						type="Weight"
						bind:weight={$form.weight[i + sets]}
						bind:reps={$form.reps[i + sets]}
						hidden={true}
					/>
				{:else if $form.type == 'Distance'}
					<SetInput type="Distance" bind:distance={$form.distance[i + sets]} hidden={true} />
				{:else if $form.type == 'Duration'}
					<SetInput type="Duration" bind:duration={$form.duration[i + sets]} hidden={true} />
				{/if}
			{/each}
		</div>
		<button
			class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md"
			>Add</button
		>
	</form>
</div>
