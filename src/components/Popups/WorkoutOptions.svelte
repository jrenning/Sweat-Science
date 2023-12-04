<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	export let name: string;
	export let id: number;
	import {
		popup,
		type ModalSettings,
		type PopupSettings,
		getModalStore
	} from '@skeletonlabs/skeleton';
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
</script>

<div class="card flex flex-col space-y-4 p-4 hidden" data-popup={`exerciseOptions${name}`}>
	<button on:click={() => modal.trigger(deleteModal)}>Delete</button>
	<a class="flex flex-col space-y-1" href={`/edit_workout/${id}`}>Edit</a>
</div>
