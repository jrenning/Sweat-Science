<script lang="ts">
	import MiniCalender from './MiniCalender.svelte';

	export let start_date: Date;
	export let end_date: Date;

	let dates: number[][] = [];

	$: {
		dates = generateDateArr(new Date(start_date), new Date(end_date));
	}


	type CalenderInfo = {
		days: number[],
		offset: number
	}

	function generateDateArr(start: Date, end: Date) {
		let dates: number[][] = [];
		let int_dates: number[] = [];
		// fill first bit with zeros to get right day of week
		for (let i = 0; i < start.getDay(); i++) {
			int_dates.push(0);
		}

		for (start; start < end; start.setDate(start.getDate() + 1)) {
			console.log(start.getDate());
			if (start.getDate() == 1) {
				// add old array to dates list
				dates = [...dates, int_dates];
				// reset int list
				int_dates = [];
				// add zeros if needed
				for (let i = 0; i < start.getDay(); i++) {
					int_dates.push(0);
				}
				// add first of the month
				int_dates.push(1);
			} else {
				int_dates.push(start.getDate());
			}
		}
		dates.push(int_dates);
		console.log(dates);
		return dates;
	}
</script>

<div class="flex flex-col w-full">
	{#each dates as date, index}
		<MiniCalender dates={date} {start_date} offset={index} />
	{/each}
</div>
