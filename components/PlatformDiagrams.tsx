"use client";

import { useState } from "react";
import workflowImg1 from '../public/workflowImg1.png';
import workflowImg2 from '../public/workflowImg2.png';
import workflowImg3 from '../public/workflowImg3.png';


/* ─────────────────────────────────────────────────────────────────────────
   Platform Diagrams
   • TabbedPlatformDiagram    — hero card: tabs switching between 3 diagrams
   • ArchitectureDiagram      — dark card, used in section 4
   ───────────────────────────────────────────────────────────────────────── */

/* ── Texture helpers (same pattern as ProductCards) ───────────────────── */

const DotGrid = ({ opacity = 0.13 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
      backgroundSize: "22px 22px",
    }}
  />
);


const ArcPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 800 600"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
  >
    <circle cx="100"  cy="80"  r="260" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
    <circle cx="700"  cy="500" r="220" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
    <circle cx="400"  cy="620" r="180" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
    <circle cx="-20"  cy="600" r="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
  </svg>
);

/* ── Light palette — white-background diagrams ────────────────────────── */

const L = {
  nFill:   "#F8FAFC",
  nBorder: "rgba(15,23,42,0.09)",

  gFill:   "rgba(49,82,173,0.07)",
  gBorder: "rgba(49,82,173,0.25)",
  gText:   "#3152AD",
  gSub:    "#5A78C5",
  gChip:   "rgba(49,82,173,0.05)",
  gChipB:  "rgba(49,82,173,0.18)",

  sFill:   "rgba(22,163,74,0.07)",
  sBorder: "rgba(22,163,74,0.25)",
  sText:   "#15803D",
  sSub:    "#16A34A",

  wFill:   "rgba(217,119,6,0.07)",
  wBorder: "rgba(217,119,6,0.28)",
  wText:   "#B45309",
  wSub:    "#D97706",

  tp:  "#1E293B",
  ts:  "#64748B",
  tm:  "#94A3B8",

  aGray:  "rgba(15,23,42,0.14)",
  aBlue:  "rgba(49,82,173,0.55)",
  aGreen: "rgba(22,163,74,0.55)",
  aAmber: "rgba(217,119,6,0.55)",
  dash:   "rgba(49,82,173,0.18)",
};



/* ── Light SVG: Claim Lifecycle ───────────────────────────────────────── */

function ClaimLifecycleLight() {
  return (
<div className="w-full h-full flex items-center justify-center">
    <img
    src={workflowImg1.src}
    alt="ClaimLifecycle Img"
    className="w-full h-full object-contain item-center"
    />
</div>

  );
}

/* ── Light SVG: Pre-bill vs Post-bill (compact) ───────────────────────── */

function PreBillComparisonLight() {
  return (
    <div className="w-full h-full flex items-center justify-center">
    <img
    src={workflowImg2.src}
    alt="PreBillComparison Img"
    className="w-full h-full object-contain"
    />
    </div>
  );
}

/* ── Light SVG: Architecture ──────────────────────────────────────────── */

function ArchitectureLight() {
  return (
    <div className="w-full h-full flex items-center justify-center">
    <img
    src={workflowImg3.src}
    alt="Architecture Img"
    className="w-full -full object-contain"
    />
    </div>
  );
}

/* ── Mobile SVG: Claim Lifecycle (vertical flow) ─────────────────────── */

function ClaimLifecycleMobile() {

  return (
    <img
    src={workflowImg1.src}
    alt=""
    />
  );
}

/* ── Mobile SVG: Before & After (two vertical stacks) ────────────────── */

function PreBillComparisonMobile() {

  return (
    <img
    src={workflowImg2.src}
    alt=""
    />
  );
}

/* ── Mobile SVG: Architecture (vertical stack) ────────────────────────── */

function ArchitectureMobile() {

  return (
    <img
    src={workflowImg3.src}
    alt=""
    />
  );
}

/* ── Both Directions — native bidirectional diagram ──────────────────── */

