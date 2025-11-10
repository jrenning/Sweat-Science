<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	import FolderForm from '../Folders/FolderForm.svelte';
	interface Props {
		name: string;
		id: number;
	}

	let { name, id }: Props = $props();

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

</script>

<div class="card flex flex-col space-y-4 p-4 hidden" data-popup={`folderOptions${id}`}>
	<button>Delete</button>
	<button class="flex flex-col space-y-1">Edit</button>
</div>
