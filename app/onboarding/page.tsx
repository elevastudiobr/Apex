"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dumbbell,
  Flame,
  Zap,
  Trophy,
  HeartPulse,
  Sprout,
  Home,
  Shuffle,
  Scale,
  Footprints,
  ShieldCheck,
  Leaf,
  MilkOff,
  Settings2,
  Sunrise,
  Sun,
  Moon,
  CalendarClock,
  BedDouble,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import GoalStep from "@/components/onboarding/steps/GoalStep";
import ProfileStep from "@/components/onboarding/steps/ProfileStep";
import TrainingStep from "@/components/onboarding/steps/TrainingStep";
import PersonalizationStep from "@/components/onboarding/steps/PersonalizationStep";
import RecoveryStep from "@/components/onboarding/steps/RecoveryStep";
import FinalStep from "@/components/onboarding/steps/FinalStep";

const goals = [
  {
    title: "Ganhar Massa Muscular",
    description: "Aumente massa, força e volume muscular.",
    icon: Dumbbell,
  },
  {
    title: "Perder Gordura",
    description: "Reduza gordura mantendo o máximo de massa magra.",
    icon: Flame,
  },
  {
    title: "Ganhar Músculo e Perder Gordura",
    description: "Recomposição corporal com treino e dieta ajustados.",
    icon: Zap,
  },
  {
    title: "Ganhar Força",
    description: "Evolua cargas, performance e potência nos treinos.",
    icon: Trophy,
  },
  {
    title: "Saúde e Qualidade de Vida",
    description:
      "Melhore rotina, energia, condicionamento e bem-estar.",
    icon: HeartPulse,
  },
];

const experienceCards = [
  {
    title: "Iniciante",
    description:
      "Está começando agora ou voltou recentemente aos treinos.",
    icon: Sprout,
  },
  {
    title: "Intermediário",
    description:
      "Já treina com consistência e domina os exercícios básicos.",
    icon: Flame,
  },
  {
    title: "Avançado",
    description:
      "Busca performance, progressão e treinos mais intensos.",
    icon: Trophy,
  },
];

const locationCards = [
  {
    title: "Academia",
    description:
      "Maior variedade de máquinas, cargas e equipamentos.",
    icon: Dumbbell,
  },
  {
    title: "Casa",
    description:
      "Treinos adaptados ao ambiente e equipamentos disponíveis.",
    icon: Home,
  },
  {
    title: "Ambos",
    description:
      "Flexibilidade para treinar em casa ou na academia.",
    icon: Shuffle,
  },
];

const focusCards = [
  {
    title: "Superiores",
    description:
      "Maior atenção para peito, costas, ombros e braços.",
    icon: Dumbbell,
  },
  {
    title: "Inferiores",
    description:
      "Maior atenção para quadríceps, posteriores e glúteos.",
    icon: Footprints,
  },
  {
    title: "Equilibrado",
    description:
      "Distribuição equilibrada entre todos os grupos musculares.",
    icon: Scale,
  },
];

const restrictionCards = [
  {
    title: "Nenhuma",
    description: "Sem restrições alimentares relevantes.",
    icon: ShieldCheck,
  },
  {
    title: "Vegetariano",
    description: "Não consome carnes na rotina alimentar.",
    icon: Leaf,
  },
  {
    title: "Vegano",
    description: "Sem alimentos de origem animal.",
    icon: Leaf,
  },
  {
    title: "Intolerância à lactose",
    description: "Evita leite e derivados com lactose.",
    icon: MilkOff,
  },
  {
    title: "Outra",
    description: "Informe uma restrição específica.",
    icon: Settings2,
  },
];

const trainingPeriodCards = [
  {
    title: "Manhã",
    description: "Treinos realizados no início do dia.",
    icon: Sunrise,
  },
  {
    title: "Tarde",
    description: "Treinos durante o período da tarde.",
    icon: Sun,
  },
  {
    title: "Noite",
    description:
      "Treinos após trabalho, escola ou faculdade.",
    icon: Moon,
  },
  {
    title: "Disponibilidade Variável",
    description:
      "Horários mudam ao longo da semana.",
    icon: CalendarClock,
  },
];

