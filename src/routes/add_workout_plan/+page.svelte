<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import FormStepChange from '../../components/AddWorkout/FormStepChange.svelte';
	import AdjustableCalender from '../../components/AddWorkout/AdjustableCalender.svelte';
	import { current_day, current_plan_id } from '../../stores/workout_plan';
	import { getDateInputFormatString } from '../../helpers/datetime';
	import { setContext } from 'svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	let pg = $page.url.searchParams.get('page') ? Number($page.url.searchParams.get('page')) : 1;

	export let data: PageData;

	const {
		form: planForm,
		errors: planFormErrors,
		enhance: planEnhance,
		capture,
		restore
	} = superForm(data.formWorkoutPlan);

	$current_plan_id = $planForm.id ? $planForm.id : 0;

	const start = new Date(2023, 9, 17);

	export const snapshot = {capture, restore}

	$: end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + $planForm.total_days);

	function updatePage(number: number) {
		pg = number;
	}

	function updateFormWorkouts(day: number) {
		function genNewWorkoutArr(arr: any) {
			arr.push({
				day: $current_day,
				name: '',
				exercises: []
			});

			return arr;
		}

		$planForm.workout_routines = genNewWorkoutArr($planForm.workout_routines);
	}

	function getWorkoutsOnDay(day: number) {
		return $planForm.workout_routines.filter((item) => item.day == day).length;
	}

	setContext('workout_plan_page', {
		updatePage,
		updateFormWorkouts,
		getWorkoutsOnDay
	});

	const exercise_choices = [
		{
			name: 'Hello',
			id: 1
		}
	];



	function updatePlanDays(change: number) {
		if ($planForm.total_days + change < 0) {
			$planForm.total_days = 0;
		} else {
			$planForm.total_days = $planForm.total_days + change;
		}
	}

	// workaround, need to provide starting values for arrays or super forms messes up
	const genNewExerciseArray = (arr: any) => {
		arr.push({ exercise_id: 0, sets: 1, weight: [], reps: [], distance: [], duration: [] });
		return arr;
	};
</script>

<FormStepChange bind:pg names={['General', 'Workouts']} />
<form
	method="POST"
	action="/add_workout_plan?/workout_plan"
	class="flex flex-col space-y-4 bg-red-300 m-4 rounded-md p-2"
	use:planEnhance
