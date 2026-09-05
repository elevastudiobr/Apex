"use client";

import {
  Check,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";

interface ConsistencyCardProps {
  currentStreak?: number;
  bestStreak?: number;
  completedWorkouts?: number;
  weeklyGoal?: number;
}

export default function ConsistencyCard({
  currentStreak = 7,
  bestStreak = 14,
  completedWorkouts = 4,
  weeklyGoal = 5,
}: ConsistencyCardProps) {
  const percentage = Math.min(
    100,
    Math.round((completedWorkouts / weeklyGoal) * 100)
  );

  const remaining = Math.max(
    0,
    weeklyGoal - completedWorkouts
  );

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035]">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-500/[0.045] blur-[75px]" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/30">
              Consistência
            </p>

            <h2 className="mt-1 text-[15px] font-semibold leading-none tracking-[-0.02em] text-white">
              Seu ritmo
            </h2>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/[0.10] bg-blue-500/[0.06]">
            <Flame
              size={14}
              strokeWidth={1.8}
              className="text-blue-400"
            />
          </div>
        </div>

        {/* Main */}
        <div className="mt-4 flex items-center gap-4">
          {/* Progress */}
          <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  rgb(59 130 246) ${percentage}%,
                  rgba(255,255,255,0.06) ${percentage}%
                )`,
                mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
              }}
            />

            <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-zinc-950/90">
              <div className="text-center">
                <p className="text-[19px] font-bold leading-none tracking-[-0.04em] text-white">
                  {percentage}%
                </p>

                <p className="mt-1 text-[6px] font-medium uppercase tracking-[0.12em] text-white/25">
                  concluído
                </p>
              </div>
            </div>
          </div>

          {/* Workout progress */}
          <div className="min-w-0">
            <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-white/30">
              Treinos concluídos
            </p>

            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[22px] font-bold leading-none tracking-[-0.04em] text-white">
                {completedWorkouts}
              </span>

              <span className="text-[12px] font-medium text-white/25">
                / {weeklyGoal}
              </span>
            </div>

            <p
              className={`mt-1 text-[8px] font-medium ${
                remaining > 0
                  ? "text-blue-400/80"
                  : "text-green-400"
              }`}
            >
              {remaining > 0
                ? `${remaining} ${
                    remaining === 1 ? "restante" : "restantes"
                  }`
                : "Meta concluída"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {/* Streak */}
          <div className="rounded-xl border border-white/[0.05] bg-black/20 px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <Target
                size={11}
                strokeWidth={1.8}
                className="text-blue-400/80"
              />

              <span className="text-[7px] font-medium uppercase tracking-[0.08em] text-white/25">
                Sequência
              </span>
            </div>

            <p className="mt-1 text-[14px] font-bold leading-none tracking-[-0.03em] text-white">
              {currentStreak}
              <span className="ml-1 text-[8px] font-medium text-white/30">
                dias
              </span>
            </p>
          </div>

          {/* Record */}
          <div className="rounded-xl border border-white/[0.05] bg-black/20 px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp
                size={11}
                strokeWidth={1.8}
                className="text-cyan-300/80"
              />

              <span className="text-[7px] font-medium uppercase tracking-[0.08em] text-white/25">
                Recorde
              </span>
            </div>

            <p className="mt-1 text-[14px] font-bold leading-none tracking-[-0.03em] text-white">
              {bestStreak}
              <span className="ml-1 text-[8px] font-medium text-white/30">
                dias
              </span>
            </p>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/[0.08]">
            <Check
              size={9}
              strokeWidth={2}
              className="text-green-400"
            />
          </div>

          <p className="text-[8px] font-medium text-white/30">
            Ótimo ritmo esta semana.
          </p>
        </div>
      </div>
    </article>
  );
}