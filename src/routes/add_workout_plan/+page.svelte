<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import WorkoutForm from '../../components/AddWorkout/WorkoutForm.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import FormStepChange from '../../components/AddWorkout/FormStepChange.svelte';
	import AdjustableCalender from '../../components/AddWorkout/AdjustableCalender.svelte';
	import { current_plan_id } from '../../stores/workout_plan';
	let days: number = 1;

	let pg = $page.url.searchParams.get('page') ? Number($page.url.searchParams.get('page')) : 1;

	const start = new Date(2023, 9, 17);

	$: end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + days);
	export let data: PageData;

	const { form: planForm } = superForm(data.formWorkoutPlan);
	const { form: workoutForm } = superForm(data.formWorkout);

	
</script>

<FormStepChange bind:pg names={['General', 'Workouts']} />
<SuperDebug data={$planForm} />
{#if pg == 1}
	<form method="POST" action="/add_workout_plan?/workout_plan" class="flex flex-col space-y-4 bg-red-50 m-4 rounded-md p-2">
		<input type="hidden" name="user_id" value={$page.data.session?.user.id}/>
		<label for="name" >Name</label>
		<input type="text" id="name" name="name" bind:value={$planForm.name}/>
		<label for="description">Description</label>
		<input type="text" id="description" name="description" bind:value={$planForm.description}/>
		<label for="start_date">Start Date</label>
		<input type="date" id="start_date" name="start_date" bind:value={$planForm.start_date}/>

		<button> Submit </button>
		

		<button class="rounded-md shadow-md px-2 py-1 bg-red-100" type="submit" on:click={() => (pg += 1)}>
			Next
		</button>
	</form>
{:else if pg == 2}
	<form>
		<div class="flex flex-col justify-center items-center">
			<label for="days">Number of Days</label>
			<div class="flex justify-center items-center space-x-4">
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => {
						if (days > 6) {
							days -= 7;
						} else {
							days = 0;
						}
					}}
					type="button">- Week</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => {
						if (days > 0) {
							days -= 1;
						}
					}}
					type="button">-</button
				>

				<input value={days} class="w-8" />
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => (days += 1)}
					type="button">+</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => (days += 7)}
					type="button">+ Week</button
				>
			</div>

			<AdjustableCalender start_date={start} end_date={end} />
		</div>

		<div class="flex justify-center items-center space-x-4">
			<button class="rounded-md shadow-md px-2 py-1 bg-red-100" on:click={() => (pg -= 1)}>
				Previous
			</button>
			<button class="rounded-md shadow-md px-2 py-1 bg-red-100" on:click={() => (pg += 1)}>
				Next
			</button>
		</div>
	</form>
{/if}
