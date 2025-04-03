<script lang="ts">
	import { prettifyDate } from "../../helpers/datetime";

	export let goal: any;

	let goal_val: number | null;
	let goal_string: string;

	if (goal.goal_type == '1RM') {
		goal_val = goal.one_rep_max;
		goal_string = '1RM';
	} else if (goal.goal_type == 'average_weight') {
		goal_val = goal.average_weight;
		goal_string = 'Average Weight';
	} else if (goal.goal_type == 'weekly_exercise') {
		goal_val = goal.exercises_in_week;
		goal_string = 'Weekly Exercises';
	} else if (goal.goal_type == 'weekly_workout') {
		goal_val = goal.workouts_in_week;
		goal_string = 'Weekly Workouts';
	}
</script>

<div class=" rounded-md p-2 flex items-center space-x-8">
	<div>Get a {goal_val} {goal_string} in {goal.exercise.name}</div>
	<div class="flex space-x-2 items-center">
		<div class=" flex h-2 w-[100px] items-center rounded-md bg-gray-300 text-[0.7rem] md:text-lg">
			<div
				class="h-2 rounded-md bg-blue-300 w"
				style={`width: calc(100%*${goal.current_val / goal_val}`}
			/>
		</div>
		<div>{goal.current_val} / {goal_val}</div>
	</div>
    <div class="italic text-sm">
        {prettifyDate(goal.deadline)}
    </div>
</div>
