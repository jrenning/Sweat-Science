<script lang="ts">
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import AddButton from "../../components/UI/AddButton.svelte";
import type { PageData } from "./$types";
	import ModalButton from "../../components/UI/ModalButton.svelte";


    export let data: PageData

    let categories = ["Name", "Description", "Category", "Equipment"]

    const modalStore = getModalStore()

    const modal: ModalSettings = {
        type: "alert",
        title: "Add Exercise",
        body: "This is an example"
    }

</script>


<div class="flex justify-center items-center my-6">
    <button on:click={()=> modalStore.trigger(modal)}>Add Exercise</button>
</div>
<div class="table-container">
    <table class="table table-hover">
        <thead>
            <tr>
                {#each categories as category}
                <th>{category}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data.data.exercises as exercise}
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.description ? exercise.description : "None"}</td>
                <td>{exercise.category}</td>
                <td>{exercise.equipment ? exercise.equipment.name : "None"}</td>
            </tr>
            {/each}
        </tbody>
    </table>

</div>