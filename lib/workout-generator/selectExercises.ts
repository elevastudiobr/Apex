import {
    Exercise,
    GeneratedWorkout,
    UserProfile,
    WorkoutExercise,
  } from "./types";
  
  import { rankExercises } from "./scoreExercises";
  import {
    calculateExerciseTime,
    getAvailableTrainingTime,
  } from "./calculateTime";
  
  import { calculateVolume } from "./calculateVolume";
  
  interface WorkoutStructure {
    name: string;
    muscles: string[];
  }
  
  function getWorkoutStructures(
    split: string,
    trainingDays: number
  ): WorkoutStructure[] {
    if (split === "Full Body") {
      return Array.from({ length: trainingDays }, (_, index) => ({
        name: `Full Body ${String.fromCharCode(65 + index)}`,
        muscles: [
          "PEITO",
          "COSTAS",
          "QUADRÍCEPS",
          "POSTERIORES",
          "OMBROS",
          "BÍCEPS",
          "TRÍCEPS",
        ],
      }));
    }
  
    if (split === "Full Body Força") {
      return Array.from({ length: trainingDays }, (_, index) => ({
        name: `Força ${String.fromCharCode(65 + index)}`,
        muscles: [
          "PEITO",
          "COSTAS",
          "QUADRÍCEPS",
          "POSTERIORES",
        ],
      }));
    }
  
    if (split === "Upper / Lower") {
      return Array.from({ length: trainingDays }, (_, index) => {
        const isUpper = index % 2 === 0;
  
        return {
          name: isUpper
            ? `Upper ${Math.floor(index / 2) + 1}`
            : `Lower ${Math.floor(index / 2) + 1}`,
  
          muscles: isUpper
            ? [
                "PEITO",
                "COSTAS",
                "OMBROS",
                "BÍCEPS",
                "TRÍCEPS",
              ]
            : [
                "QUADRÍCEPS",
                "POSTERIORES",
                "GLÚTEOS",
                "PANTURRILHAS",
              ],
        };
      });
    }
  
    if (
      split === "Upper / Lower + Especialização" ||
      split === "Lower / Upper + Especialização"
    ) {
      const upper = [
        "PEITO",
        "COSTAS",
        "OMBROS",
        "BÍCEPS",
        "TRÍCEPS",
      ];
  
      const lower = [
        "QUADRÍCEPS",
        "POSTERIORES",
        "GLÚTEOS",
        "PANTURRILHAS",
      ];
  
      const startsWithLower = split.startsWith("Lower");
  
      return Array.from({ length: trainingDays }, (_, index) => {
        const isFirstType = index % 2 === 0;
  
        const muscles =
          startsWithLower
            ? isFirstType
              ? lower
              : upper
            : isFirstType
              ? upper
              : lower;
  
        return {
          name: isFirstType
            ? `Especialização ${Math.floor(index / 2) + 1}`
            : `Treino ${Math.floor(index / 2) + 1}`,
          muscles,
        };
      });
    }
  
    if (split === "Push / Pull / Legs") {
      const structures: WorkoutStructure[] = [
        {
          name: "Push",
          muscles: [
            "PEITO",
            "OMBROS",
            "TRÍCEPS",
          ],
        },
        {
          name: "Pull",
          muscles: [
            "COSTAS",
            "BÍCEPS",
          ],
        },
        {
          name: "Legs",
          muscles: [
            "QUADRÍCEPS",
            "POSTERIORES",
            "GLÚTEOS",
            "PANTURRILHAS",
          ],
        },
      ];
  
      return Array.from({ length: trainingDays }, (_, index) => {
        const base = structures[index % 3];
        const round = Math.floor(index / 3);
  
        return {
          name:
            round === 0
              ? base.name
              : `${base.name} ${round + 1}`,
          muscles: base.muscles,
        };
      });
    }
  
    return Array.from({ length: trainingDays }, (_, index) => ({
      name: `Treino ${String.fromCharCode(65 + index)}`,
      muscles: [
        "PEITO",
        "COSTAS",
        "QUADRÍCEPS",
        "POSTERIORES",
      ],
    }));
  }
  
  export function selectExercises(
    exercises: Exercise[],
    profile: UserProfile,
    split: string
  ): GeneratedWorkout[] {
    const trainingDays = Number(profile.training_days);
  
    const structures = getWorkoutStructures(
      split,
      trainingDays
    );
  
    const volume = calculateVolume(profile);
    const availableTime = getAvailableTrainingTime(profile);
  
    return structures.map((structure, workoutIndex) => {
      const selected: WorkoutExercise[] = [];
      const usedMuscles = new Set<string>();
  
      const ranked = rankExercises(
        exercises,
        profile,
        structure.muscles
      );
  
      for (const exercise of ranked) {
        if (selected.length >= 8) {
          break;
        }
  
        if (!structure.muscles.includes(exercise.muscle_group)) {
          continue;
        }
  
        if (usedMuscles.has(exercise.muscle_group)) {
          continue;
        }
  
        const estimatedMinutes = calculateExerciseTime(
          exercise,
          volume.sets,
          volume.restSeconds
        );
  
        const currentTime = selected.reduce(
          (total, item) =>
            total + item.estimated_minutes,
          0
        );
  
        if (
          currentTime + estimatedMinutes >
          availableTime
        ) {
          continue;
        }
  
        selected.push({
          exercise,
          exercise_order: selected.length + 1,
          sets: volume.sets,
          reps_min: volume.repsMin,
          reps_max: volume.repsMax,
          rest_seconds: volume.restSeconds,
          estimated_minutes:
            Math.round(estimatedMinutes * 10) / 10,
          notes:
            profile.goal === "Ganhar Força"
              ? "Priorize execução controlada e progressão de carga."
              : "Mantenha execução controlada e amplitude adequada.",
        });
  
        usedMuscles.add(exercise.muscle_group);
      }
  
      /*
       * Caso o treino tenha poucos exercícios,
       * adicionamos exercícios complementares.
       */
      if (selected.length < 4) {
        for (const exercise of ranked) {
          if (
            selected.some(
              (item) => item.exercise.id === exercise.id
            )
          ) {
            continue;
          }
  
          const estimatedMinutes = calculateExerciseTime(
            exercise,
            volume.sets,
            volume.restSeconds
          );
  
          const currentTime = selected.reduce(
            (total, item) =>
              total + item.estimated_minutes,
            0
          );
  
          if (
            currentTime + estimatedMinutes >
            availableTime
          ) {
            continue;
          }
  
          selected.push({
            exercise,
            exercise_order: selected.length + 1,
            sets: volume.sets,
            reps_min: volume.repsMin,
            reps_max: volume.repsMax,
            rest_seconds: volume.restSeconds,
            estimated_minutes:
              Math.round(estimatedMinutes * 10) / 10,
            notes:
              "Exercício complementar para equilibrar o treino.",
          });
  
          if (selected.length >= 4) {
            break;
          }
        }
      }
  
      const estimatedTotal = selected.reduce(
        (total, item) =>
          total + item.estimated_minutes,
        0
      );
  
      const workout: GeneratedWorkout = {
        name: structure.name,
        day_of_week: workoutIndex + 1,
        workout_order: workoutIndex + 1,
        estimated_minutes: Math.round(estimatedTotal),
        exercises: selected,
      };
  
      return workout;
    });
  }