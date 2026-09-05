"use client";

import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

interface Insight {
  title: string;
  description: string;
}

interface InsightsCardProps {
  insights?: Insight[];
}

export default function InsightsCard({
  insights = [
    {
      title: "Consistência aumentou",
      description:
        "Você treinou 4 vezes nesta semana, acima da sua média.",
    },
    {
      title: "Recuperação alta",
      description:
        "Seu sono indica que você está preparado para manter a intensidade.",
    },
    {
      title: "Proteína próxima",
      description:
        "Você já atingiu boa parte da sua meta proteica.",
    },
  ],
}: InsightsCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035] hover:shadow-[0_20px_70px_rgba(0,0,0,0.20)]">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/[0.05] blur-[85px] transition-all duration-500 group-hover:bg-blue-500/[0.08]" />

      <div className="relative">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Logo Apex */}
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/[0.10] bg-blue-500/[0.06]">
              <Image
                src="/logo.png"
                alt="Apex"
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain"
              />
            </div>

            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-blue-400/70">
                Apex Intelligence
              </p>

              <h2 className="mt-0.5 text-[15px] font-semibold leading-none tracking-[-0.02em] text-white">
                Recomendações
              </h2>
            </div>
          </div>

          {/* Ver todas */}
          <button
            type="button"
            className="group/all flex items-center gap-1 text-[8px] font-semibold text-white/30 transition-colors duration-200 hover:text-blue-400"
          >
            <span>Ver todas</span>

            <ChevronRight
              size={11}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover/all:translate-x-0.5"
            />
          </button>
        </div>

        {/* Recomendações */}
        <div className="mt-4">
          {insights.slice(0, 3).map((insight, index) => (
            <div
              key={`${insight.title}-${index}`}
              className={`
                group/item relative flex gap-3 py-3
                transition-all duration-300
                ${index !== 0 ? "border-t border-white/[0.05]" : ""}
              `}
            >
              {/* Número */}
              <div className="flex w-6 shrink-0 items-start justify-center">
                <span className="text-[9px] font-bold tracking-[0.08em] text-blue-400/45 transition-colors duration-300 group-hover/item:text-blue-400/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Linha de destaque */}
              <div className="relative flex w-px shrink-0">
                <span className="absolute left-0 top-1 h-7 w-px bg-blue-500/20 transition-colors duration-300 group-hover/item:bg-blue-400/60" />
              </div>

              {/* Conteúdo */}
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold leading-tight tracking-[-0.01em] text-white/90">
                  {insight.title}
                </h3>

                <p className="mt-1 text-[8px] font-medium leading-[1.5] text-white/30">
                  {insight.description}
                </p>
              </div>

              {/* Indicador */}
              <div className="flex shrink-0 items-center">
                <ArrowRight
                  size={11}
                  strokeWidth={1.8}
                  className="text-white/10 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-blue-400/60"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="mt-1 flex items-center justify-between border-t border-white/[0.05] pt-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />

            <span className="text-[7px] font-medium uppercase tracking-[0.12em] text-white/20">
              Inteligência personalizada
            </span>
          </div>

          <span className="text-[7px] font-medium text-white/15">
            Atualizado hoje
          </span>
        </div>
      </div>
    </article>
  );
}