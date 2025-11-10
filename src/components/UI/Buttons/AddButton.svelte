<script lang="ts">
	interface Props {
		action?: () => void;
	}

	let { action = () => {} }: Props = $props();
</script>

<button
	onclick={() => action()}
	class="btn-md variant-outline-secondary flex w-full mt-6 justify-center items-center rounded-md shadow-md"
	>Add</button
>