function BothDirectionsLight() {
  const side = (
    dir: "up" | "down",
    eyebrow: string,
    title: string,
    desc: string,
    items: string[],
  ) => (
    <div className="flex-1 rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/12 text-white">
          {dir === "up" ? "↑" : "↓"}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">{eyebrow}</span>
      </div>
      <p className="mt-3 text-[15px] font-bold text-white">{title}</p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-white/65">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((it) => (
          <span key={it} className="rounded-md border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/80">{it}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center">
      {side("up", "Upstream", "Before the claim", "Grelin fixes the issue before submission.", ["Eligibility", "Documentation", "Coding"])}
      <div className="flex shrink-0 flex-col items-center justify-center px-2">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-sm font-bold text-white">Claim</span>
        <span className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/50">One engine</span>
      </div>
      {side("down", "Downstream", "After the claim", "Grelin audits the claim for accuracy and fraud.", ["Audit", "Fraud risk", "Ranked queue"])}
    </div>
  );
}

/* ── Tabbed hero diagram ──────────────────────────────────────────────── */

/* ── Amber arc texture (matches PriorAuth card on home page) ──────────── */

const AmberArcPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 800 600"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
  >
    <circle cx="100" cy="120" r="280" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
    <circle cx="700" cy="480" r="240" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
    <circle cx="400" cy="620" r="200" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
  </svg>
);

const TABS = [
  {
    label: "Claim Lifecycle",
    title: "Claim lifecycle — where Grelin intervenes",
    subtitle: "Step-by-step: how Grelin validates before submission",
    bg: "#003D51",
    border: "rgba(255,255,255,0.08)",
    Texture: () => <DotGrid opacity={0.18} />,
    Diagram: ClaimLifecycleLight,
    DiagramMobile: ClaimLifecycleMobile,
  },
  {
    label: "Before & After",
    title: "Traditional vs. Grelin approach",
    subtitle: "How pre-bill intelligence changes the revenue cycle outcome",
    bg: "#2652B1",
    border: "rgba(255,255,255,0.08)",
    Texture: () => <ArcPattern />,
    Diagram: PreBillComparisonLight,
    DiagramMobile: PreBillComparisonMobile,
  },
  {
    label: "Both Directions",
    title: "One engine, both directions",
    subtitle: "The same intelligence prevents the bad claim and recognizes one after it is built",
    bg: "#0B2E4A",
    border: "rgba(255,255,255,0.08)",
    Texture: () => <DotGrid opacity={0.16} />,
    Diagram: BothDirectionsLight,
    DiagramMobile: BothDirectionsLight,
  },
  {
    label: "Architecture",
    title: "Integration architecture",
    subtitle: "Grelin sits above existing systems — no rip-and-replace",
    bg: "#FF9E00",
    border: "rgba(255,255,255,0.15)",
    Texture: () => <AmberArcPattern />,
    Diagram: ArchitectureLight,
    DiagramMobile: ArchitectureMobile,
  },
];

export function TabbedPlatformDiagram() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Tab bar — label on its own line on mobile, inline on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6">
        <p className="text-5xl text-[#3B506F] font-medium shrink-0 mb-8">Inside the Workflow</p>
        <div className="mb-8 flex items-center gap-1.5 bg-[#102B40] border border-white/10 rounded-full px-1.5 py-1.5 overflow-x-auto no-scrollbar bg-[#102B40]">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                active === i
                  ? "bg-white text-[#0B1120] shadow-sm"
                  : "text-[#C1C7D3] hover:text-white/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diagram card */}
      <div
        className="w-full rounded-2xl overflow-hidden transition-all duration-300"
        style={{ background: tab.bg, border: `1px solid ${tab.border}` }}
      >
        <div className="relative">
          <tab.Texture />
            {/* Mobile diagram — compact vertical layout */}
            <div className="block sm:hidden px-4 py-4">
              <tab.DiagramMobile />
            </div>
            {/* Desktop diagram — full horizontal layout */}
            <div className="hidden sm:block px-5 py-5" style={{ minHeight: 260 }}>
              <tab.Diagram />
            </div>

        </div>
      </div>

    </div>
  );
}

/* ── Green card textures (matches Eligibility home card) ─────────────── */

const GreenLineGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
      backgroundSize: "26px 26px",
    }}
  />
);

const GWatermark = () => (
  <div className="absolute inset-0 flex items-end justify-end pointer-events-none overflow-hidden select-none pr-6 pb-4">
    <span style={{ fontSize: "180px", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1, letterSpacing: "-0.05em" }}>G</span>
  </div>
);

/* ── Integration layer SVG (section 4) ───────────────────────────────── */

