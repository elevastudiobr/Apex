import { Exercise, UserProfile, WorkoutExercise } from "./types";

export function getDurationMinutes(
  duration: string
): number {
  switch (duration) {
    case "30 min":
      return 30;

    case "45 min":
      return 45;

    case "1h":
      return 60;

    case "1h30":
      return 90;

    case "2h+":
      return 120;

    default:
      return 60;
  }
}

export function calculateExerciseTime(
  exercise: Exercise,
  sets: number,
  restSeconds: number
): number {
  if (exercise.estimated_minutes) {
    return Math.max(
      exercise.estimated_minutes,
      sets * 1.5 + ((sets - 1) * restSeconds) / 60
    );
  }

  const executionTime = sets * 1.5;
  const restTime = ((sets - 1) * restSeconds) / 60;

  return executionTime + restTime;
}

export function calculateWorkoutTime(
  exercises: WorkoutExercise[]
): number {
  return exercises.reduce(
    (total, exercise) =>
      total + exercise.estimated_minutes,
    0
  );
}

export function getAvailableTrainingTime(
  profile: UserProfile
): number {
  const total = getDurationMinutes(
    profile.training_duration
  );

  // Reserva aproximadamente 10% para aquecimento,
  // transições e pequenos intervalos.
  return Math.floor(total * 0.9);
}