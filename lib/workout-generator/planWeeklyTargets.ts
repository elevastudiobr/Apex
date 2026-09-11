import { UserProfile } from "./types";
import {
  calculateWeeklyVolume,
  WeeklyVolumeTarget,
} from "./calculateWeeklyVolume";

export type MusclePriority = "Alta" | "Moderada" | "Baixa";

export interface WeeklyTarget {
  muscle: string;
  regions: string[];
  movementPatterns: string[];
  priority: MusclePriority;

  /**
   * Volume semanal planejado para este grupo.
   * Representa séries diretas.
   */
  weeklySetsMin: number;
  weeklySetsMax: number;

  /**
   * Quantidade de vezes que o grupo aparece
   * diretamente durante a semana.
   */
  frequency: number;
}

export interface WeeklyWorkoutTarget {
  workoutOrder: number;
  name: string;
  targets: WeeklyTarget[];
}

export interface WeeklyPlan {
  split: string;
  workouts: WeeklyWorkoutTarget[];
}

function createVolumeMap(
  weeklyVolume: WeeklyVolumeTarget[]
): Map<string, WeeklyVolumeTarget> {
  return new Map(
    weeklyVolume.map((item) => [
      item.muscle,
      item,
    ])
  );
}

function getVolume(
  volumeMap: Map<string, WeeklyVolumeTarget>,
  muscle: string
): WeeklyVolumeTarget {
  const volume = volumeMap.get(muscle);

  if (volume) {
    return volume;
  }

  return {
    muscle,
    setsMin: 6,
    setsMax: 10,
    priority: "Moderada",
  };
}

function calculatePerWorkoutSets(
  volume: WeeklyVolumeTarget,
  frequency: number
): {
  setsMin: number;
  setsMax: number;
} {
  const safeFrequency = Math.max(
    frequency,
    1
  );

  return {
    setsMin: Math.max(
      1,
      Math.ceil(
        volume.setsMin / safeFrequency
      )
    ),

    setsMax: Math.max(
      1,
      Math.ceil(
        volume.setsMax / safeFrequency
      )
    ),
  };
}

function target(
  volumeMap: Map<string, WeeklyVolumeTarget>,
  muscle: string,
  regions: string[],
  movementPatterns: string[],
  priority: MusclePriority = "Moderada",
  frequency = 1
): WeeklyTarget {
  const volume = getVolume(
    volumeMap,
    muscle
  );

  const perWorkout =
    calculatePerWorkoutSets(
      volume,
      frequency
    );

  return {
    muscle,
    regions,
    movementPatterns,
    priority,
    weeklySetsMin: perWorkout.setsMin,
    weeklySetsMax: perWorkout.setsMax,
    frequency,
  };
}

function cloneTarget(
  targetItem: WeeklyTarget
): WeeklyTarget {
  return {
    ...targetItem,
    regions: [...targetItem.regions],
    movementPatterns: [
      ...targetItem.movementPatterns,
    ],
  };
}

function cloneTargets(
  targets: WeeklyTarget[]
): WeeklyTarget[] {
  return targets.map(cloneTarget);
}

function increasePriority(
  targets: WeeklyTarget[],
  muscles: string[]
): WeeklyTarget[] {
  return targets.map((item) => {
    if (muscles.includes(item.muscle)) {
      return {
        ...cloneTarget(item),
        priority: "Alta",
        weeklySetsMin: item.weeklySetsMin + 1,
        weeklySetsMax: item.weeklySetsMax + 1,
      };
    }

    return cloneTarget(item);
  });
}

