<script lang="ts">
	interface Props {
		text: string;
		For: string;
	}

	let { text, For }: Props = $props();
</script>

<label for={For} class="text-xl font-semibold">{text}</label>