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
  secondary_muscles: string[];
  equipment: string | null;
  training_location: string[];
  difficulty: TrainingExperience;
  exercise_type: string | null;
  movement_pattern: string | null;
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
  name: string;
  day_of_week: number;
  workout_order: number;
  estimated_minutes: number;
  exercises: WorkoutExercise[];
}

export interface GeneratedWorkoutPlan {
  name: string;
  goal: WorkoutGoal;
  training_days: number;
  duration_minutes: number;
  split: string;
  workouts: GeneratedWorkout[];
}