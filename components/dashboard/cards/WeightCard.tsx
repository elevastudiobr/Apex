"use client";

import {
  ArrowUpRight,
  Scale,
  Target,
} from "lucide-react";

interface WeightCardProps {
  currentWeight?: number;
  previousWeight?: number;
  targetWeight?: number;
  unit?: string;
}

export default function WeightCard({
  currentWeight = 68.4,
  previousWeight = 67.6,
  targetWeight = 72,
  unit = "kg",
}: WeightCardProps) {
  const difference = Number(
    (currentWeight - previousWeight).toFixed(1)
  );

  const remaining = Number(
    Math.max(targetWeight - currentWeight, 0).toFixed(1)
  );

  const progress = Math.min(
    100,
    Math.max(
      0,
      ((currentWeight - previousWeight) /
        Math.max(targetWeight - previousWeight, 0.1)) *
        100
    )
  );

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.045]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-600">
            Peso
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-white">
            Acompanhamento
          </h2>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/15 bg-blue-500/[0.06]">
          <Scale size={14} className="text-blue-400" />
        </div>
      </div>

      {/* Main value */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold tracking-tight text-white">
            {currentWeight}
            <span className="ml-1 text-xs font-normal text-zinc-600">
              {unit}
            </span>
          </p>

          <div className="mt-0.5 flex items-center gap-1 text-[8px] text-green-400">
            <ArrowUpRight size={10} />

            +{Math.abs(difference).toFixed(1)} {unit}
          </div>
        </div>

        <div className="text-right">
          <p className="text-[7px] text-zinc-700">
            objetivo
          </p>

          <p className="mt-0.5 text-xs font-semibold text-white">
            {targetWeight}
            <span className="ml-0.5 text-[8px] text-zinc-600">
              {unit}
            </span>
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="relative h-1.5 rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
            style={{ width: `${progress}%` }}
          />

          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-black bg-white"
            style={{
              left: `calc(${progress}% - 5px)`,
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[7px] text-zinc-700">
          <span>{previousWeight} {unit}</span>

          <span>
            {remaining > 0
              ? `${remaining} ${unit} restantes`
              : "Objetivo alcançado"}
          </span>

          <span>{targetWeight} {unit}</span>
        </div>
      </div>

      {/* Target */}
      <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.035]">
          <Target size={12} className="text-cyan-300" />
        </div>

        <div>
          <p className="text-[7px] text-zinc-600">
            Próximo objetivo
          </p>

          <p className="mt-0.5 text-[9px] font-medium text-white">
            {remaining > 0
              ? `Chegar aos ${targetWeight} ${unit}`
              : "Manter o peso atual"}
          </p>
        </div>
      </div>
    </article>
  );
}