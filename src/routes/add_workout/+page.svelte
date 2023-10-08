<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import {
		Accordion,
		AccordionItem,
		getModalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import ExerciseForm from '../../components/Exercises/ExerciseForm.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import RestTimeSelect from '../../components/AddWorkout/Form/RestTimeSelect.svelte';
	import { DurationUnits } from '$lib/db/schema';

	const date = new Date();

	export let data: PageData;
	const _form = superForm(data.form, {
		dataType: 'json'
	});
	const { form, enhance, errors } = _form;

	// workaround, need to provide starting values for arrays or super forms messes up
	const genNewExerciseArray = (arr: any) => {
		arr.push({
			exercise_id: 0,
			sets: 1,
			rest: 0,
			weight: [],
			reps: [],
			distance: [],
			duration: []
		});
		return arr;
	};
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex flex-row w-full justify-evenly mb-4 variant-outline-primary rounded-md">
		<a href="/"><button class="text-2xl rotate-180">&#x279F;</button></a>
		<div class="text-lg font-semibold">{date.toDateString()}</div>
		<div />
	</div>
	<form class="space-y-4" use:enhance method="POST">
		<label for="name">Name</label>
		<input type="text" class="input" id="name" name="name" bind:value={$form.name} />

		<button
			type="button"
			class="btn-sm rounded-md variant-outline-surface text-md"
			on:click={() => {
				$form.exercises = genNewExerciseArray($form.exercises);
			}}>Add Exercise</button
		>
		<Accordion>
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
							<div>
								<label class="label" for="sets">Sets</label>
								<input
									class="input justify-center flex items-center"
									type="number"
									name="sets"
									bind:value={$form.exercises[i].sets}
								/>
							</div>

							<!-- <RestTimeSelect value={$form.exercises[i].rest} /> -->
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
		</Accordion>
		<button class="btn variant-outline-surface">Add Workout</button>
	</form>
</div>
