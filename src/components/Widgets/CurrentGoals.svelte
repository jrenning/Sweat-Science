<script lang="ts">
	// import { GoalData } from "$lib/db/schema";
	import SectionHeader from "../UI/SectionHeader.svelte";
	import Goal from "./Goal.svelte";

    export let goal_data: any[]


</script>

<div>
<SectionHeader name="Goals"/>
<div class="flex flex-col justify-center">
{#each goal_data as goal}
    <Goal goal={goal}/>

{/each}
</div>

</div>