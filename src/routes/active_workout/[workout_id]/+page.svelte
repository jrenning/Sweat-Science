<script lang="ts">
	import { ProgressBar, Step, Stepper } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Timer from '../../../components/ActiveWorkout/Timer.svelte';
	import { current_day } from '../../../stores/workout_plan';
	import { superForm } from 'sveltekit-superforms/client';
	import BackStep from '../../../components/Icons/BackStep.svelte';
	import CheckIcon from '../../../components/Icons/CheckIcon.svelte';
	import PlayIcon from '../../../components/Icons/PlayIcon.svelte';
	import BackButton from '../../../components/UI/BackButton.svelte';
	import { writable } from 'svelte/store';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data: PageData;

	let exercise: number = 0;
	let set: number = 1;
	let rest = writable(false);

	$: progress = exercise + 1;
	$: exercise_total = data.workout?.exercises.length ? data.workout.exercises.length : 0;
	$: current_exercise = data.workout?.exercises[exercise];
	$: future_exercise = data.workout?.exercises[exercise + 1];

	let selected_value = current_exercise?.exercise.name;
	function skipToExercise() {
		if (selected_value) {
			const exercise_names = data.workout?.exercises.map((exercise) => exercise.exercise.name);
			const idx = exercise_names?.indexOf(selected_value);
			console.log(idx)
			if (idx !== undefined) {
				exercise = idx;
			}
		}
	}

	const { form, enhance } = superForm(data.workoutForm, {
		dataType: 'json'
	});

	function handleComplete() {
		console.log(current_exercise?.rest);
		if (!current_exercise) return;

		if (!$rest) {
			if (set < current_exercise.sets) {
				set += 1;
				if (current_exercise.rest) {
					rest.set(true);
				}
			} else {
				exercise += 1;
				selected_value = data.workout?.exercises[exercise].exercise.name;
				set = 1;
			}
		} else {
			rest.set(false);
		}
	}

	function handleBack() {
		if (!current_exercise) return;

		if (set > 1) {
			set -= 1;
		} else {
			exercise -= 1;
			//@ts-ignore
			set = data.workout?.exercises[exercise - 1].sets;
			selected_value = data.workout?.exercises[exercise].exercise.name;
		}
	}
</script>

{#if data.workout}
	<form use:enhance method="POST">
		<div class="flex flex-col justify-center items-center space-y-4">
			<div class="flex justify-evenly w-full">
				<BackButton link="/" />

				<div class="text-2xl font-semibold">{data.workout.name}</div>
				<div />
			</div>

			<div class="w-[80%] flex flex-row justify-center items-center space-x-4">
				<ProgressBar max={data.workout.exercises.length} value={progress} />
				{#if exercise + 1 <= exercise_total}
					<div>{exercise + 1}/{exercise_total}</div>
				{:else}
					<div>{exercise}/{exercise_total}</div>
				{/if}
			</div>
			{#if current_exercise}
				<div class="flex font-semibold flex-col space-y-2">
					<select
						class="bg-transparent text-3xl flex justify-center items-center text-center"
						bind:value={selected_value}
						on:change={() => skipToExercise()}
					>
						{#each data.workout.exercises as exercise}
							<option class='text-lg'>{exercise.exercise.name}</option>
						{/each}
					</select>
				</div>
				{#if $rest}
					<div>Rest</div>
				{:else}
					<div>Set {set} / {current_exercise.sets}</div>
				{/if}
				{#if $rest}
					<Timer duration={current_exercise.rest} finished={rest} />
				{:else}
					<div
						class="rounded-md bg-surface-400 text-black shadow-md flex justify-evenly items-center w-[75%] h-[200px]"
					>
						<div class="flex flex-col space-y-4 justify-center items-center">
							<input
								class="text-6xl w-28 bg-transparent font-bold text-center"
								type="number"
								bind:value={$form.exercises[exercise].weight[set - 1]}
							/>
							<div class="text-lg">Weight</div>
						</div>
						<div class="flex flex-col space-y-4 justify-center items-center">
							<input
								class="text-6xl w-28 bg-transparent font-bold text-center"
								type="number"
								bind:value={$form.exercises[exercise].reps[set - 1]}
							/>
							<div class="text-lg">Reps</div>
						</div>
					</div>
				{/if}
				<div class="flex flex-row space-x-6">
					<button
						type="button"
						class="rounded-md bg-surface-600 shadow-md p-4 flex justify-center items-center"
						disabled={exercise == 0 && set == 1}
						on:click={() => handleBack()}
					>
						<div class="w-8 h-8 flex justify-center items-center rotate-180 text-4xl text-black">
							&#x27A4;
						</div>
					</button>
					<button
						type="button"
						class="rounded-md bg-surface-600 shadow-md p-6 flex justify-center items-center"
						on:click={() => handleComplete()}
					>
						<div class="w-8 h-8 flex justify-center items-center text-black text-4xl">&#x2714;</div>
					</button>
					<button
						type="button"
						class="rounded-md bg-surface-600 shadow-md p-4 flex justify-center items-center"
					>
						<div class="w-8 h-8 bg-black flex justify-center items-center" />
					</button>
				</div>

				<div class="text-4xl font-semibold text-gray-400">23:30</div>

				<div class="text-right italic font-semibold w-full mr-4">
					Next: {future_exercise ? future_exercise.exercise.name : 'Finish'}
				</div>
			{:else}
				<div class="flex flex-col space-y-6">
					<label class="label" for="notes">Notes</label>
					<textarea class="textarea" name="notes" bind:value={$form.notes} />
				</div>
				<button type="submit" class="btn-md rounded-md variant-filled-surface shadow-md"
					>Log Workout</button
				>
			{/if}
		</div>
	</form>
{:else}
	<div>Couldn't find workout...</div>
{/if}
