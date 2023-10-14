<script lang="ts">
	import { ProgressBar, Step, Stepper } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Timer from '../../../components/ActiveWorkout/Timer.svelte';
	import { current_day } from '../../../stores/workout_plan';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ExerciseStepper from '../../../components/ActiveWorkout/ExerciseStepper.svelte';
	import ExerciseSingleStep from '../../../components/ActiveWorkout/ExerciseSingleStep.svelte';
	import FormStepChange from '../../../components/AddWorkout/FormStepChange.svelte';
	import ActiveFormStepChange from '../../../components/ActiveWorkout/ActiveFormStepChange.svelte';

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
		exercise += 1
	}
</script>

{#if data.workout}
	<form use:enhance method="POST">
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
					<ExerciseStepper current_exercise={current_exercise} form={form} exercise={exercise} completeHandler={onComplete}/>
				{:else}
					<ExerciseSingleStep current_exercise={current_exercise} form={form} exercise={exercise} />
				{/if}
				{#if current_exercise.rest}
					<div>Rest</div>
					<Timer duration={current_exercise.rest} />
				{/if}
			{:else}
					<div class="flex flex-col space-y-6">
						<label class="label" for="notes">Notes</label>
						<textarea class="textarea" name="notes" bind:value={$form.notes} />
					</div>
					<button type="submit" class="btn-md rounded-md variant-filled-surface shadow-md"
						>Log Workout</button
					>
			{/if}
			<ActiveFormStepChange bind:exercise={exercise} bind:exercise_total={exercise_total} />
		</div>
	</form>
{:else}
	<div>Couldn't find workout...</div>
{/if}
