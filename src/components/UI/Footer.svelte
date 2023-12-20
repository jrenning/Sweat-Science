<script lang="ts">
	import CalenderIcon from '../Icons/CalenderIcon.svelte';
	import ChartIcon from '../Icons/ChartIcon.svelte';
	import HomeIcon from '../Icons/HomeIcon.svelte';
	import SettingsIcon from '../Icons/SettingsIcon.svelte';

	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const addPopup: PopupSettings = {
		event: 'click',
		target: 'addPopup',
		placement: 'top'
	};
</script>

<footer
	class=" w-full bottom-0 fixed left-0 flex flex-col justify-center items-center bg-surface-50 dark:bg-surface-900 rounded-md py-2"
>
	<div
		class="rounded-md flex-col flex justify-center hidden items-center font-semibold space-y-4 shadow-md absolute p-2 bg-red-50"
		data-popup="addPopup"
	>
		<a href="/add_workout_plan"><div class="mb-4 flex justify-center">New Workout Plan</div></a>
		<a href="/add_workout"><div class="mb-4 flex justify-center">New Workout</div></a>
	</div>
	<div class="flex justify-center items-center space-x-10 mb-6">
		<div>
			<a href="/"><div class="w-6 h-6 dark:fill-white"><HomeIcon /></div></a>
		</div>
		<div>
			<a href="/progress"><div class="w-6 h-6 dark:fill-white"><ChartIcon /></div></a>
		</div>

		<div use:popup={addPopup} class="cursor-pointer">
			<div
				class="w-10 h-10 rounded-full dark:bg-gray-50 bg-surface-300 text-red-500 flex justify-center items-center text-3xl"
			>
				+
			</div>
		</div>
		<div>
			<a href="/calender"><div class="w-6 h-6 dark:fill-white"><CalenderIcon /></div></a>
		</div>
		<div>
			<a href="/settings"><div class="w-6 h-6 dark:fill-white"><SettingsIcon /></div></a>
		</div>
	</div>
</footer>
