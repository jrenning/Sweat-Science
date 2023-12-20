<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
import BackButton from '../../../components/UI/Buttons/BackButton.svelte';

	import { hexToRgb, rgbStringToHex } from '../../../helpers/colors';
	import { currentTheme } from '../../../stores/theme';
	import FormButton from '../../../components/UI/Buttons/FormButton.svelte';

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
	<div class="flex justify-evenly">
		<BackButton link="/settings" />

		<h1 class="mx-4 font-semibold text-4xl mb-10">Defaults</h1>
		<div />
	</div>
	<div class="flex flex-col space-y-8 items-center">
		<h3 class="font-semibold text-xl">Theme</h3>
        <div class="flex space-x-6">
		<select class="select" id="theme" on:change={()=> updateTheme()}>
			{#each themes as theme}
				<option>{theme}</option>
			{/each}
		</select>
        <FormButton text="Set as Default" action={()=> setTheme()}/>
        </div>
        <LightSwitch />
	</div>
</div>
