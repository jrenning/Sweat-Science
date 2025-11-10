<script lang="ts">
	import { invalidateAll } from '$app/navigation';
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

<div class="card flex flex-col space-y-4 p-4 hidden" data-popup={`exerciseOptions${name}`}>
	<button>Delete</button>
	<a class="flex flex-col space-y-1" href={`/edit_workout/${id}`}>Edit</a>
	<button>Change Folder</button>
</div>
