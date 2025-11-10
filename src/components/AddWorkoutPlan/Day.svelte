<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { current_day, current_plan_id } from '../../stores/workout_plan';

	interface Props {
		number: number | undefined;
		global_day?: number | undefined;
	}

	let { number, global_day = undefined }: Props = $props();

	let workout_number: number = $state(0);

	onMount(async () => {
		if (number) {
			const data = await fetch('/api/workout_plan/workouts', {
				method: 'POST',
				body: JSON.stringify({ day: global_day })
			});

			const { workouts } = await data.json();

			workout_number = workouts;
		}
	});
</script>

<a href={`/add_workout_plan/${global_day}`}>
	<div class="w-full h-[60px] border border-black rounded-md bg-surface-100 text-lg font-semibold">
		<div class="mx-2 text-black">{number ? number : ''}</div>
		{#if workout_number}<div
				class="rounded-full text-xs mt-2 mx-1 flex justify-center items-center shadow-sm variant-filled-tertiary"
			>
				{workout_number}
			</div>
		{/if}
	</div>
</a>
