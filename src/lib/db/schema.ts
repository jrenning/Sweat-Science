
import { timestamp, pgTable, text, primaryKey, integer, serial, pgEnum, PgArray, real } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';
import { int } from 'drizzle-orm/mysql-core';

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image')
});


/* WORKOUTS */

export const MuscleGroups = pgEnum("muscle_groups", ["Other"])
export const EquipmentTypes = pgEnum("equipment_type", ["Machine", "Barbell", "Dumbbell", "Body Weight"])


export const equipment = pgTable('equipment', {
	id: serial('id').primaryKey(),
	name: text("name").notNull().unique(),
	muscle_groups: MuscleGroups("muscle_groups").array(),
	type: EquipmentTypes("equipment_type")

});

export const ExerciseCategories = pgEnum("exercise_categories", ["Cardio", "Strength", "Flexibility"])

export const exercises = pgTable("exercises", {
    id: serial("id").primaryKey(),
	user_id: text("user_id").references(()=> users.id),
    name: text("name").notNull().unique(),
	description: text("description"),
	category: ExerciseCategories("exercise_categories").notNull(),
	equipment_id: integer("equipment_id").references(()=> equipment.id)
})

export const exerciseRelations = relations(exercises, ({one})=> ({
	workout: one(equipment, {
		fields: [exercises.equipment_id],
		references: [equipment.id]
	})
}))


export const workout_plans = pgTable('workout_plans', {
	user_id: text('user_id')
		.references(() => users.id)
		.notNull(),
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	description: text('description'),
	created_at: timestamp('created_at').defaultNow(),
	start_date: timestamp('created_at').defaultNow(),
	total_days: integer("total_days").notNull()
});

export const workoutPlansRelations = relations(workout_plans, ({many})=> ({
	workouts: many(workout_routine)
}))

export const DaysOfWeek = pgEnum("days_of_week", ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])

export const workout_routine = pgTable('workouts', {
	user_id: text('user_id').references(() => users.id).notNull(),
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	days: integer("days").array().notNull(),
	workout_plan_id: integer("workout_plan_id").references(()=> workout_plans.id)
});

export const workoutsRelations = relations(workout_routine, ({one, many})=> ({
	workout_plan: one(workout_plans, {
		fields: [workout_routine.workout_plan_id],
		references: [workout_plans.id]
	}),
	exercises: many(exercise_routine)
}))

export const WeightUnits = pgEnum("weight_units", ["kg", "lb"])
export const DistanceUnits = pgEnum("distance_units", ["mile", "kilometer", "meters", "feet", "yards", "inches", "centimeters"])
export const DurationUnits = pgEnum("duration units", ["second", "minute", "hour", "day"])


export const exercise_routine = pgTable("exercise_routine", {
	id: integer("id").primaryKey(),
	exercise_id: integer("exercise_id").notNull().references(()=> exercises.id),
	name: text("name"),
	sets: integer("sets").notNull(),
	reps: integer("reps").array(),
	weight: integer("weight").notNull().array(),
	weight_units: WeightUnits("weight_units"),
	duration: real("duration"),
	duration_units: DurationUnits("duration_units"),
	distance: integer("distance"),
	distance_units: DistanceUnits("distance_units")

})

export const exerciseRoutineRelations = relations(exercise_routine, ({one, many})=> ({
	exercise: one(exercises, {
		fields: [exercise_routine.exercise_id],
		references: [exercises.id]
	}),
	workouts: many(workout_routine)
}))

export const workoutToExerciseRoutines = pgTable("workout_routine_to_exercise_routine", {
	exercise_routine_id: integer("exercise_routine_id").notNull().references(()=> exercise_routine.id),
	workout_routine_id: integer("workout_routine_id").notNull().references(()=> workout_routine.id)
}, (t)=> ({
	pk: primaryKey(t.exercise_routine_id, t.workout_routine_id)
}))

export const workoutToExerciseRoutineRelations = relations(workoutToExerciseRoutines, ({one})=> ({
	exercise_routine: one(exercise_routine, {
		fields: [workoutToExerciseRoutines.exercise_routine_id],
		references: [exercise_routine.id]
	}),
	workout_routine: one(workout_routine, {
		fields: [workoutToExerciseRoutines.workout_routine_id],
		references: [workout_routine.id]
	})
}))

/* LOGS */

export const exerciseLog = pgTable("exercise_log", {
	id: integer("id").primaryKey(),
	user_id: text("user_id").references(()=> users.id),
	exercise_routine_id: integer("exercise_routine_id").references(()=> exercise_routine.id)
})

export const exerciseLogRelations = relations(exerciseLog, ({ one }) => ({
	exercise_routine: one(exercise_routine, {
		fields: [exerciseLog.exercise_routine_id],
		references: [exercise_routine.id]
	}),
	user: one(users, {
		fields: [exerciseLog.user_id],
		references: [users.id]
	})
}));

export const workoutLog = pgTable('workout_log', {
	id: integer('id').primaryKey(),
	user_id: text('user_id').references(() => users.id),
	workout_routine_id: integer('workout_routine_id').references(() => workout_routine.id)
});

export const workoutLogRelations = relations(workoutLog, ({ one }) => ({
	exercise_routine: one(workout_routine, {
		fields: [workoutLog.workout_routine_id],
		references: [workout_routine.id]
	}),
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