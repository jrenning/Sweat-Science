<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
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

<Popover>
	<Popover.Trigger>
		<div class="flex space-x-1">
			<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
			<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
			<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black"></div>
		</div>
	</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content
				class="card flex flex-col space-y-4 p-4 bg-surface-200"
				data-popup={`folderOptions${id}`}
			>
				<button>Delete</button>
				<button class="flex flex-col space-y-1">Edit</button>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
