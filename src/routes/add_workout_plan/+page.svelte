<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import AdjustableCalender from '../../components/AddWorkoutPlan/AdjustableCalender.svelte';
	import { current_day, current_plan_id } from '../../stores/workout_plan';
	import { getDateInputFormatString } from '../../helpers/datetime';
	import { setContext } from 'svelte';
	import ChevronIcon from '../../components/Icons/ChevronIcon.svelte';
	import AddButton from '../../components/UI/Buttons/AddButton.svelte';
	import { onNavigate } from '$app/navigation';

	let pg = $page.url.searchParams.get('page') ? Number($page.url.searchParams.get('page')) : 1;

	export let data: PageData;

	const {
		form: planForm,
		errors: planFormErrors,
		enhance: planEnhance,
		capture,
		restore
	} = superForm(data.formWorkoutPlan, {
		taintedMessage: false
	});

	$current_plan_id = $planForm.id ? $planForm.id : 0;

	const start = new Date();

	export const snapshot = { capture, restore };

	$: end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + $planForm.total_days);

	function updatePage(number: number) {
		pg = number;
	}



	function getWorkoutsOnDay(day: number) {
		if (data.workouts) {
			return data.workouts.filter((item) => item.days && item.days.includes(day)).length;
		}
		return 0
		
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

	onNavigate(async ()=> {
		// update plan days before navigation
		await fetch("/api/workout_plan/days", {
			method: "POST",
			body: JSON.stringify({total_days: $planForm.total_days, plan_id: $current_plan_id})
		})
	})

</script>

<form
	method="POST"
	action="/add_workout_plan?/workout_plan"
	class="flex flex-col space-y-4 bg-surface-200 m-4 rounded-md p-2"
	use:planEnhance
>
	{#if pg == 1}
		<input type="hidden" name="user_id" value={$page.data.session?.user.id} />
		{#if $planForm.id}<input type="hidden" name="id" value={$planForm.id} />{/if}
		<label for="name" class="label font-semibold text-xl">Name</label>
		<input type="text" id="name" name="name" class="input" bind:value={$planForm.name} />
		{#if $planFormErrors.name}<span>{$planFormErrors.name}</span>{/if}
		<label for="description" class="label font-semibold text-xl">Description</label>
		<input
			type="text"
			id="description"
			class="input"
			name="description"
			bind:value={$planForm.description}
		/>
		<!-- <label for="start_date" class="label">Start Date</label>
		<input
			class="input"
			type="date"
			id="start_date"
			name="start_date"
			min={getDateInputFormatString(new Date())}
			bind:value={$planForm.start_date}
		/> -->
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
			
			<div class="flex justify-evenly w-full mb-6">
				<button class="rotate-180" on:click={()=> pg = 1}><ChevronIcon /></button>
				<label for="days" class="font-semibold text-xl">Number of Days</label>
				<div></div>
			</div>
			<div class="flex justify-center items-center space-x-4">
				<button
					class="rounded-md btn-md bg-surface-300 shadow-md px-2 py-1"
					on:click={() => {
						updatePlanDays(-7);
					}}
					type="button">- Week</button
				>
				<button
					class="rounded-md shadow-md bg-surface-300 px-2 py-1 btn-md"
					on:click={() => {
						updatePlanDays(-1);
					}}
					type="button">-</button
				>

				<input bind:value={$planForm.total_days} class=" input w-8" name="days" />
				<button
					class="rounded-md shadow-md px-2 py-1 bg-surface-300 btn-md"
					on:click={() => updatePlanDays(1)}
					type="button">+</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-surface-300 btn-md"
					on:click={() => updatePlanDays(7)}
					type="button">+ Week</button
				>
			</div>

			<AdjustableCalender start_date={start} end_date={end} />
			<AddButton />
		</div>
	{:else if pg == 3}
		<div class="flex flex-col space-y-4">
			<button class="btn-md variant-outline-secondary" type="button" on:click={() => (pg -= 1)}
				>Go Back</button
			>
		</div>
	{/if}
</form>
