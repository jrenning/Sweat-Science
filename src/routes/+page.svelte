<script lang="ts">
	import { page } from '$app/stores';
	import LastWorkout from '../components/Widgets/LastWorkout.svelte';
	import SectionHeader from '../components/UI/SectionHeader.svelte';
	import WorkoutAdd from '../components/StartWorkout/WorkoutView.svelte';
	import type { PageData } from './$types';
	import SubscribeButton from '../components/Notifications/SubscribeButton.svelte';

	export let data: PageData;
</script>

<div>
	{#if $page.data.session}
		<div class="flex flex-col justify-center items-center">
			<div class="w-[80%]">
				<LastWorkout last_workout={data.data.last_workout && data.data.last_workout} />
				<SectionHeader name="Start Workout" />
				<a href="/workout_folder"><button class="font-semibold text-gray-400">My Folders</button></a>
				<WorkoutAdd workouts={data.data.all_workouts} />
				<SectionHeader name="My Activity" />
			</div>
		</div>
	{:else}
		<div />
	{/if}
</div>
