"use client";

import { useId } from "react";

export type IllustrationType =
  | "clipboard"  // medical claim document
  | "bandage"    // wound care
  | "shield"     // authorization / compliance
  | "chart"      // analytics / metrics
  | "network"    // platform / integration
  | "building"   // MSO / multi-site
  | "dashboard"; // product screen / overview

const SEEDS: Record<IllustrationType, number> = {
  clipboard: 14,
  bandage: 7,
  shield: 21,
  chart: 37,
  network: 3,
  building: 29,
  dashboard: 18,
};

/* ─── Individual illustration paths ─────────────────────────────────────────── */

function ClipboardPaths({ c }: { c: string }) {
  return (
    <>
      {/* Main clipboard body */}
      <path
        d="M 55 22 C 53 16 57 12 63 12 L 97 12 C 103 12 107 16 105 22 L 105 110 C 107 116 103 120 97 120 L 63 120 C 57 120 53 116 55 110 Z"
        strokeWidth="2.4" fill={c} fillOpacity={0.07}
      />
      {/* Top clip tab */}
      <path
        d="M 74 8 C 72 4 75 2 80 2 C 85 2 88 4 86 8 L 86 18 C 88 22 85 24 80 24 C 75 24 72 22 74 18 Z"
        strokeWidth="2.0" fill={c} fillOpacity={0.12}
      />
      {/* Clip pin - vertical */}
      <path d="M 80 6 C 79 10 80 16 80 22" strokeWidth="2.4" />
      {/* Clip pin - horizontal */}
      <path d="M 73 13 C 76 14 84 13 87 14" strokeWidth="2.4" />
      {/* Medical cross - vertical */}
      <path d="M 80 54 C 79 58 80 64 80 68" strokeWidth="2.8" />
      {/* Medical cross - horizontal */}
      <path d="M 72 61 C 75 60 85 62 88 61" strokeWidth="2.8" />
      {/* Document lines */}
      <path d="M 62 82 C 70 81 90 83 100 82" strokeWidth="1.9" />
      <path d="M 62 92 C 68 91 86 93 98 92" strokeWidth="1.9" />
      <path d="M 62 102 C 66 101 80 103 92 102" strokeWidth="1.9" />
    </>
  );
}

function BandagePaths({ c }: { c: string }) {
  return (
    <>
      {/* Main strip */}
      <path
        d="M 20 50 C 18 44 26 40 34 40 L 126 40 C 134 40 142 44 140 50 L 140 70 C 142 76 134 80 126 80 L 34 80 C 26 80 18 76 20 70 Z"
        strokeWidth="2.3" fill={c} fillOpacity={0.08}
      />
      {/* Center pad */}
      <path
        d="M 54 42 C 52 40 54 40 60 40 L 100 40 C 106 40 108 40 106 42 L 106 78 C 108 80 106 80 100 80 L 60 80 C 54 80 52 80 54 78 Z"
        strokeWidth="1.8" fill={c} fillOpacity={0.14}
      />
      {/* Cross on pad - vertical */}
      <path d="M 80 50 C 79 55 80 60 80 68" strokeWidth="2.6" />
      {/* Cross on pad - horizontal */}
      <path d="M 70 59 C 74 58 86 60 90 59" strokeWidth="2.6" />
      {/* Dots on left tab */}
      <circle cx="34" cy="52" r="3.2" strokeWidth="1.6" fill={c} fillOpacity={0.15} />
      <circle cx="34" cy="68" r="3.2" strokeWidth="1.6" fill={c} fillOpacity={0.15} />
      {/* Dots on right tab */}
      <circle cx="126" cy="52" r="3.2" strokeWidth="1.6" fill={c} fillOpacity={0.15} />
      <circle cx="126" cy="68" r="3.2" strokeWidth="1.6" fill={c} fillOpacity={0.15} />
    </>
  );
}

function ShieldPaths({ c }: { c: string }) {
  return (
    <>
      {/* Shield shape */}
      <path
        d="M 80 8 C 93 8 108 15 116 24 L 116 62 C 116 90 99 108 80 120 C 61 108 44 90 44 62 L 44 24 C 52 15 67 8 80 8 Z"
        strokeWidth="2.5" fill={c} fillOpacity={0.08}
      />
      {/* Inner shield ring */}
      <path
        d="M 80 20 C 88 20 98 25 104 32 L 104 62 C 104 82 92 95 80 104 C 68 95 56 82 56 62 L 56 32 C 62 25 72 20 80 20 Z"
        strokeWidth="1.3" fill="none" stroke={c} opacity={0.25}
      />
      {/* Checkmark */}
      <path d="M 62 65 C 68 70 74 76 76 78 C 82 70 94 54 99 48" strokeWidth="3.0" fill="none" />
    </>
  );
}

