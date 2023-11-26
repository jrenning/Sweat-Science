<script lang="ts">
	export let type: 'Weight' | 'Distance' | 'Duration';

	export let weight = 0;
	export let reps = 0;

	export let distance = 0;

	export let duration = 0;

	let extra_options = {
		Weight: '% of 1RM',
		Distance: '% of Longest',
		Duration: '% of Longest'
	};

	let extra = false;
</script>

<div class="flex space-x-6 items-center">
	<label class="font-semibold" for="type">{type}</label>
	{#if type == 'Weight'}
		<input
			class="w-16 input outline-secondary-500 outline-2"
			name="type"
			type="number"
			disabled={extra}
			bind:value={weight}
		/>
	{:else if type == 'Duration'}
		<input
			class="w-16 input outline-secondary-500 outline-2"
			name="type"
			type="number"
			disabled={extra}
			bind:value={duration}
		/>
	{:else if type == 'Distance'}
		<input
			class="w-16 input outline-secondary-500 outline-2"
			name="type"
			type="number"
			disabled={extra}
			bind:value={distance}
		/>
	{/if}
	<label class="text-sm" for="extra">{extra_options[type]}</label>
	<input type="checkbox" name="extra" class="checkbox" on:click={() => (extra = !extra)} />
	<input type="number" class="w-10 input outline-secondary-500 outline-2" disabled={!extra} />
</div>
{#if type == 'Weight'}
	<div class="flex flex-row space-x-11">
		<label class="font-semibold" for="reps">Reps</label>
		<input class="input w-16" type="number" name="reps" bind:value={reps} />
	</div>
{/if}
