<script lang="ts">
	import type { WorkoutRoutineWithExercises } from "$lib/db/schema";
	import Card from "../UI/Card.svelte";
	import HorizontalScrollBox from "../UI/HorizontalScrollBox.svelte";
	import CardioCard from "./CardioCard.svelte";
	import FlexibilityCard from "./FlexibilityCard.svelte";
	import StrengthCard from "./StrengthCard.svelte";

    export let last_workout: WorkoutRoutineWithExercises | undefined
</script>

{#if last_workout}
<div class="bg-slate-100 rounded-md shadow-md p-1">
			<div class="font-bold text-4xl mx-4 mt-2">{last_workout?.name}</div>
			<div class="italic mx-4 mb-2">{last_workout?.created_at?.toDateString()}</div>
            <HorizontalScrollBox>
                {#each last_workout.exercises as exercise}
                    {#if exercise.exercise_routine.exercise.category == "Cardio"}
                        <CardioCard exercise={exercise.exercise_routine}/>
                    {:else if exercise.exercise_routine.exercise.category == "Strength"}
                        <StrengthCard exercise={exercise.exercise_routine}/>
                    {:else}
                        <FlexibilityCard exercise={exercise.exercise_routine}/>
                    {/if}
                {/each}
            </HorizontalScrollBox>
            </div>
{/if}
