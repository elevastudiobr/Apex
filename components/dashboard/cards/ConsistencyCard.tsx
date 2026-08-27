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

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.045]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-600">
            Consistência
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-white">
            Seu ritmo
          </h2>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-orange-500/15 bg-orange-500/[0.06]">
          <Flame size={14} className="text-orange-400" />
        </div>
      </div>

      {/* Main */}
      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(rgb(59 130 246) ${percentage}%, rgba(255,255,255,0.06) ${percentage}%)`,
              mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
            }}
          />

          <div className="text-center">
            <p className="text-base font-bold text-white">
              {percentage}%
            </p>
          </div>
        </div>

        <div>
          <p className="text-[8px] text-zinc-600">
            Treinos concluídos
          </p>

          <p className="mt-0.5 text-xl font-bold text-white">
            {completedWorkouts}
            <span className="ml-1 text-[10px] font-normal text-zinc-600">
              / {weeklyGoal}
            </span>
          </p>

          <p className="mt-0.5 text-[8px] text-green-400">
            {weeklyGoal - completedWorkouts > 0
              ? `${weeklyGoal - completedWorkouts} restantes`
              : "Meta concluída"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
          <div className="flex items-center gap-1.5">
            <Target size={10} className="text-blue-400" />

            <span className="text-[7px] text-zinc-600">
              Sequência
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-white">
            {currentStreak} dias
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={10} className="text-cyan-300" />

            <span className="text-[7px] text-zinc-600">
              Recorde
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-white">
            {bestStreak} dias
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[8px] text-zinc-600">
        <Check size={10} className="text-green-400" />
        Ótimo ritmo esta semana.
      </div>
    </article>
  );
}