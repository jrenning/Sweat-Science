<script lang="ts">
	import type { WorkoutLogWithExercises, WorkoutRoutineWithExercises } from '$lib/db/schema';
	import {
		Accordion,
		AccordionItem,
		getModalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import WorkoutSelection from '../../components/Popups/WorkoutSelection/WorkoutSelection.svelte';
	import BackButton from '../../components/UI/Buttons/BackButton.svelte';

	import { dateProxy, superForm } from 'sveltekit-superforms/client';
	import FormButton from '../../components/UI/Buttons/FormButton.svelte';
	import Label from '../../components/UI/Form/Label.svelte';
	import type { PageData } from './$types';
	import ExerciseSelector from '../../components/UI/ExerciseSelector.svelte';
	import AddExerciseCard from '../../components/AddWorkout/AddExerciseCard.svelte';
	import SetInput from '../../components/Exercises/SetInput.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ExerciseLogs from '../../components/Progress/Log/ExerciseLogs.svelte';

	export let data: PageData;
	let selected_workout: WorkoutRoutineWithExercises | undefined;
	let existing_workout: boolean = false;
	let page: number = 1;
	let new_exercises = 0;
	let last_performed: WorkoutLogWithExercises
	function handleWorkoutTypeChange() {
		if (!existing_workout) {
			selected_workout = undefined;
			$form.name = '';
			$form.exercises = [];
		}
	}


	/* MODAL */
	const modalStore = getModalStore();

	async function setSelectedWorkout(workout: WorkoutRoutineWithExercises) {
		selected_workout = workout;
		selected_workout.exercises.map((e) => (e.created_at = new Date(e.created_at)));
		selected_workout.exercises.map(
			(e) => (e.exercise.created_at = new Date(e.exercise.created_at))
		);
		$form.exercises = selected_workout.exercises;
		$form.name = selected_workout.name;


		// fetch the last performed data
		const data = {
			workout_name: workout.name
		};

		let res = await fetch('/api/workout_routine/last_performed', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log(res)

		last_performed = await res.json();

		console.log(last_performed)


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
	const { form, enhance, errors } = superForm(data.workoutLogForm, {
		dataType: 'json'
	});

	const proxyDate = dateProxy(form, 'created_at', { format: 'date' });
</script>

<div class="flex flex-col justify-center w-full">
	<div class="flex w-full justify-evenly space-x-6 mb-10">
		<BackButton link="/progress" />
		<h2 class="text-3xl font-bold">Log Workout</h2>
		<div />
	</div>
	<form class="" method="POST" action={'/log_workout?/log_workout'} use:enhance>
		{#if page === 1}
			<div class="mx-20 flex flex-col space-y-4">
				<Label For="date" text="Date" />
				<input class="input" id="date" type="date" required={true} bind:value={$proxyDate} />
				<div class="flex space-x-6">
					<Label For="type" text="Existing Workout" />
					<input
						class="input w-6 h-6"
						type="checkbox"
						bind:checked={existing_workout}
						on:change={() => handleWorkoutTypeChange()}
					/>
				</div>
			</div>
			{#if existing_workout}
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
					<input class="input" required={!existing_workout} bind:value={$form.name} />
				</div>
			{/if}
			<div class="flex justify-center mt-10">
				<FormButton
					text="To Exercises"
					disabled={!($form.created_at && $form.name)}
					action={() => (page = 2)}
				/>
			</div>
		{:else if page === 2}
			{#if existing_workout}
			<ExerciseLogs logs={last_performed.exercise_routines} type="Exercise" chart={false} />
				{#each $form.exercises as exercise, i}
					<div class="my-6">
						<div class="my-6 font-semibold text-lg flex justify-center items-center">
							{exercise.exercise.name}
						</div>
						<div class="grid grid-cols-2 gap-x-2 gap-y-16 row mx-8">
							{#each { length: exercise.sets } as set, j}
								{#if exercise.type == 'Weight'}
									<SetInput
										type="Weight"
										extra={false}
										bind:weight={$form.exercises[i].weight[j]}
										bind:reps={$form.exercises[i].reps[j]}
									/>
								{:else if exercise.type == 'Distance'}
									<SetInput
										type="Distance"
										extra={false}
										bind:distance={$form.exercises[i].distance[j]}
									/>
								{:else if exercise.type == 'Duration'}
									<SetInput
										type="Duration"
										extra={false}
										bind:duration={$form.exercises[i].duration[i]}
									/>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<div class="mb-10 flex justify-center">
					<FormButton text="Add Exercise" action={() => (new_exercises += 1)} />
				</div>
				<Accordion>
					{#each { length: new_exercises } as exercise, i}
						<AccordionItem>
							<svelte:fragment slot="summary">
								<div>
									<span class="font-semibold">Exercise {i + 1}</span>
									<button
										class=" shadow-md bg-red-300 rounded-full ml-12 px-2 py-1"
										type="button"
										on:click={() => {
											$form.exercises = $form.exercises.filter((ele, idx) => idx !== i);
											new_exercises -= 1;
										}}>X</button
									>
								</div>
							</svelte:fragment>
							<svelte:fragment slot="content">
								<ExerciseSelector
									callback={(exercise) =>
										($form.exercises[i] = {
											exercise_id: exercise.id,
											sets: 1,
											reps: [],
											weight: [],
											distance: [],
											duration: [],
											rest: 0
										})}
								/>
								{#if $form.exercises[i]}
									<div class="flex justify-center flex-row space-x-6 mt-6">
										<label class="label" for="weight">Weight</label>
										<input
											type="radio"
											class="radio"
											name="type"
											value="Weight"
											bind:group={$form.exercises[i].type}
										/>
										<label for="distance">Distance</label>
										<input
											type="radio"
											class="radio"
											name="type"
											value="Distance"
											bind:group={$form.exercises[i].type}
										/>
										<label for="time">Time</label>
										<input
											type="radio"
											class="radio"
											name="type"
											value="Duration"
											bind:group={$form.exercises[i].type}
										/>
									</div>
									<div class="flex mt-8 justify-between m-auto w-40 items-center">
										<FormButton text="+" action={() => ($form.exercises[i].sets += 1)} />
										{$form.exercises[i].sets}
										<FormButton text="-" action={() => ($form.exercises[i].sets -= 1)} />
									</div>
									<div class="flex flex-col space-y-6 justify-center items-center mt-10">
										{#each { length: $form.exercises[i].sets } as set, j}
											{#if $form.exercises[i].type == 'Weight'}
												<SetInput
													type="Weight"
													extra={false}
													bind:weight={$form.exercises[i].weight[j]}
													bind:reps={$form.exercises[i].reps[j]}
												/>
											{:else if $form.exercises[i].type == 'Distance'}
												<SetInput
													type="Distance"
													extra={false}
													bind:distance={$form.exercises[i].distance[j]}
												/>
											{:else if $form.exercises[i].type == 'Duration'}
												<SetInput
													type="Duration"
													extra={false}
													bind:duration={$form.exercises[i].duration[i]}
												/>
											{/if}
										{/each}
									</div>
								{/if}
							</svelte:fragment>
						</AccordionItem>
					{/each}
				</Accordion>
			{/if}
			<div class="flex justify-center items-center space-x-8">
				<div class="flex justify-center items-center">
					<FormButton text="Back" action={() => (page = 1)} />
				</div>
				<FormButton text="Finish" disabled={$form.exercises.length < 1} action={() => (page = 3)} />
			</div>
		{:else if page == 3}
			<div class="mx-4 my-6">
				<label class="font-semibold mb-2" for="notes">Notes</label>
				<textarea class="textarea" bind:value={$form.notes} />
			</div>

			<div class="flex justify-center items-center space-x-8">
				<div class="flex justify-center items-center">
					<FormButton text="Back" action={() => (page = 2)} />
				</div>
				<FormButton text="Log Workout" type="submit" />
			</div>
		{/if}
	</form>
</div>
