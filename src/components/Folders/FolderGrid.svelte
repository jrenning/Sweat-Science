<script lang="ts">
	import type { WorkoutFolder, WorkoutRoutine } from '$lib/db/schema';
	import Folder from './Folder.svelte';
	import AddFolderForm from './FolderForm.svelte';
	import WorkoutInFolder from './WorkoutInFolder.svelte';
	import BackButton from '../UI/Buttons/BackButton.svelte';
	import { afterNavigate } from '$app/navigation';


	interface Props {
		folders: WorkoutFolder[];
		workouts: WorkoutRoutine[];
		folder_id: number | null;
	}

	let { folders, workouts, folder_id }: Props = $props();


	let previousPage: string = $state('/');

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="mx-4">
	<BackButton link={previousPage} />
</div>
<button
	class="btn-md mx-4 w-20 hover:preset-filled-secondary-500 variant-outline-secondary flex mt-6 justify-center items-center rounded-md shadow-md"
	>Add</button
>
<div class="grid grid-cols-1 gap-4 mx-4 mt-4">
	{#each folders as folder}
		<Folder name={folder.name} id={folder.id} />
	{/each}
	{#each workouts as workout}
		<WorkoutInFolder {workout} />
	{/each}
</div>
