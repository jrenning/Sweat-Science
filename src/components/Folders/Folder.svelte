<script lang="ts">
	    import FolderIcon from "../Icons/FolderIcon.svelte"
	import FolderOptions from "../Popups/FolderOptions.svelte";
	interface Props {
		name: string;
		id: number;
	}

	let { name, id }: Props = $props();


</script>


<div class="flex flex-row w-full items-center space-x-6 rounded-md py-1 border border-secondary-300">
        <a href={`/workout_folder/${id}`}><div class=" ml-2 w-8 h-8"><FolderIcon /></div></a>
    <div class="flex items-center font-semibold text-xl">{name}</div>

    <FolderOptions id={id} name={name}/>
</div>
