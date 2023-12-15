<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	export let name: string;
	export let id: number;
	import {
		popup,
		type ModalSettings,
		type PopupSettings,
		getModalStore,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	import FolderForm from '../Folders/FolderForm.svelte';
	const modal = getModalStore();

	async function deleteFolder() {
		const data = {
			folder_id: id
		};

		await fetch('/api/folders', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		// refresh page data
		await invalidateAll();
	}

	const deleteModal: ModalSettings = {
		type: 'confirm',
		title: 'Delete Folder?',
		response: async (r) => {
			if (r) {
				await deleteFolder();
			}
		}
	};


	const modalComponentFolder: ModalComponent = {
		ref: FolderForm,
		props: {parent_id: id, type: "edit"}
	};
	const editFolderModal: ModalSettings = {
		type: 'component',
		title: 'Edit Folder',
		component: modalComponentFolder
	};
</script>

<div class="card flex flex-col space-y-4 p-4 hidden" data-popup={`folderOptions${id}`}>
	<button on:click={() => modal.trigger(deleteModal)}>Delete</button>
	<button class="flex flex-col space-y-1" on:click={()=> modal.trigger(editFolderModal)}>Edit</button>
</div>
