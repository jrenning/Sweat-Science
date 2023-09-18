<script>


async function handleSeed() {
    const data = await fetch("/api/seed/equipment", {
        method: "GET"
    })
}


</script>


<button class="bg-purple-300 rounded-md px-2 py-1 shadow-md"
on:click={()=> handleSeed()}>

Seed Equipment Data

</button>