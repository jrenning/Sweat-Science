<script lang="ts">
	import type { InsertWorkoutPlan, WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { onMount } from 'svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import AddWorkoutCard from './AddWorkoutCard.svelte';
	import WorkoutForm from '../AddWorkout/WorkoutForm.svelte';
	import WorkoutExerciseDetail from './WorkoutExerciseDetail.svelte';

	interface Props {
		plan_id: number;
		plan_days: number;
	}

	let workout_routines: WorkoutRoutineWithExercises[] | undefined = $state();

	onMount(async () => {
		await getPlanData();
	});

	async function getPlanData() {
		const plan_req = await fetch(`/api/workout_plan/${plan_id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const plan_data = await plan_req.json();

		workout_routines = plan_data;
		console.log(workout_routines);
	}

	let { plan_days, plan_id }: Props = $props();

	// get the highest day in any of the workouts, can use plan number of days
</script>

{#if workout_routines}
	<div>
		<div class="space-y-6">
			<h2 class="font-semibold text-2xl mx-4">Workouts</h2>
			{#each { length: plan_days+1 }, i}
				{#if i > 0}
					<h2>Day {i}</h2>
					{#each workout_routines.filter((w) => w.days?.includes(i)) as workout}
						<WorkoutExerciseDetail {workout}/>
					{/each}
				{/if}
			{/each}
		</div>
	</div>
{/if}
