<script lang="ts">
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import HorizontalScrollBox from './HorizontalScrollBox.svelte';
	import WorkoutViewCard from './WorkoutViewCard.svelte';

	let elemCarousel: HTMLDivElement;

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}

	// function carouselThumbnail(index: number) {
	// 	elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
	// }
	export let workouts: WorkoutRoutineWithExercises[];
</script>


<div class="flex justify-center items-center">
	<div class="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
		<!-- Button: Left -->
		<button type="button" class=" rotate-180 text-2xl variant-filled-primary flex justify-center items-center btn-icon variant-filled" on:click={carouselLeft}>
	&#x27A7;
		</button>
		<!-- Full Images -->
		<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto md:w-[300px] w-[250px] h-[260px] md:h-[310px]">
			{#each workouts as workout}
				<WorkoutViewCard {workout} />
			{/each}
		</div>
		<!-- Button: Right -->
		<button type="button" class="btn-icon variant-filled-primary text-2xl flex justify-center items-center variant-filled" on:click={carouselRight}>
			&#x27A7;
		</button>
	</div>
</div>
<!-- <div class="card p-2 grid grid-cols-3 gap-4">
	{#each workouts as workout, i}
		<button type="button" class="px-2 py-1 rounded-md btn-md" on:click={() => carouselThumbnail(i)}>
			<div class="card p-2">
				{workout.name}
			</div>
		</button>
	{/each}
</div> -->
