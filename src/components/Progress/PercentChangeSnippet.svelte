<script lang="ts">
	export let value: number;
	export let name: 'Year' | 'Quarter' | 'Month' | "Last";
</script>

<div class="flex flex-col">
	<div class="font-bold">{name}</div>
	<div class={`${value > 0 ? 'text-green-500' : 'text-red-500'}`}>{value}%</div>
</div>
