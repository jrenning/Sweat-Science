import type { WorkoutLogWithExercises } from '$lib/db/schema';

export function getPercentDifBetweenWorkouts(
	w1: WorkoutLogWithExercises,
	w2: WorkoutLogWithExercises
) {
	// % diff between 1 and 2, ie if 1 is better it will be positive
	let overall_diff = 0;
	for (let i = 0; i < w1.exercise_routines.length; i++) {
		let e1 = w1.exercise_routines[i].average_max;
		let e2 = w2.exercise_routines[i].average_max;
		if (e1 && e2) {
			// adds the oercent difference weighted by # exercises
			overall_diff += ((Math.abs(e1 - e2) / ((e1 + e2) / 2)) * 100) / w1.exercise_routines.length;
		}
	}

	return overall_diff;
}
