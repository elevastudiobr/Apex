import { UserProfile } from "./types";

export function selectSplit(profile: UserProfile): string {
  const days = Number(profile.training_days);
  const experience = profile.experience;
  const goal = profile.goal;

  if (days <= 2) {
    return "Full Body";
  }

  if (days === 3) {
    if (
      goal === "Ganhar Força" &&
      experience === "Avançado"
    ) {
      return "Full Body Força";
    }

    return "Full Body";
  }

  if (days === 4) {
    return "Upper / Lower";
  }

  if (days === 5) {
    if (profile.focus === "Superiores") {
      return "Upper / Lower + Especialização";
    }

    if (profile.focus === "Inferiores") {
      return "Lower / Upper + Especialização";
    }

    return "Upper / Lower + Especialização";
  }

  if (days >= 6) {
    return "Push / Pull / Legs";
  }

  return "Full Body";
}