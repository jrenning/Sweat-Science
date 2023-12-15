<script lang="ts">
	import { popup } from "@skeletonlabs/skeleton";

    export let name: string
    export let id: number

    import FolderIcon from "../Icons/FolderIcon.svelte"
	import FolderOptions from "../Popups/FolderOptions.svelte";


</script>


<div class="flex flex-row w-full items-center space-x-6 rounded-md py-1 border border-secondary-300">
        <a href={`/workout_folder/${id}`}><div class=" ml-2 w-8 h-8"><FolderIcon /></div></a>
    <div class="flex items-center font-semibold text-xl">{name}</div>
    	<div
		class="flex space-x-1"
		use:popup={{
			event: 'click',
			target: `folderOptions${id}`,
			placement: 'bottom'
		}}
	>
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black" />
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black" />
		<div class="w-[0.35rem] h-[0.35rem] rounded-full bg-black" />
	</div>
    <FolderOptions id={id} name={name}/>
</div>
