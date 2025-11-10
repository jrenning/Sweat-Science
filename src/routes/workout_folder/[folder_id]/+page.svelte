<script lang="ts">
	import FolderGrid from '../../../components/Folders/FolderGrid.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>


<FolderGrid folders={data.folders} folder_id={data.folder_id} workouts={data.workouts} />