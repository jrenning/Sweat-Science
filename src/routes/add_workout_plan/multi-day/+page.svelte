<script lang="ts">
	import { goto } from '$app/navigation';
	import type { WorkoutRoutineWithExercises } from '$lib/db/schema';
	import AddWorkoutCard from '../../../components/AddWorkoutPlan/AddWorkoutCard.svelte';
	import BackButton from '../../../components/UI/Buttons/BackButton.svelte';
	import FormButton from '../../../components/UI/Buttons/FormButton.svelte';
	import type { PageData } from './$types';
	import AddWorkoutOptions from '../../../components/Popups/AddWorkoutOptions.svelte';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let days: number[] = $state([]);
    let inputValue = $state("")

    function onInputValueChange() {
        let spaceless = inputValue.replace(/\s/g, "");
        let inputDays = spaceless.split(",")
        //@ts-ignore
        days = inputDays

    }
</script>

<div>
	<div class="flex justify-evenly">
		<BackButton link="/add_workout_plan?page=2" />
		<div class="italic font-semibold text-2xl">Multi-Day Add</div>
	</div>
	<div class="flex flex-col mt-8">
		<div class="flex justify-center mb-4 bg-secondary-50 border-secondary-100 border-1 rounded-md mx-20">
			<input placeholder="Days (i.e 1,2,3)" oninput={() => onInputValueChange()} bind:value={inputValue} />
		</div>
	</div>
	<Popover>
		<div class="flex justify-center mt-10">
			<Popover.Trigger class="btn rounded-md shadow-md bg-surface-500 text-white font-semibold"
				>Add Workout</Popover.Trigger
			>
			<Portal>
				<Popover.Positioner>
					<Popover.Content>
						<AddWorkoutOptions plan_id={data.plan_id} day={days} />
					</Popover.Content>
				</Popover.Positioner>
			</Portal>
		</div>
	</Popover>
</div>
