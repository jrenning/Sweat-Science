<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
	import Welcome from "../components/UI/Welcome.svelte";
	import AddButton from "../components/UI/AddButton.svelte";
	import LastWorkout from "../components/Widgets/LastWorkout.svelte";
	import SectionHeader from "../components/UI/SectionHeader.svelte";
	import WorkoutAdd from "../components/UI/WorkoutAdd.svelte";
	import SeedEquipment from "../components/SeedData/SeedEquipment.svelte";
	import type { PageData } from "./$types";

  export let data: PageData
  console.log(data)
</script>

<div>

  {#if $page.data.session}
  <div class="flex flex-col justify-center items-center">
    <div class="w-[80%]">
  <AddButton />
  <SeedEquipment />



  <LastWorkout last_workout={data && data.data.last_workout}/>

  <SectionHeader name="Workouts" />

  <WorkoutAdd />

  </div>
</div>
  {:else}

  <div></div>

  {/if}

  



</div>
