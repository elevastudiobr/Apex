import {
    GeneratedWorkout,
    GeneratedWorkoutPlan,
  } from "./types";
  
  function validateWorkout(
    workout: GeneratedWorkout
  ): boolean {
    if (!workout.name) {
      return false;
    }
  
    if (workout.exercises.length === 0) {
      return false;
    }
  
    if (workout.estimated_minutes <= 0) {
      return false;
    }
  
    const orders = workout.exercises.map(
      (exercise) => exercise.exercise_order
    );
  
    const uniqueOrders = new Set(orders);
  
    if (orders.length !== uniqueOrders.size) {
      return false;
    }
  
    for (const exercise of workout.exercises) {
      if (exercise.sets <= 0) {
        return false;
      }
  
      if (exercise.reps_min <= 0) {
        return false;
      }
  
      if (exercise.reps_max < exercise.reps_min) {
        return false;
      }
  
      if (exercise.rest_seconds < 0) {
        return false;
      }
  
      if (exercise.estimated_minutes <= 0) {
        return false;
      }
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
  
    if (plan.workouts.length !== plan.training_days) {
      return false;
    }
  
    return plan.workouts.every(validateWorkout);
  }