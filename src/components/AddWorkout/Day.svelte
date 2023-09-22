<script lang="ts">
	import { current_plan_id } from "../../stores/workout_plan";


    export let number: number| undefined


</script>
    <a href="/add_workout?plan_id">
    <div class="w-full h-[60px] border border-black rounded-md bg-red-200 text-lg font-semibold">
        <div class="mx-2">{number ? number : ""}</div>
    </div>
    </a>