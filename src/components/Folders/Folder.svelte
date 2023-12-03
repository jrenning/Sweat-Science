<script lang="ts">
    export let name: string
    export let id: number

    import FolderIcon from "../Icons/FolderIcon.svelte"


    function deleteFolder () {

    }

</script>

    <a href={`/workout_folder/${id}`}>
<div class="flex flex-row w-full space-x-6 rounded-md py-1 border border-secondary-300">
    <div class=" ml-2 w-8 h-8"><FolderIcon /></div>
    <div class="flex items-center w-full font-semibold text-xl">{name}</div>

</div>
</a>