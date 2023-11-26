<script lang="ts">
	export let text: string;
	export let action: () => void;
</script>

<button type="button" class="btn text-xl variant-filled-surface  shadow-md" on:click={() => action()}
	>{text}</button
>
