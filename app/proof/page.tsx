"use client";

import { motion, animate, useMotionValue, useTransform, useReducedMotion, useScroll, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Activity, BarChart2, FileText, Settings, Bell, GitMerge } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GCanvas } from "@/components/WovenHero";

/* ─── Shared animation helpers ─────────────────────────────────────────────── */

type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.01, margin: "0px 0px -120px 0px" }}
      transition={{ delay: delay * 0.3, duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ExpandingSection({ children, innerClassName }: { children: React.ReactNode; innerClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const paddingX = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (shouldReduceMotion) {
    return (
      <div className="bg-brand-dark">
        <div className={`bg-white px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32 ${innerClassName ?? ""}`}>{children}</div>
      </div>
    );
  }
  return (
    <motion.div ref={ref} className="bg-brand-dark" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
      <motion.div
        className={`bg-white px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32 ${innerClassName ?? ""}`}
        style={{ borderRadius }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─── Light palette (mirrors PlatformDiagrams) ─────────────────────────────── */

const L = {
  nFill: "#F8FAFC",
  nBorder: "rgba(15,23,42,0.09)",
  gFill: "rgba(49,82,173,0.07)",
  gBorder: "rgba(49,82,173,0.25)",
  gText: "#3152AD",
  gSub: "#5A78C5",
  gChip: "rgba(49,82,173,0.05)",
  gChipB: "rgba(49,82,173,0.18)",
  sFill: "rgba(22,163,74,0.07)",
  sBorder: "rgba(22,163,74,0.25)",
  sText: "#15803D",
  sSub: "#16A34A",
  wFill: "rgba(217,119,6,0.07)",
  wBorder: "rgba(217,119,6,0.28)",
  wText: "#B45309",
  wSub: "#D97706",
  tp: "#1E293B",
  ts: "#64748B",
  tm: "#94A3B8",
  aGray: "rgba(15,23,42,0.14)",
  aBlue: "rgba(49,82,173,0.55)",
  aGreen: "rgba(22,163,74,0.55)",
  aAmber: "rgba(217,119,6,0.55)",
};

/* ─── Animated hero diagram — validation hub + floating AI panel ───────────── */

function AnimatedHeroDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  // Pre-bill input nodes (left)
  const leftNodes = [
    { y: 70,  label: "Eligibility",     sub: "Coverage & auth" },
    { y: 140, label: "Documentation",   sub: "Clinical records" },
    { y: 210, label: "Payer Policy",    sub: "Rules & compliance" },
  ];

  // Outcome cards (right)
  const outcomes = [
    { y: 60,  value: "98%+",   label: "Claim Acceptance",   color: "#16A34A", bg: "rgba(22,163,74,0.07)",   border: "rgba(22,163,74,0.22)" },
    { y: 140, value: "30–50%", label: "Denial Reduction",   color: L.gText,   bg: L.gFill,                  border: L.gBorder },
    { y: 220, value: "15–25%", label: "Faster Revenue",     color: "#7C3AED", bg: "rgba(124,58,237,0.07)",  border: "rgba(124,58,237,0.22)" },
  ];

  const validations = [
    { label: "Eligibility",     detail: "Coverage verified" },
    { label: "Documentation",   detail: "97% complete" },
    { label: "Coding Accuracy", detail: "CPT / ICD aligned" },
    { label: "Authorization",   detail: "Prior auth confirmed" },
    { label: "Payer Policy",    detail: "All rules compliant" },
  ];

  const f = (delay: number) => ({
    initial: { opacity: 0 },
    animate: isInView ? { opacity: 1 } : { opacity: 0 },
    transition: { delay, duration: 0.5, ease: "easeOut" as const },
  });

  const dl = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { delay, duration: 0.42, ease: "easeOut" as const },
  });

  // Grelin hub — center of viewBox 560×280
  const GCX = 280; const GCY = 140;
  const GX  = 194; const GY  = 76;  const GW = 172; const GH = 128;

  return (
    /* Outer: relative so panel can be positioned here, overflow-hidden for bg clipping */
    <div ref={ref} className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: "#2652B1", border: "1px solid rgba(255,255,255,0.12)" }}>

      {/* Arc texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 600" fill="none" preserveAspectRatio="xMidYMid slice">
        <circle cx="80"  cy="60"  r="300" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
        <circle cx="720" cy="520" r="260" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <circle cx="400" cy="680" r="220" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      </svg>

      {/* ── White inner card — app interface style ── */}
      <div className="relative ml-4 mt-4 mb-4 mr-4 md:ml-6 md:mt-8 md:mb-8 md:mr-[130px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">

        {/* ── App chrome bar ── */}
        <div className="px-4 py-2 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: "rgba(20,33,61,0.07)", background: "#FAFAFA" }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(252,163,17,0.6)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(74,222,128,0.6)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(59,130,246,0.6)" }} />
            </div>
            <div className="h-3.5 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <img src="/grelin-logo.svg" alt="Grelin" style={{ height: 14, width: "auto" }} />
              <span className="text-gray-300 text-[10px]">/</span>
              <span className="text-[10px] text-gray-500 font-medium">Revenue Integrity</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[8.5px] font-semibold text-green-700">Live</span>
            </div>
            <div className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: "rgba(15,23,42,0.05)" }}>
              <Bell size={10} className="text-gray-400" />
            </div>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: "linear-gradient(135deg,#3B82F6,#2652B1)" }}>G</div>
          </div>
        </div>

        {/* ── Tab navigation ── */}
        <div className="px-4 border-b flex items-center gap-0 shrink-0"
          style={{ borderColor: "rgba(20,33,61,0.07)" }}>
          {[
            { label: "Flow View", icon: GitMerge,  active: true  },
            { label: "Claims",    icon: FileText,   active: false },
            { label: "Analytics", icon: BarChart2,  active: false },
            { label: "Settings",  icon: Settings,   active: false },
          ].map((tab) => (
            <div key={tab.label}
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-medium border-b-2 -mb-px cursor-default select-none"
              style={{
                borderColor: tab.active ? "#2652B1" : "transparent",
                color: tab.active ? "#2652B1" : "#94A3B8",
              }}>
              <tab.icon size={10} />
              {tab.label}
            </div>
          ))}
        </div>

        {/* ── Body: sidebar + main ── */}
        <div className="flex flex-1 min-h-0">

          {/* Left mini sidebar */}
          <div className="w-9 border-r flex flex-col items-center pt-3 pb-3 gap-3 shrink-0"
            style={{ borderColor: "rgba(20,33,61,0.07)", background: "#FAFAFA" }}>
            {[
              { Icon: GitMerge, active: true  },
              { Icon: FileText, active: false },
              { Icon: BarChart2,active: false },
              { Icon: Activity, active: false },
              { Icon: Settings, active: false },
            ].map(({ Icon, active }, i) => (
              <div key={i}
                className="w-6 h-6 rounded-md flex items-center justify-center cursor-default"
                style={{
                  background: active ? "rgba(38,82,177,0.1)" : "transparent",
                  color: active ? "#2652B1" : "#CBD5E1",
                }}>
                <Icon size={12} />
              </div>
            ))}
          </div>

          {/* Main diagram area */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Toolbar row */}
            <div className="px-4 py-2 border-b flex items-center justify-between shrink-0"
              style={{ borderColor: "rgba(20,33,61,0.06)" }}>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-gray-700">Pre-Bill Revenue Flow</span>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold"
                  style={{ background: "rgba(38,82,177,0.08)", color: "#2652B1" }}>
                  3 inputs · 3 outcomes
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-gray-400">Last updated:</span>
                <span className="text-[9px] font-medium text-gray-600">just now</span>
              </div>
            </div>

            {/* SVG diagram */}
            <div className="px-5 py-5 flex justify-center flex-1">
          <svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg"
            style={{ width: "82%", height: "auto", display: "block" }}>
            <defs>
              <filter id="ns-h" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="rgba(15,23,42,0.07)" />
              </filter>
              <filter id="gs-h" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="18" floodColor="rgba(49,82,173,0.26)" />
              </filter>
              <marker id="ah-in" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M1 1.5L8.5 5L1 8.5" fill="none" stroke="rgba(49,82,173,0.36)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="ah-out" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M1 1.5L8.5 5L1 8.5" fill="none" stroke="rgba(22,163,74,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* ── Left input nodes ── */}
            {leftNodes.map((n, i) => (
              <motion.g key={i} {...f(0.06 + i * 0.12)}>
                <rect x={8} y={n.y - 26} width={140} height={52} rx="10"
                  fill={L.nFill} stroke={L.nBorder} strokeWidth="0.8" filter="url(#ns-h)" />
                <circle cx={26} cy={n.y} r="5" fill="rgba(49,82,173,0.08)" stroke="rgba(49,82,173,0.26)" strokeWidth="0.8"/>
                <circle cx={26} cy={n.y} r="2.2" fill={L.gText}/>
                <text x={40} y={n.y - 6} dominantBaseline="central"
                  fill={L.tp} fontSize="11" fontWeight="600">{n.label}</text>
                <text x={40} y={n.y + 9} dominantBaseline="central"
                  fill={L.ts} fontSize="9">{n.sub}</text>
              </motion.g>
            ))}

            {/* Lines: left nodes → hub */}
            {leftNodes.map((n, i) => (
              <motion.path key={`li${i}`}
                d={`M 148 ${n.y} C 174 ${n.y} ${GX - 28} ${GCY} ${GX - 2} ${GCY}`}
                stroke="rgba(49,82,173,0.2)" strokeWidth="1.3" fill="none"
                markerEnd="url(#ah-in)" strokeLinecap="round"
                {...dl(0.2 + i * 0.12)}
              />
            ))}

            {/* Pulse ring */}
            <motion.rect
              x={GX - 9} y={GY - 9} width={GW + 18} height={GH + 18} rx={22}
              fill="none" stroke={L.gBorder} strokeWidth="1.5"
              animate={isInView ? { scale: [1, 1.05, 1], opacity: [0.45, 0, 0.45] } : { opacity: 0 }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              style={{ transformOrigin: `${GCX}px ${GCY}px` }}
            />

            {/* Grelin hub */}
            <motion.g {...f(0.62)}>
              <rect x={GX} y={GY} width={GW} height={GH} rx="17"
                fill={L.gFill} stroke={L.gBorder} strokeWidth="1.3" filter="url(#gs-h)"/>
              {/* Logo */}
              <image href="/grelin-logo.svg"
                x={GCX - 54} y={GY + 16} width="108" height="31"
                preserveAspectRatio="xMidYMid meet"/>
              {/* Divider */}
              <line x1={GX + 16} y1={GY + 58} x2={GX + GW - 16} y2={GY + 58}
                stroke={L.gBorder} strokeWidth="0.5"/>
              {/* Subtitle */}
              <text x={GCX} y={GY + 70} textAnchor="middle" dominantBaseline="central"
                fill={L.gSub} fontSize="7" letterSpacing="0.1em">INTELLIGENCE LAYER</text>
              {/* Chips */}
              <rect x={GX + 14} y={GY + 80} width="50" height="14" rx="4"
                fill={L.gChip} stroke={L.gChipB} strokeWidth="0.5"/>
              <text x={GX + 39} y={GY + 87} textAnchor="middle" dominantBaseline="central"
                fill={L.gText} fontSize="7.5">Pre-Bill</text>
              <rect x={GX + 70} y={GY + 80} width="62" height="14" rx="4"
                fill={L.gChip} stroke={L.gChipB} strokeWidth="0.5"/>
              <text x={GX + 101} y={GY + 87} textAnchor="middle" dominantBaseline="central"
                fill={L.gText} fontSize="7.5">AI-Powered</text>
              {/* Status */}
              <circle cx={GX + 16} cy={GY + 106} r="3.2" fill="#22C55E"/>
              <text x={GX + 25} y={GY + 106} dominantBaseline="central"
                fill={L.gSub} fontSize="7.5">Active · Validating</text>
            </motion.g>

            {/* Lines: hub → outcome cards */}
            {outcomes.map((o, i) => (
              <motion.path key={`ro${i}`}
                d={`M ${GX + GW + 2} ${GCY} C ${GX + GW + 36} ${GCY} ${416 - 28} ${o.y} ${416} ${o.y}`}
                stroke="rgba(22,163,74,0.25)" strokeWidth="1.3" fill="none"
                markerEnd="url(#ah-out)" strokeLinecap="round"
                {...dl(0.78 + i * 0.14)}
              />
            ))}

            {/* Outcome cards (right) */}
            {outcomes.map((o, i) => (
              <motion.g key={`oc${i}`} {...f(0.88 + i * 0.12)}>
                <rect x={416} y={o.y - 28} width={136} height={56} rx="11"
                  fill={o.bg} stroke={o.border} strokeWidth="0.9" filter="url(#ns-h)"/>
                {/* Value */}
                <text x={432} y={o.y - 6} dominantBaseline="central"
                  fill={o.color} fontSize="16" fontWeight="800">{o.value}</text>
                {/* Label */}
                <text x={432} y={o.y + 12} dominantBaseline="central"
                  fill={L.ts} fontSize="9.5">{o.label}</text>
              </motion.g>
            ))}
          </svg>
        </div>
          </div>
        </div>
      </div>

      {/* ── Floating AI panel — taller than the white card ── */}
      <motion.div
        className="absolute right-4 top-2 bottom-2 hidden md:flex flex-col rounded-2xl z-10"
        style={{
          width: 216,
          background: "#003D51",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 2px 10px rgba(0,0,0,0.2)",
        }}
        initial={{ opacity: 0, x: 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        transition={{ delay: 0.5, duration: 0.55 }}
      >
        {/* Panel header */}
        <div className="px-3.5 py-3 border-b flex items-center gap-2.5 shrink-0 rounded-t-2xl"
          style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <line x1="5.5" y1="1.5" x2="5.5" y2="9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="1.5" y1="5.5" x2="9.5" y2="5.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold leading-none text-white">Grelin AI</p>
            <p className="text-[9px] mt-0.5 leading-none" style={{ color: "rgba(255,255,255,0.5)" }}>Analysis Engine</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-full"
            style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
            <span className="text-[9px] font-semibold text-green-400">Live</span>
          </div>
        </div>

        {/* Validation results */}
        <div className="flex-1 px-3 py-3 flex flex-col gap-1.5 overflow-hidden">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Validation Results
          </p>
          {validations.map((v, i) => (
            <motion.div key={i}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ delay: 0.82 + i * 0.11, duration: 0.38 }}
            >
              <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(74,222,128,0.18)", border: "1px solid rgba(74,222,128,0.38)" }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <polyline points="1.5,4.5 3.5,6.5 7.5,2" stroke="#4ADE80"
                    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-semibold leading-tight text-white">{v.label}</p>
                <p className="text-[9px] leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{v.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Confidence footer */}
        <motion.div
          className="px-3.5 py-3 border-t flex flex-col gap-2 rounded-b-2xl"
          style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex items-baseline justify-between">
            <p className="text-[8.5px] font-semibold uppercase tracking-wide"
              style={{ color: "rgba(255,255,255,0.45)" }}>Confidence</p>
            <p className="text-[15px] font-extrabold leading-none text-white">98.2%</p>
          </div>
          <div className="h-[5px] w-full rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: "#4ADE80" }}
              initial={{ width: "0%" }}
              animate={isInView ? { width: "98.2%" } : { width: "0%" }}
              transition={{ delay: 1.75, duration: 1.0, ease: "easeOut" }}
            />
          </div>
          <div className="rounded-lg px-2.5 py-2 flex items-center gap-2"
            style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.28)" }}>
            <div className="w-2 h-2 rounded-full bg-green-400 shrink-0"/>
            <p className="text-[9.5px] font-semibold leading-tight text-green-400">
              Claim ready for submission
            </p>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}

/* ─── Animated comparison section ───────────────────────────────────────────── */

const traditionalSteps = [
  { num: "1", text: "Claim submitted — often with unresolved issues", type: "warning" },
  { num: "2", text: "Denial received from payer — weeks later", type: "warning" },
  { num: "3", text: "Billing team investigates root cause", type: "neutral" },
  { num: "4", text: "Claim corrected and resubmitted", type: "neutral" },
  { num: "5", text: "Payment delayed — revenue cycle extends", type: "warning" },
];

const grelinSteps = [
  { num: "1", text: "Eligibility verified before services are billed", type: "success" },
  { num: "2", text: "Documentation analyzed for completeness and compliance", type: "success" },
  { num: "3", text: "Coding aligned with clinical documentation", type: "success" },
  { num: "4", text: "Payer policy requirements confirmed before submission", type: "success" },
  { num: "5", text: "Clean claim submitted — first-pass acceptance", type: "success" },
];

function ComparisonRows() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [mobileTab, setMobileTab] = useState<"grelin" | "traditional">("grelin");

  const rowVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.18, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
  };

  const AMB = "#F68F00";
  const GRN = "#003E2D";

  return (
    <div ref={ref} className="w-full">

      {/* ── Mobile: tab switcher ── */}
      <div className="md:hidden mb-5">
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          <button
            onClick={() => setMobileTab("grelin")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors"
            style={{
              background: mobileTab === "grelin" ? `${GRN}CC` : "rgba(255,255,255,0.04)",
              color: mobileTab === "grelin" ? "#4ADE80" : "rgba(255,255,255,0.45)",
            }}
          >
            <CheckCircle2 size={14} />
            Grelin model
          </button>
          <button
            onClick={() => setMobileTab("traditional")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors border-l border-white/10"
            style={{
              background: mobileTab === "traditional" ? `${AMB}20` : "rgba(255,255,255,0.04)",
              color: mobileTab === "traditional" ? AMB : "rgba(255,255,255,0.45)",
            }}
          >
            <AlertTriangle size={14} />
            Traditional
          </button>
        </div>
      </div>

      {/* ── Desktop: side-by-side headers ── */}
      <div className="hidden md:grid grid-cols-2 gap-8 mb-6">
        <div className="rounded-xl px-5 py-3 flex items-center gap-3"
          style={{ background: `${AMB}14`, border: `1px solid ${AMB}40` }}>
          <AlertTriangle size={16} className="shrink-0" style={{ color: AMB }} />
          <div>
            <p className="text-sm font-bold" style={{ color: AMB }}>Traditional revenue cycle</p>
            <p className="text-xs mt-0.5 text-white/40">Post-bill corrections</p>
          </div>
        </div>
        <div className="rounded-xl px-5 py-3 flex items-center gap-3"
          style={{ background: `${GRN}50`, border: `1px solid ${GRN}99` }}>
          <CheckCircle2 size={16} className="shrink-0" style={{ color: "#4ADE80" }} />
          <div>
            <p className="text-sm font-bold" style={{ color: "#4ADE80" }}>Grelin model</p>
            <p className="text-xs mt-0.5 text-white/40">Pre-bill validation</p>
          </div>
        </div>
      </div>

      {/* ── Mobile: single active column ── */}
      <div className="md:hidden flex flex-col gap-3">
        {mobileTab === "grelin"
          ? grelinSteps.map((grel, i) => (
              <motion.div key={i}
                custom={i} variants={rowVariants} initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                style={{ background: `${GRN}55`, border: `1px solid ${GRN}AA` }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: "rgba(74,222,128,0.15)", color: "#4ADE80" }}>
                  {grel.num}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(134,239,172,0.9)" }}>{grel.text}</p>
              </motion.div>
            ))
          : traditionalSteps.map((trad, i) => (
              <motion.div key={i}
                custom={i} variants={rowVariants} initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                style={{
                  background: trad.type === "warning" ? `${AMB}10` : `${AMB}07`,
                  border: `1px solid ${AMB}${trad.type === "warning" ? "35" : "1A"}`,
                }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: `${AMB}25`, color: AMB }}>
                  {trad.num}
                </span>
                <p className="text-sm leading-relaxed"
                  style={{ color: trad.type === "warning" ? `${AMB}DD` : "rgba(255,255,255,0.45)" }}>
                  {trad.text}
                </p>
              </motion.div>
            ))
        }
      </div>

      {/* ── Desktop: side-by-side rows ── */}
      <div className="hidden md:flex flex-col gap-3">
        {traditionalSteps.map((trad, i) => {
          const grel = grelinSteps[i];
          return (
            <div key={i} className="grid grid-cols-2 gap-8">
              <motion.div
                custom={i} variants={rowVariants} initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                style={{
                  background: trad.type === "warning" ? `${AMB}10` : `${AMB}07`,
                  border: `1px solid ${AMB}${trad.type === "warning" ? "35" : "1A"}`,
                }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: `${AMB}25`, color: AMB }}>
                  {trad.num}
                </span>
                <p className="text-sm leading-relaxed"
                  style={{ color: trad.type === "warning" ? `${AMB}DD` : "rgba(255,255,255,0.45)" }}>
                  {trad.text}
                </p>
              </motion.div>
              <motion.div
                custom={i + 0.5} variants={rowVariants} initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                style={{ background: `${GRN}55`, border: `1px solid ${GRN}AA` }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: "rgba(74,222,128,0.15)", color: "#4ADE80" }}>
                  {grel.num}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(134,239,172,0.9)" }}>
                  {grel.text}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Footer labels */}
      <div className="hidden md:grid grid-cols-2 gap-8 mt-6">
        <div className="px-4 py-2">
          <p className="text-xs font-semibold" style={{ color: AMB }}>
            Reactive — operational friction at every stage
          </p>
        </div>
        <div className="px-4 py-2">
          <p className="text-xs font-semibold" style={{ color: "#4ADE80" }}>
            Proactive — issues resolved before they become denials
          </p>
        </div>
      </div>

      {/* Mobile footer label */}
      <div className="md:hidden mt-4 px-1">
        {mobileTab === "grelin"
          ? <p className="text-xs font-semibold" style={{ color: "#4ADE80" }}>Proactive — issues resolved before they become denials</p>
          : <p className="text-xs font-semibold" style={{ color: AMB }}>Reactive — operational friction at every stage</p>
        }
      </div>
    </div>
  );
}

/* ─── Counting number (loops) ────────────────────────────────────────────────── */

function CountingNumber({ target, delay = 0 }: { target: number; delay?: number }) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toLocaleString("en-US"));

  React.useEffect(() => {
    const ctrl = animate(count, target, {
      duration: 2.2,
      delay,
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: 2.8,
      repeatType: "loop",
    });
    return ctrl.stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <motion.span>{display}</motion.span>;
}

/* ─── Volume table card ──────────────────────────────────────────────────────── */

function VolumeTableCard() {
  const rows = [
    { vol: "100,000 claims",   low: 3000,  high: 6000,  impact: "Major reduction in billing rework and investigation hours" },
    { vol: "500,000 claims",   low: 15000, high: 30000, impact: "Significant revenue cycle efficiency across providers and locations" },
    { vol: "1,000,000 claims", low: 30000, high: 60000, impact: "Millions in accelerated reimbursement and recovered revenue" },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: "#2652B1", border: "1px solid rgba(255,255,255,0.12)" }}>

      {/* Arc texture overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid slice">
        <circle cx="80"  cy="60"  r="280" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <circle cx="720" cy="360" r="240" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <circle cx="400" cy="440" r="200" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      </svg>

      {/* Inner white card */}
      <div className="relative mx-5 mt-5 mb-5 bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* Chrome header */}
        <div className="px-5 py-3 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: "rgba(20,33,61,0.07)" }}>
          <div>
            <p className="text-[12px] font-bold text-[#0B1120] tracking-tight">
              What prevention looks like at volume
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
              Preventable denials at scale — across claim volumes
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(252,163,17,0.55)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(74,222,128,0.55)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(59,130,246,0.55)" }} />
          </div>
        </div>

        {/* Table */}
        <div className="px-5 py-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left px-3 py-2.5 text-xs font-bold rounded-l-lg"
                  style={{ color: L.gText, background: "rgba(49,82,173,0.07)" }}>
                  Claims volume
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-bold"
                  style={{ color: L.gText, background: "rgba(49,82,173,0.07)" }}>
                  Preventable denials reduced
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-bold rounded-r-lg"
                  style={{ color: L.gText, background: "rgba(49,82,173,0.07)" }}>
                  Operational impact
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${L.nBorder}` }}>
                  <td className="px-3 py-4 font-semibold" style={{ color: L.tp }}>
                    {row.vol}
                  </td>
                  <td className="px-3 py-4 font-bold tabular-nums" style={{ color: L.gText }}>
                    <CountingNumber target={row.low}  delay={i * 0.25} />
                    <span className="mx-0.5">–</span>
                    <CountingNumber target={row.high} delay={i * 0.25} />
                  </td>
                  <td className="px-3 py-4 text-xs leading-relaxed" style={{ color: L.ts }}>
                    {row.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating pill + orbit section ─────────────────────────────────────────── */

type PillProps = { product: string; color: string; desc: string; specialty: string; };

function FloatingPill({ product, color, desc, specialty }: PillProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {!hovered ? (
        <div
          className="flex items-center gap-2.5 px-4 py-2 cursor-default select-none"
          style={{
            background: "rgba(18,24,50,0.88)",
            backdropFilter: "blur(10px)",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 4px 18px rgba(0,0,0,0.45)",
            whiteSpace: "nowrap",
          }}
        >
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-white text-[13px] font-semibold">{product}</span>
        </div>
      ) : (
        <div
          className="cursor-default select-none"
          style={{
            width: 220,
            background: "#ffffff",
            borderRadius: 14,
            border: `1.5px solid ${color}55`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.10)",
            overflow: "hidden",
          }}
        >
          {/* Category badge */}
          <div
            className="px-3 py-1.5"
            style={{ background: color, borderBottom: `1px solid ${color}` }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              {specialty}
            </span>
          </div>
          {/* Content */}
          <div className="px-3 py-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-gray-900 text-[13px] font-bold">{product}</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const ORBIT_PILLS: PillProps[] = [
  // Wound Care — #F68F00
  { specialty: "Wound Care",              product: "Wound.ai",       color: "#F68F00", desc: "Validates wound documentation before submission. Catches coding errors and reduces denial exposure." },
  { specialty: "Wound Care",              product: "Eligibility.ai", color: "#F68F00", desc: "Verifies wound care coverage and benefit authorization status upstream — before claims are built." },
  { specialty: "Wound Care",              product: "PriorAuth.ai",   color: "#F68F00", desc: "Confirms prior authorization for wound procedures before claims leave the billing system." },
  // Pain Management — #2652B1
  { specialty: "Pain Management",         product: "Pain.ai",        color: "#2652B1", desc: "Aligns pain management coding with payer policy before submission. Catches misalignment early." },
  { specialty: "Pain Management",         product: "PriorAuth.ai",   color: "#2652B1", desc: "Tracks complex pain management auth requirements across payer rules and procedure codes." },
  { specialty: "Pain Management",         product: "Performance.ai", color: "#2652B1", desc: "Surfaces real-time revenue risk signals across the full pain management billing stack." },
  // MSO — #003E2D
  { specialty: "MSO — Multi-site Org",   product: "Eligibility.ai", color: "#003E2D", desc: "Standardizes eligibility and coverage checks across all sites, providers, and payer contracts." },
  { specialty: "MSO — Multi-site Org",   product: "PriorAuth.ai",   color: "#003E2D", desc: "Centralizes authorization workflows across the entire organization for consistent pre-bill control." },
  { specialty: "MSO — Multi-site Org",   product: "Performance.ai", color: "#003E2D", desc: "Aggregates revenue integrity signals across all locations for unified leadership visibility." },
];

// Single ellipse — all 9 pills on the same orbit, evenly spaced at 40° apart.
// One speed for everyone so they never bunch up or spread out.
// rx > ry so the ellipse fits the widescreen container without vertical clipping.
const ORBIT_SPD = 0.045; // deg/frame ≈ full revolution in ~2 min at 60 fps

const ORBIT_CFG = Array.from({ length: 9 }, (_, i) => ({
  rx: 390,
  ry: 205,
  a:  i * 40,   // 0°, 40°, 80° … 320° — one card per 40° slice
  spd: ORBIT_SPD,
}));

/* Proof product modules — rendered as the in-G hotspot cards, exactly like the
   home page animation (same GCanvas source), with proof content. */
const PROOF_CARDS = [
  { label: "Wound.ai",       desc: "Validates wound documentation before submission, then audits the built claim downstream." },
  { label: "Pain.ai",        desc: "Aligns pain management coding with payer policy before and after the claim." },
  { label: "Audit.ai",       desc: "Layered audit checks surface accuracy and fraud risk on submitted claims." },
  { label: "Eligibility.ai", desc: "Confirms coverage and authorization upstream, before claims are built." },
  { label: "PriorAuth.ai",   desc: "Confirms prior authorization before claims leave the billing system." },
];

function GOrbitSection() {
  return (
    <motion.div
      className="relative hidden w-full sm:block"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.01, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Exact home-page G animation — flowing orbs + integrated hotspot cards */}
      <div className="relative mx-auto w-full" style={{ maxWidth: 1000, aspectRatio: "1000 / 640" }}>
        <GCanvas cards={PROOF_CARDS} />
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function ProofPage() {
  return (
    <main className="bg-brand-dark text-white overflow-x-hidden">

      {/* ── 1. Hero — dark, centered text + diagram ─────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-16 py-24 md:py-40">
        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[640px] h-[640px] rounded-full bg-[#3152AD] opacity-[0.07] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col items-center gap-14">

          {/* Text block — centered */}
          <div className="flex flex-col items-center text-center gap-5 max-w-3xl">
            <AnimatedContainer>
              <span className="inline-flex items-center rounded-full bg-[#FCA311]/15 border border-[#FCA311]/30 px-5 py-2 text-sm font-semibold text-[#FCA311] tracking-wide">
                Proven Revenue Integrity Outcomes
              </span>
            </AnimatedContainer>
            <AnimatedContainer delay={0.15}>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Revenue integrity begins<br />before the claim is submitted
              </h1>
            </AnimatedContainer>
            <AnimatedContainer delay={0.25}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Grelin brings intelligence into the pre-billing stage of the revenue cycle, helping
                healthcare organizations reduce revenue leakage before claims are submitted and
                improving claim acceptance, efficiency, and revenue predictability.
              </p>
            </AnimatedContainer>
          </div>

          {/* Diagram — full width */}
          <div className="w-full">
            <AnimatedHeroDiagram />
          </div>

        </div>
      </section>

      {/* ── 2. Outcome metrics — dark, white cards ──────────────────────────── */}
      <section className="bg-brand-dark px-4 md:px-8 lg:px-16 py-28 md:py-40 border-t border-white/5">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl mx-auto text-center mb-16">
            <AnimatedContainer>
              <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                What organizations experience with Grelin
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-5">
                These improvements occur across five validated factors: eligibility validation, documentation alignment, coding accuracy, authorization requirements, and payer policy compliance. By validating these factors before claims are submitted, billing teams inherit cleaner claims instead of problems to fix later.
              </p>
            </AnimatedContainer>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                value: "98%+",
                label: "First-pass claim acceptance rate",
                color: "#16A34A",
                valueBg: "rgba(22,163,74,0.08)",
                valueBorder: "rgba(22,163,74,0.2)",
                bg: "#FFFFFF",
                border: "rgba(15,23,42,0.08)",
                dot: "#22C55E",
              },
              {
                value: "30–50%",
                label: "Reduction in denials tied to documentation & eligibility issues",
                color: "#B45309",
                valueBg: "rgba(217,119,6,0.08)",
                valueBorder: "rgba(217,119,6,0.22)",
                bg: "#FFFFFF",
                border: "rgba(15,23,42,0.08)",
                dot: "#F59E0B",
              },
              {
                value: "20–40%",
                label: "Reduction in billing rework and claim resubmissions",
                color: "#1D4ED8",
                valueBg: "rgba(59,130,246,0.08)",
                valueBorder: "rgba(59,130,246,0.2)",
                bg: "#FFFFFF",
                border: "rgba(15,23,42,0.08)",
                dot: "#3B82F6",
              },
              {
                value: "15–25%",
                label: "Faster revenue cycle turnaround",
                color: "#6D28D9",
                valueBg: "rgba(139,92,246,0.08)",
                valueBorder: "rgba(139,92,246,0.2)",
                bg: "#FFFFFF",
                border: "rgba(15,23,42,0.08)",
                dot: "#8B5CF6",
              },
            ].map((card, i) => (
              <AnimatedContainer key={card.label} delay={0.1 + i * 0.1}>
                <div
                  className="rounded-2xl p-8 flex flex-col gap-5 h-full"
                  style={{
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                    boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)",
                  }}
                >
                  {/* Colored value chip */}
                  <div
                    className="inline-flex self-start px-3 py-1.5 rounded-xl"
                    style={{ background: card.valueBg, border: `1px solid ${card.valueBorder}` }}
                  >
                    <span
                      className="text-3xl font-extrabold tracking-tight leading-none"
                      style={{ color: card.color }}
                    >
                      {card.value}
                    </span>
                  </div>
                  {/* Divider */}
                  <div className="h-px bg-gray-100" />
                  {/* Label */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{card.label}</p>
                  {/* Bottom dot indicator */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: card.dot }} />
                    <span className="text-xs font-medium text-gray-400">Pre-bill validated</span>
                  </div>
                </div>
              </AnimatedContainer>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2b. 100% Autonomous Claims Auditing / The Audit Direction ───────── */}
      <section className="relative overflow-hidden bg-[#eef3fb] py-20 md:py-28 text-[#0f2350]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(80,120,200,0.07) 0px, rgba(80,120,200,0.07) 1px, transparent 1px, transparent 16px)" }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">

          {/* Top row — heading + case target */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <AnimatedContainer className="max-w-2xl">
              <h2 className="text-3xl md:text-[2.6rem] font-extrabold leading-[1.1] tracking-tight text-[#102a5c]">
                100% Autonomous Claims Auditing
              </h2>
              <p className="mt-5 text-[15px] md:text-base leading-relaxed text-[#4a5b7d]">
                Eliminate backlogs and statistical sampling. Deploying deep programmatic inspections
                that deliver complete precision and lightning-fast execution speed across every single
                claim file.
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2} className="shrink-0">
              <div className="flex items-center gap-4 rounded-2xl border border-[#cfe0f5] bg-white px-5 py-4 shadow-[0_10px_30px_-16px_rgba(20,50,120,0.4)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a3bd6] text-white">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a9bbd]">Case target</p>
                  <p className="text-[15px] font-bold text-[#102a5c]">ClearVision Eye Clinics</p>
                  <p className="text-[12px] text-[#5a78c5]">1,204 Claims Analyzed</p>
                </div>
              </div>
            </AnimatedContainer>
          </div>

          {/* The Audit Direction */}
          <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <AnimatedContainer>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#3e7ecb]">Core Proof Engine</p>
              <h3 className="mt-3 text-2xl md:text-[2rem] font-extrabold tracking-tight text-[#102a5c]">
                The Audit Direction
              </h3>
            </AnimatedContainer>
            <AnimatedContainer delay={0.15}>
              <p className="max-w-md text-[14px] leading-relaxed text-[#4a5b7d]">
                A programmatic approach that completely eliminates sampling backlogs. We deliver
                autonomous claim processing with complete operational confidence.
              </p>
            </AnimatedContainer>
          </div>

          {/* 4 audit cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { tag: "Full Scope", icon: CheckCircle2, title: "100% Audited", desc: "100 percent of claims audited fully through the algorithmic gateway, rather than resting on statistically delayed sampling." },
              { tag: "Deep Check", icon: Activity, title: "29 Checks / 6 Layers", desc: "Every claim undergoes 29 diagnostic audits automated across six clinical and billing contractual layers, processed in minutes." },
              { tag: "High Accuracy", icon: BarChart2, title: "94% Precision", desc: "94 percent audit precision verified in clean representative reviews on medical billing adjustments." },
              { tag: "Optimal Workflow", icon: FileText, title: "Ranked Reasoned Queue", desc: "A continuous, prioritized, clear interface list ensuring your team works the highest-value recovered claims first." },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <AnimatedContainer key={c.title} delay={0.1 + i * 0.08} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border border-[#d7e3f4] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0a3bd6]/40 hover:shadow-[0_18px_44px_-22px_rgba(20,50,120,0.5)]">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf1fd] text-[#0a3bd6]">
                        <Icon size={18} />
                      </span>
                      <span className="rounded-full border border-[#16a34a]/30 bg-[#16a34a]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#15803d]">
                        {c.tag}
                      </span>
                    </div>
                    <h4 className="mt-5 text-[17px] font-extrabold leading-snug text-[#102a5c]">{c.title}</h4>
                    <p className="mt-2.5 text-[12.5px] leading-[1.65] text-[#5a6b8c]">{c.desc}</p>
                  </div>
                </AnimatedContainer>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Root causes — white expanding with scroll animation ──────────── */}
      <ExpandingSection innerClassName="overflow-x-hidden">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-20">

            {/* Left: heading + description */}
            <div className="md:w-[42%] shrink-0">
              <AnimatedContainer>
                <h2 className="text-gray-900 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-balance">
                  Most denials start before the claim is ever submitted
                </h2>
              </AnimatedContainer>
              <AnimatedContainer delay={0.2}>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-6">
                  In many healthcare organizations, revenue cycle teams focus on fixing denials after claims are rejected. But by the time a claim reaches billing, most of the underlying problems have already occurred.
                </p>
              </AnimatedContainer>
              <AnimatedContainer delay={0.3}>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-4">
                  The root causes typically originate earlier in the workflow — and once a claim is submitted with these issues, the outcome is often predictable: denials, rework, and delayed reimbursement.
                </p>
              </AnimatedContainer>
            </div>

            {/* Right: staggered chips — 2 per row, single-line text */}
            <div className="flex-1 flex flex-col gap-3">

              {/* Medical sketch illustration — above chips, centered */}
              <AnimatedContainer delay={0.15} className="flex justify-center mb-2">
                <svg viewBox="0 0 300 185" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "100%", maxWidth: 160, height: "auto", display: "block", overflow: "visible" }}>
                  <defs>
                    <filter id="hd" x="-15%" y="-15%" width="130%" height="130%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.028 0.022"
                        numOctaves="3" seed="14" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise"
                        scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <g filter="url(#hd)" stroke="#1A1F2E" strokeLinecap="round" strokeLinejoin="round">
                    <g transform="rotate(-6, 160, 95)">
                      <path d="M 105 28 C 103 22 108 18 114 19 L 212 17 C 218 17 220 23 219 29 L 218 165 C 219 171 214 174 208 173 L 110 175 C 104 175 101 170 102 164 Z"
                        strokeWidth="2.7" fill="rgba(248,250,252,0.97)" />
                      <path d="M 136 12 C 135 7 139 6 144 6 L 179 6 C 185 6 187 9 187 14 L 187 30 C 187 35 184 36 179 36 L 144 36 C 138 36 135 33 136 28 Z"
                        strokeWidth="2.1" fill="#EEF2F9" />
                      <path d="M 162 12 C 161 16 162 22 162 31" strokeWidth="2.6" />
                      <path d="M 152 21 C 155 22 163 21 172 22" strokeWidth="2.6" />
                      <path d="M 118 57 C 145 56 170 58 204 57" strokeWidth="1.9" />
                      <path d="M 118 73 C 142 72 163 74 198 72" strokeWidth="1.9" />
                      <path d="M 118 89 C 144 88 169 90 202 89" strokeWidth="1.9" />
                      <path d="M 118 105 C 140 104 161 106 194 104" strokeWidth="1.9" />
                      <path d="M 118 121 C 143 120 167 122 199 121" strokeWidth="1.9" />
                      <path d="M 118 137 C 138 136 158 138 186 136" strokeWidth="1.9" />
                      <path d="M 118 153 C 142 152 165 154 194 153" strokeWidth="1.9" />
                      <path d="M 205 84 C 209 83 213 85 213 89 C 213 93 209 95 205 94 C 201 94 199 92 199 89 C 199 86 201 84 205 84 Z"
                        strokeWidth="1.7" fill="rgba(217,119,6,0.13)" stroke="rgba(180,83,9,0.8)" />
                      <path d="M 206 86 L 206 90" stroke="#B45309" strokeWidth="1.6" />
                      <circle cx="206" cy="92.5" r="1.1" fill="#B45309" stroke="none" />
                    </g>
                    <g transform="translate(62, 90) rotate(-22)">
                      <path d="M 28 1 C 29 15 21 29 6 30 C -9 31 -28 20 -28 4 C -28 -12 -16 -28 1 -29 C 17 -30 27 -14 28 1 Z"
                        strokeWidth="2.9" fill="rgba(255,255,255,0.62)" />
                      <path d="M -16 -13 Q -11 -19 -5 -14" strokeWidth="1.5" opacity="0.38" />
                      <path d="M 20 20 C 28 28 36 36 46 46" strokeWidth="4.5" strokeLinecap="round" />
                    </g>
                    <text x="248" y="52" fontSize="30" fontFamily="Georgia, serif"
                      fill="none" stroke="#1A1F2E" strokeWidth="1.0" fontStyle="italic" fontWeight="bold">?</text>
                    <text x="280" y="96" fontSize="19" fontFamily="Georgia, serif"
                      fill="none" stroke="#1A1F2E" strokeWidth="0.75" fontStyle="italic" fontWeight="bold">?</text>
                    <text x="226" y="24" fontSize="14" fontFamily="Georgia, serif"
                      fill="none" stroke="#1A1F2E" strokeWidth="0.6" fontStyle="italic" fontWeight="bold">?</text>
                  </g>
                </svg>
              </AnimatedContainer>

              {/* Mobile: single column, no offsets */}
              <div className="flex md:hidden flex-col gap-2.5">
                {[
                  { text: "Incomplete clinical documentation",  dot: "#D97706" },
                  { text: "Eligibility verification gaps",      dot: "#EF4444" },
                  { text: "Missing authorization requirements", dot: "#8B5CF6" },
                  { text: "Coding & documentation misalignment",dot: "#3B82F6" },
                  { text: "Payer policy gaps during encounter", dot: "#F59E0B" },
                  { text: "Charge integrity issues in billing", dot: "#10B981" },
                ].map((item, idx) => (
                  <AnimatedContainer key={item.text} delay={0.1 + idx * 0.08}>
                    <div
                      className="flex items-center gap-2.5 px-4 py-2.5 w-full"
                      style={{
                        background: "#F8F9FB",
                        border: "1px solid rgba(15,23,42,0.1)",
                        borderRadius: 8,
                        boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
                      }}
                    >
                      <span className="inline-flex items-center justify-center rounded-full shrink-0"
                        style={{ width: 18, height: 18, background: `${item.dot}18`, border: `1.5px solid ${item.dot}55` }}>
                        <span className="rounded-full" style={{ width: 7, height: 7, background: item.dot, display: "block" }} />
                      </span>
                      <span className="text-sm font-medium text-gray-700">{item.text}</span>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>

              {/* Desktop: staggered two-up rows */}
              <div className="hidden md:flex flex-col gap-3">
              {[
                { offset: 0,  items: [
                  { text: "Incomplete clinical documentation", dot: "#D97706" },
                  { text: "Eligibility verification gaps",     dot: "#EF4444" },
                ]},
                { offset: 80, items: [
                  { text: "Missing authorization requirements",    dot: "#8B5CF6" },
                  { text: "Coding & documentation misalignment",   dot: "#3B82F6" },
                ]},
                { offset: 28, items: [
                  { text: "Payer policy gaps during encounter",    dot: "#F59E0B" },
                  { text: "Charge integrity issues in billing",    dot: "#10B981" },
                ]},
              ].map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex gap-3"
                  style={{ paddingLeft: row.offset }}
                >
                  {row.items.map((item, colIdx) => (
                    <AnimatedContainer
                      key={item.text}
                      delay={0.15 + rowIdx * 0.18 + colIdx * 0.1}
                    >
                      <div
                        className="inline-flex items-center gap-2.5 px-4 py-2.5"
                        style={{
                          background: "#F8F9FB",
                          border: "1px solid rgba(15,23,42,0.1)",
                          borderRadius: 8,
                          boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          className="inline-flex items-center justify-center rounded-full shrink-0"
                          style={{ width: 18, height: 18, background: `${item.dot}18`, border: `1.5px solid ${item.dot}55` }}
                        >
                          <span className="rounded-full" style={{ width: 7, height: 7, background: item.dot, display: "block" }} />
                        </span>
                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                      </div>
                    </AnimatedContainer>
                  ))}
                </div>
              ))}
              </div>

            </div>

          </div>
        </div>
      </ExpandingSection>

      {/* ── 4. Comparison animation — dark, full section ────────────────────── */}
      <section className="bg-brand-dark px-4 md:px-8 lg:px-16 py-28 md:py-40">
        <div className="mx-auto max-w-5xl flex flex-col gap-14">

          <div className="max-w-2xl mx-auto text-center">
            <AnimatedContainer>
              <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                The traditional model vs the Grelin model
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-5">
                Most revenue cycle systems are built around post-bill correction. Claims are submitted, problems are discovered later, and billing teams spend time investigating, correcting, and resubmitting. This reactive model creates operational friction and slows the entire revenue cycle.
              </p>
            </AnimatedContainer>
            <AnimatedContainer delay={0.3}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
                Grelin introduces intelligence before the claim is submitted — validating the inputs that determine whether a claim will succeed or fail, during the pre-billing phase, while issues can still be resolved efficiently.
              </p>
            </AnimatedContainer>
          </div>

          <ComparisonRows />

        </div>
      </section>

      {/* ── 5. Volume table — light expanding ───────────────────────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-5xl">

          <div className="max-w-2xl mx-auto text-center mb-12">
            {/* Hand-drawn volume / scale illustration */}
            <AnimatedContainer delay={0} className="flex justify-center mb-6">
              <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", maxWidth: 148, height: "auto", display: "block", overflow: "visible" }}>
                <defs>
                  <filter id="hd2" x="-15%" y="-15%" width="130%" height="130%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.030 0.024"
                      numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise"
                      scale="3.0" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>

                <g filter="url(#hd2)" stroke="#14213D" strokeLinecap="round" strokeLinejoin="round">

                  {/* X axis */}
                  <path d="M 28 128 C 60 129 120 127 192 129" strokeWidth="2.4" />
                  {/* Y axis */}
                  <path d="M 29 128 C 28 100 29 60 27 24" strokeWidth="2.4" />

                  {/* Bar 1 (short) */}
                  <rect x="42" y="98" width="22" height="30" rx="2"
                    fill="rgba(38,82,177,0.12)" stroke="#14213D" strokeWidth="1.8" />
                  {/* Bar 2 (medium) */}
                  <rect x="76" y="78" width="22" height="50" rx="2"
                    fill="rgba(38,82,177,0.18)" stroke="#14213D" strokeWidth="1.8" />
                  {/* Bar 3 (tall) */}
                  <rect x="110" y="52" width="22" height="76" rx="2"
                    fill="rgba(38,82,177,0.26)" stroke="#14213D" strokeWidth="1.8" />
                  {/* Bar 4 (tallest) */}
                  <rect x="144" y="32" width="22" height="96" rx="2"
                    fill="rgba(38,82,177,0.36)" stroke="#14213D" strokeWidth="2.0" />

                  {/* Trend line over bars */}
                  <path d="M 53 95 C 70 75 94 65 121 46 C 140 34 155 26 172 18"
                    strokeWidth="2.0" stroke="#2652B1" strokeDasharray="4 3" fill="none" />

                  {/* Upward arrow at trend end */}
                  <path d="M 165 14 L 174 17 L 170 26" strokeWidth="1.8" stroke="#2652B1" fill="none" />

                  {/* Small "%" label floating top-right */}
                  <text x="178" y="14" fontSize="12" fontWeight="700"
                    fill="#2652B1" fontFamily="sans-serif">%</text>

                  {/* Small scatter dots above bars */}
                  <circle cx="53"  cy="88"  r="2.8" fill="#FCA311" stroke="none" />
                  <circle cx="87"  cy="68"  r="2.8" fill="#FCA311" stroke="none" />
                  <circle cx="121" cy="42"  r="2.8" fill="#FCA311" stroke="none" />
                  <circle cx="155" cy="22"  r="2.8" fill="#FCA311" stroke="none" />

                </g>
              </svg>
            </AnimatedContainer>

            <AnimatedContainer>
              <h2 className="text-gray-900 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                What prevention looks like at volume
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5">
                The impact of pre-bill validation compounds at scale. Across higher claim volumes, the reduction in preventable denials translates directly into reduced operational burden and accelerated reimbursement timelines.
              </p>
            </AnimatedContainer>
          </div>

          <AnimatedContainer delay={0.3}>
            <VolumeTableCard />
          </AnimatedContainer>

          <AnimatedContainer delay={0.4}>
            <p className="text-gray-500 text-sm leading-relaxed mt-8 text-center max-w-2xl mx-auto">
              Traditional RCM focuses on fixing denied claims. Grelin focuses on preventing them. That shift — from post-bill correction to pre-bill intelligence — is what drives measurable revenue integrity outcomes.
            </p>
          </AnimatedContainer>

        </div>
      </ExpandingSection>

      {/* ── 6. Revenue integrity in practice — dark ─────────────────────────── */}
      <section className="bg-brand-dark px-4 md:px-8 lg:px-16 py-10 md:py-14 overflow-x-hidden">
        <div className="mx-auto max-w-7xl flex flex-col gap-12">

          <div className="max-w-2xl mx-auto text-center">
            <AnimatedContainer>
              <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Revenue integrity in practice
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-5">
                Grelin&apos;s pre-billing intelligence has been deployed across specialty environments with distinct documentation requirements, payer policies, and operational structures. Each deployment reflects the same core principle: validate before submission, not after denial.
              </p>
            </AnimatedContainer>
          </div>

          {/* Mobile: pill grid (orbit hidden on small screens) */}
          <div className="sm:hidden grid grid-cols-1 gap-3">
            {ORBIT_PILLS.map((pill, i) => (
              <div key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(18,24,50,0.88)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.30)",
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: pill.color }} />
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold leading-tight">{pill.product}</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-snug">{pill.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          <GOrbitSection />

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />

    </main>
  );
}
