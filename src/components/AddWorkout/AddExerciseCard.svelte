<script lang="ts">
	import EditIcon from "../Icons/EditIcon.svelte";
    import DeleteIcon from "../Icons/DeleteIcon.svelte"
	import type { ExerciseRoutineWithExercise, InsertExerciceRoutineWithExercises } from "$lib/db/schema";
	import { invalidateAll } from "$app/navigation";

    export let exercise: InsertExerciceRoutineWithExercises


    async function deleteExercise() {
        const data = {
            action: "delete",
            exercise_routine_id: exercise.id,
            workout_routine_id: exercise.workout_routine_id
        }

        await fetch("/api/exercise_routine", 
        {
            method: "POST",
            body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
        })
        // refresh page data 
        await invalidateAll()
    }


</script>


<div class="rounded-md bg-surface-300 px-2 py-4 shadow-md border-surface-700 border">
    <div class="flex justify-between items-center">
    <div class="text-2xl font-semibold">{exercise.exercise.name}</div>
    <div class="flex flex-row space-x-6">
        <button type="button" class="w-4 h-4"><EditIcon /></button>
        <button type="button" class="w-4 h-4" on:click={()=> deleteExercise()}><DeleteIcon /></button>
    </div>
    </div>
    <div>{exercise.sets} Sets</div>


</div>