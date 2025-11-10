<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import type { WorkoutRoutineWithExercises } from "$lib/db/schema";
	import { onMount } from "svelte";
	
	interface Props {
		plan_id: number;
		day: number;
	}

	let { plan_id, day }: Props = $props();


let workoutOptions = $state([])

onMount(async ()=> {
		const res = await fetch('/api/workout_routine');

		const folders: WorkoutRoutineWithExercises[] = await res.json();

		let workoutData = folders.map((workout) => {
			return { label: workout.name, value: workout.id };
		});
		//@ts-ignore
        workoutOptions = workoutData
})


let inputValue = $state("")

	async function onWorkoutSelection(event: CustomEvent) {
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

        
	}


</script>

<div class="card py-4 px-14 flex flex-col">

	<form>
        <input class="input" type="search" name="demo" bind:value={inputValue} placeholder="Search..." />

	</form>


</div>