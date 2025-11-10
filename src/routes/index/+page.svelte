<script lang="ts">
	import { Tab, TabGroup, getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import ClockIcon from '../../components/Icons/ClockIcon.svelte';
	import ChartIcon from '../../components/Icons/ChartIcon.svelte';
	import WeightIcon from '../../components/Icons/WeightIcon.svelte';
	import PersonIcon from '../../components/Icons/PersonIcon.svelte';
	import RobotIcon from '../../components/Icons/RobotIcon.svelte';
	import DumbbellIcon from '../../components/Icons/DumbbellIcon.svelte';
	import ExerciseTable from '../../components/Exercises/ExerciseTable.svelte';
	import type { PageData } from './$types';
	import EquipmentTable from '../../components/Equipment/EquipmentTable.svelte';
	import ExerciseForm from '../../components/Exercises/ExerciseForm.svelte';
	import EquipmentForm from '../../components/Equipment/EquipmentForm.svelte';

	let tabSet: number = $state(0);

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const equipment_names = data.data.equipment.map((equip) => {
		return { name: equip.name, id: equip.id };
	});

	const modalStore = getModalStore();

	const modalComponentExercise: ModalComponent = {
		ref: ExerciseForm,
		props: { equipment_options: equipment_names, data: data.exerciseForm }
	};

	const exerciseModal: ModalSettings = {
		type: 'component',
		title: 'Add Equipment',
		component: modalComponentExercise
	};

    const modalComponentEquipment: ModalComponent = {
		ref: EquipmentForm,
		props: {data: data.equipmentForm}
	};

	const equipmentModal: ModalSettings = {
		type: 'component',
		title: 'Add Equipment',
		component: modalComponentEquipment
	};


</script>

<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="tab1" value={0} class="flex justify-center items-center">
		{#snippet lead()}
				<div class="w-5 h-5 justify-center flex items-center"><WeightIcon /></div>
			{/snippet}
		<span>Exercises</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>
		{#snippet lead()}
				<div class="w-5 h-5 justify-center flex items-center"><DumbbellIcon /></div>
			{/snippet}
		<span>Equipment</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>
		{#snippet lead()}
				<div class="w-5 h-5 justify-center flex items-center"><PersonIcon /></div>
			{/snippet}
		<span>Workouts</span>
	</Tab>
	<!-- Tab Panels --->
	{#snippet panel()}
	
			{#if tabSet === 0}
				<button class="btn-md my-4 shadow-md rounded-md variant-filled-surface" onclick={()=> modalStore.trigger(exerciseModal)}>Add Exercise</button>
				<ExerciseTable exercises={data.data.exercises} />
			{:else if tabSet === 1}
	        			<button class="btn-md my-4 shadow-md rounded-md variant-filled-surface" onclick={()=> modalStore.trigger(equipmentModal)}>Add Equipment</button>
				<EquipmentTable equipment_list={data.data.equipment} />
			{:else if tabSet == 2}
				(tab 3)
			{/if}
		
	{/snippet}
</TabGroup>
