<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import FormButton from '../UI/Buttons/FormButton.svelte';
	import type { insertWorkoutFolderSchema } from '$lib/db/schema';
	import { superForm } from 'sveltekit-superforms/client';
	import AddButton from '../UI/Buttons/AddButton.svelte';
	export let data: SuperValidated<typeof insertWorkoutFolderSchema>;
	const _form = superForm(data, {
		dataType: 'json'
	});
	const { form, enhance, errors } = _form;
	export let parent_id: number;
	export let type: "add" | "edit"
</script>

<div class="card p-4 flex flex-col space-y-6">
	<!-- <div>Add Folder</div> -->
	<form class="flex justify-center items-center space-y-8 flex-col"
	method="POST" action={`/workout_folder?/${type}_folder`}>
		<div class="flex flex-col space-y-2">
			<label for="name">Name</label>
			<input class="input" name="name"/>
		</div>
		<input type="hidden" name="parent_folder_id" value={parent_id} />

		<AddButton />
	</form>
</div>
