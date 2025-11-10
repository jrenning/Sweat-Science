<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="flex flex-col justify-center items-center space-y-6">
	{@render children?.()}
</div>
