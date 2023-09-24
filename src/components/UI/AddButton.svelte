<script lang="ts">
    export let link: string
    export let object: string
</script>


<a href={link} data-sveltekit-preload-data="off">
    <button class="btn-sm variant-filled-surface shadow-md rounded-md text-md">
        Add {object}

</button>

</a>