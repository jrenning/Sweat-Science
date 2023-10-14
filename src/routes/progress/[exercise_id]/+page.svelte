<script lang="ts">
	import ExerciseLogEntry from "../../../components/Log/ExerciseLogEntry.svelte";
	import BackButton from "../../../components/UI/BackButton.svelte";
	import type { PageData } from "./$types";


    export let data: PageData


</script>


<div class="flex justify-center items-center flex-col w-full">

    <div class="flex space-x-6">
        <BackButton link="/progress" />
        <h2 class="text-3xl font-bold">{data.exercise?.name}</h2>
    </div>

    <div class="w-full">
        {#each data.log as exercise}
        <ExerciseLogEntry log_entry={exercise} />
        {/each}
    </div>




</div>