function IntegrationLayerSVG() {
  const BOX_W = 140;
  const GAP   = 16;
  const LEFT  = 16;
  const GY    = 12;
  const GH    = 88;
  const GB    = GY + GH;          // 100
  const SY    = 126;
  const SH    = 62;

  const systems = [
    { label: "EHR Platforms",     sub: "Epic · Cerner · Oracle" },
    { label: "Billing Systems",   sub: "AdvancedMD · Kareo" },
    { label: "Clearinghouses",    sub: "Waystar · Availity" },
    { label: "Specialty Software",sub: "Wound · Pain · Ortho" },
  ];

  const chips = ["Eligibility", "Documentation", "Coding & Charges", "Payer Policy"];
  const CHIP_W   = 120;
  const CHIP_GAP = 8;
  const chipLeft = (640 - (chips.length * CHIP_W + (chips.length - 1) * CHIP_GAP)) / 2;

  return (
    <svg viewBox="0 0 640 208" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <marker id="il-up" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke={L.aBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>

      {/* Grelin Intelligence Layer box */}
      <rect x="16" y={GY} width="608" height={GH} rx="10" fill={L.gFill} stroke={L.gBorder} strokeWidth="1"/>
      <text x="320" y={GY + 20} textAnchor="middle" dominantBaseline="central" fill={L.gText} fontSize="13" fontWeight="700">Grelin Intelligence Layer</text>
      <text x="320" y={GY + 36} textAnchor="middle" dominantBaseline="central" fill={L.gSub}  fontSize="9"  letterSpacing="0.06em">PRE-BILL VALIDATION · REAL-TIME ANALYSIS · NO DISRUPTION</text>

      {/* Feature chips inside Grelin box */}
      {chips.map((chip, i) => {
        const x = chipLeft + i * (CHIP_W + CHIP_GAP);
        return (
          <g key={chip}>
            <rect x={x} y={GY + 52} width={CHIP_W} height={24} rx="6" fill={L.gChip} stroke={L.gChipB} strokeWidth="0.5"/>
            <text x={x + CHIP_W / 2} y={GY + 64} textAnchor="middle" dominantBaseline="central" fill={L.gText} fontSize="9.5" fontWeight="500">{chip}</text>
          </g>
        );
      })}

      {/* Connector lines (upward arrows from each system into Grelin) */}
      {systems.map((_, i) => {
        const cx = LEFT + i * (BOX_W + GAP) + BOX_W / 2;
        return (
          <line key={i} x1={cx} y1={SY - 2} x2={cx} y2={GB + 2}
            stroke={L.aBlue} strokeWidth="1.5" markerEnd="url(#il-up)"/>
        );
      })}

      {/* System boxes */}
      {systems.map((sys, i) => {
        const bx = LEFT + i * (BOX_W + GAP);
        const cx = bx + BOX_W / 2;
        return (
          <g key={i}>
            <rect x={bx} y={SY} width={BOX_W} height={SH} rx="8" fill={L.nFill} stroke={L.nBorder} strokeWidth="0.5"/>
            <text x={cx} y={SY + 20} textAnchor="middle" dominantBaseline="central" fill={L.tp} fontSize="11" fontWeight="600">{sys.label}</text>
            <text x={cx} y={SY + 38} textAnchor="middle" dominantBaseline="central" fill={L.ts} fontSize="8.5">{sys.sub}</text>
          </g>
        );
      })}

      {/* Caption */}
      <text x="320" y="200" textAnchor="middle" dominantBaseline="central" fill={L.tm} fontSize="9">
        Grelin adds an intelligence layer above your existing systems — no rip-and-replace
      </text>
    </svg>
  );
}

export function IntegrationDiagram() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ background: "#003E2D", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="relative">
        <GreenLineGrid />
        <GWatermark />
        <div className="relative mx-5 mt-5 mb-0 bg-white rounded-t-2xl overflow-hidden shadow-2xl">
          <div
            className="px-5 py-3 border-b flex items-center justify-between shrink-0"
            style={{ borderColor: "rgba(20,33,61,0.07)" }}
          >
            <div>
              <p className="text-[12px] font-bold text-[#0B1120] tracking-tight">Integration layer — how Grelin connects</p>
              <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>EHR, billing, clearinghouse &amp; specialty — all enhanced, none replaced</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(252,163,17,0.55)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(74,222,128,0.55)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(59,130,246,0.55)" }} />
            </div>
          </div>
          <div className="px-5 py-6">
            <IntegrationLayerSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
