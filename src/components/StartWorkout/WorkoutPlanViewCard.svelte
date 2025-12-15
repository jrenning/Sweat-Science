<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { WorkoutPlan, WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';

	import WorkoutOptions from '../Popups/WorkoutOptions.svelte';
	interface Props {
		workout_plan: WorkoutPlan;
	}

	let { workout_plan }: Props = $props();

	let chosen_date: string | undefined = $state();
	let dialog: HTMLDialogElement;
	async function startWorkoutPlan() {
		if (chosen_date) {
			const data = {
				plan_id: workout_plan.id,
				start_date: new Date(chosen_date)
			};

			// add the workout
			const res = await fetch('/api/workout_plan/start', {
				method: 'POST',
				body: JSON.stringify(data)
			});

			await invalidateAll();

			dialog.close()
		}
	}
</script>

<div
	class="flex-grow-0 flex-shrink-0 flex-auto rounded-md bg-surface-400 border border-black shadow-md md:w-[300px] w-[250px] h-[250px] md:h-[300px]"
>
	<div class="h-[30%]"></div>
	<div class="flex text-black ml-4">
		<h2 class="md:text-4xl text-3xl font-bold align-bottom">{workout_plan.name}</h2>
	</div>
	<div class="flex flex-col mt-2 ml-4">
		<div class=" justify-start">
			<div class="badge md:text-lg text-sm bg-surface-300">
				{workout_plan.total_days} Days
			</div>
		</div>
		<div class="flex justify-between w-full mt-4">
			<input type="date" bind:value={chosen_date} />
			<button
				disabled={!chosen_date}
				class="bg-secondary-500 px-4 mr-2 py-1 rounded-md shadow-md"
				onclick={() => dialog.showModal()}>Start</button
			>
		</div>
		<dialog bind:this={dialog}>
			<div class="fixed inset-0 z-50 flex justify-center items-center p-4">
				<div class="card bg-surface-100-900 w-full max-w-xl p-4 space-y-4 shadow-xl">
					<div class="flex flex-col justify-center items-center">
						<h2>You want to start {workout_plan.name} on {chosen_date}?</h2>
						<h3 class="text-xs italic">This will replace the current workout plan in use</h3>
						<button
							onclick={() => startWorkoutPlan()}
							class="bg-secondary-500 mt-6 mx-12 px-4 py-1 rounded-md shadow-md">Let's Go</button
						>
					</div>
				</div>
			</div>
		</dialog>
	</div>
</div>
