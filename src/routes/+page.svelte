<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import Welcome from '../components/UI/Welcome.svelte';
	import AddButton from '../components/UI/AddButton.svelte';
	import LastWorkout from '../components/Widgets/LastWorkout.svelte';
	import SectionHeader from '../components/UI/SectionHeader.svelte';
	import WorkoutAdd from '../components/StartWorkout/WorkoutView.svelte';
	import SeedEquipment from '../components/SeedData/SeedEquipment.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	{#if $page.data.session}
		<div class="flex flex-col justify-center items-center">
			<div class="w-[80%]">
				<LastWorkout last_workout={data.data.last_workout && data.data.last_workout} />
				<SectionHeader name="Start Workout" />
				<WorkoutAdd workouts={data.data.all_workouts} />
				<SectionHeader name="My Activity" />
			</div>
		</div>
	{:else}
		<div />
	{/if}
</div>
