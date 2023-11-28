<script lang="ts">
	import FormButton from '../UI/Buttons/FormButton.svelte';

	export let parent_id: number;
</script>

<div class="card p-4 flex flex-col space-y-6">
	<!-- <div>Add Folder</div> -->
	<form class="flex justify-center items-center space-y-8 flex-col">
		<div class="flex flex-col space-y-2">
			<label>Name</label>
			<input class="input" />
		</div>
        <input type="hidden" value={parent_id} />

		<FormButton text="Add" />
	</form>
</div>
