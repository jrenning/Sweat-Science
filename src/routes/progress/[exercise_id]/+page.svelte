<script lang="ts">
	import ExerciseLogEntry from '../../../components/Progress/Log/ExerciseLogEntry.svelte';
	import BackButton from '../../../components/UI/Buttons/BackButton.svelte';
	import type { PageData } from './$types';
	import InfoIcon from '../../../components/Icons/InfoIcon.svelte';
	import TableIcon from '../../../components/Icons/TableIcon.svelte';
	import ClipboardIcon from '../../../components/Icons/ClipboardIcon.svelte';
	import ChartIcon from '../../../components/Icons/ChartIcon.svelte';
	import InfoSection from '../../../components/Progress/InfoSection.svelte';
	import ExerciseLogs from '../../../components/Progress/Log/ExerciseLogs.svelte';
	import RepMaxPlot from '../../../components/Progress/Charts/RepMaxPlot.svelte';
	import MaxAveragePlot from '../../../components/Progress/Charts/MaxAveragePlot.svelte';
	import PercentChangeInfo from '../../../components/Progress/PercentChangeInfo.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let tabSet: number = $state(0);

	let categories = ['Wt', 'Begin', 'Nov', 'Int', 'Adv'];
</script>

{#if data.exercise}
	<div class="flex justify-center items-center flex-col w-full">
		<div class="flex w-full justify-evenly space-x-6 mb-10">
			<BackButton link="/progress" />
			<h2 class="text-3xl font-bold">{data.exercise?.name}</h2>
			<div></div>
		</div>

		<div class="flex flex-row space-x-6 mb-6">
			<button class="flex flex-col" onclick={()=> tabSet=0}>
				<div class="w-5 h-5"><InfoIcon /></div>
				<span>Info</span>
			</button>
			<button class="flex flex-col" onclick={()=> tabSet=1}>
				<div class="w-5 h-5"><ChartIcon /></div>
				<span>Charts</span>
			</button>
			<button class="flex flex-col" onclick={()=> tabSet=2}>
				<div class="w-5 h-5"><TableIcon /></div>
				<span>Data</span>
			</button>
			<button class="flex flex-col" onclick={()=> tabSet=3}>
				<div class="w-5 h-5"><ClipboardIcon /></div>
				<span>Log</span>
			</button>
		</div>
		<div>
			<!-- div Panels --->
				{#if tabSet === 0}
					<InfoSection
						exercise={data.exercise}
						rep_max={data.rep_max}
						current_max={data.current_max}
						times_performed={data.log.length}
					/>
				{:else if tabSet === 1}
					<PercentChangeInfo exercise_data={data.log} />
					<RepMaxPlot exercise_data={data.log} />
				{:else if tabSet === 2}
					<div class="table-container">
						<table class="table">
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
					<ExerciseLogs logs={data.log} type="Date" />
				{/if}
		</div>
	</div>
{/if}
