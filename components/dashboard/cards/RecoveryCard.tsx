"use client";

import {
  Activity,
  BedDouble,
  Check,
  Moon,
  ShieldCheck,
} from "lucide-react";

interface RecoveryCardProps {
  score?: number;
  sleepHours?: number;
  sleepGoal?: number;
  readiness?: "Alta" | "Média" | "Baixa";
  restStatus?: "Adequado" | "Insuficiente" | "Excessivo";
}

export default function RecoveryCard({
  score = 86,
  sleepHours = 7.8,
  sleepGoal = 8,
  readiness = "Alta",
  restStatus = "Adequado",
}: RecoveryCardProps) {
  const sleepPercentage = Math.min(
    100,
    Math.round((sleepHours / sleepGoal) * 100)
  );

  const recoveryLabel =
    score >= 85
      ? "Excelente"
      : score >= 70
      ? "Boa"
      : score >= 50
      ? "Regular"
      : "Baixa";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035] hover:shadow-[0_20px_70px_rgba(0,0,0,0.20)]">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-44 w-44 rounded-full bg-blue-500/[0.055] blur-[75px] transition-all duration-500 group-hover:bg-blue-500/[0.085]" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/30">
              Recovery
            </p>

            <h2 className="mt-0.5 text-[15px] font-semibold leading-none tracking-[-0.02em] text-white">
              Recuperação
            </h2>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/[0.10] bg-blue-500/[0.06]">
            <Activity
              size={14}
              strokeWidth={1.8}
              className="text-blue-400"
            />
          </div>
        </div>

        {/* Score */}
        <div className="mt-2.5 flex items-center gap-3">
          <div className="relative flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  rgb(59 130 246) ${score}%,
                  rgba(255,255,255,0.06) ${score}%
                )`,
                mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
              }}
            />

            <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-zinc-950/90">
              <div className="text-center">
                <p className="text-[18px] font-bold leading-none tracking-[-0.04em] text-white">
                  {score}
                </p>

                <p className="mt-0.5 text-[6px] font-semibold uppercase tracking-[0.12em] text-white/25">
                  score
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[8px] font-medium uppercase tracking-[0.1em] text-white/30">
              Estado atual
            </p>

            <p className="mt-0.5 text-[18px] font-bold leading-none tracking-[-0.035em] text-white">
              {recoveryLabel}
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.55)]" />

              <span className="text-[8px] font-medium text-blue-400/80">
                Corpo pronto
              </span>
            </div>
          </div>
        </div>

        {/* Sleep */}
        <div className="mt-2.5 rounded-xl border border-white/[0.05] bg-black/20 px-3 py-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500/[0.06]">
                <Moon
                  size={11}
                  strokeWidth={1.8}
                  className="text-blue-400/80"
                />
              </div>

              <div className="flex items-baseline gap-1.5">
                <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-white/25">
                  Sono
                </p>

                <p className="text-[11px] font-bold leading-none text-white">
                  {sleepHours}
                  <span className="ml-0.5 text-[7px] font-medium text-white/30">
                    h
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[7px] font-medium text-white/20">
                meta
              </span>

              <span className="text-[8px] font-semibold text-white/45">
                {sleepGoal}h
              </span>
            </div>
          </div>

          <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.35)] transition-all duration-500"
              style={{ width: `${sleepPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/[0.05] bg-black/20 px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck
                size={10}
                strokeWidth={1.8}
                className="text-blue-400/80"
              />

              <span className="text-[7px] font-medium uppercase tracking-[0.08em] text-white/25">
                Prontidão
              </span>
            </div>

            <p className="mt-0.5 text-[12px] font-bold leading-none tracking-[-0.02em] text-white">
              {readiness}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.05] bg-black/20 px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <BedDouble
                size={10}
                strokeWidth={1.8}
                className="text-cyan-300/80"
              />

              <span className="text-[7px] font-medium uppercase tracking-[0.08em] text-white/25">
                Descanso
              </span>
            </div>

            <p className="mt-0.5 text-[12px] font-bold leading-none tracking-[-0.02em] text-white">
              {restStatus}
            </p>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/[0.08]">
            <Check
              size={9}
              strokeWidth={2}
              className="text-green-400"
            />
          </div>

          <p className="text-[8px] font-medium text-white/30">
            Corpo preparado para treinar.
          </p>
        </div>
      </div>
    </article>
  );
}