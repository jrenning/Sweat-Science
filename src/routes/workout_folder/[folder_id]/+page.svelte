<script lang="ts">
	import FolderGrid from '../../../components/Folders/FolderGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>


<FolderGrid folders={data.folders} folder_id={data.folder_id} />