const sleepCards = [
  {
    title: "Menos de 6h",
    description: "Recuperação limitada.",
    icon: BatteryLow,
  },
  {
    title: "6–7h",
    description: "Recuperação moderada.",
    icon: BatteryMedium,
  },
  {
    title: "7–8h",
    description: "Boa faixa de recuperação.",
    icon: BedDouble,
  },
  {
    title: "8h+",
    description: "Recuperação otimizada.",
    icon: BatteryFull,
  },
];

const weekDays = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
  "Disponibilidade Variável",
];

const workoutTimes = [
  "30 min",
  "45 min",
  "1h",
  "1h30",
  "2h+",
];

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [touched, setTouched] = useState({
    age: false,
    height: false,
    weight: false,
  });

  const [goal, setGoal] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  const [experience, setExperience] = useState("");

  const [days, setDays] = useState<string[]>([]);

  const [workoutTime, setWorkoutTime] = useState("");

  const [location, setLocation] = useState("");

  const [focus, setFocus] = useState("");

  const [injuries, setInjuries] = useState("");

  const [restriction, setRestriction] = useState("");

  const [otherRestriction, setOtherRestriction] =
    useState("");

  const [trainingPeriod, setTrainingPeriod] =
    useState("");

  const [sleep, setSleep] = useState("");

  const totalSteps = 5;

  const progress =
    step === 6
      ? 100
      : ((step - 1) / totalSteps) * 100;

  const ageValue = Number(profile.age);
  const heightValue = Number(profile.height);
  const weightValue = Number(profile.weight);

  const ageWarning =
    touched.age &&
    profile.age &&
    (ageValue < 6 || ageValue > 85)
      ? "Valor incomum. Confira se a idade está correta."
      : "";

  const heightWarning =
    touched.height &&
    profile.height &&
    (heightValue < 100 || heightValue > 230)
      ? "Valor incomum. Use altura em centímetros. Ex: 173."
      : "";

  const weightWarning =
    touched.weight &&
    profile.weight &&
    (weightValue < 30 || weightValue > 350)
      ? "Valor incomum. Confira se o peso está correto."
      : "";

  const nameWarning =
    profile.name.length >= 50
      ? "Número máximo de 50 caracteres atingido."
      : "";

  function toggleDay(day: string) {
    if (day === "Disponibilidade Variável") {
      setDays(["Disponibilidade Variável"]);
      return;
    }

    setDays((current) => {
      const withoutVariable = current.filter(
        (item) =>
          item !== "Disponibilidade Variável"
      );

      return withoutVariable.includes(day)
        ? withoutVariable.filter(
            (item) => item !== day
          )
        : [...withoutVariable, day];
    });
  }

  function nextStep() {
    setError("");

    if (step === 1 && !goal) {
      setError(
        "Escolha seu objetivo principal para continuar."
      );
      return;
    }

    if (step === 2) {
      const age = Number(profile.age);
      const height = Number(profile.height);
      const weight = Number(profile.weight);

      if (
        !profile.name ||
        !profile.age ||
        !profile.gender ||
        !profile.height ||
        !profile.weight
      ) {
        setError(
          "Preencha todos os campos para continuar."
        );
        return;
      }

      if (profile.name.trim().length < 2) {
        setError("Informe um nome válido.");
        return;
      }

      if (age < 5 || age > 100) {
        setError(
          "Confira sua idade. O valor parece incorreto."
        );
        return;
      }

      if (height < 80 || height > 250) {
        setError(
          "Confira sua altura em centímetros."
        );
        return;
      }

      if (weight < 20 || weight > 350) {
        setError(
          "Confira seu peso em kg."
        );
        return;
      }
    }

    if (
      step === 3 &&
      (!experience ||
        days.length === 0 ||
        !workoutTime ||
        !location)
    ) {
      setError(
        "Complete sua rotina de treino para continuar."
      );
      return;
    }

    if (step === 4 && !focus) {
      setError(
        "Escolha o foco principal para continuar."
      );
      return;
    }

    if (step === 5) {
      if (
        !restriction ||
        !trainingPeriod ||
        !sleep
      ) {
        setError(
          "Complete as informações de nutrição e recuperação."
        );
        return;
      }

      if (
        restriction === "Outra" &&
        !otherRestriction
      ) {
        setError(
          "Informe qual é sua restrição alimentar."
        );
        return;
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    setStep(6);
  }

  function previousStep() {
    setError("");

    if (step > 1) {
      setStep(step - 1);
    }
  }

  async function saveProfile() {
    setSaving(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError(
        "Você precisa estar logado para continuar."
      );
      setSaving(false);
      return;
    }

    /*
     * IMPORTANTE:
     * experience está sendo salvo aqui.
     * Antes esse campo não estava no INSERT,
     * por isso chegava como NULL no Supabase.
     */

    const { error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,

        name: profile.name,

        age: Number(profile.age),

        gender: profile.gender,

        height: Number(profile.height),

        weight: Number(profile.weight),

        goal,

        experience,

        training_days: JSON.stringify(days),

        training_duration: workoutTime,

        training_location: location,

        focus,

        injuries,

        restriction:
          restriction === "Outra"
            ? otherRestriction
            : restriction,

        training_period: trainingPeriod,

        sleep,
      });

    if (error) {
      console.error(
        "SUPABASE ERROR:",
        error
      );

      setError(
        `${error.message} | ${
          error.code ?? "sem código"
        }`
      );

      setSaving(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-6 text-white">
      <div className="absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[200px]" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
            <span>
              {step === 6
                ? "Configuração concluída"
                : `Etapa ${step} de 5`}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_0_120px_rgba(37,99,235,0.16)] backdrop-blur-xl md:p-8">
          {step === 1 && (
            <GoalStep
              goal={goal}
              setGoal={setGoal}
              goals={goals}
            />
          )}

          {step === 2 && (
            <ProfileStep
              profile={profile}
              setProfile={setProfile}
              touched={touched}
              setTouched={setTouched}
              nameWarning={nameWarning}
              ageWarning={ageWarning}
              heightWarning={heightWarning}
              weightWarning={weightWarning}
            />
          )}

          {step === 3 && (
            <TrainingStep
              experience={experience}
              setExperience={setExperience}
              days={days}
              toggleDay={toggleDay}
              workoutTime={workoutTime}
              setWorkoutTime={setWorkoutTime}
              location={location}
              setLocation={setLocation}
              experienceCards={
                experienceCards
              }
              weekDays={weekDays}
              workoutTimes={workoutTimes}
              locationCards={locationCards}
            />
          )}

          {step === 4 && (
            <PersonalizationStep
              focus={focus}
              setFocus={setFocus}
              injuries={injuries}
              setInjuries={setInjuries}
              focusCards={focusCards}
            />
          )}

          {step === 5 && (
            <RecoveryStep
              goal={goal}
              days={days}
              restriction={restriction}
              setRestriction={
                setRestriction
              }
              otherRestriction={
                otherRestriction
              }
              setOtherRestriction={
                setOtherRestriction
              }
              trainingPeriod={
                trainingPeriod
              }
              setTrainingPeriod={
                setTrainingPeriod
              }
              sleep={sleep}
              setSleep={setSleep}
              restrictionCards={
                restrictionCards
              }
              trainingPeriodCards={
                trainingPeriodCards
              }
              sleepCards={sleepCards}
            />
          )}

          {step === 6 && (
            <FinalStep
              goal={goal}
              days={days}
              sleep={sleep}
              saving={saving}
              onFinish={saveProfile}
            />
          )}

          {error && (
            <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-300">
              {error}
            </p>
          )}

          {step <= 5 && (
            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={previousStep}
                disabled={step === 1}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
              >
                {step === 5
                  ? "Finalizar"
                  : "Continuar"}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}