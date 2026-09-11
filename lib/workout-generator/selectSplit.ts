import { UserProfile } from "./types";

export type WorkoutSplit =
  | "Full Body"
  | "Full Body Força"
  | "ABC"
  | "ABCD"
  | "Upper / Lower"
  | "PPL"
  | "ABC + Especialização"
  | "Upper / Lower + Prioridade Superior"
  | "Upper / Lower + Prioridade Inferior"
  | "PPL + Especialização";

function getTrainingDays(profile: UserProfile): number {
  const days = Number(profile.training_days);

  if (!Number.isFinite(days)) {
    return 0;
  }

  return Math.min(Math.max(Math.floor(days), 1), 7);
}

function getDurationMinutes(duration: string): number {
  switch (duration) {
    case "30 min":
      return 30;

    case "45 min":
      return 45;

    case "1h":
      return 60;

    case "1h30":
      return 90;

    case "2h+":
      return 120;

    default:
      return 60;
  }
}

function isStrengthProfile(profile: UserProfile): boolean {
  return (
    profile.goal === "Ganhar Força" &&
    (profile.experience === "Intermediário" ||
      profile.experience === "Avançado")
  );
}

function hasGoodRecovery(profile: UserProfile): boolean {
  return (
    profile.sleep === "7–8h" ||
    profile.sleep === "8h+"
  );
}

function hasPoorRecovery(profile: UserProfile): boolean {
  return profile.sleep === "Menos de 6h";
}

function isIntermediateOrAdvanced(
  profile: UserProfile
): boolean {
  return (
    profile.experience === "Intermediário" ||
    profile.experience === "Avançado"
  );
}

function prefersUpperBody(profile: UserProfile): boolean {
  return profile.focus === "Superiores";
}

function prefersLowerBody(profile: UserProfile): boolean {
  return profile.focus === "Inferiores";
}

function prefersBalanced(profile: UserProfile): boolean {
  return profile.focus === "Equilibrado";
}

export function selectSplit(
  profile: UserProfile
): WorkoutSplit {
  const days = getTrainingDays(profile);

  const duration = getDurationMinutes(
    profile.training_duration
  );

  if (days <= 0) {
    throw new Error(
      "Não foi possível determinar a quantidade de dias de treino."
    );
  }

  /*
   * RECUPERAÇÃO
   *
   * Quando o usuário dorme menos de 6 horas,
   * evitamos divisões muito fragmentadas e
   * priorizamos estruturas que permitem maior
   * recuperação entre estímulos.
   */

  if (hasPoorRecovery(profile)) {
    if (days <= 3) {
      return isStrengthProfile(profile)
        ? "Full Body Força"
        : "Full Body";
    }

    if (days === 4) {
      return "Upper / Lower";
    }

    if (days === 5) {
      return "ABC + Especialização";
    }

    if (days === 6) {
      return "Upper / Lower";
    }

    /*
     * 7 dias não significa 7 dias pesados.
     * O planejamento semanal poderá distribuir
     * estímulos mais leves e sessões de recuperação.
     */
    return "Upper / Lower";
  }

  /*
   * 1–2 DIAS
   *
   * Full Body é a estrutura mais coerente,
   * pois permite trabalhar o corpo inteiro
   * sem desperdiçar uma sessão com pouca
   * frequência por grupo muscular.
   */

  if (days <= 2) {
    return isStrengthProfile(profile)
      ? "Full Body Força"
      : "Full Body";
  }

  /*
   * 3 DIAS
   *
   * Full Body funciona muito bem.
   * Para força, usuários intermediários/avançados
   * recebem uma versão específica.
   */

  if (days === 3) {
    if (isStrengthProfile(profile)) {
      return "Full Body Força";
    }

    return "Full Body";
  }

  /*
   * 4 DIAS
   *
   * Upper / Lower é a estrutura principal.
   *
   * Se o usuário informou foco específico,
   * usamos uma versão com prioridade.
   */

  if (days === 4) {
    if (prefersUpperBody(profile)) {
      return "Upper / Lower + Prioridade Superior";
    }

    if (prefersLowerBody(profile)) {
      return "Upper / Lower + Prioridade Inferior";
    }

    return "Upper / Lower";
  }

  /*
   * 5 DIAS
   *
   * Aqui precisamos tomar cuidado.
   *
   * Upper/Lower tradicional não fecha naturalmente
   * 5 sessões sem criar uma sessão extra.
   *
   * Por isso usamos:
   *
   * ABC + Especialização
   *
   * que permite:
   *
   * A
   * B
   * C
   * A/B ou especialização
   * C/A ou especialização
   *
   * A implementação do planejamento semanal será
   * responsável por distribuir os 5 treinos.
   */

  if (days === 5) {
    /*
     * Treinos muito curtos:
     * priorizamos uma divisão mais simples.
     */

    if (duration <= 45) {
      return "ABC + Especialização";
    }

    /*
     * Usuários intermediários/avançados com boa
     * recuperação podem receber PPL + especialização.
     *
     * Essa estrutura terá exatamente 5 sessões
     * no planejador semanal.
     */

    if (
      isIntermediateOrAdvanced(profile) &&
      hasGoodRecovery(profile)
    ) {
      return "PPL + Especialização";
    }

    /*
     * Foco específico mantém a especialização
     * dentro do ABC.
     */

    return "ABC + Especialização";
  }

  /*
   * 6 DIAS
   *
   * PPL é uma divisão natural para seis sessões:
   *
   * Push
   * Pull
   * Legs
   * Push
   * Pull
   * Legs
   *
   * Para iniciantes com recuperação ruim,
   * usamos Upper / Lower.
   */

  if (days === 6) {
    if (
      profile.experience === "Iniciante" &&
      profile.sleep === "6–7h"
    ) {
      return "Upper / Lower";
    }

    if (
      profile.experience === "Iniciante" &&
      !hasGoodRecovery(profile)
    ) {
      return "Upper / Lower";
    }

    return "PPL";
  }

  /*
   * 7 DIAS
   *
   * Não vamos simplesmente retornar PPL,
   * porque PPL tradicional possui 6 sessões.
   *
   * Para 7 dias, usamos PPL + Especialização.
   *
   * O planejador semanal ficará responsável
   * por transformar isso em exatamente 7 sessões,
   * com uma sessão adicional de prioridade/recuperação.
   */

  if (days === 7) {
    if (
      profile.experience === "Iniciante" &&
      !hasGoodRecovery(profile)
    ) {
      return "Upper / Lower";
    }

    return "PPL + Especialização";
  }

  /*
   * FALLBACK
   */

  if (prefersBalanced(profile)) {
    return "Upper / Lower";
  }

  if (prefersUpperBody(profile)) {
    return "Upper / Lower + Prioridade Superior";
  }

  if (prefersLowerBody(profile)) {
    return "Upper / Lower + Prioridade Inferior";
  }

  return "ABC + Especialização";
}