<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { ExerciseCategories, exerciseLog } from '$lib/db/schema';
	import EditIcon from '../../components/Icons/EditIcon.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let editable = $state(false)

	const {form, errors} = superForm(data.form)

	let tabSet = $state(0);
</script>

{#if data.data}
	<div class="flex justify-center items-center flex-col">
		<div class="flex flex-row justify-center items-center space-x-6">
			<h1 class="font-semibold text-2xl">{data.data.name}</h1>
			<button class="w-3 h-3" onclick={()=> editable= !editable}>
				{#if editable}
					Cancel
				{:else}
					<EditIcon />

				{/if}
				
			</button>
		</div>

		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<span>About</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Logs</Tab>
			<Tab bind:group={tabSet} name="tab3" value={2}>Records</Tab>
			<!-- Tab Panels --->
			{#snippet panel()}
					
					{#if tabSet === 0}
						<form class="space-y-8">
							<label for="name">Name</label>
							<input class="input text-center" disabled={!editable} value={data.data.name} type="text" name="name" />
							{#if $errors.name} <span>{$errors.name}</span> {/if}
							<label for="description">Description</label>
							<textarea
								class="textarea resize-y text-center"
								value={data.data.description}
								disabled={!editable}
								name="description"
							></textarea>
							<label for="category">Category</label>
							<select class="select" disabled={!editable} value={data.data.category} name="category">
								{#each ExerciseCategories.enumValues as category}
									<option>{category}</option>
								{/each}
							</select>
							{#if editable}
							<div class="flex justify-center items-center">
							<button class="btn-md variant-filled-surface rounded-md shadow-md">
								Save
							</button>
							</div>
							{/if}
						</form>
					{:else if tabSet === 1}
						(tab panel 2 contents)
					{:else if tabSet === 2}
						(tab panel 3 contents)
					{/if}
				
					{/snippet}
		</TabGroup>
	</div>
{/if}
