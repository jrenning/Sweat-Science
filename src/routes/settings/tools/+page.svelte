<script lang="ts">

    import FormButton from "../../../components/UI/Buttons/FormButton.svelte"
	import { calcOneRepMax } from "../../../helpers/rep_max";
    import SettingsHeader from "../../../components/Settings/SettingsHeader.svelte"

    function calcRepMax() {
        // e.preventDefault()
        //@ts-ignore
        const weight = document.getElementById("weight_calc").value
        //@ts-ignore
        const reps = document.getElementById("reps_calc").value

        const rep_max = calcOneRepMax(Number(weight), Number(reps))

        //@ts-ignore
        document.getElementById("rm_result").innerText = `${rep_max}`


    }


</script>


<div>
    <SettingsHeader name="Tools" />

    <div class="flex flex-col justify-center items-center">
        <div class="font-semibold text-lg">1 RM Calculator</div>
        <form class="flex flex-col space-y-6">
            <label for="weight">Weight</label>
            <input class="input" name="weight" inputmode="numeric" id="weight_calc"/>
            <label for="reps">Reps</label>
            <input class="input" inputmode="numeric" name="reps" id="reps_calc"/>
            <FormButton text="Calculate" action={calcRepMax}/>
        </form>
        <div id="rm_result" class="mt-8 font-bold text-xl"></div>
    </div>



</div>