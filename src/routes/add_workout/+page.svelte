<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	const date = new Date();

	let exercises = 1;

	export let data: PageData;

	let sets = 1;

	let type = '';

	const { form, enhance, errors } = superForm(data.form, {
		dataType: 'json'
	});
	// workaround, need to provide starting values for arrays or super forms messes up
	const genNewExerciseArray = (arr: any) => {
		arr.push({ exercise_id: 0, sets: 1, weight: [], reps: [], distance: [], duration: [] });
		return arr;
	};
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex flex-row w-full justify-evenly mb-4 variant-outline-primary rounded-md">
		<a href="/"><button class="text-2xl rotate-180">&#x279F;</button></a>
		<div class="text-lg font-semibold">{date.toDateString()}</div>
		<div></div>
		
	</div>
	{#if data.data.length > 0}
		<div>Current Workouts</div>
		{#each data.data as workout}
			<div>{workout.name}</div>
			<div>{workout.exercises.length} Exercises</div>
		{/each}
	{/if}

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
						<select class="select" bind:value={$form.exercises[i].exercise_id}>
							{#each data.exercise_choices as choice}
								<option value={choice.id}>{choice.name}</option>
							{/each}
							<option><a href="/add_exercise">Add Exercise</a></option>
						</select>
						{#if $errors.exercises?.[i].exercise_id}
							<span class="invalid text-red-300">{$errors.exercises[i].exercise_id}</span>
						{/if}
						<label class="label" for="sets">Sets</label>
						<input
							class="input justify-center flex items-center"
							type="number"
							name="sets"
							bind:value={$form.exercises[i].sets}
						/>
						<div class="flex flex-row space-x-6 mt-6">
							<label class="label" for="weight">Weight</label>
							<input type="radio" class="radio" name="type" value="Weight" bind:group={type} />
							<label for="distance">Distance</label>
							<input type="radio" class="radio" name="type" value="Distance" bind:group={type} />
							<label for="time">Time</label>
							<input type="radio" class="radio" name="type" value="Time" bind:group={type} />
						</div>
						{#each { length: $form.exercises[i].sets } as _, set}
							<div class="flex flex-row space-x-4">
								{#if type == 'Weight'}
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
								{:else if type == 'Distance'}
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
								{:else if type == 'Time'}
									<p>Time</p>
									<div class="input-group w-40 input-group-divider grid-cols-[auto_1fr_auto]">
										<input
											type="number"
											class="w-36"
											placeholder="Time"
											bind:value={$form.exercises[i].duration[set]}
										/>
										<select bind:value={$form.exercises[i].duration_units}>
											<option>s</option>
											<option>min</option>
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
