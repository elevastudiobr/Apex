"use client";

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Lightbulb,
  Sparkles,
} from "lucide-react";

interface Insight {
  title: string;
  description: string;
  type: "positive" | "info" | "attention";
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
      type: "positive",
    },
    {
      title: "Recuperação alta",
      description:
        "Seu sono indica que você está preparado para manter a intensidade.",
      type: "info",
    },
    {
      title: "Proteína próxima",
      description:
        "Você já atingiu boa parte da sua meta proteica.",
      type: "positive",
    },
  ],
}: InsightsCardProps) {
  const getIcon = (type: Insight["type"]) => {
    if (type === "positive") return CheckCircle2;

    if (type === "attention") return Lightbulb;

    return Brain;
  };

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.045]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/15 bg-blue-500/[0.06]">
            <Sparkles size={14} className="text-blue-400" />
          </div>

          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-600">
              Apex Intelligence
            </p>

            <h2 className="text-base font-semibold text-white">
              Insights
            </h2>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-[8px] text-zinc-600 transition hover:text-blue-400"
        >
          Ver todos
          <ArrowRight size={10} />
        </button>
      </div>

      {/* Insights */}
      <div className="mt-4 grid gap-1.5 lg:grid-cols-3">
        {insights.map((insight, index) => {
          const Icon = getIcon(insight.type);

          const iconColor =
            insight.type === "positive"
              ? "text-green-400"
              : insight.type === "attention"
                ? "text-orange-400"
                : "text-blue-400";

          return (
            <div
              key={`${insight.title}-${index}`}
              className="rounded-xl border border-white/[0.05] bg-black/20 p-3 transition hover:border-white/10 hover:bg-white/[0.025]"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.035] ${iconColor}`}
                >
                  <Icon size={12} />
                </div>

                <span className="text-[7px] text-zinc-700">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-3 text-[10px] font-semibold text-white">
                {insight.title}
              </h3>

              <p className="mt-1 text-[8px] leading-3.5 text-zinc-600">
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
}