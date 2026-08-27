"use client";

import { useMemo, useState } from "react";

interface MiniChartProps {
  data: number[];
  height?: number;
  showArea?: boolean;
  showPoints?: boolean;
  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
}

export default function MiniChart({
  data,
  height = 140,
  showArea = true,
  showPoints = false,
  showTooltip = true,
  animated = true,
  className = "",
}: MiniChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chart = useMemo(() => {
    if (!data.length) {
      return {
        points: "",
        areaPoints: "",
        min: 0,
        max: 0,
      };
    }

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    const padding = (maxValue - minValue || 1) * 0.15;

    const min = minValue - padding;
    const max = maxValue + padding;
    const range = max - min || 1;

    const points = data
      .map((value, index) => {
        const x =
          data.length === 1
            ? 50
            : (index / (data.length - 1)) * 100;

        const y = 86 - ((value - min) / range) * 72;

        return `${x},${y}`;
      })
      .join(" ");

    return {
      points,
      areaPoints: `0,100 ${points} 100,100`,
      min,
      max,
    };
  }, [data]);

  if (!data.length) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.015] ${className}`}
        style={{ height }}
      >
        <span className="text-[10px] text-white/20">
          Sem dados disponíveis
        </span>
      </div>
    );
  }

  const activeValue =
    activeIndex !== null ? data[activeIndex] : null;

  const activeX =
    activeIndex !== null && data.length > 1
      ? (activeIndex / (data.length - 1)) * 100
      : 50;

  const activeY =
    activeIndex !== null
      ? 86 -
        ((data[activeIndex] - chart.min) /
          (chart.max - chart.min || 1)) *
          72
      : 50;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.045] bg-white/[0.012] ${className}`}
      style={{ height }}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {/* Grid */}
      <div className="pointer-events-none absolute inset-x-3 top-[25%] border-t border-white/[0.035]" />
      <div className="pointer-events-none absolute inset-x-3 top-[50%] border-t border-white/[0.035]" />
      <div className="pointer-events-none absolute inset-x-3 top-[75%] border-t border-white/[0.035]" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] overflow-visible"
      >
        <defs>
          <linearGradient
            id="miniChartArea"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="rgb(99 102 241)"
              stopOpacity="0.16"
            />

            <stop
              offset="100%"
              stopColor="rgb(99 102 241)"
              stopOpacity="0"
            />
          </linearGradient>

          <filter id="miniChartGlow">
            <feGaussianBlur
              stdDeviation="1.4"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {showArea && (
          <polygon
            points={chart.areaPoints}
            fill="url(#miniChartArea)"
          />
        )}

        <polyline
          points={chart.points}
          fill="none"
          stroke="rgb(129 140 248)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#miniChartGlow)"
          className={
            animated
              ? "transition-all duration-700"
              : undefined
          }
        />

        {showPoints &&
          data.map((value, index) => {
            const x =
              data.length === 1
                ? 50
                : (index / (data.length - 1)) * 100;

            const y =
              86 -
              ((value - chart.min) /
                (chart.max - chart.min || 1)) *
                72;

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill="rgb(165 180 252)"
                vectorEffect="non-scaling-stroke"
                className="cursor-pointer transition-all duration-200 hover:r-[2.8]"
                onMouseEnter={() =>
                  showTooltip && setActiveIndex(index)
                }
              />
            );
          })}
      </svg>

      {/* Interactive zones */}
      {showTooltip && (
        <div className="absolute inset-x-3 inset-y-3 flex">
          {data.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ver valor ${index + 1}`}
              className="h-full flex-1 cursor-crosshair outline-none"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Active indicator */}
      {showTooltip && activeIndex !== null && (
        <>
          <div
            className="pointer-events-none absolute top-3 bottom-3 w-px bg-white/[0.08]"
            style={{
              left: `calc(${activeX}% + ${
                12 - (activeX / 100) * 24
              }px)`,
            }}
          />

          <div
            className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0B1020] bg-indigo-300 shadow-[0_0_14px_rgba(129,140,248,0.8)]"
            style={{
              left: `calc(${activeX}% + ${
                12 - (activeX / 100) * 24
              }px)`,
              top: `calc(${activeY}% + ${
                12 - (activeY / 100) * 24
              }px)`,
            }}
          />

          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 rounded-xl border border-white/[0.08] bg-[#11182B]/95 px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            style={{
              left: `${Math.min(
                Math.max(activeX, 10),
                90
              )}%`,
              top: "10px",
            }}
          >
            <p className="text-[9px] uppercase tracking-[0.1em] text-white/25">
              Valor
            </p>

            <p className="mt-0.5 text-xs font-semibold text-white">
              {activeValue}
            </p>
          </div>
        </>
      )}
    </div>
  );
}