<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	const date = new Date(2023, 9, 12);

	let exercises = 1

	export let data: PageData;

	const { form } = superForm(data.form);
</script>

<div class="flex flex-col justify-center items-center">
	<div class="text-lg font-semibold">{date.toDateString()}</div>

	<div>Current Workouts</div>
	{#each data.data as workout}
		<div>{workout.name}</div>
		<div>{workout.exercises.length} Exercises</div>
	{/each}

	<form>
		<label for="name">Name</label>
		<input type="text" id="name" name="name" bind:value={$form.name} />

		<div>Exercises</div>
		{#each {length: exercises} as exercise}
			<div>Select an exercise:</div>
			<select>
				{#each data.exercise_choices as choice}
					{choice.name}
				{/each}
			</select>
		{/each}
	</form>
</div>
