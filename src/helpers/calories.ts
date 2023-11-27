//TODO factor in cardio parts too
export function calculateCalories(minutes: number, weight_kg: number) {
	return Math.round(minutes * weight_kg * 0.0713);
}
