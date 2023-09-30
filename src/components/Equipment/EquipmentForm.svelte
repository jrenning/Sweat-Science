<script lang="ts">
	import { EquipmentTypes, MuscleGroups } from '$lib/db/schema';
	import type {  AutocompleteOption } from '@skeletonlabs/skeleton';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { insertEquipmentSchema } from '../../routes/equipment/schemas';


	export let data: SuperValidated<insertEquipmentSchema>;

	const { form, enhance, errors } = superForm(data);



</script>

<div class="card p-4 flex flex-col">
	<div class="flex justify-center items-center font-bold text-lg">Add Exercise</div>
	<form method="POST" action="?/equipment_form" use:enhance>
		<label for="name">Name</label>
		<input class="input text-blue-200" bind:value={$form.name} name="name" type="text" />
		{#if $errors._errors} <span class="text-blue-300 font-semibold">{$errors._errors}</span> {/if}
		<label for="category">Type</label>
		<select class="select" bind:value={$form.type} name="type">
			{#each EquipmentTypes.enumValues as type}
				<option>{type}</option>
			{/each}
		</select>

		<button
			class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md"
			>Add</button
		>
	</form>
</div>
