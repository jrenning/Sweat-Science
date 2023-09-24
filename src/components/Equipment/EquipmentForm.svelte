<script lang="ts">
	import { EquipmentTypes, MuscleGroups } from "$lib/db/schema";
	import { Autocomplete, InputChip, type AutocompleteOption } from "@skeletonlabs/skeleton";
    let inputChip = ""
    let inputChipList: string[] = []


    function onInputSelection(event: CustomEvent<AutocompleteOption>): void {

        if (!inputChipList.includes(event.detail.label)) {
            inputChipList = [...inputChipList, event.detail.label]
            inputChip = ""
        }
        
    }

    export let muscle_group_options = MuscleGroups.enumValues

    const inputOptions: AutocompleteOption[] = muscle_group_options.map((option)=> { return {label: option, value: option}})

</script>

<div class="card p-4 flex flex-col">
    <div class="flex justify-center items-center font-bold text-lg">Add Exercise</div>
<form>
    <label for="name">Name</label>
    <input class="input" type="text" />
    <label for="category">Type</label>
    <select class="select">
        {#each EquipmentTypes.enumValues as type}
            <option>{type}</option>
        {/each}
    </select>
    <label for="equipment">Muscle Groups</label>
    <InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" />
    <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
	<Autocomplete
		bind:input={inputChip}
        options={inputOptions}
        on:selection={onInputSelection}
	/>
    </div>
    <button class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md">Add</button>

</form>
</div>