<script lang="ts">
	import { getContext } from "svelte";
import { current_day, current_plan_id } from "../../stores/workout_plan";


    export let number: number| undefined
    export let global_day: number | undefined = undefined

    //@ts-ignore
    const updatePage = getContext("workout_plan_page").updatePage

    //@ts-ignore
    const updateFormWorkouts = getContext("workout_plan_page").updateFormWorkouts

    //@ts-ignore
    const workouts = getContext("workout_plan_page").getWorkoutsOnDay(global_day)

    function handleWorkoutAdd() {
        if (global_day) {

            $current_day = global_day
            updateFormWorkouts(global_day)
        }
        updatePage(3)
    }



</script>
    <div class="w-full h-[60px] border border-black rounded-md bg-red-200 text-lg font-semibold" on:click={()=> handleWorkoutAdd()}>
        <div class="mx-2">{number ? number : ""}</div>
        {#if workouts}<div class="rounded-full text-xs mt-2 mx-1 flex justify-center items-center shadow-sm variant-filled-tertiary">{workouts}</div> {/if}
    </div>