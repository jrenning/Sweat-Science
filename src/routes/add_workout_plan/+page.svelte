<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import WorkoutForm from '../../components/AddWorkout/WorkoutForm.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import FormStepChange from '../../components/AddWorkout/FormStepChange.svelte';
	import AdjustableCalender from '../../components/AddWorkout/AdjustableCalender.svelte';
	import { current_plan_id } from '../../stores/workout_plan';
	import { getDateInputFormatString } from '../../helpers/datetime';

	let pg = $page.url.searchParams.get('page') ? Number($page.url.searchParams.get('page')) : 1;

	console.log(pg)

	const start = new Date(2023, 9, 17);

	$: end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + $formPlanSecond.days);
	export let data: PageData;

	const { form: planForm, errors: planFormErrors, enhance: planEnhance } = superForm(data.formWorkoutPlan);
	const { form: formPlanSecond, enhance: planTwoEnhance } = superForm(data.formPlanSecond);

	$current_plan_id = $planForm.id ? $planForm.id : 0;
</script>

<FormStepChange bind:pg names={['General', 'Workouts']} />
<SuperDebug data={$planForm} />
{#if pg == 1}
	<form
		method="POST"
		action="/add_workout_plan?/workout_plan"
		class="flex flex-col space-y-4 bg-red-50 m-4 rounded-md p-2"
		use:planEnhance
	>
		<input type="hidden" name="user_id" value={$page.data.session?.user.id} />
		{#if $planForm.id}<input type="hidden" name="id" value={$planForm.id} />{/if}
		<label for="name">Name</label>
		<input type="text" id="name" name="name" bind:value={$planForm.name} />
		{#if $planFormErrors.name}<span>{$planFormErrors.name}</span>{/if}
		<label for="description">Description</label>
		<input type="text" id="description" name="description" bind:value={$planForm.description} />
		<label for="start_date">Start Date</label>
		<input
			type="date"
			id="start_date"
			name="start_date"
			min={getDateInputFormatString(new Date())}
			bind:value={$planForm.start_date}
		/>
		{#if $planFormErrors.start_date}<span>{$planFormErrors.start_date}</span>{/if}

		<button class="rounded-md shadow-md px-2 py-1 bg-red-100" type="submit"> Submit </button>
	</form>
{:else if pg == 2}
	<form method="POST" action="/add_workout_plan?/workout_plan_two" use:planTwoEnhance>
		<div class="flex flex-col justify-center items-center">
			<label for="days">Number of Days</label>
			<div class="flex justify-center items-center space-x-4">
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => {
						if ($formPlanSecond.days > 6) {
							$formPlanSecond.days -= 7;
						} else {
							$formPlanSecond.days = 0;
						}
					}}
					type="button">- Week</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => {
						if ($formPlanSecond.days > 0) {
							$formPlanSecond.days -= 1;
						}
					}}
					type="button">-</button
				>

				<input bind:value={$formPlanSecond.days} class="w-8" name="days" />
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => ($formPlanSecond.days += 1)}
					type="button">+</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => ($formPlanSecond.days += 7)}
					type="button">+ Week</button
				>
			</div>
			<div>
				<button class="btn variant-filled-primary mt-4 shadow-md">Submit</button>
			</div>

			<AdjustableCalender start_date={start} end_date={end} />
		</div>
	</form>
{:else if pg == 3}
	<div>Confirm Creation</div>
	<button>Confirm</button>
{/if}
