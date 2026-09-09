import { createSupabaseServerClient } from "@/lib/supabase-server";

import {
  Exercise,
  UserProfile,
  GeneratedWorkoutPlan,
} from "./types";

import { generateWorkoutPlan } from "./generateWorkoutPlan";

export async function getUserWorkoutPlan(): Promise<GeneratedWorkoutPlan> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Usuário não autenticado.");
  }

  const { data: profileData, error: profileError } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

  if (profileError || !profileData) {
    throw new Error("Perfil do usuário não encontrado.");
  }

  const { data: exercisesData, error: exercisesError } =
    await supabase
      .from("exercises")
      .select("*");

  if (exercisesError || !exercisesData) {
    throw new Error("Não foi possível carregar os exercícios.");
  }

  const profile: UserProfile = {
    id: profileData.id,
    name: profileData.name,
    age: Number(profileData.age),
    gender: profileData.gender,
    height: Number(profileData.height),
    weight: Number(profileData.weight),
    goal: profileData.goal,
    experience: profileData.experience,
    training_days: profileData.training_days,
    training_duration: profileData.training_duration,
    training_location: profileData.training_location,
    focus: profileData.focus,
    injuries: profileData.injuries ?? "",
    restriction: profileData.restriction ?? "",
    training_period: profileData.training_period,
    sleep: profileData.sleep,
  };

  const exercises: Exercise[] = exercisesData.map(
    (exercise) => ({
      id: exercise.id,
      name: exercise.name,
      muscle_group: exercise.muscle_group,
      primary_muscle: exercise.primary_muscle,
      secondary_muscles:
        exercise.secondary_muscles ?? [],
      equipment: exercise.equipment,
      training_location:
        exercise.training_location ?? [],
      difficulty: exercise.difficulty,
      exercise_type: exercise.exercise_type,
      movement_pattern: exercise.movement_pattern,
      estimated_minutes:
        exercise.estimated_minutes
          ? Number(exercise.estimated_minutes)
          : null,
      instructions: exercise.instructions,
    })
  );

  const workoutPlan = generateWorkoutPlan(
    profile,
    exercises
  );

  return workoutPlan;
}