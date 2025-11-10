<script lang="ts">
	import { dataTool } from 'echarts';
	import ExerciseLogs from '../../../../components/Progress/Log/ExerciseLogs.svelte';
	import BackButton from '../../../../components/UI/Buttons/BackButton.svelte';
	import FormButton from '../../../../components/UI/Buttons/FormButton.svelte';
	import LastWorkout from '../../../../components/Widgets/LastWorkout.svelte';
	import { prettifyDate } from '../../../../helpers/datetime';
	import type { PageData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { calcOneRepMax, calculateOneRepFromArray } from '../../../../helpers/rep_max';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();



	async function deleteLog() {
		if (!data.data) {
			return;
		}
		const request = {
			log_id: data.data.id
		};

		await fetch('/api/logs/delete', {
			method: 'POST',
			body: JSON.stringify(request),
			headers: {
				'content-type': 'application/json'
			}
		});
		// go back to home
		goto('/progress');
	}
</script>

<div>
	<div class="flex flex-col justify-center items-center">
		<div class="flex justify-between w-[95%]">
			<BackButton link="/progress" />
			<div></div>
		</div>
	</div>
	{#if data.data}
		<div class="mx-4 my-6">
			<LastWorkout last_workout={data.data} />
		</div>
		<div class="rounded-md flex flex-col mb-6 bg-surface-100 shadow-md mx-10">
			<div class="mx-4 text-xl font-semibold">Notes</div>
			<div class="mx-4">{data.data?.notes}</div>
		</div>
		<div class="flex justify-center space-x-4">
			<FormButton text="Remove" action={() => deleteLog()} />
			<FormButton text="Edit" />
		</div>

		<ExerciseLogs logs={data.data?.exercise_routines} type="Exercise" comparison_data={data.last_performed_data}/>
	{:else}
		<div class="flex justify-center font-semibold">This log couldn't be found</div>
	{/if}
</div>