function ChartPaths({ c }: { c: string }) {
  return (
    <>
      {/* Y axis */}
      <path d="M 24 108 C 23 80 24 50 22 20" strokeWidth="2.2" />
      {/* X axis */}
      <path d="M 22 108 C 55 110 95 108 148 110" strokeWidth="2.2" />
      {/* Bar 1 (short) */}
      <path d="M 32 108 L 32 82 C 32 80 44 80 44 82 L 44 108" strokeWidth="1.8" fill={c} fillOpacity={0.12} />
      {/* Bar 2 (medium) */}
      <path d="M 56 108 L 56 62 C 56 60 68 60 68 62 L 68 108" strokeWidth="1.8" fill={c} fillOpacity={0.16} />
      {/* Bar 3 (tall) */}
      <path d="M 80 108 L 80 44 C 80 42 92 42 92 44 L 92 108" strokeWidth="1.8" fill={c} fillOpacity={0.20} />
      {/* Bar 4 (tallest) */}
      <path d="M 104 108 L 104 24 C 104 22 116 22 116 24 L 116 108" strokeWidth="1.8" fill={c} fillOpacity={0.26} />
      {/* Trend line */}
      <path d="M 38 78 C 62 56 90 36 116 18" strokeWidth="1.8" strokeDasharray="5 3" />
      {/* Arrow */}
      <path d="M 110 13 L 118 20 L 111 26" strokeWidth="1.8" />
      {/* Scatter dots */}
      <circle cx="38" cy="80" r="2.8" strokeWidth="0" fill={c} fillOpacity={0.7} />
      <circle cx="62" cy="58" r="2.8" strokeWidth="0" fill={c} fillOpacity={0.7} />
      <circle cx="86" cy="40" r="2.8" strokeWidth="0" fill={c} fillOpacity={0.7} />
      <circle cx="116" cy="20" r="2.8" strokeWidth="0" fill={c} fillOpacity={0.7} />
    </>
  );
}

function NetworkPaths({ c }: { c: string }) {
  return (
    <>
      {/* Center hub */}
      <circle cx="80" cy="60" r="20" strokeWidth="2.4" fill={c} fillOpacity={0.10} />
      <circle cx="80" cy="60" r="10" strokeWidth="1.2" fill={c} fillOpacity={0.18} />
      {/* Hub center dot */}
      <circle cx="80" cy="60" r="3.5" strokeWidth="0" fill={c} fillOpacity={0.6} />
      {/* Satellites */}
      <circle cx="28" cy="22" r="12" strokeWidth="2.0" fill={c} fillOpacity={0.08} />
      <circle cx="132" cy="22" r="12" strokeWidth="2.0" fill={c} fillOpacity={0.08} />
      <circle cx="28" cy="98" r="12" strokeWidth="2.0" fill={c} fillOpacity={0.08} />
      <circle cx="132" cy="98" r="12" strokeWidth="2.0" fill={c} fillOpacity={0.08} />
      {/* Connecting lines */}
      <path d="M 63 47 C 50 38 40 32 38 30" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d="M 97 47 C 110 38 120 32 122 30" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d="M 63 73 C 50 82 40 88 38 90" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d="M 97 73 C 110 82 120 88 122 90" strokeWidth="1.6" strokeDasharray="4 3" />
      {/* Connection dots at hub ends */}
      <circle cx="63" cy="47" r="3" strokeWidth="1.4" fill={c} fillOpacity={0.3} />
      <circle cx="97" cy="47" r="3" strokeWidth="1.4" fill={c} fillOpacity={0.3} />
      <circle cx="63" cy="73" r="3" strokeWidth="1.4" fill={c} fillOpacity={0.3} />
      <circle cx="97" cy="73" r="3" strokeWidth="1.4" fill={c} fillOpacity={0.3} />
    </>
  );
}

