<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';

	import WorkoutOptions from '../Popups/WorkoutOptions.svelte';
	interface Props {
		workout: WorkoutRoutineWithExercises;
	}

	let { workout }: Props = $props();
</script>

<div
	class="flex-grow-0 flex-shrink-0 flex-auto rounded-md bg-surface-400 border border-black shadow-md md:w-[300px] w-[250px] h-[250px] md:h-[300px]"
>
	<div class="flex justify-end p-2">
		<WorkoutOptions name={workout.name} id={workout.id} />
	</div>

	<div class="h-[50%]"></div>
	<div class="flex text-black ml-4">
		<h2 class="md:text-4xl text-3xl font-bold align-bottom">{workout.name}</h2>
	</div>
	<div class="flex mt-2 ml-4">
		<div class="flex justify-between w-full">
			<div class=" justify-start">
				<Popover>
					<Popover.Trigger class="badge md:text-lg text-sm bg-surface-300">
						{workout.exercises.length} Exercises
					</Popover.Trigger>
					<Portal>
						<Popover.Positioner>
							{#if workout.exercises.length > 1}
								<Popover.Content class="card p-2 bg-secondary-200">
									<ol class="list mx-2">
										{#each workout.exercises as exercise, index}
											<li>
												<span class="rounded-full preset-filled-secondary-500 px-2 py-1"
													>{index + 1}.</span
												>
												<span class="flex-auto text-md">{exercise.exercise.name}</span>
											</li>
										{/each}
									</ol>
								</Popover.Content>
							{/if}
						</Popover.Positioner>
					</Portal>
				</Popover>
			</div>
			<div></div>
			<a href={`/active_workout/${workout.id}`}
				><button class="bg-secondary-500 px-4 mr-2 py-1 rounded-md shadow-md">➤</button></a
			>
		</div>
	</div>
</div>
