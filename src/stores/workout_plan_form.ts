import type { InsertFullWorkoutPlan } from '$lib/db/schema';
import { writable } from 'svelte/store';

const initialState: InsertFullWorkoutPlan = {
	name: '',
	user_id: '',
	total_days: 0,
	start_date: new Date(),
	workouts: []
};

const planFormData = writable<InsertFullWorkoutPlan>();
