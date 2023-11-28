<script>
    export let name = "Hello"
    export let id = 1

</script>

<div>
    <a href={`/workout_folder/${id}`}><div class="rounded-md bg-red-300 shadow-md h-[150px] w-full">

    </div></a>
    <div class="flex items-center w-full font-semibold text-xl">{name}</div>

</div>