<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	const date = new Date(2023, 9, 12);

	let exercises = 1;

	export let data: PageData;

	let sets = 1

	const { form } = superForm(data.form);
</script>

<div class="flex flex-col justify-center items-center">
	<div class="text-lg font-semibold">{date.toDateString()}</div>

	{#if data.data.length > 0}
		<div>Current Workouts</div>
		{#each data.data as workout}
			<div>{workout.name}</div>
			<div>{workout.exercises.length} Exercises</div>
		{/each}
	{/if}

	<form class="space-y-2">
		<label for="name">Name</label>
		<input type="text" class="input" id="name" name="name" bind:value={$form.name} />

		<div>Exercises</div>
		{#each { length: exercises } as exercise}
			<div>Select an exercise:</div>
			<select class="select">
				{#each data.exercise_choices as choice}
					<option>{choice.name}</option>
				{/each}
			</select>
			<label class="label" for="sets">Sets</label>
			<input class="input justify-center flex items-center" type="number" name="sets" value={sets} />
			<div class="flex flex-row space-x-6 mt-6">
				<label class="label">Type</label>
				<input type="radio" class="radio" name="type" />
				<label>Type</label>
				<input type="radio" class="radio" name="type" />
				<label>Type</label>
				<input type="radio" class="radio" name="type" />
			</div>
			{#each {length: sets} as set}
			<p>Weight</p>
			<div class="input-group w-40 input-group-divider grid-cols-[auto_1fr_auto]">
				<input type="number" class="w-20" placeholder="Weight" />
				<select>
					<option>lb</option>
					<option>kg</option>
				</select>
				

			</div>
			<label>Reps</label>
			<input type="number" class="input"/>
			{/each}
		{/each}
	</form>
</div>
