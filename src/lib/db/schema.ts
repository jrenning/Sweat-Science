import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	serial,
	pgEnum,
	PgArray,
	real,
	boolean,
	time,
	jsonb
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

/* TYPES */

/* SELECT TYPES*/

export type ExerciseRoutine = InferSelectModel<typeof exercise_routine>;
export type ExerciseRoutineWithExercise = InferSelectModel<typeof exercise_routine> & {
	exercise: InferSelectModel<typeof exercises>;
};

export type WorkoutRoutine = InferSelectModel<typeof workout_routine>;

export type WorkoutRoutineWithExercises = InferSelectModel<typeof workout_routine> & {
	exercises: ExerciseRoutineWithExercise[];
};

export type Exercise = InferSelectModel<typeof exercises>;
export type ExerciseWithEquipment = InferSelectModel<typeof exercises> & {
	equipment: InferSelectModel<typeof equipment> | null;
};

export type Equipment = InferSelectModel<typeof equipment>;

export type ExerciseLogWithExercises = InferSelectModel<typeof exerciseLog> & {
	exercise: InferSelectModel<typeof exercises>;
};
export type WorkoutLogWithExercises = InferSelectModel<typeof workoutLog> & {
	exercise_routines: ExerciseLogWithExercises[];
};

export type WorkoutFolder = InferSelectModel<typeof workout_folders>;

export type Goal = InferSelectModel<typeof goals> & {
	exercise: Exercise
}
export type GoalData = Goal & {
	current_val: number | null
}

/* INSERT TYPES */

export type InsertEquipment = InferInsertModel<typeof equipment>;

export type InsertExercise = InferInsertModel<typeof exercises>;
export type InsertExerciceRoutineWithExercises = InferInsertModel<typeof exercise_routine> & {
	exercise: InsertExercise;
};
export type InsertExerciseRoutine = InferInsertModel<typeof exercise_routine>;
export type InsertWorkoutRoutineWithExercises = InferInsertModel<typeof workout_routine> & {
	exercises: InsertExerciseRoutine[];
};
export type InsertFullWorkoutPlan = InferInsertModel<typeof workout_plans> & {
	workouts: InsertWorkoutRoutineWithExercises[];
};

export type InsertWorkoutPlan = InferInsertModel<typeof workout_plans>;

export type InsertExerciseLog = InferInsertModel<typeof exerciseLog>;
export type InsertWorkoutLog = InferInsertModel<typeof workoutLog>;
export type AddWorkoutLog = InsertWorkoutLog & {
	exercises: InsertExerciseLog[];
};

export type InsertWorkoutFolder = InferInsertModel<typeof workout_folders>;

export type InsertSearch = InferInsertModel<typeof searches>;

export type InsertGoal = InferInsertModel<typeof goals>;

/* UNITS */

// DEFAULT UNITS - ie ones that are stored in database
// weight - lb
// distance - mile

export const WeightUnits = pgEnum('weight_units', ['kg', 'lb']);
export const DistanceUnits = pgEnum('distance_units', [
	'mile',
	'kilometer',
	'meters',
	'feet',
	'yards',
	'inches',
	'centimeters'
]);
export const DurationUnits = pgEnum('duration units', ['second', 'minute', 'hour', 'day']);




/* USER */

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	created_at: timestamp('created_at').defaultNow(),
	pushSubscription: jsonb('pushSubscription')
});

export const user_settings = pgTable('user_settings', {
	id: text('id').notNull().primaryKey(),
	user_id: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
	weight: real('weight'),
	weight_units: WeightUnits('weight_units').default('lb'),
	distance_units: DistanceUnits('distance_units').default('mile'),
	notify_after_set: boolean('notify_after_set'),
	height: real('height'),
	theme: text('theme')
});

export const favorites = pgTable('favorites', {
	user_id: text('user_id')
		.references(() => users.id)
		.primaryKey()
});

export const searches = pgTable('searches', {
	user_id: text('user_id').references(() => users.id),
	created_at: timestamp('created_at').defaultNow(),
	exercise_id: integer('exercise_id')
		.notNull()
		.references(() => exercises.id, { onDelete: 'cascade' })
});

export const searchRelations = relations(searches, ({ one }) => ({
	exercise: one(exercises, {
		fields: [searches.exercise_id],
		references: [exercises.id]
	}),
	user_id: one(users, {
		fields: [searches.user_id],
		references: [users.id]
	})
}));

export const GoalTypes = pgEnum("goal_types", ["1RM", "average_weight", "weekly_workout", "weekly_exercise"])

