"use client";

import {
  Apple,
  Beef,
  Flame,
  Wheat,
} from "lucide-react";

interface NutritionCardProps {
  calories?: number;
  goal?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

export default function NutritionCard({
  calories = 2740,
  goal = 3200,
  protein = 142,
  carbs = 318,
  fats = 76,
}: NutritionCardProps) {
  const percentage = Math.min(
    100,
    Math.round((calories / goal) * 100)
  );

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.045]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-600">
            Nutrição
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-white">
            Hoje
          </h2>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/15 bg-cyan-500/[0.06]">
          <Apple size={14} className="text-cyan-300" />
        </div>
      </div>

      {/* Calories */}
      <div className="mt-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-white">
              {calories.toLocaleString("pt-BR")}
            </span>

            <span className="ml-1 text-[9px] text-zinc-600">
              kcal
            </span>
          </div>

          <span className="text-[8px] text-zinc-600">
            {percentage}%
          </span>
        </div>

        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-1.5 text-[8px] text-zinc-600">
          {Math.max(goal - calories, 0)} kcal restantes
        </p>
      </div>

      {/* Macros */}
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
          <Beef size={11} className="text-blue-400" />

          <p className="mt-1.5 text-xs font-semibold text-white">
            {protein}g
          </p>

          <p className="text-[7px] text-zinc-600">
            proteína
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
          <Wheat size={11} className="text-cyan-300" />

          <p className="mt-1.5 text-xs font-semibold text-white">
            {carbs}g
          </p>

          <p className="text-[7px] text-zinc-600">
            carboidratos
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5">
          <Flame size={11} className="text-orange-400" />

          <p className="mt-1.5 text-xs font-semibold text-white">
            {fats}g
          </p>

          <p className="text-[7px] text-zinc-600">
            gorduras
          </p>
        </div>
      </div>
    </article>
  );
}