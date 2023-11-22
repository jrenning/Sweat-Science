<script lang="ts">
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import ExerciseLogEntry from "../../../components/Log/ExerciseLogEntry.svelte";
	import BackButton from "../../../components/UI/BackButton.svelte";
	import type { PageData } from "./$types";
    import InfoIcon from "../../../components/Icons/InfoIcon.svelte"
        import TableIcon from "../../../components/Icons/TableIcon.svelte"
	import ChartIcon from "../../../components/Icons/ChartIcon.svelte";
	import InfoSection from "../../../components/Progress/InfoSection.svelte";


    export let data: PageData
    let tabSet: number = 0;

</script>


<div class="flex justify-center items-center flex-col w-full">

    <div class="flex w-full justify-evenly space-x-6 mb-10">
        <BackButton link="/progress" />
        <h2 class="text-3xl font-bold">{data.exercise?.name}</h2>
        <div></div>
    </div>

    <TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>
		<svelte:fragment slot="lead"><div class="w-5 h-5"><InfoIcon /></div></svelte:fragment>
		<span>Info</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>
        <svelte:fragment slot="lead"><div class="w-5 h-5"><ChartIcon /></div></svelte:fragment>
		<span>Charts</span>
    </Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>
            <svelte:fragment slot="lead"><div class="w-5 h-5"><TableIcon /></div></svelte:fragment>
		<span>Data</span>
    </Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<InfoSection />
		{:else if tabSet === 1}
			(tab panel 2 contents)
		{:else if tabSet === 2}
			(tab panel 3 contents)
		{/if}
	</svelte:fragment>
</TabGroup>





</div>