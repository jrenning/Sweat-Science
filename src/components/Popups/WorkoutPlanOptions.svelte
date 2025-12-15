<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
	interface Props {
		id: number;
        start_date: Date
	}

	let { id, start_date }: Props = $props();

	async function stopWorkoutPlan() {
		const data = {
			plan_id: id
		};

		await fetch('/api/workout_plan/stop', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		// refresh page data
		await invalidateAll();
	}
</script>

<Popover>
	<Popover.Trigger>
		<div class="flex space-x-1">
			<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
			<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
			<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
		</div>
	</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content
				class="card flex flex-col justify-center text-sm items-center space-y-4 p-2 bg-surface-100"
			>
				<button onclick={()=> stopWorkoutPlan()}>Stop</button>
				<a class="flex flex-col space-y-1" href={`/workout_plan/${id}?start_date=${start_date.toISOString()}`}>View Progress</a>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
