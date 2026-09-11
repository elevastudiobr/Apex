export type WorkoutGoal =
  | "Ganhar Massa Muscular"
  | "Perder Gordura"
  | "Ganhar Músculo e Perder Gordura"
  | "Ganhar Força"
  | "Saúde e Qualidade de Vida";

export type TrainingExperience =
  | "Iniciante"
  | "Intermediário"
  | "Avançado";

export type TrainingLocation =
  | "Academia"
  | "Casa"
  | "Ambos";

export type TrainingFocus =
  | "Superiores"
  | "Inferiores"
  | "Equilibrado";

export type ExerciseEmphasis =
  | "Baixa"
  | "Moderada"
  | "Alta";

export type ExerciseDemand =
  | "Baixa"
  | "Moderada"
  | "Alta";

export type ExerciseExecutionType =
  | "Unilateral"
  | "Bilateral";

export type WeekDay =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7;

export type WeeklyScheduleType =
  | "workout"
  | "rest";

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: WorkoutGoal;
  experience: TrainingExperience;
  training_days: string;
  training_duration: string;
  training_location: TrainingLocation;
  focus: TrainingFocus;
  injuries: string;
  restriction: string;
  training_period: string;
  sleep: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  primary_muscle: string | null;
  target_regions: string[];
  secondary_muscles: string[];
  emphasis: ExerciseEmphasis | null;
  equipment: string | null;
  training_location: TrainingLocation[];
  difficulty: TrainingExperience;
  exercise_type: string | null;
  movement_pattern: string | null;
  technical_demand: ExerciseDemand | null;
  stability_requirement: ExerciseDemand | null;
  execution_type: ExerciseExecutionType | null;
  suitable_goals: WorkoutGoal[];
  substitution_group: string | null;
  estimated_minutes: number | null;
  instructions: string | null;
}

export interface WorkoutExercise {
  exercise: Exercise;
  exercise_order: number;
  sets: number;
  reps_min: number;
  reps_max: number;
  rest_seconds: number;
  estimated_minutes: number;
  notes?: string;
}

export interface GeneratedWorkout {
  type: "workout";
  name: string;
  day_of_week: WeekDay;
  workout_order: number;
  estimated_minutes: number;
  exercises: WorkoutExercise[];
}

export interface GeneratedRestDay {
  type: "rest";
  name: string;
  day_of_week: WeekDay;
  workout_order: null;
  estimated_minutes: 0;
  exercises: [];
}

export type GeneratedWeekDay =
  | GeneratedWorkout
  | GeneratedRestDay;

export interface GeneratedWorkoutPlan {
  name: string;
  goal: WorkoutGoal;
  training_days: number;
  duration_minutes: number;
  split: string;
  workouts: GeneratedWorkout[];
  week: GeneratedWeekDay[];
}