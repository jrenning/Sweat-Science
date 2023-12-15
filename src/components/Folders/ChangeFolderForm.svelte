<script lang="ts">
	import type { WorkoutFolder } from '$lib/db/schema';
	import { Autocomplete, getModalStore, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let inputValue = '';
    const modal = getModalStore()
    export let workout_id: number

	let folderOptions: AutocompleteOption[] = [];

	onMount(async () => {
		const res = await fetch('/api/folders');

		const folders: WorkoutFolder[] = await res.json();

		let folderData = folders.map((folder) => {
			return { label: folder.name, value: folder.id };
		});

        folderOptions = folderData;

	});


	async function onFolderSelection(event: CustomEvent<AutocompleteOption>) {
		inputValue = event.detail.label;
        const data = {
            workout_id: workout_id,
            folder_id: event.detail.value
        }
        // change the folder
        await fetch("/api/workout_routine/update_folder", {
            method: "POST",
            body: JSON.stringify(data)
        })


        // close the modal
        modal.close()
        
	}
</script>

<div class="card p-4 flex flex-col space-y-6">
	<form>
        <input class="input" type="search" name="demo" bind:value={inputValue} placeholder="Search..." />
		<Autocomplete
			bind:input={inputValue}
			options={folderOptions}
			on:selection={onFolderSelection}
		/>
	</form>
</div>
