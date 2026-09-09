import {
    Exercise,
    GeneratedWorkoutPlan,
    UserProfile,
  } from "./types";
  
  import { selectSplit } from "./selectSplit";
  import { filterExercises } from "./filterExercises";
  import { selectExercises } from "./selectExercises";
  import { getDurationMinutes } from "./calculateTime";
  import { validateWorkoutPlan } from "./validateWorkout";
  
  export function generateWorkoutPlan(
    profile: UserProfile,
    exercises: Exercise[]
  ): GeneratedWorkoutPlan {
    const trainingDays = Number(
      profile.training_days
    );
  
    if (!trainingDays || trainingDays <= 0) {
      throw new Error(
        "O usuário precisa informar quantos dias por semana treina."
      );
    }
  
    if (!profile.experience) {
      throw new Error(
        "A experiência do usuário não foi informada."
      );
    }
  
    if (!profile.training_duration) {
      throw new Error(
        "A duração do treino não foi informada."
      );
    }
  
    if (exercises.length === 0) {
      throw new Error(
        "Nenhum exercício disponível para gerar o treino."
      );
    }
  
    const split = selectSplit(profile);
  
    const compatibleExercises = filterExercises(
      exercises,
      profile
    );
  
    if (compatibleExercises.length === 0) {
      throw new Error(
        "Nenhum exercício compatível foi encontrado para este perfil."
      );
    }
  
    const workouts = selectExercises(
      compatibleExercises,
      profile,
      split
    );
  
    const durationMinutes = getDurationMinutes(
      profile.training_duration
    );
  
    const plan: GeneratedWorkoutPlan = {
      name: `Plano Apex de ${profile.name}`,
      goal: profile.goal,
      training_days: trainingDays,
      duration_minutes: durationMinutes,
      split,
      workouts,
    };
  
    const valid = validateWorkoutPlan(plan);
  
    if (!valid) {
      throw new Error(
        "O Apex não conseguiu gerar um plano de treino válido."
      );
    }
  
    return plan;
  }