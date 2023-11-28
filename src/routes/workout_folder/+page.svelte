<script lang="ts">
	import Folder from "../../components/Folders/Folder.svelte";




</script>

<div class="grid grid-cols-2 gap-4">

    {#each {length: 10} as _} 
        <Folder />
    {/each}


</div>