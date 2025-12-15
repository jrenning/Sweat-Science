<script lang="ts">
	import { page } from '$app/stores';
	import LastWorkout from '../components/Widgets/LastWorkout.svelte';
	import SectionHeader from '../components/UI/SectionHeader.svelte';
	import WorkoutAdd from '../components/StartWorkout/WorkoutView.svelte';
	import type { PageData } from './$types';
	import SubscribeButton from '../components/Notifications/SubscribeButton.svelte';
	import CurrentGoals from '../components/Widgets/CurrentGoals.svelte';
	import WorkoutPlanView from '../components/StartWorkout/WorkoutPlanView.svelte';
	import CurrentWorkoutPlan from '../components/Widgets/CurrentWorkoutPlan.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div>
	{#if $page.data.session}
		<div class="flex flex-col justify-center items-center">
			<div class="w-[80%]">
				<LastWorkout last_workout={data.data.last_workout && data.data.last_workout} last_workout_metrics={data.data.last_workout_metrics} />
				{#if data.data.current_plan}
				<div class="my-6">
					<CurrentWorkoutPlan current_plan={data.data.current_plan} current_workouts={data.data.plan_workout_data} />
					</div>
				{/if}
				<CurrentGoals goal_data={data.data.goal_data && data.data.goal_data} />
				<SectionHeader name="Start Workout" />
				<a href="/workout_folder"><button class="font-semibold text-gray-400">My Folders</button></a
				>
				{#if data.data.all_workouts}
					<WorkoutAdd workouts={data.data.all_workouts} />
				{/if}
				<SectionHeader name="Start Workout Plan" />
				{#if data.data.workout_plans}
					<WorkoutPlanView workout_plans={data.data.workout_plans} />
				{/if}
			</div>
		</div>
	{:else}
		<div></div>
	{/if}
</div>
