"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  Sparkles,
} from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  streak?: number;
  todayLabel?: string;
}

export default function DashboardHeader({
  userName = "Lucas",
  streak = 7,
  todayLabel = "Quinta-feira, 27 de agosto",
}: DashboardHeaderProps) {
  const firstName = userName.split(" ")[0];

  return (
    <header className="relative overflow-hidden border-b border-white/[0.06]">
      {/* =========================================================
          HEADER AMBIENT
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main blue glow */}
        <div
          className="
            absolute
            left-[18%]
            top-[-220px]
            h-[420px]
            w-[620px]
            rounded-full
            bg-blue-600/[0.045]
            blur-[120px]
          "
        />

        {/* Secondary cyan glow */}
        <div
          className="
            absolute
            right-[10%]
            top-[-190px]
            h-[340px]
            w-[460px]
            rounded-full
            bg-cyan-400/[0.018]
            blur-[120px]
          "
        />

        {/* Soft fade */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-24
            bg-gradient-to-b
            from-blue-500/[0.015]
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          HEADER CONTENT
      ========================================================= */}
      <div className="relative mx-auto max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* =====================================================
              LEFT
          ===================================================== */}
          <div className="min-w-0">
            {/* Context */}
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-blue-400/10 bg-blue-400/[0.06]">
                <Sparkles
                  size={11}
                  strokeWidth={1.8}
                  className="text-blue-400"
                />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400/65">
                Seu painel de evolução
              </span>
            </div>

            {/* Greeting */}
            <div className="mt-3">
              <h1 className="text-[28px] font-bold tracking-[-0.045em] text-white sm:text-[32px] lg:text-[36px]">
                Olá, {firstName}
                <span className="text-white/25">.</span>
              </h1>

              <p className="mt-1.5 max-w-xl text-[12px] leading-relaxed text-white/35 sm:text-[13px]">
                Acompanhe seu desempenho, recuperação e evolução em um só
                lugar.
              </p>
            </div>

            {/* Date */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-white/30">
                <CalendarDays size={13} strokeWidth={1.8} />

                <span className="text-[10px] font-medium">
                  {todayLabel}
                </span>
              </div>

              <span className="h-1 w-1 rounded-full bg-white/10" />

              <div className="flex items-center gap-2 text-white/30">
                <Clock3 size={13} strokeWidth={1.8} />

                <span className="text-[10px] font-medium">
                  Seu progresso de hoje
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT
          ===================================================== */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* ===================================================
                STREAK
            =================================================== */}
            <div
              className="
                group
                flex
                min-w-[150px]
                items-center
                gap-3
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                px-3.5
                py-3
                transition-all
                duration-300
                hover:border-white/[0.1]
                hover:bg-white/[0.04]
              "
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/[0.06]">
                <span className="text-sm text-blue-400">
                  {streak}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold tracking-[-0.03em] text-white">
                    {streak}
                  </span>

                  <span className="text-[9px] text-white/25">
                    dias
                  </span>
                </div>

                <p className="mt-0.5 truncate text-[9px] text-white/30">
                  sequência atual
                </p>
              </div>
            </div>

            {/* ===================================================
                NOTIFICATIONS
            =================================================== */}
            <button
              type="button"
              aria-label="Notificações"
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                text-white/40
                transition-all
                duration-300
                hover:border-blue-500/15
                hover:bg-blue-500/[0.035]
                hover:text-white
              "
            >
              <Bell
                size={17}
                strokeWidth={1.8}
              />

              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.55)]" />
            </button>

            {/* ===================================================
                PROFILE
            =================================================== */}
            <button
              type="button"
              className="
                group/profile
                flex
                h-11
                items-center
                gap-2
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                px-2
                transition-all
                duration-300
                hover:border-blue-500/15
                hover:bg-blue-500/[0.035]
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-400/10
                  bg-blue-500/[0.08]
                  text-[11px]
                  font-bold
                  text-blue-300
                "
              >
                {firstName.charAt(0).toUpperCase()}
              </div>

              <ChevronDown
                size={14}
                className="
                  mr-1
                  text-white/25
                  transition-colors
                  duration-300
                  group-hover/profile:text-white/50
                "
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}