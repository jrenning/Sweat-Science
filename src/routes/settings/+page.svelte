<script lang="ts">
	import SettingSection from "../../components/Settings/SettingSection.svelte";



const settings = ["Account", "Defaults", "Upload", "Tools"]

</script>

<div class="mx-4">

    <h1 class="mx-4 font-semibold text-4xl mb-10">Settings</h1>
    <div class="flex flex-col space-y-8">
    {#each settings as setting}

    <SettingSection name={setting} link={`/settings/${setting.toLowerCase()}`}/>
    {/each}
    </div>
</div>