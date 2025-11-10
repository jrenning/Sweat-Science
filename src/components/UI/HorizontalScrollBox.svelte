<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div class="overflow-x-auto bg-surface-200 overflow-y-hidden flex-nowrap flex space-x-6 p-2 rounded-md shadow-md">
    {@render children?.()}
</div>