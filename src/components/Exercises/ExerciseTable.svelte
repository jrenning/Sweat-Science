<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Equipment, ExerciseWithEquipment } from "$lib/db/schema";

	import EditIcon from '../../components/Icons/EditIcon.svelte';


	export let exercises: ExerciseWithEquipment[]

	let categories = ['Name', 'Description', 'Category', 'Equipment', "Muscle Groups"];

</script>


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
			{#each exercises as exercise}
				<tr on:click={()=> goto(`/exercises?exercise_id=${exercise.id}`)}>
					<td>{exercise.name}</td>
					<td>{exercise.description ? exercise.description : 'None'}</td>
					<td>{exercise.category}</td>
					<td>{exercise.equipment ? exercise.equipment.name : 'None'}</td>
					<td>{exercise.muscle_groups ? exercise.muscle_groups?.join(",") : ""}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>