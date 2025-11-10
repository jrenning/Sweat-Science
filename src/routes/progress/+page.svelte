<script lang="ts">
	import ClockIcon from '../../components/Icons/ClockIcon.svelte';
	import ChartIcon from '../../components/Icons/ChartIcon.svelte';
	import type { PageData } from './$types';
	import WorkoutLogs from '../../components/Progress/Log/WorkoutLogs.svelte';
	import ExerciseSelector from '../../components/UI/ExerciseSelector.svelte';
	import { goto } from '$app/navigation';
	import RecentSearches from '../../components/Progress/RecentSearches.svelte';
	import FormButton from '../../components/UI/Buttons/FormButton.svelte';
	import type { Exercise } from '$lib/db/schema';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let page = $state(1);

	function goToProgress(exercise: Exercise) {
		goto(`/progress/${exercise.id}`);
	}
</script>

<div class="justify-center">
	<div class="flex space-x-20 justify-center mb-6">
		<button class="flex flex-col justify-center items-center" onclick={()=> page =1}>
			<div class="w-5 h-5 justify-center flex items-center"><ClockIcon /></div>
			<span>Log</span>
		</button>
		<button onclick={() => page = 2}>
			<div class="w-5 h-5 justify-center flex items-center"><ChartIcon /></div>
			<span>Progress</span>
		</button>
	</div>
	<!-- Tab Panels --->
	{#if page == 1}
		<div class="mx-4 mb-8">
			<a href="/log_workout"><FormButton text="Log Workout" /></a>
		</div>
		<WorkoutLogs workouts={data.workouts} />
	{:else}
		<ExerciseSelector callback={goToProgress} />

		<RecentSearches exercises={data.searches} />
	{/if}
</div>
