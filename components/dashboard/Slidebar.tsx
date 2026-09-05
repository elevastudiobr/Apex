"use client";

import Image from "next/image";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Home,
  LogOut,
  Moon,
  Settings,
  Target,
  User,
  Utensils,
} from "lucide-react";

interface SlidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    label: "Visão geral",
    icon: Home,
    active: true,
  },
  {
    label: "Treinos",
    icon: Dumbbell,
  },
  {
    label: "Nutrição",
    icon: Utensils,
  },
  {
    label: "Evolução",
    icon: BarChart3,
  },
  {
    label: "Metas",
    icon: Target,
  },
  {
    label: "Recuperação",
    icon: Moon,
  },
];

export default function Slidebar({
  collapsed,
  onToggle,
}: SlidebarProps) {
  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        hidden
        h-screen
        flex-col
        overflow-visible
        border-r
        border-white/[0.07]
        bg-black/90
        backdrop-blur-2xl
        transition-[width]
        duration-300
        ease-out
        lg:flex
        ${collapsed ? "w-[76px]" : "w-[260px]"}
      `}
    >
      {/* =========================================================
          AMBIENT LIGHT
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-220px]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/[0.055]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-1/2
          h-[300px]
          w-[300px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.025]
          blur-[110px]
        "
      />

      {/* =========================================================
          LOGO
      ========================================================= */}
      <div
        className={`
          relative
          flex
          h-[86px]
          shrink-0
          items-center
          justify-center
          border-b
          border-white/[0.06]
          transition-all
          duration-300
          ${collapsed ? "px-3" : "px-5"}
        `}
      >
        {/* Logo completa */}
        {!collapsed && (
          <div
            className="
              relative
              flex
              h-[46px]
              w-[170px]
              items-center
              justify-center
            "
          >
            <Image
              src="/logo-apex.png"
              alt="Apex"
              width={170}
              height={50}
              priority
              className="
                h-full
                w-full
                object-contain
              "
            />
          </div>
        )}

        {/* Logo minimizada */}
        {collapsed && (
          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
            "
          >
            <Image
              src="/logo.png"
              alt="Apex"
              width={40}
              height={40}
              priority
              className="
                h-10
                w-10
                object-contain
              "
            />
          </div>
        )}
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <nav
        className="
          relative
          flex-1
          overflow-y-auto
          px-3
          py-6
          [scrollbar-color:rgba(255,255,255,0.08)_transparent]
          [scrollbar-width:thin]
        "
      >
        {/* Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                title={collapsed ? item.label : undefined}
                className={`
                  group
                  relative
                  flex
                  h-11
                  w-full
                  items-center
                  rounded-xl
                  transition-all
                  duration-200
                  ${
                    collapsed
                      ? "justify-center px-0"
                      : "gap-3 px-3"
                  }
                  ${
                    item.active
                      ? "border border-blue-500/[0.12] bg-blue-500/[0.075] text-white shadow-[inset_0_0_20px_rgba(37,99,235,0.025)]"
                      : "border border-transparent text-zinc-600 hover:bg-white/[0.035] hover:text-zinc-300"
                  }
                `}
              >
                {/* Active indicator */}
                {item.active && (
                  <span
                    className="
                      absolute
                      left-0
                      h-5
                      w-[2px]
                      rounded-r-full
                      bg-blue-500
                      shadow-[0_0_10px_rgba(59,130,246,0.45)]
                    "
                  />
                )}

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    transition-all
                    duration-200
                    ${
                      item.active
                        ? "bg-blue-500/[0.08]"
                        : "bg-transparent group-hover:bg-white/[0.035]"
                    }
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className={`
                      transition-colors
                      ${
                        item.active
                          ? "text-blue-400"
                          : "text-zinc-600 group-hover:text-zinc-300"
                      }
                    `}
                  />
                </div>

                {/* Label */}
                <span
                  className={`
                    overflow-hidden
                    whitespace-nowrap
                    text-[10px]
                    font-medium
                    transition-all
                    duration-300
                    ${
                      collapsed
                        ? "w-0 opacity-0"
                        : "w-auto opacity-100"
                    }
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* =======================================================
            DIVIDER
        ======================================================= */}
        <div className="my-6 h-px bg-white/[0.05]" />

        {/* =======================================================
            FOCO DA SEMANA
        ======================================================= */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            ${
              collapsed
                ? "h-11"
                : "h-[128px]"
            }
          `}
        >
          {!collapsed ? (
            <div
              className="
                group
                relative
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                p-3.5
                transition-all
                duration-300
                hover:border-blue-500/[0.14]
                hover:bg-blue-500/[0.025]
              "
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-blue-500/[0.08]
                  blur-2xl
                "
              />

              {/* Header */}
              <div className="relative flex items-center justify-between">
                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-blue-400/70
                    "
                  >
                    Foco da semana
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-white">
                    4 de 5 treinos concluídos
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-blue-500/[0.10]
                    bg-blue-500/[0.07]
                  "
                >
                  <Dumbbell
                    size={13}
                    strokeWidth={1.8}
                    className="text-blue-400"
                  />
                </div>
              </div>

              {/* Progress */}
              <div className="relative mt-4">
                {/* Barra */}
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="
                      h-full
                      w-[80%]
                      rounded-full
                      bg-blue-500
                      shadow-[0_0_14px_rgba(59,130,246,0.4)]
                    "
                  />
                </div>

                {/* Informações */}
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="
                      text-[9px]
                      font-medium
                      text-zinc-500
                    "
                  >
                    80% concluído
                  </span>

                  <button
                    type="button"
                    className="
                      text-[9px]
                      font-semibold
                      text-blue-400
                      transition-colors
                      hover:text-blue-300
                    "
                  >
                    Ver progresso →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Estado minimizado */
            <button
              type="button"
              title="Foco da semana"
              className="
                group
                flex
                h-11
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                transition-all
                duration-300
                hover:border-blue-500/[0.14]
                hover:bg-blue-500/[0.035]
              "
            >
              <Dumbbell
                size={15}
                strokeWidth={1.8}
                className="
                  text-blue-400/70
                  transition-colors
                  group-hover:text-blue-400
                "
              />
            </button>
          )}
        </div>
      </nav>

      {/* =========================================================
          BOTTOM
      ========================================================= */}
      <div className="relative shrink-0 border-t border-white/[0.06] p-3">
        {/* Perfil */}
        <button
          type="button"
          title={collapsed ? "Perfil" : undefined}
          className={`
            flex
            w-full
            items-center
            rounded-xl
            py-2.5
            transition-all
            duration-300
            hover:bg-white/[0.035]
            ${
              collapsed
                ? "justify-center"
                : "gap-3 px-2"
            }
          `}
        >
          {/* Avatar */}
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.09]
              bg-white/[0.035]
            "
          >
            <User
              size={14}
              strokeWidth={1.8}
              className="text-zinc-500"
            />
          </div>

          {/* Profile info */}
          <div
            className={`
              min-w-0
              overflow-hidden
              text-left
              transition-all
              duration-300
              ${
                collapsed
                  ? "w-0 opacity-0"
                  : "w-[130px] opacity-100"
              }
            `}
          >
            <p className="truncate text-[9px] font-medium text-white">
              Seu perfil
            </p>

            <p className="mt-0.5 truncate text-[7px] text-zinc-600">
              Minha conta
            </p>
          </div>

          {/* Settings */}
          {!collapsed && (
            <Settings
              size={13}
              strokeWidth={1.8}
              className="
                ml-auto
                text-zinc-700
                transition-colors
                hover:text-zinc-400
              "
            />
          )}
        </button>

        {/* Logout */}
        <button
          type="button"
          title={collapsed ? "Sair" : undefined}
          className={`
            mt-1
            flex
            h-9
            w-full
            items-center
            rounded-lg
            text-zinc-700
            transition-all
            duration-200
            hover:bg-red-500/[0.04]
            hover:text-red-400
            ${
              collapsed
                ? "justify-center"
                : "gap-3 px-3"
            }
          `}
        >
          <LogOut
            size={14}
            strokeWidth={1.8}
          />

          <span
            className={`
              overflow-hidden
              whitespace-nowrap
              text-[9px]
              transition-all
              duration-300
              ${
                collapsed
                  ? "w-0 opacity-0"
                  : "w-auto opacity-100"
              }
            `}
          >
            Sair
          </span>
        </button>
      </div>

      {/* =========================================================
          COLLAPSE BUTTON
      ========================================================= */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={
          collapsed
            ? "Expandir menu"
            : "Recolher menu"
        }
        className="
          absolute
          -right-3
          top-[78px]
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          border
          border-white/[0.09]
          bg-zinc-950
          text-zinc-600
          shadow-[0_4px_20px_rgba(0,0,0,0.5)]
          transition-all
          duration-200
          hover:border-blue-500/20
          hover:bg-zinc-900
          hover:text-blue-400
        "
      >
        {collapsed ? (
          <ChevronRight
            size={12}
            strokeWidth={2}
          />
        ) : (
          <ChevronLeft
            size={12}
            strokeWidth={2}
          />
        )}
      </button>
    </aside>
  );
}