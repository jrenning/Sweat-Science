<script lang="ts">
	import { exercise_info, type WorkoutRoutineWithExercises } from '$lib/db/schema';

	interface Props {
		workout: WorkoutRoutineWithExercises;
	}

	let { workout }: Props = $props();
</script>

<div>
	<div>{workout.name}</div>
	<div class="grid grid-cols-2">
		{#each workout.exercises as exercise}
			<div>
				<div class="font-semibold">{exercise.exercise.name}</div>
				<div class="grid grid-cols-2">
					{#each { length: exercise.weight.length }, i}
						{#if exercise.percent_max[i]}
                            <div>{exercise.weight[i]}%</div>
                        {:else}
							<div>{exercise.weight[i]}</div>
						{/if}
						<div>{exercise.reps[i]}</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
