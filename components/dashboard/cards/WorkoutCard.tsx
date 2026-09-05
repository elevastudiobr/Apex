"use client";

import {
  ArrowRight,
  Dumbbell,
  Flame,
  Layers3,
} from "lucide-react";

interface WorkoutCardProps {
  workoutName?: string;
  muscleGroups?: string;
  exercises?: number;
  sets?: string;
  calories?: number;
  progress?: number;
  status?: "Ativo" | "Descanso";
}

export default function WorkoutCard({
  workoutName = "Push A",
  muscleGroups = "Peito • Ombros • Tríceps",
  exercises = 7,
  sets = "4 × 12",
  calories = 420,
  progress = 0,
  status = "Ativo",
}: WorkoutCardProps) {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035] hover:shadow-[0_20px_70px_rgba(0,0,0,0.20)] sm:p-[18px]">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/[0.07] blur-[85px] transition-all duration-500 group-hover:bg-blue-500/[0.10]" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/[0.10] bg-blue-500/[0.06] transition-all duration-300 group-hover:border-blue-500/[0.14] group-hover:bg-blue-500/[0.08]">
              <Dumbbell
                size={15}
                strokeWidth={1.8}
                className="text-blue-400"
              />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
              Treino de hoje
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 rounded-full border border-blue-500/[0.10] bg-blue-500/[0.05] transition-all duration-300 group-hover:border-blue-500/[0.14] group-hover:bg-blue-500/[0.08] px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.55)]" />

            <span className="text-[9px] font-medium text-blue-300/90">
              {status}
            </span>
          </div>
        </div>

        {/* Workout */}
        <div className="mt-3">
          <h2 className="text-[25px] font-bold leading-none tracking-[-0.045em] text-white">
            {workoutName}
          </h2>

          <p className="mt-1 text-[11px] font-medium text-white/40">
            {muscleGroups}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {/* Sets */}
          <div className="rounded-xl border border-white/[0.05] bg-black/20 px-2.5 py-2 transition-all duration-300 group-hover:border-white/[0.07] group-hover:bg-black/25">
            <div className="flex items-center gap-1.5">
              <Layers3
                size={13}
                strokeWidth={1.8}
                className="text-white/30"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-white/35">
                Séries
              </span>
            </div>

            <p className="mt-0.5 text-[17px] font-bold leading-tight tracking-[-0.03em] text-white">
              {sets}
            </p>
          </div>

          {/* Exercises */}
          <div className="rounded-xl border border-white/[0.05] bg-black/20 px-2.5 py-2 transition-all duration-300 group-hover:border-white/[0.07] group-hover:bg-black/25">
            <div className="flex items-center gap-1.5">
              <Dumbbell
                size={13}
                strokeWidth={1.8}
                className="text-white/30"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-white/35">
                Exercícios
              </span>
            </div>

            <p className="mt-0.5 text-[17px] font-bold leading-tight tracking-[-0.03em] text-white">
              {exercises}
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-xl border border-white/[0.05] bg-black/20 px-2.5 py-2 transition-all duration-300 group-hover:border-white/[0.07] group-hover:bg-black/25">
            <div className="flex items-center gap-1.5">
              <Flame
                size={13}
                strokeWidth={1.8}
                className="text-white/30"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-white/35">
                kcal
              </span>
            </div>

            <p className="mt-0.5 text-[17px] font-bold leading-tight tracking-[-0.03em] text-white">
              {calories}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-white/35">
              Progresso
            </span>

            <span className="text-[10px] font-bold text-white/55">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.45)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          className="group/button mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/[0.14] bg-blue-500/[0.07] py-2.5 text-[10px] font-semibold text-blue-300 transition-all duration-300 hover:border-blue-400/[0.25] hover:bg-blue-500/[0.11] hover:text-blue-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.10)]"
        >
          <span>Ver treino completo</span>

          <ArrowRight
            size={14}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover/button:translate-x-0.5"
          />
        </button>
      </div>
    </section>
  );
}