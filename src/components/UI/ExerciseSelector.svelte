<script lang="ts">
	import type { Exercise } from '$lib/db/schema';
	import { Autocomplete, type AutocompleteOption } from '@skeletonlabs/skeleton';

	let exercises: Promise<Exercise[]> = getExercises();
	let exerciseOptions: AutocompleteOption[];

	async function getExercises() {
		const exercise_req = await fetch('/api/exercises');

		const exercises: Exercise[] = await exercise_req.json();

		// build autocomplete options
		exerciseOptions = exercises.map((exercise) => {
		const option: AutocompleteOption = {
			label: exercise.name ? exercise.name : "Null",
			value: exercise.id
		};
        return option
	})

		return exercises;
	}


    export let current_exercise: string = ""
    export let callback: (selected_value: unknown) => void = () => {}


    let inputValue = ""

    function onExerciseSelection(event: CustomEvent<AutocompleteOption>) {
        inputValue = event.detail.label
        callback(event.detail.value)
        current_exercise = inputValue
    }
</script>

<div class="flex flex-col justify-center items-center">
<input class="input w-[50vw] mb-4" type="search" name="demo" bind:value={inputValue} placeholder="Search..." />
<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
	<Autocomplete bind:input={inputValue} options={exerciseOptions} on:selection={onExerciseSelection} />
</div>
</div>