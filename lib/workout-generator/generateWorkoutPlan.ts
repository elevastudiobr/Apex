import {
  Exercise,
  GeneratedRestDay,
  GeneratedWorkoutPlan,
  UserProfile,
} from "./types";

import { selectSplit } from "./selectSplit";
import { filterExercises } from "./filterExercises";
import { selectExercises } from "./selectExercises";
import { planWeeklyTargets } from "./planWeeklyTargets";
import { getDurationMinutes } from "./calculateTime";
import { validateWorkoutPlan } from "./validateWorkout";

function createRestDay(
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7
): GeneratedRestDay {
  return {
    type: "rest",
    name: "Descanso",
    day_of_week: dayOfWeek,
    workout_order: null,
    estimated_minutes: 0,
    exercises: [],
  };
}

function createCompleteWeek(
  workouts: GeneratedWorkoutPlan["workouts"]
): GeneratedWorkoutPlan["week"] {
  const workoutByDay = new Map(
    workouts.map((workout) => [
      workout.day_of_week,
      workout,
    ])
  );

  const week: GeneratedWorkoutPlan["week"] = [];

  for (let day = 1; day <= 7; day++) {
    const workout = workoutByDay.get(
      day as 1 | 2 | 3 | 4 | 5 | 6 | 7
    );

    if (workout) {
      week.push(workout);
    } else {
      week.push(
        createRestDay(
          day as 1 | 2 | 3 | 4 | 5 | 6 | 7
        )
      );
    }
  }

  return week;
}

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

  if (trainingDays > 7) {
    throw new Error(
      "A quantidade de dias de treino não pode ser maior que 7."
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

  const compatibleExercises =
    filterExercises(
      exercises,
      profile
    );

  if (compatibleExercises.length === 0) {
    throw new Error(
      "Nenhum exercício compatível foi encontrado para este perfil."
    );
  }

  const weeklyPlan =
    planWeeklyTargets(
      profile,
      split
    );

  if (
    weeklyPlan.workouts.length !==
    trainingDays
  ) {
    throw new Error(
      "O planejamento semanal não corresponde à quantidade de dias do usuário."
    );
  }

  const workouts =
    selectExercises(
      compatibleExercises,
      profile,
      weeklyPlan
    );

  const durationMinutes =
    getDurationMinutes(
      profile.training_duration
    );

  const temporaryPlan: GeneratedWorkoutPlan = {
    name: `Plano Apex de ${profile.name}`,
    goal: profile.goal,
    training_days: trainingDays,
    duration_minutes: durationMinutes,
    split,
    workouts,
    week: [],
  };

  temporaryPlan.week =
    createCompleteWeek(
      workouts
    );

  const valid =
    validateWorkoutPlan(
      temporaryPlan
    );

  if (!valid) {
    throw new Error(
      "O Apex não conseguiu gerar um plano de treino válido."
    );
  }

  return temporaryPlan;
}