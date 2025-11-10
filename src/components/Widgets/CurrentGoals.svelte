<script lang="ts">
	// import { GoalData } from "$lib/db/schema";
	import SectionHeader from "../UI/SectionHeader.svelte";
	import Goal from "./Goal.svelte";

	interface Props {
		goal_data: any[];
	}

	let { goal_data }: Props = $props();


</script>

<div>
<SectionHeader name="Goals"/>
<div class="grid md:grid-cols-2 justify-center items-center">
{#each goal_data as goal}
    <Goal goal={goal}/>

{/each}
</div>

</div>