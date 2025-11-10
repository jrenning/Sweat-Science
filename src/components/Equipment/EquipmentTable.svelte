<script lang="ts">
	import type { Equipment } from "$lib/db/schema";


	interface Props {
		equipment_list: Equipment[];
	}

	let { equipment_list }: Props = $props();

	let categories = ['Name', 'Type'];
</script>


<div class="table-container">
	<table class="table ">
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