>
	{#if pg == 1}
		<input type="hidden" name="user_id" value={$page.data.session?.user.id} />
		{#if $planForm.id}<input type="hidden" name="id" value={$planForm.id} />{/if}
		<label for="name" class="label">Name</label>
		<input type="text" id="name" name="name" class="input" bind:value={$planForm.name} />
		{#if $planFormErrors.name}<span>{$planFormErrors.name}</span>{/if}
		<label for="description" class="label">Description</label>
		<input type="text" id="description" class="input" name="description" bind:value={$planForm.description} />
		<label for="start_date" class="label">Start Date</label>
		<input
			class="input"
			type="date"
			id="start_date"
			name="start_date"
			min={getDateInputFormatString(new Date())}
			bind:value={$planForm.start_date}
		/>
		{#if $planFormErrors.start_date}<span>{$planFormErrors.start_date}</span>{/if}

		<button
			class="rounded-md shadow-md px-2 py-1 bg-surface-active-token"
			type="button"
			on:click={() => (pg += 1)}
		>
			Next
		</button>
	{:else if pg == 2}
		<div class="flex flex-col justify-center items-center">
			<label for="days">Number of Days</label>
			<div class="flex justify-center items-center space-x-4">
				<button
					class="rounded-md btn-md shadow-md px-2 py-1"
					on:click={() => {
						updatePlanDays(-7);
					}}
					type="button">- Week</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 btn-md"
					on:click={() => {
						updatePlanDays(-1);
					}}
					type="button">-</button
				>

				<input bind:value={$planForm.total_days} class=" input w-8" name="days" />
				<button
					class="rounded-md shadow-md px-2 py-1 btn-md"
					on:click={() => updatePlanDays(1)}
					type="button">+</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 btn-md"
					on:click={() => updatePlanDays(7)}
					type="button">+ Week</button
				>
			</div>

			<AdjustableCalender start_date={start} end_date={end} />
			<button class="btn mt-6 variant-outline-primary variant-filled-surface shadow-md"
				>Create Workout Plan</button
			>
		</div>
	{:else if pg == 3}
		<div class="flex flex-col space-y-4">
			<button class="btn-md variant-outline-secondary" type="button" on:click={() => (pg -= 1)}
				>Go Back</button
			>
			<Accordion>
			{#each $planForm.workout_routines.filter((item) => item.day === $current_day) as workout, index}
			<AccordionItem open={index == 0}>
				<svelte:fragment slot="summary">Workout {index + 1}</svelte:fragment>
				<svelte:fragment slot="content">
				<div class="flex flex-col justify-center items-center border border-red-100">
					<!-- <div class="text-lg font-semibold">{date.toDateString()}</div> -->
					
					<label for="name">Name</label>
					<input type="text" class="input" id="name" name="name" bind:value={workout.name} />
					<button
						type="button"
						class="btn-sm rounded-md variant-outline-surface text-md my-4"
						on:click={() => {
							workout.exercises = genNewExerciseArray(workout.exercises);
						}}>Add Exercise</button
					>
					<Accordion>
						{#each workout.exercises as _, i}
							<AccordionItem open={i == 0}>
								<svelte:fragment slot="summary">Exercise {i + 1}</svelte:fragment>
								<svelte:fragment slot="content">
									<div>Select an exercise:</div>
									<select class="select" bind:value={workout.exercises[i].exercise_id}>
										{#each exercise_choices as choice}
											<option value={choice.id}>{choice.name}</option>
										{/each}
									</select>
									<label class="label" for="sets">Sets</label>
									<input
										class="input justify-center flex items-center"
										type="number"
										name="sets"
										bind:value={workout.exercises[i].sets}
									/>
									<div class="flex flex-row space-x-6 mt-6">
										<label class="label" for="weight">Weight</label>
										<input
											type="radio"
											class="radio"
											name="type"
											value="Weight"
											bind:group={workout.exercises[i].type}
										/>
										<label for="distance">Distance</label>
										<input
											type="radio"
											class="radio"
											name="type"
											value="Distance"
											bind:group={workout.exercises[i].type}
										/>
										<label for="time">Time</label>
										<input type="radio" class="radio" name="type" value="Duration" bind:group={workout.exercises[i].type} />
									</div>
									{#each { length: workout.exercises[i].sets } as _, set}
										<div class="flex flex-row space-x-4">
											{#if workout.exercises[i].type == 'Weight'}
												<div class="input-group w-30 input-group-divider grid-cols-[auto_1fr_auto]">
													<input
														type="number"
														class="w-20"
														placeholder="Weight"
														name="exercises.weight"
														bind:value={workout.exercises[i].weight[set]}
													/>
													<select bind:value={workout.exercises[i].weight_units}>
														<option>lb</option>
														<option>kg</option>
													</select>
												</div>
												<label for="reps">Reps</label>
												<input
													type="number"
													class="input w-10"
													bind:value={workout.exercises[i].reps[set]}
												/>
											{:else if workout.exercises[i].type == 'Distance'}
												<p>Distance</p>
												<div class="input-group w-30 input-group-divider grid-cols-[auto_1fr_auto]">
													<input
														type="number"
														class="w-20"
														placeholder="Distance"
														bind:value={workout.exercises[i].distance[set]}
													/>
													<select bind:value={workout.exercises[i].distance_units}>
														<option>mile</option>
														<option>km</option>
													</select>
												</div>
											{:else if workout.exercises[i].type == 'Duration'}
												<p>Time</p>
												<div class="input-group w-40 input-group-divider grid-cols-[auto_1fr_auto]">
													<input
														type="number"
														class="w-36"
														placeholder="Time"
														bind:value={workout.exercises[i].duration[set]}
													/>
													<select bind:value={workout.exercises[i].duration_units}>
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
				</div>
				</svelte:fragment>
				</AccordionItem>
			{/each}
			</Accordion>
		</div>
	{/if}
</form>
