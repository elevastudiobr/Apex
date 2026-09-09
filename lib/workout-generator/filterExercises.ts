import { Exercise, UserProfile } from "./types";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function locationMatches(
  exercise: Exercise,
  location: UserProfile["training_location"]
): boolean {
  if (location === "Ambos") {
    return true;
  }

  return exercise.training_location.some(
    (item) => normalizeText(item) === normalizeText(location)
  );
}

function injuryBlocksExercise(
  exercise: Exercise,
  injuries: string
): boolean {
  if (!injuries || injuries.trim() === "") {
    return false;
  }

  const injuryText = normalizeText(injuries);
  const exerciseText = normalizeText(
    `${exercise.name} ${exercise.muscle_group} ${exercise.primary_muscle ?? ""}`
  );

  const injuryRules = [
    {
      keywords: ["joelho", "joelhos"],
      blocked: [
        "agachamento",
        "leg press",
        "mesa flexora",
        "afundo",
      ],
    },
    {
      keywords: ["ombro", "ombros"],
      blocked: [
        "desenvolvimento",
        "elevacao lateral",
      ],
    },
    {
      keywords: ["lombar", "coluna"],
      blocked: [
        "terra",
        "romeno",
        "agachamento livre",
      ],
    },
    {
      keywords: ["cotovelo", "cotovelos"],
      blocked: [
        "rosca",
        "triceps",
        "frances",
      ],
    },
  ];

  for (const rule of injuryRules) {
    const hasInjury = rule.keywords.some((keyword) =>
      injuryText.includes(keyword)
    );

    if (!hasInjury) {
      continue;
    }

    const blocked = rule.blocked.some((keyword) =>
      exerciseText.includes(normalizeText(keyword))
    );

    if (blocked) {
      return true;
    }
  }

  return false;
}

export function filterExercises(
  exercises: Exercise[],
  profile: UserProfile
): Exercise[] {
  return exercises.filter((exercise) => {
    if (!locationMatches(exercise, profile.training_location)) {
      return false;
    }

    if (injuryBlocksExercise(exercise, profile.injuries)) {
      return false;
    }

    return true;
  });
}