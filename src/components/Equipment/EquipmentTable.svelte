<script lang="ts">
	import type { Equipment } from "$lib/db/schema";


    	export let equipment_list: Equipment[]

	let categories = ['Name', 'Type'];
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
			{#each equipment_list as equipment}
				<tr>
					<td>{equipment.name}</td>
					<td>{equipment.type}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>