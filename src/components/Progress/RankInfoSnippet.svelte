<script lang="ts">
	import { onMount } from 'svelte';
	import TrophyIcon from '../Icons/TrophyIcon.svelte';

	interface Props {
		id: number;
		exercise_id: number;
		after_date: Date;
        all_time: boolean
	}

	let { id, exercise_id, after_date, all_time }: Props = $props();

	type RankData = {
		id: number;
		exercise_id: number;
		average_max: number | null;
		rank: number;
		total: number;
	};

	onMount(async () => {
		await getRankData();
	});

	async function getRankData() {
		const data = {
			id: id,
			exercise_id: exercise_id,
			after_date: after_date,
            all_time: all_time
		};

		const rank_req = await fetch('/api/logs/exercise/rank', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});

		const rank_data: RankData = await rank_req.json();

		rank = rank_data.rank;
		total = rank_data.total;


	}

	let rank: number | null | undefined = $state();
	let total: number | null | undefined = $state();
</script>

{#if rank}
	<div class="flex space-x-2">
		{#if rank == 1}
			<div class="h-4 w-4 fill-amber-400"><TrophyIcon /></div>
		{:else if rank == 2}
			<div class="h-4 w-4 fill-gray-300"><TrophyIcon /></div>
		{:else if rank == 3}
			<div class="h-4 w-4 fill-yellow-700"><TrophyIcon /></div>
		{/if}
		<div class="">{rank}/{total}</div>
	</div>
{/if}
