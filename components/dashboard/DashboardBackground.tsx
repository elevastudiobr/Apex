"use client";

interface DashboardBackgroundProps {
  children?: React.ReactNode;
}

export default function DashboardBackground({
  children,
}: DashboardBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* =========================================================
          BASE
      ========================================================= */}
      <div className="absolute inset-0 bg-black" />

      {/* =========================================================
          AMBIENT LIGHT — TOPO
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[35%]
            top-[-280px]
            h-[600px]
            w-[600px]
            rounded-full
            bg-blue-600/[0.035]
            blur-[150px]
          "
        />

        {/* =======================================================
            AMBIENT LIGHT — DIREITA
        ======================================================= */}
        <div
          className="
            absolute
            right-[-180px]
            top-[32%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/[0.018]
            blur-[150px]
          "
        />

        {/* =======================================================
            AMBIENT LIGHT — INFERIOR
        ======================================================= */}
        <div
          className="
            absolute
            bottom-[-250px]
            left-[45%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/[0.015]
            blur-[160px]
          "
        />
      </div>

      {/* =========================================================
          SUBTLE GRID
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.012]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* =========================================================
          TOP FADE
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-32
          bg-gradient-to-b
          from-black/30
          to-transparent
        "
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}