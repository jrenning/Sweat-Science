<script lang="ts">
	interface Props {
		value: number;
		name: 'Year' | 'Quarter' | 'Month' | 'Last';
	}

	let { value, name }: Props = $props();

	const positive = value >= 0;
</script>

<div
	class="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
>
	<span class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
		{name}
	</span>

	<div class={`text-2xl font-bold ${positive ? 'text-green-600' : 'text-red-600'}`}>
		{positive ? '+' : ''}
		{value}%
	</div>

	<div
		class={`mt-2 text-xs font-medium px-2 py-1 rounded-full ${
			positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
		}`}
	>
		{positive ? 'Improving' : 'Declining'}
	</div>
</div>
