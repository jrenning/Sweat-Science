<script lang="ts">
	// import { GoalData } from "$lib/db/schema";
	import SectionHeader from "../UI/SectionHeader.svelte";
	import Goal from "./Goal.svelte";

    export let goal_data: any[]


</script>

<div>
<SectionHeader name="Goals"/>
<div class="grid md:grid-cols-2 justify-center items-center">
{#each goal_data as goal}
    <Goal goal={goal}/>

{/each}
</div>

</div>