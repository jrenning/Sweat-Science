<script lang="ts">
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import ClockIcon from "../../components/Icons/ClockIcon.svelte";
	import ChartIcon from "../../components/Icons/ChartIcon.svelte";
	import type { PageData } from "./$types";
	import WorkoutLogs from "../../components/Log/WorkoutLogs.svelte";
	import ExerciseSelector from "../../components/UI/ExerciseSelector.svelte";
	import { goto } from "$app/navigation";

    let tabSet: number = 0

	export let data: PageData

	function goToProgress(id: unknown) {
		goto(`/progress/${id}`)
	}

</script>

<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="tab1" value={0} class="flex justify-center items-center" >
		<svelte:fragment slot="lead"><div class="w-5 h-5 justify-center flex items-center"><ClockIcon /></div></svelte:fragment>
		<span>Log</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>
        <svelte:fragment slot="lead"><div class="w-5 h-5 justify-center flex items-center"><ChartIcon /></div></svelte:fragment>
        <span>Progress</span>
    </Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<!-- <WorkoutLogs workouts={data.workouts}/> -->
		{:else if tabSet === 1}
			<ExerciseSelector exercises={data.exercises} callback={goToProgress}/>
        {/if}
	</svelte:fragment>
</TabGroup>