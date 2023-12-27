<script lang="ts">
	import { workout_routine } from '$lib/db/schema';
import WorkoutForm from '../../../components/AddWorkout/Form/WorkoutForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.workout_routine}
	<WorkoutForm
		exerciseForm={data.exerciseForm}
		type="Update"
		workoutForm={data.workoutForm}
		workout_routine={data.workout_routine}
		post_link={'?/edit_workout'}
        exercise_post_link={`/edit_workout/${data.workout_routine.id}?/add_exercise`}
	/>
{/if}
