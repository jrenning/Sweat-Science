<script lang="ts">
	import type { Exercise } from '$lib/db/schema';
	import { onMount } from 'svelte';

	type Item = {
		label: string;
		value: Exercise;
	};

	let data: Item[] = $state([]);

	let items: Item[] = $state([]);
	let exerciseOptions = getExerciseOptions();

	onMount(async () => {
		data = await getExerciseOptions();
		items = data;
	});

	async function getExerciseOptions() {
		const exercise_req = await fetch('/api/exercises');

		const exercises: { exercises: Exercise[] } = await exercise_req.json();

		// build autocomplete options
		let options = exercises.exercises.map((exercise) => {
			const option = {
				label: exercise.name ? exercise.name : 'Null',
				value: exercise
			};
			return option;
		});

		return options;
	}

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange = () => {
		if (data) {
			const filtered = data.filter((item) =>
				item.label.toLowerCase().includes(inputValue.toLowerCase())
			);
			if (filtered.length > 0) {
				items = filtered;
			} else {
				items = data;
			}
		}
	};

	interface Props {
		current_exercise?: string;
		callback?: (exercise: Exercise) => void;
	}

	let { current_exercise = $bindable(''), callback = () => {} }: Props = $props();

	let inputValue = $state('');

	function onExerciseSelection(item: Item) {
		inputValue = item.label;
		callback(item.value as Exercise);
		current_exercise = inputValue;
	}
</script>

<div class="flex flex-col justify-center items-center">
	<div class="w-full max-w-md">
		<div class="flex justify-center mb-4 bg-secondary-50 border-secondary-100 border-1 rounded-md mx-20">
			<input placeholder="Search..." oninput={() => onInputValueChange()} bind:value={inputValue} />
		</div>
		<div class="h-30 overflow-y-scroll rounded-md bg-secondary-100 mx-10 p-4 space-y-2">
			{#each items as item (item.value)}
				<div onclick={()=> onExerciseSelection(item)}>
					{item.label}
				</div>
			{/each}
		</div>
	</div>
	<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
		{#await exerciseOptions}
			<div>Fetching exercises...</div>
		{:catch error}
			<div>Getting exercises failed: {error}</div>
		{/await}
	</div>
</div>
