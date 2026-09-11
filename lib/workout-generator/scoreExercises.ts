import { Exercise, UserProfile } from "./types";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function matchesValue(
  value: string | null | undefined,
  target: string
): boolean {
  if (!value) return false;

  return normalizeText(value) === normalizeText(target);
}

function exerciseMatchesTargetRegion(
  exercise: Exercise,
  targetRegions: string[]
): boolean {
  if (targetRegions.length === 0) return false;

  return targetRegions.some((region) =>
    exercise.target_regions.some((exerciseRegion) =>
      matchesValue(exerciseRegion, region)
    )
  );
}

function exerciseMatchesTargetMuscle(
  exercise: Exercise,
  targetMuscles: string[]
): boolean {
  if (targetMuscles.length === 0) return false;

  const normalizedMuscle = normalizeText(
    exercise.muscle_group
  );

  return targetMuscles.some(
    (muscle) =>
      normalizedMuscle === normalizeText(muscle)
  );
}

function exerciseMatchesMovementPattern(
  exercise: Exercise,
  targetMovementPatterns: string[]
): boolean {
  if (
    !exercise.movement_pattern ||
    targetMovementPatterns.length === 0
  ) {
    return false;
  }

  return targetMovementPatterns.some((pattern) =>
    matchesValue(
      exercise.movement_pattern,
      pattern
    )
  );
}

function getGoalScore(
  exercise: Exercise,
  profile: UserProfile
): number {
  if (!exercise.suitable_goals?.length) {
    return 0;
  }

  const matchesGoal = exercise.suitable_goals.some(
    (goal) =>
      normalizeText(goal) ===
      normalizeText(profile.goal)
  );

  return matchesGoal ? 15 : -5;
}

function getExperienceScore(
  exercise: Exercise,
  profile: UserProfile
): number {
  if (!exercise.difficulty) {
    return 0;
  }

  const difficulty = normalizeText(
    exercise.difficulty
  );

  const experience = normalizeText(
    profile.experience
  );

  if (difficulty === experience) {
    return 15;
  }

  // Iniciante utilizando exercício avançado.
  if (
    experience === "iniciante" &&
    difficulty === "avancado"
  ) {
    return -20;
  }

  // Iniciante utilizando exercício intermediário.
  if (
    experience === "iniciante" &&
    difficulty === "intermediario"
  ) {
    return -8;
  }

  // Intermediário utilizando exercício avançado.
  if (
    experience === "intermediario" &&
    difficulty === "avancado"
  ) {
    return -5;
  }

  // Avançado pode utilizar exercícios intermediários.
  if (
    experience === "avancado" &&
    difficulty === "intermediario"
  ) {
    return 5;
  }

  return 0;
}

function getTechnicalDemandScore(
  exercise: Exercise,
  profile: UserProfile
): number {
  if (!exercise.technical_demand) {
    return 0;
  }

  const demand = normalizeText(
    exercise.technical_demand
  );

  const experience = normalizeText(
    profile.experience
  );

  if (
    experience === "iniciante" &&
    demand === "alta"
  ) {
    return -15;
  }

  if (
    experience === "intermediario" &&
    demand === "alta"
  ) {
    return -5;
  }

  if (
    experience === "avancado" &&
    demand === "alta"
  ) {
    return 5;
  }

  if (
    experience === "iniciante" &&
    demand === "baixa"
  ) {
    return 5;
  }

  return 0;
}

function getStabilityScore(
  exercise: Exercise,
  profile: UserProfile
): number {
  if (!exercise.stability_requirement) {
    return 0;
  }

  const stability = normalizeText(
    exercise.stability_requirement
  );

  const experience = normalizeText(
    profile.experience
  );

  if (
    experience === "iniciante" &&
    stability === "alta"
  ) {
    return -10;
  }

  if (
    experience === "iniciante" &&
    stability === "baixa"
  ) {
    return 5;
  }

  return 0;
}

function getLocationScore(
  exercise: Exercise,
  profile: UserProfile
): number {
  if (
    profile.training_location === "Ambos"
  ) {
    return 10;
  }

  const matchesLocation =
    exercise.training_location.some(
      (location) =>
        normalizeText(location) ===
        normalizeText(
          profile.training_location
        )
    );

  return matchesLocation ? 20 : -50;
}

