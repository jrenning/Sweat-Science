<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import ExerciseLogEntry from '../../../components/Progress/Log/ExerciseLogEntry.svelte';
	import BackButton from '../../../components/UI/BackButton.svelte';
	import type { PageData } from './$types';
	import InfoIcon from '../../../components/Icons/InfoIcon.svelte';
	import TableIcon from '../../../components/Icons/TableIcon.svelte';
		import ClipboardIcon from '../../../components/Icons/ClipboardIcon.svelte';
	import ChartIcon from '../../../components/Icons/ChartIcon.svelte';
	import InfoSection from '../../../components/Progress/InfoSection.svelte';
	import DataSection from '../../../components/Progress/DataSection.svelte';
	import WorkoutLogs from '../../../components/Progress/Log/WorkoutLogs.svelte';
	import ExerciseLogs from '../../../components/Progress/Log/ExerciseLogs.svelte';
	import ChartContainer from '../../../components/Progress/Charts/ChartContainer.svelte';

	export let data: PageData;
	let tabSet: number = 0;

	let categories = ['Wt', 'Begin', 'Nov', 'Int', 'Adv'];
</script>

{#if data.exercise}
	<div class="flex justify-center items-center flex-col w-full">
		<div class="flex w-full justify-evenly space-x-6 mb-10">
			<BackButton link="/progress" />
			<h2 class="text-3xl font-bold">{data.exercise?.name}</h2>
			<div />
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
			<Tab bind:group={tabSet} name="tab4" value={3}>
				<svelte:fragment slot="lead"><div class="w-5 h-5"><ClipboardIcon /></div></svelte:fragment>
				<span>Log</span>
			</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<InfoSection exercise={data.exercise} rep_max={data.rep_max} times_performed={data.log.length}/>
				{:else if tabSet === 1}
					<ChartContainer exerciseLogs={data.log}/>
				{:else if tabSet === 2}
					<div class="table-container">
						<table class="table table-hover">
							<thead class="space-x-2">
								<tr>
									{#each categories as category}
										<th>{category}</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each data.weight_data as weight}
									<tr>
										<td>{weight.weight}</td>
										<td>{weight.novice}</td>
										<td>{weight.intermediate}</td>
										<td>{weight.advanced}</td>
										<td>{weight.elite}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else if tabSet == 3}
				<ExerciseLogs logs={data.log}/>

				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
{/if}
