import { UserProfile } from "./types";

export interface VolumeConfig {
  sets: number;
  repsMin: number;
  repsMax: number;
  restSeconds: number;
}

export function calculateVolume(
  profile: UserProfile
): VolumeConfig {
  let sets = 3;
  let repsMin = 8;
  let repsMax = 12;
  let restSeconds = 90;

  switch (profile.goal) {
    case "Ganhar Massa Muscular":
      sets = 3;
      repsMin = 8;
      repsMax = 12;
      restSeconds = 90;
      break;

    case "Perder Gordura":
      sets = 3;
      repsMin = 10;
      repsMax = 15;
      restSeconds = 60;
      break;

    case "Ganhar Músculo e Perder Gordura":
      sets = 3;
      repsMin = 8;
      repsMax = 12;
      restSeconds = 75;
      break;

    case "Ganhar Força":
      sets = 4;
      repsMin = 4;
      repsMax = 8;
      restSeconds = 150;
      break;

    case "Saúde e Qualidade de Vida":
      sets = 2;
      repsMin = 10;
      repsMax = 15;
      restSeconds = 60;
      break;
  }

  if (profile.experience === "Iniciante") {
    sets = Math.max(2, sets - 1);
  }

  if (profile.experience === "Avançado") {
    if (profile.goal !== "Saúde e Qualidade de Vida") {
      sets += 1;
    }
  }

  if (profile.sleep === "Menos de 6h") {
    sets = Math.max(2, sets - 1);
  }

  return {
    sets,
    repsMin,
    repsMax,
    restSeconds,
  };
}