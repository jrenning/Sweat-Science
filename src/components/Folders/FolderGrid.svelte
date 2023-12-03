<script lang="ts">
	import type { WorkoutFolder, WorkoutRoutineWithExercises } from '$lib/db/schema';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import Folder from './Folder.svelte';
	import AddFolderForm from './AddFolderForm.svelte';
	import WorkoutInFolder from './WorkoutInFolder.svelte';

	export let folders: WorkoutFolder[];
    export let workouts: WorkoutRoutineWithExercises[]

    export let folder_id: number | null

	const modalStore = getModalStore();

	const modalComponentFolder: ModalComponent = {
		ref: AddFolderForm,
		props: { parent_id: folder_id }
	};
	const folderModal: ModalSettings = {
		type: 'component',
		title: 'Add Folder',
		component: modalComponentFolder
	};
</script>

<button
	class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md"
    on:click={()=> modalStore.trigger(folderModal)}
	>Add</button
>
<div class="grid grid-cols-1 gap-4 mx-4 mt-4">
	{#each folders as folder}
		<Folder name={folder.name} id={folder.id} />
	{/each}
    {#each workouts as workout}
    <WorkoutInFolder workout={workout} />
    {/each}
</div>
