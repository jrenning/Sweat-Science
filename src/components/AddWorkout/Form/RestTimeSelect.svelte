<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';

	export let value: number;

    console.log(value)
</script>

<div class="flex flex-row space-x-6">
	<div>
		<label class="label" for="weight">30 sec</label>
		<input type="radio" class="radio" value="30" bind:group={value} />
	</div>

	<div>
		<label for="distance">1 min</label>
		<input type="radio" class="radio" name="type" value="60" bind:group={value} />
	</div>
	<div>
		<label for="time">1 min 30 sec</label>
		<input type="radio" class="radio" name="type" value="90" bind:group={value} />
	</div>
</div>
