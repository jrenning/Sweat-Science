<script lang="ts">
	export let action: () => void = () => {};
</script>

<button
	on:click={() => action()}
	class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md"
	>Add</button
>
