<script lang="ts">
	import { number } from "zod"
	import Day from "./Day.svelte";
	import type { WorkoutRoutineWithExercises } from "$lib/db/schema";


    export let dates: number[]
    export let start_date: Date
    export let day_offset: number
    export let month_offset: number
    export let day_start: number
    const new_date = new Date(start_date)
    new_date.setMonth(start_date.getMonth()+month_offset)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]




</script>
    <div class="text-xl font-semibold mt-4">{months[new_date.getMonth()]}</div>
    <div class="grid grid-cols-7 gap-1">
        {#each days_of_week as day, _}
        <div>{day[0].toUpperCase()}</div>
        {/each}
        {#each {length: day_offset} as _, i}
            <Day number={0} />
        {/each}
        {#each dates as date, index}

        <Day number={date} global_day={day_start+index}/>

        {/each}

    </div>