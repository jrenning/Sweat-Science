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
		props: { exercise_options: data.exercise_choices, data: data.exerciseForm, index: exercises }
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

	<!-- <FlowDiagram /> -->

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

		<!-- <Accordion>
			{#each $form.exercises as _, i}
				<AccordionItem open={i == 0}>
					<svelte:fragment slot="summary">Exercise {i + 1}</svelte:fragment>
					<svelte:fragment slot="content">
						<div>Select an exercise:</div>
						<div class="flex flex-row space-x-6">
							<select class="select" bind:value={$form.exercises[i].exercise_id}>
								{#each data.exercise_choices as choice}
									<option value={choice.id}>{choice.name}</option>
								{/each}
							</select>
							<button
								class="rounded-full variant-filled-surface px-2 py-1 text-lg font-semibold shadow-md"
								>+</button
							>
						</div>
						{#if $errors.exercises?.[i].exercise_id}
							<span class="invalid text-red-300">{$errors.exercises[i].exercise_id}</span>
						{/if}
						<div>
							<div>Rest</div>
							<div class="flex flex-row space-x-6 justify-center items-center">
								<div>
									<label class="label" for="weight">30 sec</label>
									<input
										type="radio"
										class="radio"
										value={30}
										bind:group={$form.exercises[i].rest}
									/>
								</div>

								<div>
									<label for="distance">1 min</label>
									<input
										type="radio"
										class="radio"
										name="type"
										value={60}
										bind:group={$form.exercises[i].rest}
									/>
								</div>
								<div>
									<label for="time">1 min 30 sec</label>
									<input
										type="radio"
										class="radio"
										name="type"
										value={90}
										bind:group={$form.exercises[i].rest}
									/>
								</div>
							</div>
							<div class="flex flex-col justify-center items-center my-4">
								<label class="label" for="sets">Sets</label>
								<input
									class="input text-center rounded-md"
									type="number"
									name="sets"
									bind:value={$form.exercises[i].sets}
								/>
							</div>
						</div>

						<div class="flex flex-row space-x-6 mt-6">
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
							{#if $errors.exercises?.[i].type} <span>{$errors.exercises[i].type}</span> {/if}
						</div>
						{#each { length: $form.exercises[i].sets } as _, set}
							<div class="flex flex-row space-x-4">
								{#if $form.exercises[i].type == 'Weight'}
									<div class="input-group w-30 input-group-divider grid-cols-[auto_1fr_auto]">
										<input
											type="number"
											class="w-20"
											placeholder="Weight"
											name="exercises.weight"
											bind:value={$form.exercises[i].weight[set]}
										/>
										<select bind:value={$form.exercises[i].weight_units}>
											<option>lb</option>
											<option>kg</option>
										</select>
									</div>
									<label for="reps">Reps</label>
									<input
										type="number"
										class="input w-10"
										bind:value={$form.exercises[i].reps[set]}
									/>
								{:else if $form.exercises[i].type == 'Distance'}
									<p>Distance</p>
									<div class="input-group w-30 input-group-divider grid-cols-[auto_1fr_auto]">
										<input
											type="number"
											class="w-20"
											placeholder="Distance"
											bind:value={$form.exercises[i].distance[set]}
										/>
										<select bind:value={$form.exercises[i].distance_units}>
											<option>mile</option>
											<option>km</option>
										</select>
									</div>
								{:else if $form.exercises[i].type == 'Duration'}
									<p>Time</p>
									<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
										<input
											type="number"
											placeholder="Time"
											bind:value={$form.exercises[i].duration[set]}
										/>
										<select bind:value={$form.exercises[i].duration_units}>
											{#each DurationUnits.enumValues as unit}
												<option>{unit}</option>
											{/each}
										</select>
									</div>
								{/if}
							</div>
						{/each}
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion> -->
		<button class="btn variant-outline-surface">Add Workout</button>
	</form>
</div>
