<script lang="ts">
	export let text: string;
	export let action: () => void = ()=> {}
	export let type: "button" | "submit" = "button"
</script>

<button type={type} class="btn text-xl variant-filled-surface  shadow-md" on:click={() => action()}
	>{text}</button
>
