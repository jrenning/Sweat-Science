<script lang="ts">
	import { getContext } from "svelte";
import { current_day, current_plan_id } from "../../stores/workout_plan";


    export let number: number| undefined
    export let global_day: number | undefined = undefined

    export let workouts: number | undefined = undefined



</script>
<a href={`/add_workout_plan/${global_day}`}>
    <div class="w-full h-[60px] border border-black rounded-md bg-surface-100 text-lg font-semibold">
        <div class="mx-2 text-black">{number ? number : ""}</div>
        {#if workouts}<div class="rounded-full text-xs mt-2 mx-1 flex justify-center items-center shadow-sm variant-filled-tertiary">{workouts}</div> {/if}
    </div>
    </a>