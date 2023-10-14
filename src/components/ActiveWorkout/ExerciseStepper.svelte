<script lang="ts">
	import type { ExerciseRoutineWithExercise } from '$lib/db/schema';
	import { Step, Stepper } from '@skeletonlabs/skeleton';

	export let current_exercise: ExerciseRoutineWithExercise;
    export let exercise: number
    export let form: any
	export let completeHandler: (E: Event) => void
    console.log(current_exercise)
</script>

<Stepper stepTerm="Set" start={0}>
	{#each { length: current_exercise.sets } as _, set}
		<Step>
			<svelte:fragment slot="header">{set + 1}</svelte:fragment>
			{#if current_exercise.type == 'Weight'}
				<div class="flex flex-row text-xl space-x-6 justify-center items-center">
					<div class="flex flex-col space-y-4">
						<div class="text-2xl">
							<input
								class="w-10"
								type="number"
								bind:value={$form.exercises[exercise].weight[set]}
							/>
							{current_exercise.weight_units}
						</div>
						<div class="text-sm">Weight</div>
					</div>
					<div class="flex flex-col space-y-4">
						<div class="text-2xl">
							<input class="w-8" type="number" bind:value={$form.exercises[exercise].reps[set]} />
						</div>
						<div class="text-sm">Reps</div>
					</div>
				</div>
			{:else if current_exercise.type == 'Distance'}
				<div class="flex flex-col space-y-4">
					<div class="text-2xl">
						<input class="w-10" bind:value={$form.exercises[exercise].distance[set]} />

						{current_exercise.distance_units}
					</div>
					<div class="text-sm">Distance</div>
				</div>
			{:else}
				<div>
					{current_exercise.duration[set]}
					{current_exercise.duration_units}
				</div>
			{/if}
		</Step>
	{/each}
</Stepper>
