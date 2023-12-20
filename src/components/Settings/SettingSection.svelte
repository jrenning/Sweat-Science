<script lang="ts">
	export let name: string;

	export let link: string;

	import ChevronIcon from '../Icons/ChevronIcon.svelte';
</script>

<a href={link}>
	<div
		class=" flex border-2 py-4 rounded-md justify-center items-center border-secondary-500 w-full"
	>
		<h2 class="font-semibold text-xl mx-4">{name}</h2>

		<div class="flex flex-grow justify-end mr-4">
			<ChevronIcon />
		</div>
	</div>
</a>
