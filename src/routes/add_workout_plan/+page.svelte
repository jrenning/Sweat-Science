<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import AdjustableCalender from '../../components/AddWorkoutPlan/AdjustableCalender.svelte';
	import { current_day, current_plan_id } from '../../stores/workout_plan';
	import { getDateInputFormatString } from '../../helpers/datetime';
	import { setContext } from 'svelte';

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

	export const snapshot = { capture, restore };

	$: end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + $planForm.total_days);

	function updatePage(number: number) {
		pg = number;
	}



	function getWorkoutsOnDay(day: number) {
		return data.workouts.filter((item) => item.days && item.days.includes(day)).length;
	}

	setContext('workout_plan_page', {
		updatePage,
		getWorkoutsOnDay
	});


	function updatePlanDays(change: number) {
		if ($planForm.total_days + change < 0) {
			$planForm.total_days = 0;
		} else {
			$planForm.total_days = $planForm.total_days + change;
		}
	}

</script>

<form
	method="POST"
	action="/add_workout_plan?/workout_plan"
	class="flex flex-col space-y-4 bg-surface-400 m-4 rounded-md p-2"
	use:planEnhance
>
	{#if pg == 1}
		<input type="hidden" name="user_id" value={$page.data.session?.user.id} />
		{#if $planForm.id}<input type="hidden" name="id" value={$planForm.id} />{/if}
		<label for="name" class="label">Name</label>
		<input type="text" id="name" name="name" class="input" bind:value={$planForm.name} />
		{#if $planFormErrors.name}<span>{$planFormErrors.name}</span>{/if}
		<label for="description" class="label">Description</label>
		<input
			type="text"
			id="description"
			class="input"
			name="description"
			bind:value={$planForm.description}
		/>
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
		</div>
	{/if}
</form>
