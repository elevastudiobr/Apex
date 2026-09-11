import {
  GeneratedRestDay,
  GeneratedWorkout,
  GeneratedWorkoutPlan,
} from "./types";

function validateWorkout(
  workout: GeneratedWorkout
): boolean {
  if (!workout.name) return false;

  if (workout.type !== "workout") {
    return false;
  }

  if (
    workout.day_of_week < 1 ||
    workout.day_of_week > 7
  ) {
    return false;
  }

  if (workout.exercises.length === 0) {
    return false;
  }

  if (workout.estimated_minutes <= 0) {
    return false;
  }

  const orders =
    workout.exercises.map(
      (exercise) =>
        exercise.exercise_order
    );

  const uniqueOrders =
    new Set(orders);

  if (
    orders.length !==
    uniqueOrders.size
  ) {
    return false;
  }

  for (const exercise of workout.exercises) {
    if (exercise.sets <= 0) {
      return false;
    }

    if (exercise.reps_min <= 0) {
      return false;
    }

    if (
      exercise.reps_max <
      exercise.reps_min
    ) {
      return false;
    }

    if (exercise.rest_seconds < 0) {
      return false;
    }

    if (
      exercise.estimated_minutes <= 0
    ) {
      return false;
    }
  }

  return true;
}

function validateRestDay(
  day: GeneratedRestDay
): boolean {
  if (day.type !== "rest") {
    return false;
  }

  if (
    day.day_of_week < 1 ||
    day.day_of_week > 7
  ) {
    return false;
  }

  if (day.workout_order !== null) {
    return false;
  }

  if (day.exercises.length !== 0) {
    return false;
  }

  return true;
}

export function validateWorkoutPlan(
  plan: GeneratedWorkoutPlan
): boolean {
  if (!plan.name) {
    return false;
  }

  if (plan.training_days <= 0) {
    return false;
  }

  if (plan.duration_minutes <= 0) {
    return false;
  }

  if (!plan.split) {
    return false;
  }

  if (
    plan.workouts.length !==
    plan.training_days
  ) {
    return false;
  }

  if (plan.week.length !== 7) {
    return false;
  }

  const workoutDays =
    plan.week.filter(
      (day) =>
        day.type === "workout"
    );

  const restDays =
    plan.week.filter(
      (day) =>
        day.type === "rest"
    );

  if (
    workoutDays.length !==
    plan.training_days
  ) {
    return false;
  }

  if (
    restDays.length !==
    7 - plan.training_days
  ) {
    return false;
  }

  const dayNumbers =
    plan.week.map(
      (day) =>
        day.day_of_week
    );

  if (
    new Set(dayNumbers).size !== 7
  ) {
    return false;
  }

  for (const day of plan.week) {
    if (day.type === "workout") {
      if (!validateWorkout(day)) {
        return false;
      }
    }

    if (day.type === "rest") {
      if (!validateRestDay(day)) {
        return false;
      }
    }
  }

  return true;
}