function getBaseTargets(
  profile: UserProfile,
  volumeMap: Map<string, WeeklyVolumeTarget>
): {
  upper: WeeklyTarget[];
  lower: WeeklyTarget[];
  push: WeeklyTarget[];
  pull: WeeklyTarget[];
  legs: WeeklyTarget[];
} {
  const upperPriority: MusclePriority =
    profile.focus === "Superiores"
      ? "Alta"
      : "Moderada";

  const lowerPriority: MusclePriority =
    profile.focus === "Inferiores"
      ? "Alta"
      : "Moderada";

  return {
    // =====================================================
    // UPPER
    // =====================================================

    upper: [
      target(
        volumeMap,
        "PEITO",
        [
          "PEITO_SUPERIOR",
          "PEITO_MEDIO",
          "PEITO_INFERIOR",
        ],
        [
          "EMPURRAR_INCLINADO",
          "EMPURRAR_HORIZONTAL",
          "EMPURRAR_DECLINADO",
        ],
        upperPriority,
        2
      ),

      target(
        volumeMap,
        "COSTAS",
        [
          "DORSAIS",
          "ESPESSURA_COSTAS",
        ],
        [
          "PUXAR_VERTICAL",
          "PUXAR_HORIZONTAL",
        ],
        upperPriority,
        2
      ),

      target(
        volumeMap,
        "OMBROS",
        [
          "DELTOIDE_ANTERIOR",
          "DELTOIDE_LATERAL",
          "DELTOIDE_POSTERIOR",
        ],
        [
          "EMPURRAR_VERTICAL",
          "ABDUCAO_OMBRO",
        ],
        "Moderada",
        2
      ),

      target(
        volumeMap,
        "BICEPS",
        [
          "BICEPS",
          "BRAQUIAL",
          "BRAQUIORRADIAL",
        ],
        ["FLEXAO_COTOVELO"],
        "Moderada",
        2
      ),

      target(
        volumeMap,
        "TRICEPS",
        [
          "TRICEPS_CABECA_LONGA",
          "TRICEPS_CABECA_LATERAL",
          "TRICEPS_CABECA_MEDIAL",
        ],
        ["EXTENSAO_COTOVELO"],
        "Moderada",
        2
      ),
    ],

    // =====================================================
    // LOWER
    // =====================================================

    lower: [
      target(
        volumeMap,
        "QUADRICEPS",
        [
          "QUADRICEPS",
          "VASTO_LATERAL",
          "VASTO_MEDIAL",
        ],
        [
          "AGACHAMENTO",
          "EXTENSAO_JOELHO",
        ],
        lowerPriority,
        2
      ),

      target(
        volumeMap,
        "POSTERIORES",
        [
          "POSTERIORES",
          "BICEPS_FEMORAL",
        ],
        [
          "HINGE",
          "FLEXAO_JOELHO",
        ],
        lowerPriority,
        2
      ),

      target(
        volumeMap,
        "GLUTEOS",
        [
          "GLUTEO_MAXIMO",
          "GLUTEO_MEDIO",
          "GLUTEO_MINIMO",
        ],
        [
          "EXTENSAO_QUADRIL",
          "ABDUCAO_QUADRIL",
        ],
        lowerPriority,
        2
      ),

      target(
        volumeMap,
        "PANTURRILHAS",
        [
          "GASTROCNEMIO",
          "SOLEO",
        ],
        ["FLEXAO_PLANTAR"],
        "Baixa",
        2
      ),

      target(
        volumeMap,
        "CORE",
        [
          "RETO_ABDOMINAL",
          "CORE_ESTABILIZACAO",
          "TRANSVERSO_ABDOMINAL",
        ],
        [
          "FLEXAO_TRONCO",
          "ESTABILIZACAO_CORE",
        ],
        "Baixa",
        2
      ),
    ],

    // =====================================================
    // PUSH
    // =====================================================

    push: [
      target(
        volumeMap,
        "PEITO",
        [
          "PEITO_SUPERIOR",
          "PEITO_MEDIO",
          "PEITO_INFERIOR",
        ],
        [
          "EMPURRAR_INCLINADO",
          "EMPURRAR_HORIZONTAL",
          "EMPURRAR_DECLINADO",
        ],
        upperPriority,
        2
      ),

      target(
        volumeMap,
        "OMBROS",
        [
          "DELTOIDE_ANTERIOR",
          "DELTOIDE_LATERAL",
        ],
        [
          "EMPURRAR_VERTICAL",
          "ABDUCAO_OMBRO",
        ],
        "Moderada",
        2
      ),

      target(
        volumeMap,
        "TRICEPS",
        [
          "TRICEPS_CABECA_LONGA",
          "TRICEPS_CABECA_LATERAL",
          "TRICEPS_CABECA_MEDIAL",
        ],
        ["EXTENSAO_COTOVELO"],
        "Moderada",
        2
      ),
    ],

    // =====================================================
    // PULL
    // =====================================================

    pull: [
      target(
        volumeMap,
        "COSTAS",
        [
          "DORSAIS",
          "ESPESSURA_COSTAS",
          "TRAPEZIO",
        ],
        [
          "PUXAR_VERTICAL",
          "PUXAR_HORIZONTAL",
        ],
        "Alta",
        2
      ),

      target(
        volumeMap,
        "OMBROS",
        ["DELTOIDE_POSTERIOR"],
        ["ABDUCAO_OMBRO"],
        "Moderada",
        2
      ),

      target(
        volumeMap,
        "BICEPS",
        [
          "BICEPS",
          "BRAQUIAL",
          "BRAQUIORRADIAL",
        ],
        ["FLEXAO_COTOVELO"],
        "Moderada",
        2
      ),
    ],

    // =====================================================
    // LEGS
    // =====================================================

    legs: [
      target(
        volumeMap,
        "QUADRICEPS",
        [
          "QUADRICEPS",
          "VASTO_LATERAL",
          "VASTO_MEDIAL",
        ],
        [
          "AGACHAMENTO",
          "EXTENSAO_JOELHO",
        ],
        lowerPriority,
        2
      ),

      target(
        volumeMap,
        "POSTERIORES",
        [
          "POSTERIORES",
          "BICEPS_FEMORAL",
        ],
        [
          "HINGE",
          "FLEXAO_JOELHO",
        ],
        lowerPriority,
        2
      ),

      target(
        volumeMap,
        "GLUTEOS",
        [
          "GLUTEO_MAXIMO",
          "GLUTEO_MEDIO",
        ],
        [
          "EXTENSAO_QUADRIL",
          "ABDUCAO_QUADRIL",
        ],
        lowerPriority,
        2
      ),

      target(
        volumeMap,
        "PANTURRILHAS",
        [
          "GASTROCNEMIO",
          "SOLEO",
        ],
        ["FLEXAO_PLANTAR"],
        "Baixa",
        2
      ),

      target(
        volumeMap,
        "CORE",
        [
          "RETO_ABDOMINAL",
          "CORE_ESTABILIZACAO",
          "TRANSVERSO_ABDOMINAL",
        ],
        [
          "FLEXAO_TRONCO",
          "ESTABILIZACAO_CORE",
        ],
        "Baixa",
        2
      ),
    ],
  };
}

