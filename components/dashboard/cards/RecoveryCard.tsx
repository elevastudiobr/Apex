"use client";

import {
  BedDouble,
  Brain,
  HeartPulse,
  Moon,
} from "lucide-react";

interface RecoveryCardProps {
  score?: number;
  sleepHours?: number;
  sleepGoal?: number;
  recoveryStatus?: "excellent" | "good" | "attention";
}

export default function RecoveryCard({
  score = 86,
  sleepHours = 7.8,
  sleepGoal = 8,
  recoveryStatus = "excellent",
}: RecoveryCardProps) {
  const statusConfig = {
    excellent: {
      label: "Excelente",
      color: "text-green-400",
      bg: "bg-green-500/[0.07]",
      border: "border-green-500/15",
    },
    good: {
      label: "Bom",
      color: "text-blue-400",
      bg: "bg-blue-500/[0.07]",
      border: "border-blue-500/15",
    },
    attention: {
      label: "Atenção",
      color: "text-orange-400",
      bg: "bg-orange-500/[0.07]",
      border: "border-orange-500/15",
    },
  };

  const status = statusConfig[recoveryStatus];

  const sleepPercentage = Math.min(
    100,
    (sleepHours / sleepGoal) * 100
  );

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.045]">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-600">
            Recovery
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-white">
            Recuperação
          </h2>
        </div>

        <span
          className={`rounded-full border px-2 py-1 text-[7px] font-medium ${status.bg} ${status.border} ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      {/* Score */}
      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(rgb(59 130 246) ${score}%, rgba(255,255,255,0.05) ${score}%)`,
              mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
            }}
          />

          <div className="text-center">
            <p className="text-lg font-bold text-white">
              {score}
            </p>

            <p className="text-[6px] uppercase tracking-wider text-zinc-600">
              score
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Moon size={11} className="text-blue-400" />

            <span className="text-[8px] text-zinc-600">
              Sono
            </span>

            <span className="ml-auto text-[8px] text-zinc-300">
              {sleepHours}h
            </span>
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${sleepPercentage}%` }}
            />
          </div>

          <p className="mt-1 text-[7px] text-zinc-700">
            meta {sleepGoal}h
          </p>
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
          <HeartPulse size={12} className="text-green-400" />

          <div>
            <p className="text-[7px] text-zinc-600">
              Prontidão
            </p>

            <p className="text-[9px] font-semibold text-white">
              Alta
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
          <BedDouble size={12} className="text-cyan-300" />

          <div>
            <p className="text-[7px] text-zinc-600">
              Descanso
            </p>

            <p className="text-[9px] font-semibold text-white">
              Adequado
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[8px] text-zinc-600">
        <Brain size={10} className="text-blue-400" />
        Corpo preparado para treinar.
      </div>
    </article>
  );
}