<script lang="ts">
	interface Props {
		text: string;
		action?: () => void;
		type?: "button" | "submit";
		disabled?: boolean;
	}

	let {
		text,
		action = ()=> {},
		type = "button",
		disabled = false
	}: Props = $props();
</script>

<button type={type} disabled={disabled} class="btn text-xl preset-filled-surface-500  shadow-md" onclick={() => action()}
	>{text}</button
>