function BuildingPaths({ c }: { c: string }) {
  return (
    <>
      {/* Roof */}
      <path d="M 24 40 C 40 32 62 20 80 12 C 98 20 120 32 136 40" strokeWidth="2.3" />
      {/* Left wall */}
      <path d="M 30 40 C 29 60 30 80 30 116" strokeWidth="2.3" />
      {/* Right wall */}
      <path d="M 130 40 C 131 60 130 80 130 116" strokeWidth="2.3" />
      {/* Building body fill */}
      <path d="M 30 40 L 130 40 L 130 116 L 30 116 Z" fill={c} fillOpacity={0.06} stroke="none" />
      {/* Ground */}
      <path d="M 18 116 C 50 114 110 116 142 114" strokeWidth="2.0" />
      {/* Windows row 1 */}
      <rect x="40" y="48" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      <rect x="60" y="48" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      <rect x="86" y="48" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      <rect x="106" y="48" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      {/* Windows row 2 */}
      <rect x="40" y="68" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      <rect x="60" y="68" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      <rect x="86" y="68" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      <rect x="106" y="68" width="14" height="12" rx="2" strokeWidth="1.8" fill={c} fillOpacity={0.14} />
      {/* Horizontal floor line */}
      <path d="M 30 86 C 60 85 100 86 130 85" strokeWidth="1.4" />
      {/* Door */}
      <path d="M 66 116 L 66 96 C 66 93 72 91 80 91 C 88 91 94 93 94 96 L 94 116" strokeWidth="2.0" fill={c} fillOpacity={0.16} />
    </>
  );
}

function DashboardPaths({ c }: { c: string }) {
  return (
    <>
      {/* Monitor frame */}
      <path
        d="M 12 14 C 10 8 14 4 20 4 L 140 4 C 146 4 150 8 148 14 L 148 92 C 150 98 146 102 140 102 L 20 102 C 14 102 10 98 12 92 Z"
        strokeWidth="2.3" fill={c} fillOpacity={0.07}
      />
      {/* Stand */}
      <path d="M 80 102 C 79 108 80 114 80 116" strokeWidth="2.2" />
      <path d="M 58 116 C 66 115 94 116 102 115" strokeWidth="2.2" />
      {/* Screen inner area */}
      <path d="M 20 14 L 140 14 L 140 92 L 20 92 Z" fill={c} fillOpacity={0.04} stroke="none" />
      {/* Mini bars (left) */}
      <path d="M 26 92 L 26 72 C 26 70 36 70 36 72 L 36 92" strokeWidth="1.6" fill={c} fillOpacity={0.18} />
      <path d="M 40 92 L 40 60 C 40 58 50 58 50 60 L 50 92" strokeWidth="1.6" fill={c} fillOpacity={0.22} />
      <path d="M 54 92 L 54 46 C 54 44 64 44 64 46 L 64 92" strokeWidth="1.6" fill={c} fillOpacity={0.28} />
      {/* Checkmark card (right) */}
      <path d="M 74 18 L 136 18 L 136 56 C 136 60 132 62 128 62 L 78 62 C 74 62 74 58 74 54 Z"
        strokeWidth="1.8" fill={c} fillOpacity={0.10} />
      {/* Checkmark inside card */}
      <path d="M 86 40 C 91 46 95 50 97 52 C 103 42 116 26 120 22" strokeWidth="2.2" fill="none" />
      {/* Status lines */}
      <path d="M 74 70 C 96 69 116 70 136 69" strokeWidth="1.4" />
      <path d="M 74 78 C 92 77 112 78 130 77" strokeWidth="1.4" />
      {/* Live indicator dot */}
      <circle cx="132" cy="88" r="4.5" strokeWidth="1.5" fill={c} fillOpacity={0.22} />
      <circle cx="132" cy="88" r="2" strokeWidth="0" fill={c} fillOpacity={0.7} />
    </>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────────── */

export function MedicalIllustration({
  type,
  color = "#3152AD",
  size = 110,
}: {
  type: IllustrationType;
  color?: string;
  size?: number;
}) {
  const rawId = useId();
  const filterId = `med-${type}-${rawId.replace(/:/g, "")}`;
  const seed = SEEDS[type];

  return (
    <svg
      viewBox="0 0 160 120"
      width={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible", maxWidth: "100%" }}
    >
      <defs>
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.028 0.022"
            numOctaves="3"
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g
        filter={`url(#${filterId})`}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {type === "clipboard"  && <ClipboardPaths  c={color} />}
        {type === "bandage"    && <BandagePaths    c={color} />}
        {type === "shield"     && <ShieldPaths     c={color} />}
        {type === "chart"      && <ChartPaths      c={color} />}
        {type === "network"    && <NetworkPaths    c={color} />}
        {type === "building"   && <BuildingPaths   c={color} />}
        {type === "dashboard"  && <DashboardPaths  c={color} />}
      </g>
    </svg>
  );
}
