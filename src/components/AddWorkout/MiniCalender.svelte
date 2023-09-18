<script lang="ts">
	import Day from "./Day.svelte";


    export let dates: number[]
    export let start_date: Date
    export let offset: number
    const new_date = new Date(start_date)
    new_date.setMonth(start_date.getMonth()+offset)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


</script>
    <div class="text-xl font-semibold mt-4">{months[new_date.getMonth()]}</div>
    <div class="grid grid-cols-7 gap-1">
        {#each days_of_week as day, _}
        <div>{day[0].toUpperCase()}</div>
        {/each}
        {#each dates as date, _}

        <Day number={date} />

        {/each}

    </div>