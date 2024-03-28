<script lang="ts">
	import type { WorkoutFolder, WorkoutRoutine } from '$lib/db/schema';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import Folder from './Folder.svelte';
	import AddFolderForm from './FolderForm.svelte';
	import WorkoutInFolder from './WorkoutInFolder.svelte';
	import BackButton from '../UI/Buttons/BackButton.svelte';
	import { afterNavigate } from '$app/navigation';

	export let folders: WorkoutFolder[];
	export let workouts: WorkoutRoutine[]

	export let folder_id: number | null;

	const modalStore = getModalStore();

	const modalComponentFolder: ModalComponent = {
		ref: AddFolderForm,
		props: { parent_id: folder_id, type: 'add' }
	};
	const folderModal: ModalSettings = {
		type: 'component',
		title: 'Add Folder',
		component: modalComponentFolder
	};

	let previousPage: string = '/';

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="mx-4">
	<BackButton link={previousPage} />
</div>
<button
	class="btn-md mx-4 w-20 hover:variant-filled-secondary variant-outline-secondary flex mt-6 justify-center items-center rounded-md shadow-md"
	on:click={() => modalStore.trigger(folderModal)}>Add</button
>
<div class="grid grid-cols-1 gap-4 mx-4 mt-4">
	{#each folders as folder}
		<Folder name={folder.name} id={folder.id} />
	{/each}
	{#each workouts as workout}
		<WorkoutInFolder {workout} />
	{/each}
</div>
