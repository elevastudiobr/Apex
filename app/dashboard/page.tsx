"use client";

import { useState } from "react";

import {
  DashboardBackground,
  DashboardHeader,
  Slidebar,
  WorkoutCard,
  EvolutionCard,
  ConsistencyCard,
  NutritionCard,
  RecoveryCard,
  WeightCard,
  InsightsCard,
} from "@/components/dashboard";

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  return (
    <DashboardBackground>
      {/* =========================================================
          SIDEBAR
      ========================================================= */}
      <Slidebar
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />

      {/* =========================================================
          DASHBOARD AREA
      ========================================================= */}
      <main
        className={`
          relative
          min-h-screen
          transition-[padding-left]
          duration-300
          ease-out
          ${
            sidebarCollapsed
              ? "lg:pl-[76px]"
              : "lg:pl-[260px]"
          }
        `}
      >
        {/* =======================================================
            DASHBOARD AMBIENT LIGHT
            Agora ele acompanha a área do dashboard
        ======================================================= */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top glow */}
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
              transition-all
              duration-300
            "
          />

          {/* Right glow */}
          <div
            className="
              absolute
              right-[-180px]
              top-[30%]
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-500/[0.018]
              blur-[150px]
            "
          />
        </div>

        {/* =======================================================
            CONTENT
        ======================================================= */}
        <div className="relative z-10">
          <div
            className="
              mx-auto
              w-full
              max-w-[1500px]
              px-4
              py-5
              sm:px-6
              lg:px-8
            "
          >
            {/* ===================================================
                HEADER
            =================================================== */}
            <DashboardHeader />

            {/* ===================================================
                DASHBOARD GRID
            =================================================== */}
            <section
              className="
                mt-5
                grid
                grid-cols-1
                gap-4
                xl:grid-cols-2
              "
            >
              {/* =================================================
                  ROW 1
              ================================================= */}
              <WorkoutCard />

              <EvolutionCard />

              {/* =================================================
                  ROW 2
              ================================================= */}
              <ConsistencyCard />

              <RecoveryCard />

              {/* =================================================
                  ROW 3
              ================================================= */}
              <NutritionCard />

              <WeightCard />

              {/* =================================================
                  ROW 4
              ================================================= */}
              <div className="xl:col-span-2">
                <InsightsCard />
              </div>
            </section>
          </div>
        </div>
      </main>
    </DashboardBackground>
  );
}