<script lang="ts">
	import type { WorkoutLogWithExercises } from '$lib/db/schema';
	import { calculateCalories } from '../../helpers/calories';
	import { formatTime } from '../../helpers/datetime';

	interface Props {
		last_workout: WorkoutLogWithExercises | undefined;
	}

	let { last_workout }: Props = $props();
</script>

{#if last_workout}
<a href={`/progress/workouts/${last_workout.id}`}>
	<div class=" bg-surface-400 rounded-md shadow-md text-black p-1">
		<div class="font-bold text-3xl italic mx-4 mt-2">{last_workout?.name}</div>
		<div class="italic mx-4 mb-2">{last_workout?.created_at?.toDateString()}</div>
		<div class="grid grid-cols-3 mx-2 mt-6 mb-8">
			<div class="flex flex-col justify-center items-center space-y-4">
				<div class="w-5 h-5 flex justify-center items-center text-lg font-bold">Exercises</div>
				<div
					class="rounded-md bg-[#E67070] bg-surface-200 flex justify-center items-center font-bold text-xl w-20 h-12"
				>
					{last_workout.exercise_routines.length}
				</div>
			</div>
			<div class="flex flex-col justify-center items-center space-y-4">
				<div class="w-5 h-5 flex justify-center items-center text-lg font-bold">Time</div>
				<div
					class="rounded-md bg-[#E67070] bg-surface-200 flex justify-center items-center font-bold text-xl w-20 h-12"
				>
					{formatTime(last_workout.workout_time_seconds ? last_workout.workout_time_seconds : 0)}
				</div>
			</div>
			<div class="flex flex-col justify-center items-center space-y-4">
				<div class="w-5 h-5 flex justify-center items-center text-lg font-bold">Calories</div>
				<div
					class="rounded-md bg-[#E67070] bg-surface-200 flex justify-center items-center font-bold text-xl w-20 h-12"
				>
					{calculateCalories((last_workout.workout_time_seconds ? last_workout.workout_time_seconds : 0)/60, 70.5)} cal
				</div>
			</div>
		</div>
	</div>
	</a>
{/if}
