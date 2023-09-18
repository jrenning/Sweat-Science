<script lang="ts">
	import AdjustableCalender from './AdjustableCalender.svelte';
	import FormStepChange from './FormStepChange.svelte';

	let page: number = 1;
	let days: number = 1;

	const start = new Date(2023, 9, 17);
	$: end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + days);
</script>

<FormStepChange bind:page names={["General", "Workouts"]} />
<form method="POST" class="flex flex-col space-y-4 bg-red-50 m-4 rounded-md p-2">
	{#if page == 1}
		<label for="name">Name</label>
		<input type="text" id="name" />
		<label for="description">Description</label>
		<input type="text" id="description" />
		<label for="start_date">Start Date</label>
		<input type="date" id="start_date" />

		<button class="rounded-md shadow-md px-2 py-1 bg-red-100" on:click={() => (page += 1)}>
			Next
		</button>
	{:else if page == 2}
		<div class="flex flex-col justify-center items-center">
			<label for="days">Number of Days</label>
			<div class="flex justify-center items-center space-x-4">
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => {
						if (days > 6) {
							days -= 7;
						} else {
							days = 0;
						}
					}}
					type="button">- Week</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => {
						if (days > 0) {
							days -= 1;
						}
					}}
					type="button">-</button
				>

				<input value={days}  class="w-8"/>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => (days += 1)}
					type="button">+</button
				>
				<button
					class="rounded-md shadow-md px-2 py-1 bg-red-100"
					on:click={() => (days += 7)}
					type="button">+ Week</button
				>
			</div>

			<AdjustableCalender start_date={start} end_date={end} />
		</div>

		<div class="flex justify-center items-center space-x-4">
			<button class="rounded-md shadow-md px-2 py-1 bg-red-100" on:click={() => (page -= 1)}>
				Previous
			</button>
			<button class="rounded-md shadow-md px-2 py-1 bg-red-100" on:click={() => (page += 1)}>
				Next
			</button>
		</div>
	{/if}
</form>
