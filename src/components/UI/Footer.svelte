<script>
	import CalenderIcon from '../Icons/CalenderIcon.svelte';
	import ChartIcon from '../Icons/ChartIcon.svelte';
	import HomeIcon from '../Icons/HomeIcon.svelte';
	import SettingsIcon from '../Icons/SettingsIcon.svelte';
</script>

<footer
	class=" w-full bottom-0 fixed left-0 flex justify-center items-center bg-surface-900 rounded-md py-2"
>
	<div class="flex justify-center items-center space-x-10 mb-6">
		<div>
			<a href="/"><div class="w-6 h-6 fill-white"><HomeIcon /></div></a>
		</div>
		<div>
			<a href="/progress"><div class="w-6 h-6 fill-white"><ChartIcon /></div></a>
		</div>
		<div>
			<a href="/"><div class="w-10 h-10 rounded-full bg-gray-50 text-red-500 flex justify-center items-center text-3xl">+</div></a>
		</div>
		<div>
			<a href="/"><div class="w-6 h-6 fill-white"><CalenderIcon /></div></a>
		</div>
		<div>
			<a href="/"><div class="w-6 h-6 fill-white"><SettingsIcon /></div></a>
		</div>
	</div>
</footer>
