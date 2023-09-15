<script>
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
	import Welcome from "../components/UI/Welcome.svelte";
	import AddButton from "../components/UI/AddButton.svelte";
	import LastWorkout from "../components/Widgets/LastWorkout.svelte";
	import SectionHeader from "../components/UI/SectionHeader.svelte";
	import WorkoutAdd from "../components/UI/WorkoutAdd.svelte";
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div>

  {#if $page.data.session}
  <div class="flex flex-col justify-center items-center">
    <div class="w-[80%]">
  <AddButton />

  <LastWorkout />

  <SectionHeader name="Workouts" />

  <WorkoutAdd />

  </div>
</div>
  {:else}

  <div></div>

  {/if}

  



</div>
