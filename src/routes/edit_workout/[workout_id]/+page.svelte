<script lang="ts">
	import WorkoutForm from '../../../components/AddWorkout/WorkoutForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.workout_routine}
	<WorkoutForm
		exerciseForm={data.exerciseForm}
		editExerciseForm={data.editExerciseForm}
		type="Update"
		workoutForm={data.workoutForm}
		workout_routine={data.workout_routine}
	/>
{/if}