function getFocusScore(
  exercise: Exercise,
  profile: UserProfile
): number {
  if (profile.focus === "Equilibrado") {
    return 5;
  }

  const text = normalizeText(
    `${exercise.muscle_group} ${
      exercise.primary_muscle ?? ""
    } ${exercise.target_regions.join(" ")}`
  );

  const upperKeywords = [
    "peito",
    "costas",
    "ombros",
    "biceps",
    "triceps",
    "dorsais",
    "deltoide",
  ];

  const lowerKeywords = [
    "quadriceps",
    "posteriores",
    "gluteos",
    "panturrilhas",
    "core",
  ];

  if (profile.focus === "Superiores") {
    return upperKeywords.some((keyword) =>
      text.includes(normalizeText(keyword))
    )
      ? 15
      : 0;
  }

  if (profile.focus === "Inferiores") {
    return lowerKeywords.some((keyword) =>
      text.includes(normalizeText(keyword))
    )
      ? 15
      : 0;
  }

  return 0;
}

function getExerciseTypeScore(
  exercise: Exercise,
  profile: UserProfile
): number {
  if (!exercise.exercise_type) {
    return 0;
  }

  const type = normalizeText(
    exercise.exercise_type
  );

  const compound =
    type === "composto" ||
    type === "composta";

  if (!compound) {
    return 0;
  }

  if (
    profile.goal === "Ganhar Massa Muscular" ||
    profile.goal === "Ganhar Força"
  ) {
    return 10;
  }

  if (
    profile.goal ===
    "Ganhar Músculo e Perder Gordura"
  ) {
    return 8;
  }

  return 0;
}

function getEmphasisScore(
  exercise: Exercise
): number {
  if (!exercise.emphasis) {
    return 0;
  }

  switch (normalizeText(exercise.emphasis)) {
    case "alta":
      return 8;

    case "moderada":
      return 4;

    case "baixa":
      return 1;

    default:
      return 0;
  }
}

function getMovementPatternScore(
  exercise: Exercise,
  targetMovementPatterns: string[]
): number {
  return exerciseMatchesMovementPattern(
    exercise,
    targetMovementPatterns
  )
    ? 10
    : 0;
}

function getRegionScore(
  exercise: Exercise,
  targetRegions: string[]
): number {
  return exerciseMatchesTargetRegion(
    exercise,
    targetRegions
  )
    ? 40
    : 0;
}

function getMuscleScore(
  exercise: Exercise,
  targetMuscles: string[]
): number {
  return exerciseMatchesTargetMuscle(
    exercise,
    targetMuscles
  )
    ? 30
    : 0;
}

/**
 * Calcula a pontuação de compatibilidade de um exercício
 * com determinado perfil e alvo de treino.
 */
export function scoreExercise(
  exercise: Exercise,
  profile: UserProfile,
  targetMuscles: string[] = [],
  targetRegions: string[] = [],
  targetMovementPatterns: string[] = []
): number {
  let score = 0;

  // =====================================================
  // ALVO PRINCIPAL
  // =====================================================

  score += getRegionScore(
    exercise,
    targetRegions
  );

  score += getMuscleScore(
    exercise,
    targetMuscles
  );

  // =====================================================
  // OBJETIVO
  // =====================================================

  score += getGoalScore(
    exercise,
    profile
  );

  // =====================================================
  // EXPERIÊNCIA
  // =====================================================

  score += getExperienceScore(
    exercise,
    profile
  );

  score += getTechnicalDemandScore(
    exercise,
    profile
  );

  score += getStabilityScore(
    exercise,
    profile
  );

  // =====================================================
  // LOCAL
  // =====================================================

  score += getLocationScore(
    exercise,
    profile
  );

  // =====================================================
  // FOCO
  // =====================================================

  score += getFocusScore(
    exercise,
    profile
  );

  // =====================================================
  // TIPO DE EXERCÍCIO
  // =====================================================

  score += getExerciseTypeScore(
    exercise,
    profile
  );

  // =====================================================
  // ÊNFASE
  // =====================================================

  score += getEmphasisScore(
    exercise
  );

  // =====================================================
  // PADRÃO DE MOVIMENTO
  // =====================================================

  score += getMovementPatternScore(
    exercise,
    targetMovementPatterns
  );

  return score;
}

/**
 * Ordena exercícios do mais compatível para o menos compatível.
 */
export function rankExercises(
  exercises: Exercise[],
  profile: UserProfile,
  targetMuscles: string[] = [],
  targetRegions: string[] = [],
  targetMovementPatterns: string[] = []
): Exercise[] {
  return [...exercises]
    .map((exercise) => ({
      exercise,
      score: scoreExercise(
        exercise,
        profile,
        targetMuscles,
        targetRegions,
        targetMovementPatterns
      ),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      /*
       * Em caso de empate, prioriza exercícios
       * que tenham uma classificação de região.
       */
      const bRegion = exerciseMatchesTargetRegion(
        b.exercise,
        targetRegions
      );

      const aRegion = exerciseMatchesTargetRegion(
        a.exercise,
        targetRegions
      );

      if (bRegion && !aRegion) {
        return 1;
      }

      if (!bRegion && aRegion) {
        return -1;
      }

      return 0;
    })
    .map(({ exercise }) => exercise);
}