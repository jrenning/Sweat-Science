<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import Welcome from '../components/UI/Welcome.svelte';
	import AddButton from '../components/UI/AddButton.svelte';
	import LastWorkout from '../components/Widgets/LastWorkout.svelte';
	import SectionHeader from '../components/UI/SectionHeader.svelte';
	import WorkoutAdd from '../components/UI/WorkoutView.svelte';
	import SeedEquipment from '../components/SeedData/SeedEquipment.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<div>
	{#if $page.data.session}
		<div class="flex flex-col justify-center items-center">
			<div class="w-[80%]">
				<div class="flex flex-row space-x-6 justify-center items-center my-6">
					<AddButton object="Workout Plan" link="/add_workout_plan" />
				</div>

				<LastWorkout last_workout={data && data.data.last_workout[0]} />
				<div class="flex flex-col space-y-4">
					<SectionHeader name="Workouts" />
					<AddButton object="Workout" link="/add_workout" />

					<WorkoutAdd workouts={data.data.all_workouts} />
				</div>
			</div>
		</div>
	{:else}
		<div />
	{/if}
</div>
