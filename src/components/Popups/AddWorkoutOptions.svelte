<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	import AddExistingWorkout from '../AddWorkoutPlan/AddExistingWorkout.svelte';


	interface Props {
		plan_id: number;
		day: number;
	}

	let { plan_id, day }: Props = $props();



</script>


<div class="card flex flex-col space-y-4 p-4 hidden" data-popup="workoutAddOptions">
	<a href={`/add_workout?plan_id=${plan_id}&day=${day}`}><button>Add New</button></a>
	<button class="flex flex-col space-y-1">Add Existing</button>
</div>