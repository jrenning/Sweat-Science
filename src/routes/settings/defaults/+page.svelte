<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { hexToRgb, rgbStringToHex } from '../../../helpers/colors';
	import { currentTheme } from '../../../stores/theme';
	import FormButton from '../../../components/UI/Buttons/FormButton.svelte';
	import type { PageData } from './$types';
	import SettingsHeader from '../../../components/Settings/SettingsHeader.svelte';


	export let data: PageData


	const themes = [
		'skeleton',
		'wintry',
		'modern',
		'rocket',
		'seafoam',
		'vintage',
		'sahara',
		'hamlindigo',
		'crimson',
		'gold-nouveau'
	];

    async function setTheme() {
        //@ts-ignore
        let d = document.getElementById('theme').value;



        if (d) {
            await fetch("/api/user/theme", {
                method: "POST",
                body: JSON.stringify({theme: d})
            })
        }
    }

	function updateTheme() {
        //@ts-ignore
		let d = document.getElementById('theme').value;
		if (d) {
			currentTheme.set(d);
		}
	}
</script>

<div>
	<SettingsHeader name="Defaults" />
	<div class="flex flex-col space-y-6">
	<div class="flex flex-col space-y-8 items-center">
		<h3 class="font-semibold text-xl flex justify-start w-[90%]">Theme</h3>
        <div class="flex space-x-6">
		<select class="select" id="theme" on:change={()=> updateTheme()} value={data.default_settings.theme}>
			{#each themes as theme}
				<option>{theme}</option>
			{/each}
		</select>
        <FormButton text="Set as Default" action={()=> setTheme()}/>
        </div>
        <LightSwitch />
	</div>

	<div class="flex flex-col space-y-8 items-center">
		<h3 class="font-semibold text-xl lex justify-start w-[90%]">Notifications</h3>
		<div class="flex w-full space-x-10 justify-center">
			<div>Notify after rest</div>
			<input type="checkbox" class="checkbox" value={data.default_settings.notify_after_set} />
		</div>
	</div>
	</div>
</div>
