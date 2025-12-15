<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	import { writable } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import BackButton from '../../../components/UI/Buttons/BackButton.svelte';
	import type { PageData } from './$types';
	import SetInput from '../../../components/Exercises/SetInput.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let exercise: number = $state(0);
	let set: number = $state(1);
	let rest = writable(false);

	let progress = $derived(exercise + 1);
	let exercise_total = $derived(data.workout?.exercises.length ? data.workout.exercises.length : 0);
	let current_exercise = $derived(data.workout?.exercises[exercise]);
	let future_exercise = $derived(data.workout?.exercises[exercise + 1]);

	let selected_value = $state(current_exercise?.exercise.name);
	function skipToExercise() {
		if (selected_value) {
			const exercise_names = data.workout?.exercises.map((exercise) => exercise.exercise.name);
			const idx = exercise_names?.indexOf(selected_value);
			if (idx !== undefined) {
				exercise = idx;
			}
		}
	}

	const { form, enhance } = superForm(data.workoutForm, {
		dataType: 'json'
	});

	function handleComplete() {
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
			set = data.workout?.exercises[exercise - 1].sets;
			selected_value = data.workout?.exercises[exercise].exercise.name;
		}
	}

	// count up timer
	function pad(val: any) {
		return val > 9 ? val : '0' + val;
	}
	// const timer = setInterval(function () {
	// 	if (typeof $form.workout_time_seconds !== 'undefined' && typeof document !== 'undefined') {
	// 		//@ts-ignore
	// 		$form.workout_time_seconds = $form.workout_time_seconds + 1;
	// 		//@ts-ignore
	// 		document.getElementById('seconds').innerHTML = pad($form.workout_time_seconds % 60);
	// 		//@ts-ignore
	// 		document.getElementById('minutes').innerHTML = pad(
	// 			Math.floor($form.workout_time_seconds / 60)
	// 		);
	// 	}
	// }, 1000);
</script>

{#if data.workout}
	<form use:enhance method="POST">
		<div class="flex flex-col justify-center items-center space-y-4">
			<div class="flex justify-evenly w-full">
				<BackButton link="/" />

				<div class="text-2xl font-semibold">{data.workout.name}</div>
				<div></div>
			</div>

			<div class="w-[80%] flex flex-row justify-center items-center space-x-4">
				<Progress max={data.workout.exercises.length} value={progress} />
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
						onchange={() => skipToExercise()}
					>
						{#each data.workout.exercises as exercise}
							<option class="text-lg">{exercise.exercise.name}</option>
						{/each}
					</select>
				</div>
				{#if $rest}
					<div>Rest</div>
				{:else}
					<div>Set {set} / {current_exercise.sets}</div>
				{/if}
				{#if $rest}
				{:else}
					<div
						class="rounded-md bg-surface-400 text-black shadow-md flex justify-evenly items-center w-[75%] h-[200px]"
					>
						{#if current_exercise.type == 'Weight'}
							<div class="flex flex-col space-y-4 justify-center items-center">
								<input
									class="text-6xl w-28 bg-transparent font-bold text-center"
									type="number"
									inputmode="numeric"
									bind:value={$form.exercises[exercise].weight[set - 1]}
								/>
								<div class="text-lg">Weight</div>
							</div>
							<div class="flex flex-col space-y-4 justify-center items-center">
								<input
									class="text-6xl w-28 bg-transparent font-bold text-center"
									type="number"
									inputmode="numeric"
									bind:value={$form.exercises[exercise].reps[set - 1]}
								/>
								<div class="text-lg">Reps</div>
							</div>
						{:else if current_exercise.type == 'Duration'}
							<div class="flex flex-col space-y-4 justify-center items-center">
								<input
									class="text-6xl w-28 bg-transparent font-bold text-center"
									type="number"
									inputmode="numeric"
									bind:value={$form.exercises[exercise].duration[set - 1]}
								/>
								<div class="text-lg">Duration</div>
							</div>
							{#if current_exercise.exercise.category === 'Cardio'}
								<div class="flex flex-col space-y-4 justify-center items-center">
									<input
										class="text-6xl w-28 bg-transparent font-bold text-center"
										type="number"
										inputmode="numeric"
										bind:value={$form.exercises[exercise].overall_pace_seconds[set-1]}
									/>
									<div class="text-lg">Pace</div>
								</div>
							{/if}
						{:else if current_exercise.type == 'Distance'}
							<div class="flex flex-col space-y-4 justify-center items-center">
								<input
									class="text-6xl w-28 bg-transparent font-bold text-center"
									type="number"
									inputmode="numeric"
									bind:value={$form.exercises[exercise].distance[set - 1]}
								/>
								<div class="text-lg">Distance</div>
							</div>
							{#if current_exercise.exercise.category === 'Cardio'}
								<div class="flex flex-col space-y-4 justify-center items-center">
									<input
										class="text-6xl w-28 bg-transparent font-bold text-center"
										type="number"
										inputmode="numeric"
										bind:value={$form.exercises[exercise].overall_pace_seconds[set-1]}
									/>
									<div class="text-lg">Pace</div>
								</div>
							{/if}
						{/if}
					</div>
				{/if}
				<div class="flex flex-row space-x-6">
					<button
						type="button"
						class="rounded-md bg-surface-600 shadow-md p-4 flex justify-center items-center"
						disabled={exercise == 0 && set == 1}
						onclick={() => handleBack()}
					>
						<div class="w-8 h-8 flex justify-center items-center rotate-180 text-4xl text-black">
							➤
						</div>
					</button>
					<button
						type="button"
						class="rounded-md bg-surface-600 shadow-md p-6 flex justify-center items-center"
						onclick={() => handleComplete()}
					>
						<div class="w-8 h-8 flex justify-center items-center text-black text-4xl">✔</div>
					</button>
					<button
						type="button"
						class="rounded-md bg-surface-600 shadow-md p-4 flex justify-center items-center"
					>
						<div class="w-8 h-8 bg-black flex justify-center items-center"></div>
					</button>
				</div>

				<div class="text-4xl font-semibold text-gray-400">
					<span id="minutes"></span>:<span id="seconds"></span>
				</div>

				<div class="text-right italic font-semibold w-full mr-4">
					Next: {future_exercise ? future_exercise.exercise.name : 'Finish'}
				</div>
			{:else}
				<div class="flex flex-col space-y-6">
					<label class="label" for="notes">Notes</label>
					<textarea class="textarea" name="notes" bind:value={$form.notes}></textarea>
				</div>
				<button
					type="submit"
					class="btn-md rounded-md preset-filled-surface-500 shadow-md"
					>Log Workout</button
				>
			{/if}
		</div>
	</form>
{:else}
	<div>Couldn't find workout...</div>
{/if}
