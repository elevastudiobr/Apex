import { Exercise, UserProfile } from "./types";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function scoreExercise(
  exercise: Exercise,
  profile: UserProfile,
  targetMuscles: string[]
): number {
  let score = 0;

  const muscle = normalizeText(
    `${exercise.muscle_group} ${exercise.primary_muscle ?? ""}`
  );

  const targetMatch = targetMuscles.some((target) =>
    muscle.includes(normalizeText(target))
  );

  if (targetMatch) {
    score += 40;
  }

  if (
    profile.training_location === "Ambos" ||
    exercise.training_location.some(
      (location) =>
        normalizeText(location) ===
        normalizeText(profile.training_location)
    )
  ) {
    score += 20;
  }

  if (
    exercise.difficulty === profile.experience
  ) {
    score += 15;
  }

  if (
    profile.experience === "Iniciante" &&
    exercise.difficulty === "Avançado"
  ) {
    score -= 20;
  }

  if (
    profile.goal === "Ganhar Força" &&
    exercise.exercise_type === "Composto"
  ) {
    score += 15;
  }

  if (
    profile.goal === "Ganhar Massa Muscular" &&
    exercise.exercise_type === "Composto"
  ) {
    score += 10;
  }

  if (
    profile.goal === "Ganhar Músculo e Perder Gordura" &&
    exercise.exercise_type === "Composto"
  ) {
    score += 8;
  }

  if (
    profile.focus === "Superiores" &&
    ["PEITO", "COSTAS", "OMBROS", "BÍCEPS", "TRÍCEPS"].includes(
      exercise.muscle_group
    )
  ) {
    score += 10;
  }

  if (
    profile.focus === "Inferiores" &&
    ["QUADRÍCEPS", "POSTERIORES", "GLÚTEOS", "PANTURRILHAS"].includes(
      exercise.muscle_group
    )
  ) {
    score += 10;
  }

  if (profile.focus === "Equilibrado") {
    score += 5;
  }

  return score;
}

export function rankExercises(
  exercises: Exercise[],
  profile: UserProfile,
  targetMuscles: string[]
): Exercise[] {
  return [...exercises].sort(
    (a, b) =>
      scoreExercise(b, profile, targetMuscles) -
      scoreExercise(a, profile, targetMuscles)
  );
}