"use client";

import {
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface EvolutionCardProps {
  current?: number;
  previous?: number;
  unit?: string;
  variation?: number;
}

export default function EvolutionCard({
  current = 68.4,
  previous = 67.6,
  unit = "kg",
  variation = 1.2,
}: EvolutionCardProps) {
  const chart = [38, 45, 41, 50, 54, 59, 57, 68, 64, 76, 82];

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.045]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-600">
            Evolução
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-white">
            Progresso
          </h2>
        </div>

        <div className="flex items-center gap-0.5 rounded-full bg-green-500/[0.07] px-2 py-1">
          <ArrowUpRight size={10} className="text-green-400" />

          <span className="text-[8px] font-medium text-green-400">
            +{variation}%
          </span>
        </div>
      </div>

      {/* Value */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold tracking-tight text-white">
            {current}
            <span className="ml-1 text-xs font-normal text-zinc-600">
              {unit}
            </span>
          </p>

          <p className="mt-0.5 text-[8px] text-zinc-600">
            anterior {previous} {unit}
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/15 bg-blue-500/[0.06]">
          <TrendingUp size={14} className="text-blue-400" />
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 flex h-20 items-end gap-1">
        {chart.map((value, index) => (
          <div
            key={index}
            className="flex h-full flex-1 items-end"
          >
            <div
              className={`w-full rounded-t-[3px] transition-all ${
                index === chart.length - 1
                  ? "bg-gradient-to-t from-blue-600 to-cyan-400"
                  : "bg-blue-500/[0.2] hover:bg-blue-500/[0.35]"
              }`}
              style={{ height: `${value}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-[7px] text-zinc-700">
        <span>12 semanas</span>
        <span>Hoje</span>
      </div>
    </article>
  );
}