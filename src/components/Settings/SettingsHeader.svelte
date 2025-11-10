<script lang="ts">
	import BackButton from "../UI/Buttons/BackButton.svelte";


	interface Props {
		name: string;
	}

	let { name }: Props = $props();

</script>


	<div class="flex justify-evenly">
		<BackButton link="/settings" />

		<h1 class="mx-4 font-semibold text-4xl mb-10">{name}</h1>
		<div></div>
	</div>