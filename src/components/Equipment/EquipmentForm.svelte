<script lang="ts">
	import { EquipmentTypes, MuscleGroups } from '$lib/db/schema';
	import { Autocomplete, InputChip, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { insertEquipmentSchema } from '../../routes/equipment/schemas';
	let inputChip = '';
    let inputChips: string[] = []

	function onInputSelection(event: CustomEvent<AutocompleteOption>): void {
        //@ts-ignore
		if (!inputChips.includes(event.detail.label)) {
            //@ts-ignore
			inputChips = [...inputChips, event.detail.label];
			inputChip = '';
		}
	}

	export let data: SuperValidated<insertEquipmentSchema>;

	const { form, enhance, errors } = superForm(data);

	export let muscle_group_options = MuscleGroups.enumValues;

	const inputOptions: AutocompleteOption[] = muscle_group_options.map((option) => {
		return { label: option, value: option };
	});


</script>

<div class="card p-4 flex flex-col">
	<div class="flex justify-center items-center font-bold text-lg">Add Exercise</div>
	<form method="POST" use:enhance>
		<label for="name">Name</label>
		<input class="input" bind:value={$form.name} name="name" type="text" />
		{#if $errors._errors} <span class="text-blue-300 font-semibold">{$errors._errors}</span> {/if}
		<label for="category">Type</label>
		<select class="select" bind:value={$form.type} name="type">
			{#each EquipmentTypes.enumValues as type}
				<option>{type}</option>
			{/each}
		</select>
		<label for="equipment">Muscle Groups</label>
		<InputChip bind:input={inputChip} bind:value={inputChips} name="muscle_groups" />
		<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
			<Autocomplete bind:input={inputChip} options={inputOptions} on:selection={onInputSelection} />
		</div>
		<button
			class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md"
			>Add</button
		>
	</form>
</div>
