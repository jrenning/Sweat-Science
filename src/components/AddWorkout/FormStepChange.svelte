<script lang="ts">
export let pg: number
export let names: string[]

</script>

<div class="flex flex-row space-x-6 justify-center items-center">
    {#each names as name, index}

        <button class="rounded-md bg-slate-50 shadow-md px-2 py-1 disabled:bg-white disabled:text-slate-200"  disabled={pg < index+1} on:click={()=> pg=index+1}>{name}</button>

    {/each}


</div>