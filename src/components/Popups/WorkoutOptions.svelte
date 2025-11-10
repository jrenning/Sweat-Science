<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import {
		popup,
		type ModalSettings,
		type PopupSettings,
		getModalStore,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	interface Props {
		name: string;
		id: number;
	}

	let { name, id }: Props = $props();
	const modal = getModalStore();

	async function deleteWorkout() {
		const data = {
			action: 'delete',
			workout_routine_id: id
		};

		await fetch('/api/workout_routine', {
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
		title: 'Delete Workout?',
		response: async (r) => {
			if (r) {
				await deleteWorkout();
			}
		}
	};


	const modalComponentFolder: ModalComponent = {
		ref: ChangeFolderForm,
		props: {workout_id: id}
	};
	const changeFolderModal: ModalSettings = {
		type: 'component',
		title: 'Add Exercise',
		component: modalComponentFolder
	};
</script>

<div class="card flex flex-col space-y-4 p-4 hidden" data-popup={`exerciseOptions${name}`}>
	<button onclick={() => modal.trigger(deleteModal)}>Delete</button>
	<a class="flex flex-col space-y-1" href={`/edit_workout/${id}`}>Edit</a>
	<button onclick={()=> modal.trigger(changeFolderModal)}>Change Folder</button>
</div>
