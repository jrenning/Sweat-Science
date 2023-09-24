<script lang="ts">
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import AddButton from "../../components/UI/AddButton.svelte";
	import ModalButton from "../../components/UI/ModalButton.svelte";
import type { PageData } from "./$types";


    export let data: PageData

    let categories = ["Name", "Type", "Muscle Groups"]

    const modalStore = getModalStore()

        const modal: ModalSettings = {
        type: "component",
        title: "Add Equipment"
    }

</script>

<div class="flex justify-center items-center my-6">
<ModalButton message="Add Equipment" callback={()=> modalStore.trigger(modal)} />
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
            {#each data.data as equipment}
            <tr>
                <td>{equipment.name}</td>
                <td>{equipment.type}</td>
                <td>{equipment.muscle_groups?.join(", ")}</td>
            </tr>
            {/each}
        </tbody>
    </table>

</div>