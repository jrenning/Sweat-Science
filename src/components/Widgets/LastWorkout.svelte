<script lang="ts">
	import type { WorkoutLogWithExercises } from '$lib/db/schema';
	import { calculateCalories } from '../../helpers/calories';
	import { convertToUTC, formatTime } from '../../helpers/datetime';
	import { niceRound } from '../../helpers/math';

	interface Props {
		last_workout: WorkoutLogWithExercises | undefined;
		last_workout_metrics: {difference: number}
	}

	let { last_workout, last_workout_metrics }: Props = $props();

	let time = convertToUTC(last_workout?.created_at)
</script>

{#if last_workout}
<a href={`/progress/workouts/${last_workout.id}`} class="block">
	<div
		class="rounded-xl bg-surface-400 border shadow-sm hover:shadow-md transition-shadow p-5"
	>
		<!-- Header -->
		<div class="mb-4">
			<h3 class="text-2xl font-bold text-gray-900 italic">
				{last_workout.name}
			</h3>
			<p class="text-sm text-gray-800">
				{time ? time.toDateString() : ''}
			</p>
		</div>

		<!-- Metrics -->
		<div class="grid grid-cols-3 gap-4">
			<!-- Exercises -->
			<div class="flex flex-col items-center gap-2">
				<span class="text-xs font-medium text-gray-800 uppercase">
					Exercises
				</span>
				<div
					class="w-20 h-12 rounded-lg bg-surface-100 flex items-center justify-center text-xl font-semibold text-gray-900"
				>
					{last_workout.exercise_routines.length}
				</div>
			</div>

			<!-- Workout Progress -->
			<div class="flex flex-col items-center gap-2">
				<span class="text-xs flex justify-center text-center font-medium text-gray-800 uppercase">
					Workout Progress
				</span>
				<div
					class="w-20 h-12 rounded-lg bg-surface-100 text-green-700 flex items-center justify-center text-xl font-semibold"
				>
					{niceRound(last_workout_metrics.difference)}%
				</div>
				<span class="text-[10px] text-gray-800">
					vs last session
				</span>
			</div>

			<!-- Top Exercise Increase -->
			<div class="flex flex-col items-center gap-2">
				<span class="text-xs font-medium text-gray-800 uppercase">
					Top Lift
				</span>
				<div
					class="w-20 h-12 rounded-lg bg-surface-100 text-blue-700 flex items-center justify-center text-xl font-semibold"
				>
				</div>
				<span class="text-[10px] text-gray-800 text-center">
				</span>
			</div>
		</div>
	</div>
</a>
{/if}
