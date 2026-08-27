"use client";

import {
  ArrowRight,
  Clock3,
  Dumbbell,
  Flame,
  Play,
} from "lucide-react";

interface WorkoutCardProps {
  title?: string;
  subtitle?: string;
  duration?: number;
  exercises?: number;
  calories?: number;
  progress?: number;
}

export default function WorkoutCard({
  title = "Push A",
  subtitle = "Peito • Ombros • Tríceps",
  duration = 58,
  exercises = 7,
  calories = 420,
  progress = 0,
}: WorkoutCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.045]">
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/[0.07] blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/[0.07]">
              <Dumbbell size={16} className="text-blue-400" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                  Treino de hoje
                </span>

                <span className="rounded-full bg-green-500/[0.08] px-1.5 py-0.5 text-[7px] text-green-400">
                  Ativo
                </span>
              </div>

              <h2 className="truncate text-base font-semibold text-white">
                {title}
              </h2>

              <p className="truncate text-[9px] text-zinc-600">
                {subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-600 transition hover:border-white/15 hover:text-white"
          >
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          <div className="rounded-lg border border-white/[0.05] bg-black/20 px-2.5 py-2">
            <div className="flex items-center gap-1.5">
              <Clock3 size={11} className="text-zinc-600" />

              <span className="text-[8px] text-zinc-600">
                Tempo
              </span>
            </div>

            <p className="mt-1 text-xs font-semibold text-white">
              {duration}
              <span className="ml-0.5 text-[8px] font-normal text-zinc-600">
                min
              </span>
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.05] bg-black/20 px-2.5 py-2">
            <div className="flex items-center gap-1.5">
              <Dumbbell size={11} className="text-zinc-600" />

              <span className="text-[8px] text-zinc-600">
                Exercícios
              </span>
            </div>

            <p className="mt-1 text-xs font-semibold text-white">
              {exercises}
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.05] bg-black/20 px-2.5 py-2">
            <div className="flex items-center gap-1.5">
              <Flame size={11} className="text-zinc-600" />

              <span className="text-[8px] text-zinc-600">
                kcal
              </span>
            </div>

            <p className="mt-1 text-xs font-semibold text-white">
              {calories}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[8px] text-zinc-600">
              Progresso
            </span>

            <span className="text-[8px] font-medium text-blue-400">
              {progress}%
            </span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
              style={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
              }}
            />
          </div>
        </div>

        {/* Action */}
        <button
          type="button"
          className="mt-3 flex h-8 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-[9px] font-semibold text-white transition hover:bg-blue-500"
        >
          <Play size={11} fill="currentColor" />
          Iniciar treino
        </button>
      </div>
    </article>
  );
}