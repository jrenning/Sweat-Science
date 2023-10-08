<script lang="ts">
	import type { WorkoutLogWithExercises } from "$lib/db/schema";
	import Card from "../UI/Card.svelte";
	import HorizontalScrollBox from "../UI/HorizontalScrollBox.svelte";
	import CardioCard from "./CardioCard.svelte";
	import FlexibilityCard from "./FlexibilityCard.svelte";
	import StrengthCard from "./StrengthCard.svelte";

    export let last_workout: WorkoutLogWithExercises | undefined
</script>

{#if last_workout}
<div class="bg-slate-100 dark:bg-red-300 rounded-md shadow-md p-1">
			<div class="font-bold text-4xl mx-4 mt-2">{last_workout?.name}</div>
			<div class="italic mx-4 mb-2">{last_workout?.created_at?.toDateString()}</div>
            <HorizontalScrollBox>
                {#each last_workout.exercise_routines as exercise}
                    {#if exercise.exercise.category == "Cardio"}
                        <CardioCard exercise={exercise}/>
                    {:else if exercise.exercise.category == "Strength"}
                        <StrengthCard exercise={exercise}/>
                    {:else}
                        <FlexibilityCard exercise={exercise}/>
                    {/if}
                {/each}
            </HorizontalScrollBox>
            </div>
{/if}
