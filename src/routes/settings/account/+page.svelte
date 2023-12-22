<script lang="ts">
	import SettingsHeader from '../../../components/Settings/SettingsHeader.svelte';
	import BackButton from '../../../components/UI/Buttons/BackButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	type SettingType = 'weight' | 'height';

	async function updateSetting(e: EventTarget | null, type: SettingType) {

        let target = e as typeof e & {
            value: number
        }
        let obj = {}
        //@ts-ignore
        obj[type] = target.value
		await fetch(`/api/user/${type}`, {
			method: 'POST',
			body: JSON.stringify(obj)
		});
	}



</script>

<div>
	<SettingsHeader name="Account" />
	<div class="flex flex-col space-y-6 mx-20">
		<div class="flex space-x-6 items-center">
			<h3 class="font-semibold text-xl flex justify-start">Weight</h3>
			<input type="number" inputmode="numeric" class="input" value={data.account_settings.weight} on:blur={(e)=> updateSetting(e.target, "weight")} />
			<div>lb</div>
		</div>

		<div class="flex space-x-6 justify-center items-center">
			<h3 class="font-semibold text-xl flex justify-start">Height</h3>
			<input type="number" inputmode="numeric" class="input" value={data.account_settings.height}  on:blur={(e)=> updateSetting(e.target,"height")}/>
			<div>in</div>
		</div>
	</div>
</div>
