<script lang="ts">
	let days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
	let selected_day = days[new Date().getDay()];
</script>

<div>
	<div class="flex justify-evenly w-full">
		<div class="text-2xl">This Week</div>
		<div />
		<div class="text-lg text-gray-400">My Plans</div>
	</div>

	<div class="flex w-full justify-evenly my-4">
		{#each days as day}
			{#if day == selected_day}
				<div class="text-red-400">{day}</div>
			{:else}
				<div>{day}</div>
			{/if}
		{/each}
	</div>

    <div class="rounded-md bg-surface-400 pt-2 shadow-md mx-4 h-20 flex flex-col ">
        <div class="flex flex-col mx-4">
        <div class="text-xl font-semibold">Workout Name</div>
        <div>Workout Plan</div>
        </div>

    </div>

    <div class="mt-10">
        <div class="text-2xl mb-6 font-semibold mx-4">Summary</div>
        <div class="flex text-lg mx-4 justify-evenly">
            <div>10 Exercises</div>
            <div>640 cal</div>
            <div>48 min</div>
        </div>
    </div>

    <div class="mx-4 rounded-md bg-surface-400 py-2 mt-8">
        <div class="flex justify-center">3 New Achievements</div>
    </div>
</div>
