"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown, Flame } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DashboardHeaderProps {
  userName?: string;
  streak?: number;
}

export default function DashboardHeader({
  userName,
  streak = 7,
}: DashboardHeaderProps) {
  const [name, setName] = useState(userName || "");
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("PROFILE HEADER ERROR:", error);
        return;
      }

      if (profile?.name) {
        setName(profile.name);
      }
    }

    loadProfile();

    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(now);

    setTodayLabel(
      formattedDate.charAt(0).toUpperCase() +
        formattedDate.slice(1)
    );
  }, []);

  const firstName = name
    ? name.split(" ")[0]
    : "atleta";

  return (
    <header className="relative overflow-hidden border-b border-white/[0.06]">
      {/* =========================================================
          AMBIENT LIGHT
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[12%]
            top-[-240px]
            h-[440px]
            w-[650px]
            rounded-full
            bg-blue-600/[0.045]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            right-[5%]
            top-[-180px]
            h-[350px]
            w-[500px]
            rounded-full
            bg-cyan-400/[0.018]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-32
            bg-gradient-to-b
            from-blue-500/[0.012]
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          HEADER CONTENT
      ========================================================= */}
      <div
        className="
          relative
          mx-auto
          max-w-[1500px]
          px-5
          py-7
          sm:px-7
          lg:px-10
          lg:py-8
        "
      >
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          {/* =====================================================
              LEFT
          ===================================================== */}
          <div className="min-w-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-blue-500/70" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-blue-400/70
                "
              >
                Seu treino de hoje
              </span>
            </div>

            {/* Main greeting */}
            <div className="mt-4">
              <h1
                className="
                  text-[30px]
                  font-bold
                  leading-[1.05]
                  tracking-[-0.05em]
                  text-white
                  sm:text-[36px]
                  lg:text-[40px]
                "
              >
                Olá,{" "}
                <span className="text-white">
                  {firstName}
                </span>
                <span className="text-blue-500">.</span>
              </h1>

              <p
                className="
                  mt-2.5
                  max-w-xl
                  text-[13px]
                  leading-relaxed
                  text-white/35
                  sm:text-[14px]
                "
              >
                Vamos buscar mais uma evolução hoje.
              </p>
            </div>

            {/* Date / status */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />

                <span className="text-[10px] font-medium text-white/45 sm:text-[11px]">
                  {todayLabel}
                </span>
              </div>

              <span className="h-1 w-1 rounded-full bg-white/10" />

              <span className="text-[10px] font-medium text-white/25 sm:text-[11px]">
                Seu progresso de hoje
              </span>
            </div>
          </div>

          {/* =====================================================
              RIGHT
          ===================================================== */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Streak */}
            <div
              className="
                flex
                min-w-[155px]
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
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-400/[0.10]
                  bg-blue-400/[0.06]
                "
              >
                <Flame
                  size={16}
                  strokeWidth={1.8}
                  className="text-blue-400"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <span
                    className="
                      text-sm
                      font-bold
                      tracking-[-0.03em]
                      text-white
                    "
                  >
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

            {/* Notifications */}
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

              <span
                className="
                  absolute
                  right-2.5
                  top-2.5
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-blue-400
                  shadow-[0_0_8px_rgba(96,165,250,0.55)]
                "
              />
            </button>

            {/* Profile */}
            <button
              type="button"
              aria-label="Abrir perfil"
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
                  border-blue-400/[0.10]
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
                strokeWidth={1.8}
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