export const goals = pgTable("goals", {
	id: serial("id").primaryKey(),
	user_id: text('user_id').references(() => users.id),
	created_at: timestamp('created_at').defaultNow(),
	deadline: timestamp("deadline"),
	goal_type: GoalTypes("goal_type").notNull(),
	goal_value: integer("goal_value").notNull(),
	exercise_id: integer('exercise_id')
	.references(() => exercises.id, { onDelete: 'cascade' }),
})


export const goalRelations = relations(goals, ({ one }) => ({
	exercise: one(exercises, {
		fields: [goals.exercise_id],
		references: [exercises.id]
	}),
	user_id: one(users, {
		fields: [goals.user_id],
		references: [users.id]
	})
}));

export const PRTypes = pgEnum('pr_types', ['Max Weight', 'Distance', 'Time']);

/* WORKOUTS */

export const MuscleGroups = pgEnum('muscle_groups', [
	'Other',
	'Chest',
	'Deltoid',
	'Obliques',
	'Bicep',
	'Abs',
	'Abductor',
	'Shin',
	'Quadriceps',
	'Traps',
	'Triceps',
	'Lats',
	'Glutes',
	'Hamstring',
	'Calves'
]);
export const EquipmentTypes = pgEnum('equipment_type', [
	'Machine',
	'Barbell',
	'Dumbbell',
	'Body Weight',
	'Other'
]);

export const equipment = pgTable('equipment', {
	id: serial('id').primaryKey(),
	user_id: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
	name: text('name').notNull().unique(),
	type: EquipmentTypes('equipment_type').notNull(),
	created_at: timestamp('created_at').defaultNow()
});

/* EXERCISES */

export const ExerciseCategories = pgEnum('exercise_categories', [
	'Cardio',
	'Strength',
	'Flexibility'
]);

export const exercises = pgTable('exercises', {
	id: serial('id').primaryKey(),
	user_id: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
	name: text('name').notNull().unique(),
	description: text('description'),
	category: ExerciseCategories('exercise_categories').notNull(),
	equipment_id: integer('equipment_id').references(() => equipment.id, { onDelete: 'set null' }),
	muscle_groups: MuscleGroups('muscle_groups').array(),
	created_at: timestamp('created_at').notNull().defaultNow()
});

export const exercise_info = pgTable('exercise_info', {
	exercise_id: integer('exercise_id').references(() => exercises.id, { onDelete: 'cascade' }),
	exercise_name: text('exercise_name'),
	weight: integer('weight'),
	novice: integer('novice'),
	intermediate: integer('intermediate'),
	advanced: integer('advanced'),
	elite: integer('elite')
});

export const exerciseRelations = relations(exercises, ({ one }) => ({
	equipment: one(equipment, {
		fields: [exercises.equipment_id],
		references: [equipment.id]
	})
}));

export const Status = pgEnum('status', ['Pending', 'Completed', 'Current']);

export const workout_plans = pgTable('workout_plans', {
	user_id: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	description: text('description'),
	created_at: timestamp('created_at').defaultNow(),
	start_date: timestamp('start_date').defaultNow(),
	total_days: integer('total_days').notNull(),
	status: Status('status').default('Pending')
});

export const workoutPlansRelations = relations(workout_plans, ({ many }) => ({
	workouts: many(workout_routine)
}));

export const DaysOfWeek = pgEnum('days_of_week', [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]);

export const workout_routine = pgTable('workout_routine', {
	user_id: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	days: integer('days').array(),
	workout_plan_id: integer('workout_plan_id').references(() => workout_plans.id, {
		onDelete: 'set null'
	}),
	created_at: timestamp('created_at').defaultNow(),
	status: Status('status').default('Pending'),
	favorite: boolean('favorite'),
	folder_id: integer('folder_id').references(() => workout_folders.id, { onDelete: 'set null' }),
	copy_id: integer('copy_id')
});

export const workoutsRelations = relations(workout_routine, ({ one, many }) => ({
	workout_plan: one(workout_plans, {
		fields: [workout_routine.workout_plan_id],
		references: [workout_plans.id]
	}),
	exercises: many(workoutToExerciseRoutines),
	folder: one(workout_folders, {
		fields: [workout_routine.folder_id],
		references: [workout_folders.id]
	})
}));

export const workout_folders = pgTable('folders', {
	user_id: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	parent_folder_id: integer('parent_folder_id')
});

export const workoutFolderRelations = relations(workout_folders, ({ one, many }) => ({
	user: one(users, {
		fields: [workout_folders.user_id],
		references: [users.id]
	}),
	workouts: many(workout_routine),
	parent_folder: one(workout_folders, {
		fields: [workout_folders.parent_folder_id],
		references: [workout_folders.id]
	})
}));

export const ExerciseGoalTypes = pgEnum('exercise_goal_types', ['Duration', 'Weight', 'Distance']);

