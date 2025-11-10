<script lang="ts">
	import type { Exercise } from '$lib/db/schema';
	import { Autocomplete, type AutocompleteOption } from '@skeletonlabs/skeleton';

	let exerciseOptions: Promise<AutocompleteOption[]> = getExerciseOptions() 

	async function getExerciseOptions() {
		const exercise_req = await fetch('/api/exercises');

		const exercises: {exercises: Exercise[]} = await exercise_req.json();


		// build autocomplete options
		let options = exercises.exercises.map((exercise) => {
		const option: AutocompleteOption = {
			label: exercise.name ? exercise.name : "Null",
			value: exercise
		};
        return option
	})

		return options;
	}


	interface Props {
		current_exercise?: string;
		callback?: (exercise: Exercise) => void;
	}

	let { current_exercise = $bindable(""), callback = () => {} }: Props = $props();


    let inputValue = $state("")

    function onExerciseSelection(event: CustomEvent<AutocompleteOption>) {
        inputValue = event.detail.label
        callback(event.detail.value as Exercise)
        current_exercise = inputValue
    }
</script>

<div class="flex flex-col justify-center items-center">
<input class="input w-[50vw] mb-4" type="search" name="demo" bind:value={inputValue} placeholder="Search..." />
<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
	{#await exerciseOptions}
	<div>Fetching exercises...</div>
	{:then exerciseOptions}
	<Autocomplete bind:input={inputValue} options={exerciseOptions} on:selection={onExerciseSelection} />
	{:catch error}
	<div>Getting exercises failed: {error}</div>
	{/await}
</div>
</div>