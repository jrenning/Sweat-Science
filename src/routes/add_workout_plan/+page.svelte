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
	import WorkoutPlanReview from '../../components/AddWorkoutPlan/WorkoutPlanReview.svelte';
	import SuperDebug from 'sveltekit-superforms';

	let pg = $state(
		$page.url.searchParams.get('page') ? Number($page.url.searchParams.get('page')) : 1
	);

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const {
		form: planForm,
		errors: planFormErrors,
		enhance: planEnhance,
		capture,
		restore
	} = superForm(data.formWorkoutPlan, {
		dataType: "json"
	});

	$current_plan_id = $planForm.id ? $planForm.id : 0;

	const start = new Date();

	export const snapshot = { capture, restore };

	let end = $derived(
		new Date(start.getFullYear(), start.getMonth(), start.getDate() + $planForm.total_days)
	);

	function updatePage(number: number) {
		pg = number;
	}

	function getWorkoutsOnDay(day: number) {
		if (data.workouts) {
			return data.workouts.filter((item) => item.days && item.days.includes(day)).length;
		}
		return 0;
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

	onNavigate(async () => {
		// update plan days before navigation
		await fetch('/api/workout_plan/days', {
			method: 'POST',
			body: JSON.stringify({ total_days: $planForm.total_days, plan_id: $current_plan_id })
		});
	});
</script>

<form
	method="POST"
	action="/add_workout_plan?/workout_plan"
	class="flex flex-col space-y-4 bg-surface-200 m-4 rounded-md p-2"
	use:planEnhance
>
<SuperDebug data={planForm} />
	{#if pg == 1}
		<input type="hidden" name="user_id" value={$page.data.session?.user?.id} />
		{#if $planForm.id}<input type="hidden" name="id" value={$planForm.id} />{/if}
		<label for="name" class="label font-semibold text-xl">Name</label>
		<input type="text" id="name" name="name" class="input rounded-md border-1 border" bind:value={$planForm.name} />
		{#if $planFormErrors.name}<span>{$planFormErrors.name}</span>{/if}
		<label for="description" class="label  font-semibold text-xl">Description</label>
		<input
			type="text"
			id="description"
			class="input rounded-md border-1 border"
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
			class="rounded-md shadow-md px-2 py-1 preset-filled-surface-500"
			type="button"
			onclick={() => (pg += 1)}
		>
			Next
		</button>
	{:else if pg == 2}
		<div class="flex flex-col justify-center items-center">
			<div class="flex justify-evenly w-full mb-6">
				<button class="rotate-180" onclick={() => (pg = 1)}><ChevronIcon /></button>
				<label for="days" class="font-semibold text-xl">Number of Days</label>
				<div></div>
			</div>
			<div class="flex justify-center items-center space-x-4">
				<button
					class="rounded-md btn-md bg-surface-300 shadow-md px-2 py-1"
					onclick={() => {
						updatePlanDays(-7);
					}}
					type="button">- Week</button
				>
				<button
					class="rounded-md shadow-md bg-surface-300 px-2 py-1 btn-md"
					onclick={() => {
						updatePlanDays(-1);
					}}
					type="button">-</button
				>

				<input bind:value={$planForm.total_days} class=" input w-12" name="days" />
				<button
					class="rounded-md shadow-md px-2 py-1 bg-surface-300 btn-md"
					onclick={() => updatePlanDays(1)}
					type="button">+</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-surface-300 btn-md"
					onclick={() => updatePlanDays(7)}
					type="button">+ Week</button
				>
			</div>

			<AdjustableCalender start_date={start} end_date={end} />
			<div class="flex space-x-6">
				<a
					class="rounded-md mt-6 shadow-md px-2 py-1 preset-filled-surface-500"
					type="button"
					href="/add_workout_plan/multi-day"
				>
					Multi-Day View
				</a>
				<button
					class="rounded-md mt-6 shadow-md px-2 py-1 preset-filled-surface-500"
					type="button"
					onclick={() => (pg += 1)}
				>
					Review
				</button>
			</div>
		</div>
	{:else if pg == 3 && $planForm.id}
		<div class="flex flex-col space-y-4">
			<button class="btn-md variant-outline-secondary" type="button" onclick={() => (pg -= 1)}
				>Go Back</button
			>
			<WorkoutPlanReview plan_id={$planForm.id} plan_days={$planForm.total_days} />
			<button class="btn bg-surface-300" type="submit" >Add Workout Plan</button>
		</div>
	{/if}
</form>
