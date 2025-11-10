<script lang="ts">
	import { goto } from "$app/navigation";


</script>

<div
	class="flex-grow-0 flex-shrink-0 md:space-y-10 space-y-4 flex-auto rounded-md bg-red-100 dark:bg-red-300 border border-black shadow-md md:w-[300px] w-[250px] h-[250px] md:h-[300px]"
>
<div class="flex flex-col justify-center items-center">
	<div class="flex justify-center items-center">
		<h2 class="md:text-4xl text-2xl font-semibold mt-2">New Workout</h2>
	</div>

    	<div class="flex justify-center items-center mt-8">
		<button
			class="btn-md preset-filled-primary-500 rounded-md shadow-md"
			onclick={() => goto(`/active_workout`)}>Start workout</button
		>
	</div>

</div>




</div>