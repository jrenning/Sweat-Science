<!-- https://eugenkiss.github.io/7guis/tasks#timer -->

<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import PauseIcon from '../Icons/PauseIcon.svelte';
	import PlayIcon from '../Icons/PlayIcon.svelte';
	import type { Writable } from 'svelte/store';

	export let duration = 60;
	export let finished: Writable<boolean>;

	let startTime: number;
	let elapsedTime = tweened(0);
	let oldElapsedTime: number = 0;

	type States = 'Running' | 'Paused' | 'Completed';

	let STATE: States = 'Running';

	let interval: NodeJS.Timeout;
	const start = async () => {
		startTime = Date.now();
		fetch('/api/notification', {
			method: 'POST'
		});
		interval = setInterval(() => {
			if (STATE == 'Running') {
				const endTime = Date.now();

				$elapsedTime = (endTime - startTime) / 1000 + oldElapsedTime;
			}
			if ($elapsedTime > duration) {
				STATE = 'Completed';
				$elapsedTime = 0;

				finished.set(false);
			}
		});
	};

	const reset = () => {
		STATE = 'Paused';
		$elapsedTime = 0;
		clearInterval(interval);
	};

	const pause = () => {
		oldElapsedTime = $elapsedTime;
		STATE = 'Paused';
	};

	const resume = () => {
		STATE = 'Running';
		startTime = Date.now();
	};

	const handleButton = () => {
		if (STATE == 'Running') {
			pause();
		} else {
			resume();
		}
	};

	onMount(() => {
		start();
	});

	const formatTime = (time: number) => {
		let minutes = Math.floor(time / 60);
		let seconds = Math.floor(time - minutes * 60);

		let minute_str = '';
		let second_str = '';
		if (minutes < 10) {
			minute_str = `0${minutes}`;
		} else {
			minute_str = `${minutes}`;
		}

		if (seconds < 10) {
			second_str = `0${seconds}`;
		} else {
			second_str = `${seconds}`;
		}

		return `${minute_str}:${second_str}`;
	};
</script>

<div class="flex flex-col space-y-4 justify-center items-center">
	<ProgressRadial value={($elapsedTime / duration) * 100}>
		{formatTime(duration - $elapsedTime)}
	</ProgressRadial>
	<!-- <button
		on:click={() => handleButton()}
		class="rounded-full variant-filled-secondary w-10 h-10 font-semibold shadow-md flex justify-center items-center text-lg"
	>
		{#if STATE == 'Running'}
			<div class="w-4 h-4 flex justify-center items-center">
				<PauseIcon />
			</div>
		{:else}
			<div class="h-4 w-4 flex justify-center items-center">
				<PlayIcon />
			</div>
		{/if}
	</button> -->
</div>
