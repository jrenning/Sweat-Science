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
      <div class="flex flex-row space-x-6 justify-center items-center my-6">
          <AddButton object="Workout Plan" link="/add_workout_plan"/>
          <AddButton object="Workout" link="/add_workout" />

      </div>




  <LastWorkout last_workout={data && data.data.last_workout}/>

  <SectionHeader name="Workouts" />

  <WorkoutAdd />

  </div>
</div>
  {:else}

  <div></div>

  {/if}

  



</div>
