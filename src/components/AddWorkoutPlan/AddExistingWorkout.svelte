<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import type { WorkoutRoutineWithExercises } from "$lib/db/schema";
	import { Autocomplete, getModalStore, type AutocompleteOption } from "@skeletonlabs/skeleton";
	import type { AutocompleteEvents } from "@skeletonlabs/skeleton/dist/components/Autocomplete/Autocomplete.svelte";
	import { onMount } from "svelte";
	
export let plan_id: number
export let day: number

const modal = getModalStore()

let workoutOptions: AutocompleteOption[] = []

onMount(async ()=> {
		const res = await fetch('/api/workout_routine');

		const folders: WorkoutRoutineWithExercises[] = await res.json();

		let workoutData = folders.map((workout) => {
			return { label: workout.name, value: workout.id };
		});

        workoutOptions = workoutData
})


let inputValue = ""

	async function onWorkoutSelection(event: CustomEvent<AutocompleteOption>) {
		inputValue = event.detail.label;
        const data = {
            workout_id: event.detail.value,
            plan_id: plan_id,
            day: day
        }
        // add the workout
        const res = await fetch("/api/workout_plan/workouts/add", {
            method: "POST",
            body: JSON.stringify(data)
        })
		
		const json = await res.json()

		await invalidateAll()


        // close the modal
        modal.close()
        
	}


</script>

<div class="card py-4 px-14 flex flex-col">

	<form>
        <input class="input" type="search" name="demo" bind:value={inputValue} placeholder="Search..." />
		<Autocomplete
			bind:input={inputValue}
			options={workoutOptions}
			on:selection={onWorkoutSelection}
		/>
	</form>


</div>