"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Apple,
  BarChart3,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Dumbbell,
  Flame,
  LayoutDashboard,
  LogOut,
  Settings,
  Target,
  TrendingUp,
  Utensils,
  Weight,
  Droplets,
  ChevronRight,
  Bell,
  User,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  training_days: string;
  training_duration: string;
  training_location: string;
  focus: string;
  injuries: string;
  restriction: string;
  training_period: string;
  sleep: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        router.push("/onboarding");
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function getTrainingDaysCount() {
    if (!profile?.training_days) return 0;

    try {
      const parsedDays = JSON.parse(profile.training_days);

      if (parsedDays.includes("Disponibilidade Variável")) return 3;

      return parsedDays.length;
    } catch {
      return 0;
    }
  }

  function getWorkoutSplit() {
    const daysCount = getTrainingDaysCount();

    if (daysCount <= 2) return "Full Body";
    if (daysCount === 3) return "Full Body 3x";
    if (daysCount === 4) return "Upper / Lower";
    if (daysCount === 5) return "Push / Pull / Legs";
    return "Divisão avançada";
  }

  function getTodayWorkout() {
    const split = getWorkoutSplit();

    if (split === "Push / Pull / Legs") return "Push A";
    if (split === "Upper / Lower") return "Upper A";
    if (split === "Full Body 3x") return "Full Body A";
    if (split === "Full Body") return "Full Body";
    return "Treino A";
  }

  function getCaloriesTarget() {
    if (!profile) return 0;

    const baseCalories = profile.weight * 35;

    if (profile.goal === "Ganhar Massa Muscular") {
      return Math.round(baseCalories + 300);
    }

    if (profile.goal === "Perder Gordura") {
      return Math.round(baseCalories - 400);
    }

    return Math.round(baseCalories);
  }

  function getProteinTarget() {
    if (!profile) return 0;
    return Math.round(profile.weight * 2);
  }

  function getCarbTarget() {
    if (!profile) return 0;
    return Math.round(profile.weight * 5);
  }

  function getWaterTarget() {
    if (!profile) return "0";
    return (profile.weight * 0.04).toFixed(1);
  }

  function getRecoveryScore() {
    if (!profile) return 0;

    if (profile.sleep === "Menos de 6h") return 55;
    if (profile.sleep === "6–7h") return 72;
    if (profile.sleep === "7–8h") return 88;
    return 95;
  }

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Treinos", icon: Dumbbell },
    { label: "Dieta", icon: Utensils },
    { label: "Evolução", icon: TrendingUp },
    { label: "Metas", icon: Target },
    { label: "Registros", icon: ClipboardList },
    { label: "Configurações", icon: Settings },
  ];

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-zinc-400">Carregando dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[220px]" />

      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10">
              <Image src="/logo.png" alt="Apex" width={34} height={34} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">APEX</h1>
              <p className="text-xs text-zinc-500">Treino Inteligente</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-all duration-300 ${
                    item.active
                      ? "bg-blue-600 text-white shadow-[0_0_35px_rgba(37,99,235,0.38)]"
                      : "text-zinc-400 hover:translate-x-1 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto">
            <HoverCard className="p-5">
              <p className="text-sm text-zinc-500">Sequência atual</p>
              <h3 className="mt-2 text-3xl font-bold">12 dias</h3>
              <p className="mt-2 text-sm text-zinc-400">Continue assim.</p>

              <div className="mt-4 flex gap-2">
                {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => (
                  <span
                    key={index}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs ${
                      index < 6
                        ? "bg-blue-600/30 text-blue-300"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </HoverCard>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-400 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </aside>

        <section className="flex-1 px-6 py-8 lg:px-10">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-medium text-green-400">
                Sistema ativo
              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight">
                Olá, {profile?.name}
              </h2>

              <p className="mt-2 text-zinc-400">
                Foco, disciplina e consistência te levam ao topo.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-3 text-zinc-400 transition hover:border-blue-500/40 hover:text-blue-400 md:block">
                <Bell size={20} />
              </button>

              <HoverCard className="flex items-center gap-4 px-4 py-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                  <User size={20} />
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">{profile?.name}</p>
                  <p className="text-xs text-zinc-500">Ver perfil</p>
                </div>
              </HoverCard>
            </div>
          </header>


          <div className="mt-8 grid gap-6 xl:grid-cols-4">
            <HoverCard className="p-6 xl:col-span-1">
              <p className="text-sm text-zinc-500">Treino de hoje</p>
              <h3 className="mt-3 text-3xl font-bold">{getTodayWorkout()}</h3>
              <p className="mt-2 text-sm text-zinc-400">
                {profile?.focus} • {profile?.training_duration}
              </p>

              <div className="mt-6 space-y-3">
                <ExerciseLine name="Supino reto" sets="4x8" />
                <ExerciseLine name="Desenvolvimento" sets="3x10" />
                <ExerciseLine name="Tríceps corda" sets="3x12" />
              </div>

              <CardLink text="Ver treino completo" />
            </HoverCard>

            <HoverCard className="p-6 xl:col-span-1">
              <p className="text-sm text-zinc-500">Dieta do dia</p>

              <h3 className="mt-3 text-3xl font-bold text-orange-400">
                {getCaloriesTarget()} kcal
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Meta baseada no seu objetivo.
              </p>

              <div className="mt-6 space-y-5">
                <ProgressLine
                  label="Proteína"
                  value={`${getProteinTarget()}g`}
                  percent={85}
                  color="bg-blue-500"
                />

                <ProgressLine
                  label="Carboidrato"
                  value={`${getCarbTarget()}g`}
                  percent={72}
                  color="bg-orange-400"
                />

                <ProgressLine
                  label="Água"
                  value={`${getWaterTarget()}L`}
                  percent={70}
                  color="bg-cyan-400"
                />
              </div>

              <CardLink text="Ver plano alimentar" />
            </HoverCard>

            <HoverCard className="p-6 xl:col-span-1">
              <p className="text-sm text-zinc-500">Recuperação</p>

              <h3 className="mt-3 text-4xl font-bold text-blue-400">
                {getRecoveryScore()}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">Sleep score estimado</p>

              <div className="mt-6 rounded-2xl bg-white/[0.04] p-4 text-sm">
                <InfoMini label="Sono" value={profile?.sleep || ""} />
                <InfoMini label="Fadiga" value="Baixa" positive />
                <InfoMini label="Pronto para treino" value="Sim" positive />
              </div>

              <CardLink text="Ver detalhes" />
            </HoverCard>

            <HoverCard className="p-6 xl:col-span-1">
              <p className="text-sm text-zinc-500">Evolução</p>

              <h3 className="mt-3 text-3xl font-bold text-green-400">+14%</h3>

              <p className="mt-2 text-sm text-zinc-400">Últimos 30 dias</p>

              <div className="mt-8 flex h-28 items-end gap-3 rounded-2xl bg-white/[0.04] p-4">
                {[40, 52, 48, 65, 72, 85].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-blue-700 to-blue-400 transition-all duration-300 hover:scale-y-110"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <CardLink text="Ver evolução completa" />
            </HoverCard>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1fr_1fr]">
            <HoverCard className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">Peso atual</p>
                  <h3 className="mt-2 text-3xl font-bold">{profile?.weight}kg</h3>
                </div>

                <p className="text-sm text-green-400">+2.1kg este mês</p>
              </div>

              <p className="text-sm text-zinc-500">Meta: 75kg</p>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs text-zinc-500">
                  <span>{profile?.weight}kg</span>
                  <span>75kg</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[62%] rounded-full bg-blue-600" />
                </div>
              </div>
            </HoverCard>

            <HoverCard className="p-6">
              <p className="text-sm text-zinc-500">Consistência</p>
              <h3 className="mt-2 text-3xl font-bold">12 dias</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Sequência de hábitos ativos
              </p>

              <div className="mt-6 flex gap-3">
                {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => (
                  <span
                    key={index}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm ${
                      index < 6
                        ? "bg-blue-600/30 text-blue-300"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </HoverCard>

            <HoverCard className="p-6">
              <p className="text-sm text-zinc-500">Volume semanal</p>
              <div className="mt-2 flex items-end justify-between">
                <h3 className="text-3xl font-bold text-blue-400">18.4t</h3>
                <span className="text-sm text-green-400">+9%</span>
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                Carga total movimentada
              </p>

              <div className="mt-8 flex h-24 items-end gap-3">
                {[35, 45, 40, 58, 72, 86].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-blue-800 to-blue-500 transition hover:scale-y-110"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </HoverCard>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
            <HoverCard className="p-6">
              <h3 className="text-xl font-semibold">Resumo do perfil</h3>

              <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
                <ProfileLine label="Objetivo" value={profile?.goal} />
                <ProfileLine label="Gênero" value={profile?.gender} />
                <ProfileLine
                  label="Treinos"
                  value={`${getTrainingDaysCount()}x por semana`}
                />
                <ProfileLine label="Duração" value={profile?.training_duration} />
                <ProfileLine label="Local" value={profile?.training_location} />
                <ProfileLine label="Período" value={profile?.training_period} />
                <ProfileLine label="Sono" value={profile?.sleep} />
                <ProfileLine label="Restrição" value={profile?.restriction} />
              </div>
            </HoverCard>

            <HoverCard className="p-6">
              <h3 className="text-xl font-semibold">Insights para você</h3>

              <div className="mt-6 space-y-3">
                <Insight text="Você está no caminho certo para evoluir com consistência." />
                <Insight text="Seu plano inicial foi gerado com base no onboarding." />
                <Insight text="Acompanhe peso, treino e recuperação semanalmente." />
              </div>
            </HoverCard>
          </div>

          <div className="mt-6 rounded-[2rem] border border-blue-500/20 bg-gradient-to-r from-blue-600/25 to-blue-900/10 p-6 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(37,99,235,0.18)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-blue-600/30 p-4 text-blue-300">
                  <Flame size={30} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    Disciplina hoje, resultado amanhã.
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    O Apex organizou seus dados para iniciar sua evolução.
                  </p>
                </div>
              </div>

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500">
                Ver plano completo
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function HoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-zinc-950/75 shadow-[0_0_40px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-zinc-950 hover:shadow-[0_0_45px_rgba(37,99,235,0.14)] ${className}`}
    >
      {children}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle?: string;
  accent: string;
}) {
  return (
    <HoverCard className="p-5">
      <Icon className={accent} size={24} />
      <p className="mt-4 text-sm text-zinc-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold">{value}</h3>
      {subtitle && <p className="mt-2 line-clamp-1 text-sm text-zinc-500">{subtitle}</p>}
    </HoverCard>
  );
}

function ExerciseLine({ name, sets }: { name: string; sets: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3 text-sm transition hover:bg-white/[0.08]">
      <span>{name}</span>
      <span className="text-blue-400">{sets}</span>
    </div>
  );
}

function ProgressLine({
  label,
  value,
  percent,
  color,
}: {
  label: string;
  value: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-zinc-400">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function InfoMini({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="mt-3 flex justify-between first:mt-0">
      <span className="text-zinc-400">{label}</span>
      <span className={positive ? "text-green-400" : "text-blue-400"}>
        {value}
      </span>
    </div>
  );
}

function CardLink({ text }: { text: string }) {
  return (
    <button className="mt-5 flex w-full items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/[0.08] hover:text-white">
      {text}
      <ChevronRight size={17} />
    </button>
  );
}

function ProfileLine({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right text-blue-400">{value || "Não informado"}</span>
    </div>
  );
}

function Insight({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white/[0.04] p-4 text-sm text-zinc-300 transition hover:bg-white/[0.07]">
      <CheckCircle2 className="mt-0.5 shrink-0 text-green-400" size={18} />
      <p>{text}</p>
    </div>
  );
}