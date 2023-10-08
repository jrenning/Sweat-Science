<script lang="ts">
	import { ProgressBar, Step, Stepper } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Timer from '../../../components/ActiveWorkout/Timer.svelte';
	import { current_day } from '../../../stores/workout_plan';

	export let data: PageData;

	let exercise: number = 0;
	$: progress = ((exercise + 1) / exercise_total) * 2;
	$: exercise_total = data.workout?.exercises.length ? data.workout.exercises.length : 0;
	$: arr = data.workout?.exercises[exercise];
	$: current_exercise = arr?.exercise_routine;

	console.log(progress);
</script>

{#if data.workout}
	<div class="flex flex-col justify-center items-center space-y-6">
		<div class="text-2xl font-semibold">{data.workout.name}</div>
		<div class="w-[80%] flex flex-row justify-center items-center space-x-4">
			<ProgressBar max={data.workout.exercises.length} value={progress} />
			{#if exercise + 1 <= exercise_total}
				<div>{exercise + 1}/{exercise_total}</div>
			{:else}
				<div>{exercise}/{exercise_total}</div>
			{/if}
		</div>
		{#if current_exercise}
			{current_exercise.exercise.name}

			{#if current_exercise.sets > 1}
				<Stepper stepTerm="Set">
					{#each { length: current_exercise.sets } as _, set}
						<Step>
							<svelte:fragment slot="header">{set + 1}</svelte:fragment>
							{#if current_exercise.type == 'Weight'}
								<div class="flex flex-row text-xl space-x-6 justify-center items-center">
									<div class="flex flex-col space-y-4">
										<div class="text-2xl">
											<input class="w-10" value={current_exercise.weight[set]} />
											{current_exercise.weight_units}
										</div>
										<div class="text-sm">Weight</div>
									</div>
									<div class="flex flex-col space-y-4">
										<div class="text-2xl">
											<input class="w-8" value={current_exercise.reps[set]} />
										</div>
										<div class="text-sm">Reps</div>
									</div>
								</div>
							{:else if current_exercise.type == 'Distance'}
								<div class="flex flex-col space-y-4">
									<div class="text-2xl">
										<input class="w-10" value={current_exercise.distance[set]} />

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
			{:else if current_exercise.type == 'Weight'}
				<div class="text-3xl">
					{current_exercise.weight}
					{current_exercise.weight_units} <span>x</span>
					{current_exercise.reps}
				</div>
			{:else if current_exercise.type == 'Duration'}
				<div class="text-5xl">
					{current_exercise.duration}
					{current_exercise.duration_units}
				</div>
			{:else}
				<div class="flex flex-row justify-center items-center">
					<input class="text-3xl w-10" type="number" value={current_exercise.distance} />
					<div>
						{current_exercise.distance_units}
					</div>
				</div>
			{/if}
			{#if current_exercise.rest}
				<div>Rest</div>
				<Timer duration={current_exercise.rest} />
			{/if}
		{:else}
			<form method="POST" class="flex flex-col space-y-8 justify-center items-center">
				<div class="flex flex-col space-y-6">
					<label class="label" for="notes">Notes</label>
					<textarea class="textarea" name="notes" />
				</div>
				<button type="submit" class="btn-md rounded-md variant-filled-surface shadow-md"
					>Log Workout</button
				>
			</form>
		{/if}
		<div class="flex flex-row space-x-4">
			{#if exercise > 0}
				<button
					type="button"
					class="btn-md rounded-md variant-filled-primary shadow-md"
					on:click={() => (exercise -= 1)}>Previous</button
				>
			{/if}
			{#if exercise + 1 < exercise_total}
				<button
					type="button"
					class="btn-md rounded-md variant-filled-primary shadow-md"
					on:click={() => (exercise += 1)}>Next</button
				>
			{/if}
			{#if exercise + 1 == exercise_total}
				<button
					type="button"
					class="btn-md rounded-md variant-filled-secondary shadow-md"
					on:click={() => (exercise += 1)}>Finish</button
				>
			{/if}
		</div>
	</div>
{:else}
	<div>Couldn't find workout...</div>
{/if}