// TODO figure out how to remove not null on everything without typescript throwing a hissy fit
export const exercise_routine = pgTable('exercise_routine', {
	id: serial('id').primaryKey(),
	user_id: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
	exercise_id: integer('exercise_id')
		.notNull()
		.references(() => exercises.id, { onDelete: 'set null' }),
	type: ExerciseGoalTypes('exercise_goal_types'),
	sets: integer('sets').notNull(),
	reps: integer('reps').array().notNull(),
	rest: integer('rest').notNull(),
	rest_units: DurationUnits('rest_units').default('second'),
	weight: integer('weight').array().notNull(),
	percent_max: boolean('percent_max').array().notNull(),
	duration: real('duration').array().notNull(),
	distance: integer('distance').array().notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	position: integer('position').notNull()
});

export const exerciseRoutineRelations = relations(exercise_routine, ({ one, many }) => ({
	exercise: one(exercises, {
		fields: [exercise_routine.exercise_id],
		references: [exercises.id]
	}),
	workout_routines: many(workoutToExerciseRoutines)
}));

export const workoutToExerciseRoutines = pgTable(
	'workout_routine_to_exercise_routine',
	{
		exercise_routine_id: integer('exercise_routine_id')
			.notNull()
			.references(() => exercise_routine.id, { onDelete: 'cascade' }),
		workout_routine_id: integer('workout_routine_id')
			.notNull()
			.references(() => workout_routine.id, { onDelete: 'cascade' })
	},
	(t) => ({
		pk: primaryKey(t.exercise_routine_id, t.workout_routine_id)
	})
);

export const workoutToExerciseRoutineRelations = relations(
	workoutToExerciseRoutines,
	({ one }) => ({
		exercise_routine: one(exercise_routine, {
			fields: [workoutToExerciseRoutines.exercise_routine_id],
			references: [exercise_routine.id]
		}),
		workout_routine: one(workout_routine, {
			fields: [workoutToExerciseRoutines.workout_routine_id],
			references: [workout_routine.id]
		})
	})
);



/* LOGS */

export const exerciseLog = pgTable('exercise_log', {
	id: serial('id').primaryKey(),
	user_id: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
	exercise_id: integer('exercise_id')
		.notNull()
		.references(() => exercises.id, { onDelete: 'set null' }),
	name: text('name'),
	type: ExerciseGoalTypes('exercise_goal_types'),
	sets: integer('sets').notNull(),
	reps: integer('reps').array().notNull(),
	rest: integer('rest').notNull(),
	rest_units: DurationUnits('rest_units'),
	weight: integer('weight').array().notNull(),
	duration: real('duration').array().notNull(),
	distance: integer('distance').array().notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	workout_log_id: integer('workout_log_id').references(() => workoutLog.id, {
		onDelete: 'cascade'
	}),
	// this only really applies to weighted exercises
	estimated_max: real('estimated_max'),
	overall_pace_seconds: integer("overall_pace_seconds").array()
});

export const exerciseLogRelations = relations(exerciseLog, ({ one }) => ({
	workout_log: one(workoutLog, {
		fields: [exerciseLog.workout_log_id],
		references: [workoutLog.id]
	}),
	user: one(users, {
		fields: [exerciseLog.user_id],
		references: [users.id]
	}),
	exercise: one(exercises, {
		fields: [exerciseLog.exercise_id],
		references: [exercises.id]
	})
}));



export const workoutLog = pgTable('workout_log', {
	id: serial('id').primaryKey(),
	name: text('name'),
	user_id: text('user_id').references(() => users.id),
	created_at: timestamp('created_at').defaultNow().notNull(),
	workout_time_seconds: integer('workout_time_seconds'),
	notes: text('notes')
});

export const workoutLogRelations = relations(workoutLog, ({ one, many }) => ({
	exercise_routines: many(exerciseLog),
	user: one(users, {
		fields: [workoutLog.user_id],
		references: [users.id]
	})
}));






/* AUTH */
export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId)
	})
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token)
	})
);

/* ZOD SCHEMAS */

export const insertExerciseRoutineSchema = createInsertSchema(exercise_routine);
export const insertExerciseSchema = createInsertSchema(exercises);
export const insertEquipmentSchema = createInsertSchema(equipment);
export const insertWorkoutRoutine = createInsertSchema(workout_routine);
export const insertWorkoutPlanSchema = createInsertSchema(workout_plans);
export const insertWorkoutLogSchema = createInsertSchema(workoutLog);
export const insertExerciseLogSchema = createInsertSchema(exerciseLog);
export const insertWorkoutFolderSchema = createInsertSchema(workout_folders);
export const insertGoalSchema = createInsertSchema(goals)
