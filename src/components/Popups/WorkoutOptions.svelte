<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	interface Props {
		name: string;
		id: number;
	}

	let { name, id }: Props = $props();

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
				class="card flex flex-col justify-center text-sm items-center space-y-4 p-2 bg-surface-100"
			>
				<button onclick={()=> deleteWorkout()}>Delete</button>
				<a class="flex flex-col space-y-1" href={`/edit_workout/${id}`}>Edit</a>
				<button>Change Folder</button>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
