<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import EquipmentForm from '../../components/Equipment/EquipmentForm.svelte';

	export let data: PageData;

	let categories = ['Name', 'Type', 'Muscle Groups'];

	const modalStore = getModalStore();

	const modalComponent: ModalComponent = {
		ref: EquipmentForm
	};

	const modal: ModalSettings = {
		type: 'component',
		title: 'Add Equipment',
		component: modalComponent
	};
</script>

<div class="flex justify-center items-center my-6">
	<button
		class="btn variant-filled-surface rounded-md shadow-md"
		on:click={() => modalStore.trigger(modal)}>Add Equipment</button
	>
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
			{#each data.data as equipment}
				<tr>
					<td>{equipment.name}</td>
					<td>{equipment.type}</td>
					<td>{equipment.muscle_groups?.join(', ')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
