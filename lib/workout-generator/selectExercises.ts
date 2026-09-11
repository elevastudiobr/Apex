import {
  Exercise,
  GeneratedWorkout,
  UserProfile,
} from "./types";

import {
  WeeklyPlan,
  WeeklyTarget,
} from "./planWeeklyTargets";

import { rankExercises } from "./scoreExercises";
import { calculateVolume } from "./calculateVolume";
import {
  calculateExerciseTime,
  calculateWorkoutTime,
} from "./calculateTime";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function calculateTargetScore(
  exercise: Exercise,
  target: WeeklyTarget,
  profile: UserProfile
): number {
  return rankExercises(
    [exercise],
    profile,
    [target.muscle],
    target.regions,
    target.movementPatterns
  ).length > 0
    ? 1
    : 0;
}

function isSameExercise(
  first: Exercise,
  second: Exercise
): boolean {
  return first.id === second.id;
}

function getExerciseSets(
  target: WeeklyTarget,
  profile: UserProfile
): number {
  const volume = calculateVolume(profile);

  const minimum = Math.max(
    1,
    target.weeklySetsMin
  );

  const maximum = Math.max(
    minimum,
    target.weeklySetsMax
  );

  const baseSets = volume.sets;

  return Math.min(
    maximum,
    Math.max(minimum, baseSets)
  );
}

function selectExercisesForTarget(
  exercises: Exercise[],
  target: WeeklyTarget,
  profile: UserProfile,
  selectedExercises: Exercise[]
): Exercise[] {
  const ranked = rankExercises(
    exercises,
    profile,
    [target.muscle],
    target.regions,
    target.movementPatterns
  );

  const available = ranked.filter(
    (exercise) =>
      !selectedExercises.some((selected) =>
        isSameExercise(selected, exercise)
      )
  );

  const desiredExercises =
    target.priority === "Alta"
      ? 2
      : target.priority === "Moderada"
        ? 1
        : 1;

  return available.slice(
    0,
    Math.min(desiredExercises, available.length)
  );
}

function buildWorkout(
  exercises: Exercise[],
  profile: UserProfile,
  weeklyWorkout: WeeklyPlan["workouts"][number]
): GeneratedWorkout {
  const selectedExercises: Exercise[] = [];
  const volume = calculateVolume(profile);

  for (const target of weeklyWorkout.targets) {
    const targetExercises =
      selectExercisesForTarget(
        exercises,
        target,
        profile,
        selectedExercises
      );

    for (const exercise of targetExercises) {
      selectedExercises.push(exercise);
    }
  }

  const workoutExercises = selectedExercises.map(
    (exercise, index) => {
      const target = weeklyWorkout.targets.find(
        (item) =>
          normalizeText(item.muscle) ===
          normalizeText(exercise.muscle_group)
      );

      const sets = target
        ? getExerciseSets(target, profile)
        : volume.sets;

      const estimatedMinutes =
        calculateExerciseTime(
          exercise,
          sets,
          volume.restSeconds
        );

      return {
        exercise,
        exercise_order: index + 1,
        sets,
        reps_min: volume.repsMin,
        reps_max: volume.repsMax,
        rest_seconds: volume.restSeconds,
        estimated_minutes: estimatedMinutes,
      };
    }
  );

  return {
    type: "workout",
    name: weeklyWorkout.name,
    day_of_week:
      weeklyWorkout.workoutOrder as
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7,
    workout_order: weeklyWorkout.workoutOrder,
    estimated_minutes: Math.ceil(
      calculateWorkoutTime(workoutExercises)
    ),
    exercises: workoutExercises,
  };
}

export function selectExercises(
  exercises: Exercise[],
  profile: UserProfile,
  weeklyPlan: WeeklyPlan
): GeneratedWorkout[] {
  return weeklyPlan.workouts.map(
    (weeklyWorkout) =>
      buildWorkout(
        exercises,
        profile,
        weeklyWorkout
      )
  );
}