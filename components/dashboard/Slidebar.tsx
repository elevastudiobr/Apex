"use client";

import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Home,
  LogOut,
  Moon,
  Settings,
  Sparkles,
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
        border-r
        border-white/[0.07]
        bg-black/80
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
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-blue-600/[0.06] blur-[110px]" />

      {/* =========================================================
          LOGO
      ========================================================= */}
      <div
        className={`
          relative
          flex
          h-[82px]
          shrink-0
          items-center
          border-b
          border-white/[0.06]
          transition-all
          duration-300
          ${collapsed ? "justify-center px-3" : "px-5"}
        `}
      >
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/[0.07]">
            <Sparkles
              size={17}
              strokeWidth={1.8}
              className="text-blue-400"
            />

            <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur-md" />
          </div>

          {/* Name */}
          <div
            className={`
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-300
              ${
                collapsed
                  ? "w-0 translate-x-[-8px] opacity-0"
                  : "w-[130px] translate-x-0 opacity-100"
              }
            `}
          >
            <p className="text-[17px] font-bold tracking-tight text-white">
              Apex
            </p>

            <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-600">
              Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]">
        {/* Section label */}
        <div
          className={`
            mb-3 overflow-hidden px-2
            text-[8px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-zinc-700
            transition-all
            duration-300
            ${
              collapsed
                ? "h-0 opacity-0"
                : "h-3 opacity-100"
            }
          `}
        >
          Workspace
        </div>

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
                  h-10
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
                      ? "border border-blue-500/10 bg-blue-500/[0.08] text-white"
                      : "text-zinc-600 hover:bg-white/[0.035] hover:text-zinc-300"
                  }
                `}
              >
                {/* Active indicator */}
                {item.active && (
                  <span className="absolute left-0 h-4 w-[2px] rounded-r-full bg-blue-500" />
                )}

                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={`
                    shrink-0
                    transition-colors
                    ${
                      item.active
                        ? "text-blue-400"
                        : "text-zinc-600 group-hover:text-zinc-300"
                    }
                  `}
                />

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
        <div className="my-5 h-px bg-white/[0.05]" />

        {/* =======================================================
            APEX AI
        ======================================================= */}
        <button
          type="button"
          title={collapsed ? "Apex Intelligence" : undefined}
          className={`
            group
            relative
            flex
            w-full
            items-center
            overflow-hidden
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.02]
            transition-all
            duration-300
            hover:border-blue-500/15
            hover:bg-blue-500/[0.04]
            ${
              collapsed
                ? "h-10 justify-center px-0"
                : "h-[74px] gap-3 px-3"
            }
          `}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/[0.08]">
            <Sparkles
              size={14}
              className="text-blue-400"
            />
          </div>

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
                  : "w-[150px] opacity-100"
              }
            `}
          >
            <p className="whitespace-nowrap text-[9px] font-semibold text-white">
              Apex Intelligence
            </p>

            <p className="mt-1 whitespace-nowrap text-[7px] leading-3 text-zinc-600">
              Insights personalizados
            </p>
          </div>
        </button>
      </nav>

      {/* =========================================================
          BOTTOM
      ========================================================= */}
      <div className="relative border-t border-white/[0.06] p-3">
        {/* User */}
        <button
          type="button"
          title={collapsed ? "Perfil" : undefined}
          className={`
            flex
            w-full
            items-center
            rounded-xl
            py-2
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
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <User
              size={14}
              className="text-zinc-500"
            />
          </div>

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

          {!collapsed && (
            <Settings
              size={13}
              className="ml-auto text-zinc-700 transition-colors hover:text-zinc-400"
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
        className={`
          absolute
          -right-3
          top-[76px]
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
          shadow-xl
          transition-all
          duration-200
          hover:border-blue-500/20
          hover:bg-zinc-900
          hover:text-blue-400
        `}
      >
        {collapsed ? (
          <ChevronRight size={12} />
        ) : (
          <ChevronLeft size={12} />
        )}
      </button>
    </aside>
  );
}