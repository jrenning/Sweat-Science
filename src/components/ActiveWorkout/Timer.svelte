<!-- https://eugenkiss.github.io/7guis/tasks#timer -->

<script lang="ts">
	import { Progress} from '@skeletonlabs/skeleton-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import PauseIcon from '../Icons/PauseIcon.svelte';
	import PlayIcon from '../Icons/PlayIcon.svelte';
	import type { Writable } from 'svelte/store';
	import { formatTime } from '../../helpers/datetime';

	interface Props {
		duration?: number;
		finished: Writable<boolean>;
	}

	let { duration = 60, finished }: Props = $props();

	let startTime: number;
	let elapsedTime = tweened(0);
	let oldElapsedTime: number = 0;

	type States = 'Running' | 'Paused' | 'Completed';

	let STATE: States = 'Running';

	let interval: NodeJS.Timeout;
	const start = async () => {
		startTime = Date.now();
		fetch('/api/notification', {
			method: 'POST',
			body: JSON.stringify({delay: duration})
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


</script>

<div class="flex flex-col space-y-4 justify-center items-center">
	<Progress value={($elapsedTime / duration) * 100}>
		{formatTime(duration - $elapsedTime)}
	</Progress>
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
