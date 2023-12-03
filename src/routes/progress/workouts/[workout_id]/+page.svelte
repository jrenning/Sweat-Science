<script lang="ts">
	import ExerciseLogs from '../../../../components/Progress/Log/ExerciseLogs.svelte';
	import BackButton from '../../../../components/UI/Buttons/BackButton.svelte';
	import { prettifyDate } from '../../../../helpers/datetime';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<div class="flex flex-col justify-center items-center">
		<div class="flex justify-between w-[95%]">
			<BackButton link="/progress" />
			<div class="text-3xl font-bold">{data.data?.name}</div>
			<div />
		</div>
		<div class="text-xl italic font-semibold text-gray-400">
			{data.data?.created_at ? prettifyDate(data.data?.created_at) : 'Unknown'}
		</div>
	</div>

	{#if data.data}
		<ExerciseLogs logs={data.data?.exercise_routines} type="Exercise" />
	{/if}
</div>
