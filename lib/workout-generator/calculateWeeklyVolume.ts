import { UserProfile } from "./types";

export interface WeeklyVolumeTarget {
  muscle: string;
  setsMin: number;
  setsMax: number;
  priority: "Alta" | "Moderada" | "Baixa";
}

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(value, min), max);
}

function getBaseRange(
  muscle: string,
  profile: UserProfile
): [number, number] {
  const experience = profile.experience;
  const goal = profile.goal;

  const beginner = experience === "Iniciante";
  const advanced = experience === "Avançado";

  // Grandes grupos musculares
  const largeMuscles = [
    "PEITO",
    "COSTAS",
    "QUADRICEPS",
    "POSTERIORES",
    "GLUTEOS",
  ];

  // Grupos menores
  const smallMuscles = [
    "OMBROS",
    "BICEPS",
    "TRICEPS",
    "PANTURRILHAS",
    "CORE",
  ];

  let min: number;
  let max: number;

  if (largeMuscles.includes(muscle)) {
    min = 8;
    max = 16;
  } else if (smallMuscles.includes(muscle)) {
    min = 6;
    max = 12;
  } else {
    min = 6;
    max = 12;
  }

  // Iniciantes começam com menos volume.
  if (beginner) {
    min -= 2;
    max -= 3;
  }

  // Avançados podem tolerar mais volume,
  // desde que a recuperação seja adequada.
  if (advanced) {
    min += 2;
    max += 2;
  }

  // Força tende a utilizar menos séries diretas,
  // porque os exercícios compostos já geram bastante estímulo.
  if (goal === "Ganhar Força") {
    min -= 2;
    max -= 2;
  }

  // Saúde e qualidade de vida não precisa de volume alto.
  if (goal === "Saúde e Qualidade de Vida") {
    min -= 3;
    max -= 3;
  }

  // Sono ruim reduzimos o volume planejado.
  if (profile.sleep === "Menos de 6h") {
    min -= 2;
    max -= 3;
  }

  if (profile.sleep === "6–7h") {
    min -= 1;
    max -= 1;
  }

  return [
    Math.max(4, min),
    Math.max(6, max),
  ];
}

function getPriority(
  muscle: string,
  profile: UserProfile
): "Alta" | "Moderada" | "Baixa" {
  if (
    profile.focus === "Superiores" &&
    [
      "PEITO",
      "COSTAS",
      "OMBROS",
      "BICEPS",
      "TRICEPS",
    ].includes(muscle)
  ) {
    return "Alta";
  }

  if (
    profile.focus === "Inferiores" &&
    [
      "QUADRICEPS",
      "POSTERIORES",
      "GLUTEOS",
      "PANTURRILHAS",
    ].includes(muscle)
  ) {
    return "Alta";
  }

  if (muscle === "CORE") {
    return "Baixa";
  }

  return "Moderada";
}

function getPriorityAdjustment(
  priority: "Alta" | "Moderada" | "Baixa"
): number {
  switch (priority) {
    case "Alta":
      return 2;

    case "Baixa":
      return -2;

    default:
      return 0;
  }
}

/**
 * Calcula o volume semanal alvo de cada grupo muscular.
 *
 * Importante:
 * isso representa séries diretas planejadas.
 *
 * O Apex futuramente poderá considerar também
 * o volume indireto dos exercícios compostos.
 */
export function calculateWeeklyVolume(
  profile: UserProfile
): WeeklyVolumeTarget[] {
  const muscles = [
    "PEITO",
    "COSTAS",
    "OMBROS",
    "BICEPS",
    "TRICEPS",
    "QUADRICEPS",
    "POSTERIORES",
    "GLUTEOS",
    "PANTURRILHAS",
    "CORE",
  ];

  return muscles.map((muscle) => {
    const [baseMin, baseMax] =
      getBaseRange(muscle, profile);

    const priority = getPriority(
      muscle,
      profile
    );

    const adjustment =
      getPriorityAdjustment(priority);

    const setsMin = clamp(
      baseMin + adjustment,
      4,
      18
    );

    const setsMax = clamp(
      baseMax + adjustment,
      setsMin,
      20
    );

    return {
      muscle,
      setsMin,
      setsMax,
      priority,
    };
  });
}