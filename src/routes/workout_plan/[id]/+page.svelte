<script lang="ts">
	import BackButton from '../../../components/UI/Buttons/BackButton.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	console.log(data.plan);
	console.log(data.completed_workouts);
	// array of all unique days
	let workout_days = [
		...new Set(
			data.plan?.workouts
				.map((w) => w.days)
				.flat()
				.filter((d) => d !== null)
		)
	];
	console.log(workout_days);
	let completed_days = data.completed_workouts.map((w) => w.plan_day).filter((d) => d !== null);

    let percent_complete = completed_days.length / workout_days.length
</script>

{#if data.plan}
	<div class="min-h-screen px-4 py-6">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<BackButton link="/" />
			<h2 class="text-2xl font-bold text-gray-900 text-center flex-1">
				{data.plan.name}
			</h2>
			<div class="w-8" />
		</div>
		<section class="mb-10">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Plan Overview</h3>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Completion Percentage -->
				<div class="rounded-xl bg-white border p-5 shadow-sm">
					<div class="flex items-center justify-between mb-2">
						<span class="text-sm font-medium text-gray-500"> Plan Completion </span>
						<span class="text-sm font-semibold text-gray-900"> {percent_complete*100}% </span>
					</div>

					<div class="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
						<div class="h-full bg-green-500 rounded-full" style={`width: ${percent_complete};`} />
					</div>

					<p class="mt-2 text-xs text-gray-500">{completed_days.length} of {workout_days.length} workouts completed</p>
				</div>

				<!-- Strength Progress -->
                 <!-- TODO -->
				<div class="rounded-xl bg-white border p-5 shadow-sm">
					<div class="flex items-center justify-between mb-2">
						<span class="text-sm font-medium text-gray-500"> Strength Increase </span>
						<span class="text-sm font-semibold text-green-600"> +12.4% </span>
					</div>

					<div class="space-y-2">
						<div class="flex justify-between text-xs text-gray-600">
							<span>Bench Press</span>
							<span>+15%</span>
						</div>
						<div class="flex justify-between text-xs text-gray-600">
							<span>Squat</span>
							<span>+10%</span>
						</div>
						<div class="flex justify-between text-xs text-gray-600">
							<span>Deadlift</span>
							<span>+12%</span>
						</div>
					</div>
				</div>

				<!-- Consistency -->
                 <!-- TODO -->
				<div class="rounded-xl bg-white border p-5 shadow-sm">
					<div class="flex items-center justify-between mb-2">
						<span class="text-sm font-medium text-gray-500"> Consistency </span>
						<span class="text-sm font-semibold text-surface-600"> 4.2 / 5 </span>
					</div>

					<div class="flex items-end gap-1 h-16 mt-3">
						<div class="w-3 rounded bg-surface-200 h-6"></div>
						<div class="w-3 rounded bg-surface-300 h-10"></div>
						<div class="w-3 rounded bg-surface-400 h-14"></div>
						<div class="w-3 rounded bg-surface-500 h-12"></div>
						<div class="w-3 rounded bg-surface-600 h-16"></div>
					</div>

					<p class="mt-2 text-xs text-gray-500">Average workouts per week</p>
				</div>
			</div>
		</section>

		<!-- Days -->
		<div class="space-y-4 max-w-3xl mx-auto">
			{#each { length: data.plan.total_days }, i}
				<div class="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2">
					<!-- Day Header -->
					<div class="flex items-center justify-between">
						<span class="text-sm font-semibold text-gray-500">
							Day {i + 1}
						</span>

						{#if workout_days.includes(i + 1)}
							{#if completed_days.includes(i + 1)}
								<span
									class="text-xs font-medium rounded-full bg-green-100 text-green-700 px-3 py-1"
								>
									Completed
								</span>
							{:else}
								<span
									class="text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 px-3 py-1"
								>
									Not completed
								</span>
							{/if}
						{/if}
					</div>

					<!-- Workout Content -->
					{#if workout_days.includes(i + 1)}
						<div class="font-medium text-gray-900">
							{#if completed_days.includes(i + 1)}
								{data.completed_workouts.filter((w) => w.plan_day === i + 1)[0].name}
							{:else}
								{data.plan.workouts.filter((w) => w.days.includes(i + 1))[0].name}
							{/if}
						</div>
					{:else}
						<div class="text-gray-500 italic">Rest Day</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
