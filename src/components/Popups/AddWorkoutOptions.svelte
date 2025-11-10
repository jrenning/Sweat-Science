<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import {
		popup,
		type ModalSettings,
		type PopupSettings,
		getModalStore,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import ChangeFolderForm from '../Folders/ChangeFolderForm.svelte';
	import AddExistingWorkout from '../AddWorkoutPlan/AddExistingWorkout.svelte';


	interface Props {
		plan_id: number;
		day: number;
	}

	let { plan_id, day }: Props = $props();
	const modal = getModalStore();

		const modalComponentWorkout: ModalComponent = {
		ref: AddExistingWorkout,
		props: {plan_id: plan_id, day: day}
	};
	const addExistingWorkoutModal: ModalSettings = {
		type: 'component',
		title: 'Add Workout to Plan',
		component: modalComponentWorkout
	};


</script>


<div class="card flex flex-col space-y-4 p-4 hidden" data-popup="workoutAddOptions">
	<a href={`/add_workout?plan_id=${plan_id}&day=${day}`}><button>Add New</button></a>
	<button class="flex flex-col space-y-1" onclick={()=> modal.trigger(addExistingWorkoutModal)}>Add Existing</button>
</div>