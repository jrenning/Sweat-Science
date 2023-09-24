<script lang="ts">
	import { ExerciseCategories } from "$lib/db/schema";
	import type {  AutocompleteOption } from "@skeletonlabs/skeleton";
	import type { SuperValidated } from "sveltekit-superforms";
	import { superForm } from "sveltekit-superforms/client";
	import type { insertExerciseSchema } from "../../routes/exercises/schemas";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
    let inputChip = ""
    let inputChipList: string[] = []


    export let data: SuperValidated<insertExerciseSchema>

    const {form, enhance, errors} = superForm(data)

    function onInputSelection(event: CustomEvent<AutocompleteOption>): void {

        if (!inputChipList.includes(event.detail.label)) {
            inputChipList = [...inputChipList, event.detail.label]
            inputChip = ""
        }
        
    }

    type Equipment = {
        name: string,
        id: number
    }

    export let equipment_options: Equipment[]

    const inputOptions: AutocompleteOption[] = equipment_options.map((option)=> { return {label: option.name, value: option.id}})

</script>

<div class="card p-4 flex flex-col">
    <div class="flex justify-center items-center font-bold text-lg">Add Exercise</div>
    <SuperDebug data={$form} />
<form method="POST" class="resize-y" use:enhance>
    <label for="name">Name</label>
    <input class="input" bind:value={$form.name} type="text" name="name" />
    {#if $errors.name} <span>{$errors.name}</span> {/if}
    <label for="description" >Description</label>
    <textarea class="textarea resize-y" bind:value={$form.description} type="text"  name="description"/>
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
    <button class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md">Add</button>

</form>
</div>