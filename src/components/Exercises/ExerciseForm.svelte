<script lang="ts">
	import { ExerciseCategories, MuscleGroups } from '$lib/db/schema';
	import {
		Autocomplete,
		InputChip,
		type AutocompleteOption,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { insertExerciseSchema } from '../../routes/exercises/schemas';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	let inputChipEquipment = '';
	let inputChipListEquipment: string[] = [];

	export let data: SuperValidated<insertExerciseSchema>;

	const { form, enhance, errors } = superForm(data);

	function onInputSelectionEquipment(event: CustomEvent<AutocompleteOption>): void {
		if (!inputChipListEquipment.includes(event.detail.label)) {
			inputChipListEquipment = [...inputChipListEquipment, event.detail.label];
			inputChipEquipment = '';
		}
	}

	type Equipment = {
		name: string;
		id: number;
	};

	export let equipment_options: Equipment[];

	const inputOptions: AutocompleteOption[] = equipment_options.map((option) => {
		return { label: option.name, value: option.id };
	});

	let inputChipsMuscle: string[] = [];
	let inputChipMuscle = '';

	let muscle_group_options = MuscleGroups.enumValues;

	function onInputSelectionMuscle(event: CustomEvent<AutocompleteOption>): void {
		//@ts-ignore
		if (!inputChipsMuscle.includes(event.detail.label)) {
			//@ts-ignore
			inputChipsMuscle = [...inputChipsMuscle, event.detail.label];
			inputChipMuscle = '';
		}
	}

	const inputOptionsMuscle: AutocompleteOption[] = muscle_group_options.map((option) => {
		return { label: option, value: option };
	});

	const toastStore = getToastStore();

	const success: ToastSettings = {
		message: 'Exercise Added'
	};
</script>

<div class="card py-4 px-14 flex flex-col">
	<div class="flex justify-center items-center font-bold text-lg">Add Exercise</div>
	<form method="POST" action="?/exercise_form" class="resize-y flex flex-col space-y-4 justify-center items-center" use:enhance>
			<label for="name">Name</label>
			<input class="input text-center" bind:value={$form.name} type="text" name="name" />
			{#if $errors.name} <span>{$errors.name}</span> {/if}
			<label for="description">Description</label>
			<textarea
				class="textarea resize-y text-center"
				bind:value={$form.description}
				name="description"
			/>
			<label for="category">Category</label>
			<select class="select" bind:value={$form.category} name="category">
				{#each ExerciseCategories.enumValues as category}
					<option>{category}</option>
				{/each}
			</select>
			{#if $errors.category} <span>{$errors.category}</span> {/if}
			<label for="equipment">Equipment</label>
			<select class="select" bind:value={$form.equipment_id} name="equipment_id">
				{#each equipment_options as option}
					<option value={option.id}>{option.name}</option>
				{/each}
			</select>
			{#if $errors.equipment_id} <span>{$errors.equipment_id}</span> {/if}
			<!-- <InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" on:add={()=> console.log("add")} />
    <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
	<Autocomplete
		bind:input={inputChip}
        options={inputOptions}
        on:selection={onInputSelection}
	/>
    </div> -->
			<label for="equipment">Muscle Groups</label>
			<InputChip bind:input={inputChipMuscle} bind:value={inputChipsMuscle} name="muscle_groups" />
			<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
				<Autocomplete
					bind:input={inputChipMuscle}
					options={inputOptionsMuscle}
					on:selection={onInputSelectionMuscle}
				/>
			</div>
	</form>
	<button
		type="submit"
		class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md"
		on:click={() => toastStore.trigger(success)}>Add</button
	>
</div>
