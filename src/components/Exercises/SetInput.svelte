<script lang="ts">
	export let type: 'Weight' | 'Distance' | 'Duration';

	export let weight = 0;
	export let reps = 0;

	export let distance = 0;

	export let duration = 0;

	export let pace = 0;

	export let hidden = false;

	export let percent = false;

	let visible = hidden ? 'none' : 'flex';

	let extra_options = {
		Weight: '% of 1RM',
		Distance: '% of Longest',
		Duration: '% of Longest'
	};

	export let extra = true;

	export let cardio = false;
</script>

<div style={`display: ${visible}`} class="flex-col space-y-4">
	<div class="flex space-x-6">
		<label class="font-semibold" for="type">{type}</label>
		{#if type == 'Weight'}
			<input
				class="w-16 input outline-secondary-500 outline-2"
				name="type"
				type="number"
				inputmode="numeric"
				disabled={percent}
				bind:value={weight}
			/>
			{#if extra}
				<label class="text-sm" for="extra">{extra_options[type]}</label>
				<input type="checkbox" name="extra" class="checkbox" bind:checked={percent} />
				<input
					type="number"
					inputmode="numeric"
					class="w-10 input outline-secondary-500 outline-2"
					disabled={!percent}
					bind:value={weight}
				/>
			{/if}
		{:else if type == 'Duration'}
			<input
				class="w-16 input outline-secondary-500 outline-2"
				name="type"
				inputmode="numeric"
				type="number"
				disabled={percent}
				bind:value={duration}
			/>
			{#if extra}
				<label class="text-sm" for="extra">{extra_options[type]}</label>
				<input type="checkbox" name="extra" class="checkbox" bind:checked={percent} />
				<input
					type="number"
					inputmode="numeric"
					class="w-10 input outline-secondary-500 outline-2"
					disabled={!percent}
					bind:value={duration}
				/>
			{/if}
			{#if cardio}
				<label class="text-sm" for="extra">Pace</label>
				<input
					type="number"
					inputmode="numeric"
					class="w-10 input outline-secondary-500 outline-2"
					disabled={!percent}
					bind:value={pace}
				/>
			{/if}
		{:else if type == 'Distance'}
			<input
				class="w-16 input outline-secondary-500 outline-2"
				name="type"
				inputmode="numeric"
				type="number"
				disabled={percent}
				bind:value={distance}
			/>
			{#if extra}
				<label class="text-sm" for="extra">{extra_options[type]}</label>
				<input type="checkbox" name="extra" class="checkbox" bind:checked={percent} />
				<input
					type="number"
					inputmode="numeric"
					class="w-10 input outline-secondary-500 outline-2"
					disabled={!percent}
					bind:value={duration}
				/>
			{/if}
			{#if cardio}
				<label class="text-sm" for="extra">Pace</label>
				<input
					type="number"
					inputmode="numeric"
					class="w-10 input outline-secondary-500 outline-2"
					disabled={!percent}
					bind:value={pace}
				/>
			{/if}
		{/if}
	</div>
	{#if type == 'Weight'}
		<div class="flex flex-row space-x-11">
			<label class="font-semibold" for="reps">Reps</label>
			<input class="input w-16" type="number" inputmode="numeric" name="reps" bind:value={reps} />
		</div>
	{/if}
</div>