function createFullBodyTargets(
  base: ReturnType<typeof getBaseTargets>
): WeeklyTarget[] {
  return [
    ...cloneTargets(base.upper).filter(
      (item) =>
        item.muscle === "PEITO" ||
        item.muscle === "COSTAS" ||
        item.muscle === "OMBROS"
    ),

    ...cloneTargets(base.lower).filter(
      (item) =>
        item.muscle === "QUADRICEPS" ||
        item.muscle === "POSTERIORES" ||
        item.muscle === "GLUTEOS"
    ),

    ...cloneTargets(base.upper).filter(
      (item) =>
        item.muscle === "BICEPS" ||
        item.muscle === "TRICEPS"
    ),

    ...cloneTargets(base.lower).filter(
      (item) => item.muscle === "CORE"
    ),
  ];
}

export function planWeeklyTargets(
  profile: UserProfile,
  split: string
): WeeklyPlan {
  const weeklyVolume =
    calculateWeeklyVolume(profile);

  const volumeMap =
    createVolumeMap(weeklyVolume);

  const base = getBaseTargets(
    profile,
    volumeMap
  );

  const trainingDays = Number(
    profile.training_days
  );

  // =====================================================
  // FULL BODY
  // =====================================================

  if (split === "Full Body") {
    const workouts: WeeklyWorkoutTarget[] = [];

    for (
      let day = 1;
      day <= trainingDays;
      day++
    ) {
      workouts.push({
        workoutOrder: day,
        name: `Treino ${String.fromCharCode(
          64 + day
        )}`,
        targets:
          createFullBodyTargets(base),
      });
    }

    return {
      split,
      workouts,
    };
  }

  // =====================================================
  // FULL BODY FORÇA
  // =====================================================

  if (split === "Full Body Força") {
    const workouts: WeeklyWorkoutTarget[] = [];

    for (
      let day = 1;
      day <= trainingDays;
      day++
    ) {
      workouts.push({
        workoutOrder: day,
        name: `Força ${String.fromCharCode(
          64 + day
        )}`,
        targets: [
          target(
            volumeMap,
            "QUADRICEPS",
            ["QUADRICEPS"],
            ["AGACHAMENTO"],
            "Alta",
            trainingDays
          ),

          target(
            volumeMap,
            "PEITO",
            [
              "PEITO_MEDIO",
              "PEITO_SUPERIOR",
            ],
            [
              "EMPURRAR_HORIZONTAL",
              "EMPURRAR_INCLINADO",
            ],
            "Alta",
            trainingDays
          ),

          target(
            volumeMap,
            "COSTAS",
            [
              "DORSAIS",
              "ESPESSURA_COSTAS",
            ],
            [
              "PUXAR_VERTICAL",
              "PUXAR_HORIZONTAL",
            ],
            "Alta",
            trainingDays
          ),

          target(
            volumeMap,
            "POSTERIORES",
            ["POSTERIORES"],
            ["HINGE"],
            "Alta",
            trainingDays
          ),

          target(
            volumeMap,
            "OMBROS",
            [
              "DELTOIDE_ANTERIOR",
              "DELTOIDE_LATERAL",
            ],
            ["EMPURRAR_VERTICAL"],
            "Moderada",
            trainingDays
          ),

          target(
            volumeMap,
            "CORE",
            ["CORE_ESTABILIZACAO"],
            ["ESTABILIZACAO_CORE"],
            "Baixa",
            trainingDays
          ),
        ],
      });
    }

    return {
      split,
      workouts,
    };
  }

  // =====================================================
  // ABC
  // =====================================================

  if (split === "ABC") {
    return {
      split,
      workouts: [
        {
          workoutOrder: 1,
          name: "Treino A — Empurrar",
          targets: cloneTargets(
            base.push
          ),
        },

        {
          workoutOrder: 2,
          name: "Treino B — Puxar",
          targets: cloneTargets(
            base.pull
          ),
        },

        {
          workoutOrder: 3,
          name: "Treino C — Pernas",
          targets: cloneTargets(
            base.legs
          ),
        },
      ],
    };
  }

  // =====================================================
  // ABCD
  // =====================================================

  if (split === "ABCD") {
    const shoulders =
      base.upper.find(
        (item) => item.muscle === "OMBROS"
      );

    const core =
      base.lower.find(
        (item) => item.muscle === "CORE"
      );

    return {
      split,
      workouts: [
        {
          workoutOrder: 1,
          name: "Treino A — Peito e Tríceps",
          targets: [
            ...cloneTargets(
              base.push
            ).filter(
              (item) =>
                item.muscle === "PEITO" ||
                item.muscle === "TRICEPS"
            ),
          ],
        },

        {
          workoutOrder: 2,
          name: "Treino B — Costas e Bíceps",
          targets: [
            ...cloneTargets(
              base.pull
            ).filter(
              (item) =>
                item.muscle === "COSTAS" ||
                item.muscle === "BICEPS"
            ),
          ],
        },

        {
          workoutOrder: 3,
          name: "Treino C — Pernas",
          targets: cloneTargets(
            base.legs
          ),
        },

        {
          workoutOrder: 4,
          name: "Treino D — Ombros e Core",
          targets: [
            ...(shoulders
              ? [cloneTarget(shoulders)]
              : []),

            ...(core
              ? [cloneTarget(core)]
              : []),
          ],
        },
      ],
    };
  }

  // =====================================================
  // UPPER / LOWER
  // =====================================================

  if (split === "Upper / Lower") {
    return {
      split,
      workouts: [
        {
          workoutOrder: 1,
          name: "Treino A — Upper",
          targets: cloneTargets(
            base.upper
          ),
        },

        {
          workoutOrder: 2,
          name: "Treino B — Lower",
          targets: cloneTargets(
            base.lower
          ),
        },

        {
          workoutOrder: 3,
          name: "Treino C — Upper",
          targets: cloneTargets(
            base.upper
          ),
        },

        {
          workoutOrder: 4,
          name: "Treino D — Lower",
          targets: cloneTargets(
            base.lower
          ),
        },
      ],
    };
  }

  // =====================================================
  // UPPER / LOWER + PRIORIDADE SUPERIOR
  // =====================================================

  if (
    split ===
    "Upper / Lower + Prioridade Superior"
  ) {
    return {
      split,
      workouts: [
        {
          workoutOrder: 1,
          name: "Treino A — Upper",
          targets: cloneTargets(
            base.upper
          ),
        },

        {
          workoutOrder: 2,
          name: "Treino B — Lower",
          targets: cloneTargets(
            base.lower
          ),
        },

        {
          workoutOrder: 3,
          name: "Treino C — Upper Prioridade",
          targets: increasePriority(
            base.upper,
            [
              "PEITO",
              "COSTAS",
              "OMBROS",
            ]
          ),
        },

        {
          workoutOrder: 4,
          name: "Treino D — Lower",
          targets: cloneTargets(
            base.lower
          ),
        },
      ],
    };
  }

  // =====================================================
  // UPPER / LOWER + PRIORIDADE INFERIOR
  // =====================================================

  if (
    split ===
    "Upper / Lower + Prioridade Inferior"
  ) {
    return {
      split,
      workouts: [
        {
          workoutOrder: 1,
          name: "Treino A — Lower",
          targets: cloneTargets(
            base.lower
          ),
        },

        {
          workoutOrder: 2,
          name: "Treino B — Upper",
          targets: cloneTargets(
            base.upper
          ),
        },

        {
          workoutOrder: 3,
          name: "Treino C — Lower Prioridade",
          targets: increasePriority(
            base.lower,
            [
              "QUADRICEPS",
              "POSTERIORES",
              "GLUTEOS",
            ]
          ),
        },

        {
          workoutOrder: 4,
          name: "Treino D — Upper",
          targets: cloneTargets(
            base.upper
          ),
        },
      ],
    };
  }

  // =====================================================
  // PPL
  // =====================================================

  if (split === "PPL") {
    const workouts: WeeklyWorkoutTarget[] =
      [];

    const templates = [
      {
        name: "Push",
        targets: base.push,
      },
      {
        name: "Pull",
        targets: base.pull,
      },
      {
        name: "Legs",
        targets: base.legs,
      },
    ];

    for (
      let day = 1;
      day <= Math.min(trainingDays, 6);
      day++
    ) {
      const template =
        templates[(day - 1) % 3];

      workouts.push({
        workoutOrder: day,
        name: `Treino ${String.fromCharCode(
          64 + day
        )} — ${template.name}`,
        targets: cloneTargets(
          template.targets
        ),
      });
    }

    return {
      split,
      workouts,
    };
  }

  // =====================================================
  // ABC + ESPECIALIZAÇÃO
  // =====================================================

  if (
    split === "ABC + Especialização"
  ) {
    const specialization =
      profile.focus === "Inferiores"
        ? "Inferiores"
        : "Superiores";

    const specializationTargets =
      specialization === "Inferiores"
        ? increasePriority(
            base.lower,
            [
              "QUADRICEPS",
              "POSTERIORES",
              "GLUTEOS",
            ]
          )
        : increasePriority(
            base.upper,
            [
              "PEITO",
              "COSTAS",
              "OMBROS",
            ]
          );

    return {
      split,
      workouts: [
        {
          workoutOrder: 1,
          name: "Treino A — Empurrar",
          targets: cloneTargets(
            base.push
          ),
        },

        {
          workoutOrder: 2,
          name: "Treino B — Puxar",
          targets: cloneTargets(
            base.pull
          ),
        },

        {
          workoutOrder: 3,
          name: "Treino C — Pernas",
          targets: cloneTargets(
            base.legs
          ),
        },

        {
          workoutOrder: 4,
          name: `Treino D — Especialização ${specialization}`,
          targets:
            specializationTargets,
        },
      ],
    };
  }

  // =====================================================
  // PPL + ESPECIALIZAÇÃO
  // =====================================================

  if (
    split ===
    "PPL + Especialização"
  ) {
    const specialization =
      profile.focus === "Inferiores"
        ? "Inferiores"
        : "Superiores";

    const specializationTargets =
      specialization === "Inferiores"
        ? increasePriority(
            base.legs,
            [
              "QUADRICEPS",
              "POSTERIORES",
              "GLUTEOS",
            ]
          )
        : increasePriority(
            base.upper,
            [
              "PEITO",
              "COSTAS",
              "OMBROS",
            ]
          );

    const workouts: WeeklyWorkoutTarget[] =
      [];

    const templates = [
      {
        name: "Push",
        targets: base.push,
      },
      {
        name: "Pull",
        targets: base.pull,
      },
      {
        name: "Legs",
        targets: base.legs,
      },
    ];

    for (
      let day = 1;
      day <= Math.min(trainingDays, 6);
      day++
    ) {
      const template =
        templates[(day - 1) % 3];

      workouts.push({
        workoutOrder: day,
        name: `Treino ${String.fromCharCode(
          64 + day
        )} — ${template.name}`,
        targets: cloneTargets(
          template.targets
        ),
      });
    }

    /*
     * Se houver um sétimo dia disponível,
     * ele recebe a especialização.
     */
    if (trainingDays >= 7) {
      workouts.push({
        workoutOrder: 7,
        name: `Treino G — Especialização ${specialization}`,
        targets: specializationTargets,
      });
    }

    return {
      split,
      workouts,
    };
  }

  throw new Error(
    `Divisão de treino não suportada: ${split}`
  );
}