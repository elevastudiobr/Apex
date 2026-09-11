import { createSupabaseServerClient } from "@/lib/supabase-server";

import {
  Exercise,
  UserProfile,
  GeneratedWorkoutPlan,
  WorkoutGoal,
  TrainingExperience,
  TrainingLocation,
  TrainingFocus,
  ExerciseEmphasis,
  ExerciseDemand,
  ExerciseExecutionType,
} from "./types";

import { generateWorkoutPlan } from "./generateWorkoutPlan";

function getTrainingDaysCount(
  trainingDays: unknown
): number {
  if (typeof trainingDays === "number") {
    return trainingDays;
  }

  if (typeof trainingDays !== "string") {
    return 0;
  }

  try {
    const parsed = JSON.parse(trainingDays);

    if (Array.isArray(parsed)) {
      return parsed.length;
    }

    if (typeof parsed === "number") {
      return parsed;
    }
  } catch {
    const numericValue = Number(trainingDays);

    if (!Number.isNaN(numericValue)) {
      return numericValue;
    }
  }

  return 0;
}

function getStringArray(
  value: unknown
): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is string =>
        typeof item === "string"
    );
  }

  return [];
}

function getTrainingLocation(
  value: unknown
): TrainingLocation[] {
  const values = getStringArray(value);

  return values.filter(
    (item): item is TrainingLocation =>
      item === "Academia" ||
      item === "Casa" ||
      item === "Ambos"
  );
}

function getSuitableGoals(
  value: unknown
): WorkoutGoal[] {
  const values = getStringArray(value);

  return values.filter(
    (item): item is WorkoutGoal =>
      item === "Ganhar Massa Muscular" ||
      item === "Perder Gordura" ||
      item ===
        "Ganhar Músculo e Perder Gordura" ||
      item === "Ganhar Força" ||
      item === "Saúde e Qualidade de Vida"
  );
}

function getEmphasis(
  value: unknown
): ExerciseEmphasis | null {
  if (
    value === "Baixa" ||
    value === "Moderada" ||
    value === "Alta"
  ) {
    return value;
  }

  return null;
}

function getDemand(
  value: unknown
): ExerciseDemand | null {
  if (
    value === "Baixa" ||
    value === "Moderada" ||
    value === "Alta"
  ) {
    return value;
  }

  return null;
}

function getExecutionType(
  value: unknown
): ExerciseExecutionType | null {
  if (
    value === "Unilateral" ||
    value === "Bilateral"
  ) {
    return value;
  }

  return null;
}

export async function getUserWorkoutPlan(): Promise<GeneratedWorkoutPlan> {
  const supabase =
    await createSupabaseServerClient();

  /*
   * =====================================================
   * 1. USUÁRIO AUTENTICADO
   * =====================================================
   */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(
      "AUTH ERROR:",
      userError
    );

    throw new Error(
      "Usuário não autenticado."
    );
  }

  /*
   * =====================================================
   * 2. PERFIL DO USUÁRIO
   * =====================================================
   */

  const {
    data: profileData,
    error: profileError,
  } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

  if (
    profileError ||
    !profileData
  ) {
    console.error(
      "PROFILE ERROR:",
      profileError
    );

    throw new Error(
      "Perfil do usuário não encontrado."
    );
  }

  /*
   * =====================================================
   * 3. EXERCÍCIOS
   * =====================================================
   */

  const {
    data: exercisesData,
    error: exercisesError,
  } =
    await supabase
      .from("exercises")
      .select("*");

  if (
    exercisesError ||
    !exercisesData
  ) {
    console.error(
      "EXERCISES ERROR:",
      exercisesError
    );

    throw new Error(
      exercisesError?.message ||
        "Não foi possível carregar os exercícios."
    );
  }

  /*
   * =====================================================
   * 4. DIAS DE TREINO
   * =====================================================
   */

  const trainingDaysCount =
    getTrainingDaysCount(
      profileData.training_days
    );

  if (trainingDaysCount <= 0) {
    throw new Error(
      "O usuário precisa informar quantos dias por semana treina."
    );
  }

  /*
   * =====================================================
   * 5. NORMALIZAÇÃO DO PERFIL
   * =====================================================
   */

  const profile: UserProfile = {
    id: profileData.id,

    name: profileData.name,

    age: Number(profileData.age),

    gender: profileData.gender,

    height: Number(
      profileData.height
    ),

    weight: Number(
      profileData.weight
    ),

    goal: profileData.goal,

    experience:
      profileData.experience,

    training_days:
      trainingDaysCount.toString(),

    training_duration:
      profileData.training_duration,

    training_location:
      profileData.training_location,

    focus:
      profileData.focus,

    injuries:
      profileData.injuries ?? "",

    restriction:
      profileData.restriction ?? "",

    training_period:
      profileData.training_period,

    sleep:
      profileData.sleep,
  };

  /*
   * =====================================================
   * 6. NORMALIZAÇÃO DOS EXERCÍCIOS
   * =====================================================
   */

  const exercises: Exercise[] =
    exercisesData.map(
      (exercise) => ({
        id: exercise.id,

        name: exercise.name,

        muscle_group:
          exercise.muscle_group,

        primary_muscle:
          exercise.primary_muscle ??
          null,

        target_regions:
          getStringArray(
            exercise.target_regions
          ),

        secondary_muscles:
          getStringArray(
            exercise.secondary_muscles
          ),

        emphasis:
          getEmphasis(
            exercise.emphasis
          ),

        equipment:
          exercise.equipment ??
          null,

        training_location:
          getTrainingLocation(
            exercise.training_location
          ),

        difficulty:
          exercise.difficulty,

        exercise_type:
          exercise.exercise_type ??
          null,

        movement_pattern:
          exercise.movement_pattern ??
          null,

        technical_demand:
          getDemand(
            exercise.technical_demand
          ),

        stability_requirement:
          getDemand(
            exercise.stability_requirement
          ),

        execution_type:
          getExecutionType(
            exercise.execution_type
          ),

        suitable_goals:
          getSuitableGoals(
            exercise.suitable_goals
          ),

        substitution_group:
          exercise.substitution_group ??
          null,

        estimated_minutes:
          exercise.estimated_minutes !==
            null &&
          exercise.estimated_minutes !==
            undefined
            ? Number(
                exercise.estimated_minutes
              )
            : null,

        instructions:
          exercise.instructions ??
          null,
      })
    );

  /*
   * =====================================================
   * 7. GERAÇÃO DO PLANO
   * =====================================================
   */

  const workoutPlan =
    generateWorkoutPlan(
      profile,
      exercises
    );

  return workoutPlan;
}