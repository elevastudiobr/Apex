"use client";

import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const chart = [38, 45, 41, 50, 54, 59, 57, 68, 64, 76, 82];

  function handleOpenEvolution() {
    router.push("/evolution");
  }

  return (
    <article
      onClick={handleOpenEvolution}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenEvolution();
        }
      }}
      className="group relative flex h-full min-h-[275px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-blue-500/[0.14] hover:bg-white/[0.035] hover:shadow-[0_20px_80px_rgba(0,0,0,0.24)] focus:outline-none focus:ring-1 focus:ring-blue-500/30"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/[0.07] blur-[85px] transition-all duration-500 group-hover:bg-blue-500/[0.10]" />

      <div className="relative flex flex-1 flex-col">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/[0.10] bg-blue-500/[0.06]">
              <TrendingUp
                size={15}
                strokeWidth={1.8}
                className="text-blue-400"
              />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50">
                Evolução
              </p>

              <h2 className="mt-0.5 text-[13px] font-semibold leading-none text-white">
                Seu progresso
              </h2>
            </div>
          </div>

          {/* Variação */}
          <div className="flex items-center gap-1 rounded-full border border-green-500/[0.10] bg-green-500/[0.06] px-2.5 py-1">
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
              className="text-green-400"
            />

            <span className="text-[9px] font-semibold text-green-400">
              +{variation}%
            </span>
          </div>
        </div>

        {/* Progresso */}
        <div className="mt-2">
          <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/30">
            Progresso
          </p>

          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-[27px] font-bold leading-none tracking-[-0.05em] text-white">
              +{variation}%
            </span>

            <span className="text-[9px] font-medium text-green-400/70">
              evolução
            </span>
          </div>
        </div>

        {/* Peso */}
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 rounded-xl border border-white/[0.05] bg-black/20 px-3 py-1.5">
            <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-white/25">
              Peso atual
            </p>

            <p className="mt-0.5 text-[13px] font-bold leading-none tracking-[-0.03em] text-white">
              {current}
              <span className="ml-1 text-[8px] font-medium text-white/30">
                {unit}
              </span>
            </p>
          </div>

          <div className="flex-1 rounded-xl border border-white/[0.05] bg-black/20 px-3 py-1.5">
            <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-white/25">
              Anterior
            </p>

            <p className="mt-0.5 text-[13px] font-bold leading-none tracking-[-0.03em] text-white/70">
              {previous}
              <span className="ml-1 text-[8px] font-medium text-white/25">
                {unit}
              </span>
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="mt-2 rounded-2xl border border-white/[0.04] bg-black/15 px-3 pt-2 pb-1.5">
          <div className="flex h-[40px] items-end gap-1">
            {chart.map((value, index) => (
              <div
                key={index}
                className="flex h-full flex-1 items-end"
              >
                <div
                  className={`
                    w-full rounded-t-[3px] transition-all duration-300
                    ${
                      index === chart.length - 1
                        ? "bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.18)]"
                        : "bg-blue-500/[0.20] group-hover:bg-blue-500/[0.25]"
                    }
                  `}
                  style={{ height: `${value}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-between text-[7px] font-medium text-white/20">
            <span>12 semanas</span>
            <span>Hoje</span>
          </div>
        </div>

        {/* Botão */}
        <div className="mt-auto pt-1.5">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleOpenEvolution();
            }}
            className="flex h-[38px] w-full items-center justify-center gap-2 rounded-xl border border-blue-500/[0.14] bg-blue-500/[0.07] text-[10px] font-semibold text-blue-300 transition-all duration-300 hover:border-blue-400/[0.25] hover:bg-blue-500/[0.11] hover:text-blue-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.10)]"
          >
            <span>Ver evolução</span>

            <ArrowRight
              size={13}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </article>
  );
}