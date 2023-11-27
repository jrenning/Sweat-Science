<script lang="ts">
	import type { ExerciseLogWithExercises } from "$lib/db/schema";
	import ExerciseLogEntry from "./ExerciseLogEntry.svelte";


    export let logs: ExerciseLogWithExercises[]
</script>

<div class="flex flex-col space-y-6">
{#each logs as log}
	<ExerciseLogEntry log_entry={log} />
{/each}
</div>
