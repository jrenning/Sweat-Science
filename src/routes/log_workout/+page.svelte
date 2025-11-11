<script lang="ts">
	import type {
		ExerciseLogWithExercises,
		WorkoutLogWithExercises,
		WorkoutRoutineWithExercises
	} from '$lib/db/schema';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
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
	import ExerciseLogEntry from '../../components/Progress/Log/ExerciseLogEntry.svelte';
	import { prettifyDate } from '../../helpers/datetime';
	import ChevronIcon from '../../components/Icons/ChevronIcon.svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let selected_workout: WorkoutRoutineWithExercises | undefined = $state();
	let existing_workout: boolean = $state(false);
	let page: number = $state(1);
	let new_exercises = $state(0);
	let last_performed: WorkoutLogWithExercises | undefined = $state();
	function handleWorkoutTypeChange() {
		if (!existing_workout) {
			selected_workout = undefined;
			$form.name = '';
			$form.exercises = [];
		}
	}

	/* MODAL */

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

		last_performed = await res.json();
	}

	let last_performed_exercises: (ExerciseLogWithExercises | undefined)[] = $state([]);

	function handleExerciseAmountChange(change: number) {
		new_exercises += change;

		// update
		if (change == 1) {
			last_performed_exercises.length = last_performed_exercises.length + 1;
		}
	}

	async function fetchLastPerformedExerciseData(exercise_id: number, idx: number) {
		const data = {
			exercise_id: exercise_id
		};

		let res = await fetch('/api/exercise_routine/last_performed', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});

		let last_e_performed = (await res.json()) as ExerciseLogWithExercises;

		last_performed_exercises[idx] = last_e_performed;
	}

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
		<div></div>
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
						onchange={() => handleWorkoutTypeChange()}
					/>
				</div>
			</div>
			{#if existing_workout}
				<div class="mx-20 flex flex-col justify-center items-center space-y-4 mt-10">
					<Dialog>
						<Dialog.Trigger class="">
							<FormButton text="Select Workout" />
						</Dialog.Trigger>
						<Portal>
							<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-100" />
							<Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center">
								<Dialog.Content class="card bg-surface-200 w-md p-4 space-y-2 shadow-xl">
									<Dialog.Title class="text-2xl flex justify-center font-bold"
										>Select Workout</Dialog.Title
									>
									<WorkoutSelection onSelection={setSelectedWorkout} />
									<Dialog.CloseTrigger class="btn preset-tonal-error">Close</Dialog.CloseTrigger>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog>
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
				{#each $form.exercises as exercise, i}
					<div class="my-6">
						<div class="my-6 font-semibold text-lg flex justify-center items-center">
							{exercise.exercise.name}
						</div>
						<!-- //last performed metrics -->
						{#if last_performed}
							<div class="mb-6">
								<div class="mx-4 italic text-sm">
									Last performed: {prettifyDate(new Date(last_performed.created_at))}
								</div>
								<ExerciseLogEntry log_entry={last_performed.exercise_routines[i]} />
							</div>
						{/if}
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
					<FormButton text="Add Exercise" action={() => handleExerciseAmountChange(1)} />
				</div>
				<Accordion collapsible multiple>
					{#each { length: new_exercises } as exercise, i}
						<Accordion.Item value={i}>
							<div class="flex justify-between mb-4">
								<div class="flex space-x-6">
									<span class="font-semibold">Exercise {i + 1}</span>
									<button
										class=" shadow-md bg-red-300 rounded-full px-2 py-1"
										type="button"
										onclick={() => {
											$form.exercises = $form.exercises.filter((ele, idx) => idx !== i);
											new_exercises -= 1;
											// remove right item from last_performed
											last_performed_exercises = last_performed_exercises.filter((e, idx)=> idx !== i)
										}}>X</button
									>
								</div>
								<Accordion.ItemTrigger>
									<div class="mr-4 w-4 h-4 rotate-90"><ChevronIcon /></div>
								</Accordion.ItemTrigger>
							</div>

							<Accordion.ItemContent>
								<ExerciseSelector
									callback={async (exercise) => {
										$form.exercises[i] = {
											exercise_id: exercise.id,
											sets: 1,
											reps: [],
											weight: [],
											distance: [],
											duration: [],
											rest: 0
										};
										fetchLastPerformedExerciseData(exercise.id, i);
									}}
								/>
								{#if $form.exercises[i]}
									<div class="flex justify-center flex-row space-x-6 mt-6">
										<label for="weight">Weight</label>
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
									{#if last_performed_exercises[i]}
										<div class="mb-6 flex flex-col justify-center">
											<div class="mx-4 italic text-sm">
												Last performed: {prettifyDate(new Date(last_performed_exercises[i].created_at))}
											</div>
											<ExerciseLogEntry log_entry={last_performed_exercises[i]} />
										</div>
									{/if}
									<div class="flex mt-8 justify-between m-auto w-40 items-center">
										<FormButton text="+" action={() => ($form.exercises[i].sets += 1)} />
										{$form.exercises[i].sets}
										<FormButton text="-" action={() => ($form.exercises[i].sets -= 1)} />
									</div>
									<div class="grid grid-cols-2 gap-x-2 gap-y-16 row mx-8 mt-10">
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
							</Accordion.ItemContent>
						</Accordion.Item>
					{/each}
				</Accordion>
			{/if}
			<div class="flex justify-center items-center space-x-8 mt-10">
				<div class="flex justify-center items-center">
					<FormButton text="Back" action={() => (page = 1)} />
				</div>
				<FormButton text="Finish" disabled={$form.exercises.length < 1} action={() => (page = 3)} />
			</div>
		{:else if page == 3}
			<div class="mx-4 my-6">
				<label class="font-semibold mb-2" for="notes">Notes</label>
				<textarea class="textarea" bind:value={$form.notes}></textarea>
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
