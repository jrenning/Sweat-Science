<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import ExerciseForm from '../../components/Exercises/ExerciseForm.svelte';

	export let data: PageData;

	const equipment_names = data.data.equipment.map((equip)=> equip.name)

	let categories = ['Name', 'Description', 'Category', 'Equipment'];

	const modalStore = getModalStore();


		const modalComponent: ModalComponent = {
			ref: ExerciseForm,
			props: {equipment_options: equipment_names}
		}

        const modal: ModalSettings = {
        type: "component",
        title: "Add Equipment",
		component: modalComponent
		}
		
</script>

<div class="flex justify-center items-center my-6">
	<button class="btn variant-filled-surface rounded-md shadow-md" on:click={() => modalStore.trigger(modal)}>Add Exercise</button>
</div>
<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				{#each categories as category}
					<th>{category}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data.data.exercises as exercise}
				<tr>
					<td>{exercise.name}</td>
					<td>{exercise.description ? exercise.description : 'None'}</td>
					<td>{exercise.category}</td>
					<td>{exercise.equipment ? exercise.equipment.name : 'None'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
