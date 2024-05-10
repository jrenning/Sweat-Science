<script lang="ts">
	import ExerciseSelector from '../../components/UI/ExerciseSelector.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let current_exercise: string = '';
	let exercise_number: number = 0;
</script>

<div class="flex justify-center items-center flex-col space-y-6 mx-6">
	<div>Choose an exercise:</div>
	<ExerciseSelector bind:current_exercise />
	{#if current_exercise}
		<div class="flex space-x-12">
			<div>
				<label for="type">Weight</label>
				<input class="input" name="type" type="radio" value="Weight" />
			</div>
			<div>
				<label for="type">Distance</label>
				<input type="radio" name="type" value="Distance" />
			</div>
			<div>
				<label for="type">Duration</label>
				<input type="radio" name="type" value="Duration" />
			</div>
		</div>
	{/if}
	<div>
		<div>Sets</div>
		<input class="input" type="number" />
	</div>
	<!-- <ExerciseStepper /> -->
</div>
