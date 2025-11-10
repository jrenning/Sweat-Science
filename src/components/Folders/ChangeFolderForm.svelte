<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { WorkoutFolder } from '$lib/db/schema';
	import { onMount } from 'svelte';

	let inputValue = $state('');
	interface Props {
		workout_id: number;
	}

	let { workout_id }: Props = $props();

	let folderOptions = $state()

	onMount(async () => {
		const res = await fetch('/api/folders');

		const folders: WorkoutFolder[] = await res.json();

		let folderData = folders.map((folder) => {
			return { label: folder.name, value: folder.id };
		});

		folderOptions = folderData;
	});

	async function onFolderSelection(event: CustomEvent) {
		inputValue = event.detail.label;
		const data = {
			workout_id: workout_id,
			folder_id: event.detail.value
		};
		// change the folder
		await fetch('/api/workout_routine/update_folder', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		await invalidateAll();

	}
</script>

<div class="card p-4 flex flex-col space-y-6">
	<form>
		<input
			class="input"
			type="search"
			name="demo"
			bind:value={inputValue}
			placeholder="Search..."
		/>
	</form>
</div>
