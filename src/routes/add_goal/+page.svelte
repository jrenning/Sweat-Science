<script lang="ts">
	import type { Exercise } from '$lib/db/schema';
	import { dateProxy, superForm } from 'sveltekit-superforms/client';
	import { GoalTypesZ, newGoalSchema } from './schemas';
	import BackButton from '../../components/UI/Buttons/BackButton.svelte';
	import ExerciseSelector from '../../components/UI/ExerciseSelector.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let goalForm: SuperValidated<typeof newGoalSchema>;

	let exercise_based = true;

	const _form = superForm(goalForm, {
		id: 'add',
		dataType: 'json'
	});

	const { form, enhance, errors } = _form;

	function setExercise(exercise:  Exercise) {

        $form.exercise_id = exercise.id
    }

    function handleTypeChange(e: any) {
        let type = e.target.value as string
        if (type == "1RM" || type == "average-weight") {
            exercise_based = true
        }
        else {
            exercise_based = false
        }
    }

    const proxyDate = dateProxy(form, 'deadline', { format: 'date' });
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex flex-row w-[90%] justify-between mb-4">
		<BackButton link="/"/>
	</div>
	<div class="text-xl">New Goal</div>
	<form class="space-y-4 flex flex-col" use:enhance method="POST" action={'?/add_goal'}>
		<label for="name">Goal Type</label>
		<select bind:value={$form.goal_type} on:change={handleTypeChange}>
			{#each GoalTypesZ.options as goal_type}
				<option>{goal_type}</option>
			{/each}
		</select>
		{#if exercise_based}
			<ExerciseSelector callback={setExercise} />
		{/if}
        <label>Goal Value</label>
        <input type="number" inputmode="numeric" bind:value={$form.goal_value}/>

        <label>Deadline</label>
        <input type="date" bind:value={$proxyDate}/>
		<button class="btn variant-outline-surface">Add Goal</button>
	</form>
</div>
