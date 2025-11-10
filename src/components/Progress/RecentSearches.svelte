<script lang="ts">
	import type { Exercise } from '$lib/db/schema';

	type SearchResult = {
		exercise_id: number,
		exercise_name: string,
		created_at: Date | null
	}

	interface Props {
		exercises: SearchResult[];
	}

	let { exercises }: Props = $props();
</script>

<div>
	<div class="font-semibold text-lg my-6 flex justify-center items-center">Recent</div>
	<div class="flex space-y-4 justify-center items-center flex-col">
	{#each exercises as exercise}
		<a href={`/progress/${exercise.exercise_id}`}>
			<div class="rounded-md flex justify-center items-center py-1 px-4 bg-surface-100">
				<div>{exercise.exercise_name}</div>
			</div>
		</a>
	{/each}
	</div>
</div>
