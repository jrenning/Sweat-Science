<script lang="ts">
	interface Props {
		name: string;
	}

	let { name }: Props = $props();
</script>

<div class="flex w-[80%] items-center mt-8">
	<h2 class="text-2xl font-semibold">
		{name}
	</h2>
</div>
