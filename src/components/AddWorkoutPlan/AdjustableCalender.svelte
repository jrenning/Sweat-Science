<script lang="ts">
	import MiniCalender from "./MiniCalender.svelte";


	export let start_date: Date;
	export let end_date: Date;

	let calender_info: CalenderInfo[]

	$: {
		calender_info = generateCalenderInfo(new Date(start_date), new Date(end_date));
	}


	type CalenderInfo = {
		days: number[],
		offset: number
		start_index: number
	}

	export function generateCalenderInfo(start: Date, end: Date) {

		let calender_info: CalenderInfo[] = []
		let offsets: number[] = []
		let dates: number[][] = []
		let start_idxs: number[] = [1]
		let int_dates: number[] = []

		offsets.push(start.getDay())
		let start_index = 1
		for (start; start < end; start.setDate(start.getDate() + 1)) {
			if (start.getDate() == 1) {
				// add old array to dates list
				dates = [...dates, int_dates];
				// reset int list
				int_dates = [1];
				// add new start index
				start_idxs.push(start_index)

				offsets.push(start.getDay())
			} else {
				int_dates.push(start.getDate());
			}
			start_index += 1
		}
		dates.push(int_dates);

		// build calender info 
		for (let i=0; i<dates.length; i++) {
			calender_info.push({
				days: dates[i],
				offset: offsets[i],
				start_index: start_idxs[i]
			})
		}

		return calender_info
	}
</script>

<div class="flex flex-col w-full">
	{#each calender_info as calender, index}
		<MiniCalender dates={calender.days} {start_date} day_offset={calender.offset} month_offset={index} day_start={calender.start_index} />
	{/each}
</div>
