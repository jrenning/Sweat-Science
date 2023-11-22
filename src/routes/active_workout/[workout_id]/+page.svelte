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
	export let data: PageData;

	let exercise: number = 0;
	$: progress = exercise + 1;
	$: exercise_total = data.workout?.exercises.length ? data.workout.exercises.length : 0;
	$: arr = data.workout?.exercises[exercise];
	$: current_exercise = arr?.exercise_routine;

	const { form, enhance } = superForm(data.workoutForm, {
		dataType: 'json'
	});

	const onComplete = (e: Event) => {
		exercise += 1;
	};
</script>

{#if data.workout}
	<form use:enhance method="POST">
		<div class="flex flex-col justify-center items-center space-y-6">
			<div class="flex justify-evenly w-full">
				<BackButton link="/"/>
				
			<div class="text-2xl font-semibold">{data.workout.name}</div>
			<div></div>
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
				<div class="text-2xl">{current_exercise.exercise.name}</div>
				<div>Set {current_exercise.sets} / {current_exercise.sets}</div>

				<div class="rounded-md bg-surface-400 text-black shadow-md flex justify-evenly items-center w-[75%] h-[200px]">
					<div class="flex flex-col space-y-4 ">
						<div class="text-6xl font-bold">{current_exercise.weight[0]}</div>
						<div class="text-lg">Weight</div>
					</div>
					<div class="flex flex-col space-y-4">
						<div class="text-6xl font-bold">{current_exercise.reps[0]}</div>
						<div class="text-lg">Reps</div>
					</div>
				</div>
				<div class="flex flex-row space-x-6">
					<button class="rounded-md bg-surface-600 shadow-md p-4 flex justify-center items-center">
						<div class="w-8 h-8 flex justify-center items-center"><BackStep /></div>
					</button>
					<button class="rounded-md bg-surface-600 shadow-md p-6 flex justify-center items-center">
						<div class="w-8 h-8 flex justify-center items-center"><CheckIcon /></div>
					</button>
					<button class="rounded-md bg-surface-600 shadow-md p-4 flex justify-center items-center">
						<div class="w-8 h-8 flex justify-center items-center"><PlayIcon /></div>
					</button>
				</div>

				<div class="text-4xl font-semibold text-gray-400">23:30</div>

				<div class="text-right italic font-semibold w-full mr-4">Next: 1 min rest</div>
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
