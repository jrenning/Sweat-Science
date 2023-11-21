<script lang="ts">
	import type { WorkoutLogWithExercises } from '$lib/db/schema';
	import ClockIcon from '../Icons/ClockIcon.svelte';
	import DumbbellIcon from '../Icons/DumbbellIcon.svelte';
	import RobotIcon from '../Icons/RobotIcon.svelte';
	import Card from '../UI/Card.svelte';
	import HorizontalScrollBox from '../UI/HorizontalScrollBox.svelte';
	import CardioCard from './CardioCard.svelte';
	import FlexibilityCard from './FlexibilityCard.svelte';
	import StrengthCard from './StrengthCard.svelte';

	export let last_workout: WorkoutLogWithExercises | undefined;
</script>

{#if last_workout}
	<div class="bg-slate-100 dark:bg-[#C65F5F] rounded-md shadow-md text-black p-1">
		<div class="font-bold text-3xl italic mx-4 mt-2">{last_workout?.name}</div>
		<div class="italic mx-4 mb-2">{last_workout?.created_at?.toDateString()}</div>
		<div class="grid grid-cols-3 mx-2 mt-6 mb-8">
			<div class="flex flex-col justify-center items-center space-y-4">
				<div class="w-5 h-5 flex justify-center items-center"><DumbbellIcon /></div>
				<div
					class="rounded-md bg-[#E67070] flex justify-center items-center font-bold text-xl w-20 h-12"
				>
					1
				</div>
			</div>
			<div class="flex flex-col justify-center items-center space-y-4">
				<div class="w-5 h-5 flex justify-center items-center"><ClockIcon /></div>
				<div
					class="rounded-md bg-[#E67070] flex justify-center items-center font-bold text-xl w-20 h-12"
				>
					23:30
				</div>
			</div>
			<div class="flex flex-col justify-center items-center space-y-4">
				<div class="w-5 h-5 flex justify-center items-center"><RobotIcon /></div>
				<div
					class="rounded-md bg-[#E67070] flex justify-center items-center font-bold text-xl w-20 h-12"
				>
					640 cal
				</div>
			</div>
		</div>
	</div>
{/if}
