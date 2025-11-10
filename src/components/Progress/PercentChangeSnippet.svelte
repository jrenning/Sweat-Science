<script lang="ts">
	interface Props {
		value: number;
		name: 'Year' | 'Quarter' | 'Month' | "Last";
	}

	let { value, name }: Props = $props();
</script>

<div class="flex flex-col">
	<div class="font-bold">{name}</div>
	<div class={`${value > 0 ? 'text-green-500' : 'text-red-500'}`}>{value}%</div>
</div>
