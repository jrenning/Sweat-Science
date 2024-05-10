<script lang="ts">
	import type { WorkoutRoutine, WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import WorkoutInFolder from '../../Folders/WorkoutInFolder.svelte';
	import WorkoutSelect from './WorkoutSelect.svelte';
	import SelectContainer from './SelectContainer.svelte';

	let tabSet = 0;
	export let parent

	export let onSelection: (workout: WorkoutRoutine) => void

	//@ts-ignore
	let workout_options: Promise<WorkoutRoutineWithExercises[]> = getWorkoutOptions();
	let recent_workouts: Promise<WorkoutRoutineWithExercises[]> = getRecentWorkouts();
	let favorite_workouts: Promise<WorkoutRoutineWithExercises[]> = getFavoriteWorkouts();

	async function getWorkoutOptions() {
		const workout_data = await fetch('/api/workout_routine', {
			method: 'GET'
		});

		const workouts = await workout_data.json();

		return workouts;
	}

	async function getRecentWorkouts() {
		const recent_workout_data = await fetch('/api/workout_routine/recent', {
			method: 'GET'
		});

		const workouts = await recent_workout_data.json();
		console.log(workouts)
		return workouts;
	}

	async function getFavoriteWorkouts() {
		const favorite_workouts = await fetch('/api/workout_routine/favorite');

		const workouts = await favorite_workouts.json();

		return workouts;
	}
</script>

<div class="card w-[50vw] h-[50vh] overflow-y-scroll">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<span>Recent</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Favorites</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>List</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				{#await recent_workouts}
					<div>Fetching workouts...</div>
				{:then recent_workouts}
					<SelectContainer>
						{#each recent_workouts as workout}
							<WorkoutSelect {workout} {onSelection} />
						{/each}
					</SelectContainer>
				{/await}
			{:else if tabSet === 1}
				{#await favorite_workouts}
					<div>Fetching workouts...</div>
				{:then favorite_workouts}
					<SelectContainer>
						{#each favorite_workouts as workout}
							<WorkoutSelect {workout} {onSelection}/>
						{/each}
					</SelectContainer>
				{/await}
			{:else if tabSet === 2}
				{#await workout_options}
					<div>Fetching workouts...</div>
				{:then workout_options}
					<SelectContainer>
						{#each workout_options as workout}
							<WorkoutSelect {workout} {onSelection}/>
						{/each}
					</SelectContainer>
				{/await}
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
