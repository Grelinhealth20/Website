"use client";

import {
  Brain,
  Zap,
  Building2,
  Share2,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  Shield,
  FileSearch,
  BarChart2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { Footer } from "@/components/Footer";

/* ─── Shared animation helpers ─────────────────────────────────────────────── */

type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });

  const paddingX = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (shouldReduceMotion) {
    return (
      <div className="bg-brand-dark">
        <div className={`bg-white px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32 ${innerClassName ?? ""}`}>
          {children}
        </div>
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

/* ─── Hero Illustration ─────────────────────────────────────────────────────── */

const VALIDATION_STAGES = [
  { id: 0, label: "Eligibility",   short: "Elig."  },
  { id: 1, label: "Documentation", short: "Docs"   },
  { id: 2, label: "Coding",        short: "ICD-10" },
  { id: 3, label: "Auth",          short: "Auth"   },
];

// Cards: Card1 x=15 y=10 w=165 h=80 r=8  |  Card2 x=220 y=10 w=165 h=80 r=8
// Path: right-mid of C1 → connector → around C2 → connector back → around C1 → Z
const DOT_PATH =
  "M 180 50 L 220 50 L 220 18 A 8 8 0 0 1 228 10 L 377 10 A 8 8 0 0 1 385 18 " +
  "L 385 82 A 8 8 0 0 1 377 90 L 228 90 A 8 8 0 0 1 220 82 L 220 50 " +
  "L 180 50 L 180 82 A 8 8 0 0 1 172 90 L 23 90 A 8 8 0 0 1 15 82 " +
  "L 15 18 A 8 8 0 0 1 23 10 L 172 10 A 8 8 0 0 1 180 18 L 180 50";

function SpecialtyIllustration() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveStage(s => (s + 1) % VALIDATION_STAGES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const pct = Math.round(((activeStage + 1) / VALIDATION_STAGES.length) * 100);

  return (
    <div
      className="w-full h-full flex flex-col select-none overflow-hidden rounded-xl"
      style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(0,0,0,0.06)" }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
        <div>
          <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "rgba(0,0,0,0.82)" }}>
            Pre-bill Validation
          </p>
          <p className="text-[9px] mt-0.5" style={{ color: "rgba(0,0,0,0.38)" }}>
            Grelin Intelligence Layer
          </p>
        </div>
        <motion.div
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ background: "rgba(255,158,0,0.1)", border: "1px solid rgba(255,158,0,0.35)" }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#FF9E00" }}
          />
          <span className="text-[10px] font-semibold" style={{ color: "#FF9E00" }}>Live</span>
        </motion.div>
      </div>

      {/* ── Process Cards + dot animation ───────────────────────────── */}
      <div className="px-4 shrink-0">
        <svg viewBox="0 0 400 105" className="w-full" style={{ overflow: "visible" }}>
          <defs>
            <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Card 1 */}
          <rect x="15" y="10" width="165" height="80" rx="8"
            fill="rgba(255,158,0,0.05)" stroke="rgba(255,158,0,0.35)" strokeWidth="1.2" />

          {/* Card 2 */}
          <rect x="220" y="10" width="165" height="80" rx="8"
            fill="rgba(38,82,177,0.05)" stroke="rgba(38,82,177,0.35)" strokeWidth="1.2" />

          {/* Connector line */}
          <line x1="180" y1="50" x2="220" y2="50"
            stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" strokeDasharray="4 3" />
          <polyline points="212,46 220,50 212,54"
            fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" strokeLinejoin="round" />

          {/* ── Card 1 content ── */}
          <circle cx="42" cy="42" r="11" fill="rgba(255,158,0,0.1)" />
          <circle cx="42" cy="42" r="4.5" fill="#FF9E00" opacity="0.9" />
          <text x="61" y="38" fill="rgba(0,0,0,0.82)" fontSize="9.5" fontWeight="700"
            fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">Claim Intake</text>
          <text x="61" y="52" fill="rgba(0,0,0,0.38)" fontSize="8"
            fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">847 claims queued</text>
          <rect x="23" y="65" width="52" height="14" rx="4" fill="rgba(255,158,0,0.12)" />
          <text x="49" y="75.5" fill="#FF9E00" fontSize="7.5" fontWeight="700"
            fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" textAnchor="middle">INTAKE</text>

          {/* ── Card 2 content ── */}
          <circle cx="247" cy="42" r="11" fill="rgba(38,82,177,0.1)" />
          <circle cx="247" cy="42" r="4.5" fill="#2652B1" opacity="0.9" />
          <text x="266" y="38" fill="rgba(0,0,0,0.82)" fontSize="9.5" fontWeight="700"
            fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">Pre-bill Check</text>
          <text x="266" y="52" fill="rgba(0,0,0,0.38)" fontSize="8"
            fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">AI analysis running</text>
          <rect x="228" y="65" width="62" height="14" rx="4" fill="rgba(38,82,177,0.1)" />
          <text x="259" y="75.5" fill="#2652B1" fontSize="7.5" fontWeight="700"
            fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" textAnchor="middle">ANALYZING</text>

          {/* ── Traveling dots (slowed to 14s) ── */}
          <circle r="1.8" fill="#FF9E00" opacity="0.22">
            <animateMotion dur="14s" begin="-7s" repeatCount="indefinite" calcMode="linear" path={DOT_PATH} />
          </circle>
          <circle r="2.8" fill="#FF9E00" opacity="0.45">
            <animateMotion dur="14s" begin="-3.5s" repeatCount="indefinite" calcMode="linear" path={DOT_PATH} />
          </circle>
          <circle r="4" fill="#FF9E00" filter="url(#glow)">
            <animateMotion dur="14s" repeatCount="indefinite" calcMode="linear" path={DOT_PATH} />
          </circle>
        </svg>
      </div>

      {/* ── Validation Process Stages ────────────────────────────────── */}
      <div className="px-5 pt-1 pb-2 shrink-0">
        <p className="text-[8.5px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: "rgba(0,0,0,0.35)" }}>
          Validation Process
        </p>

        <div className="flex items-center">
          {VALIDATION_STAGES.map((stage, i) => {
            const isDone   = i < activeStage;
            const isActive = i === activeStage;
            return (
              <React.Fragment key={stage.id}>
                {/* Stage node */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    {/* Spinner ring */}
                    {isActive && (
                      <svg className="absolute inset-0 w-full h-full" style={{ transform: "rotate(-90deg)" }} viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="11" fill="none"
                          stroke="rgba(255,158,0,0.18)" strokeWidth="1.8" />
                        <motion.circle cx="14" cy="14" r="11" fill="none"
                          stroke="#FF9E00" strokeWidth="1.8" strokeLinecap="round"
                          strokeDasharray="69.1"
                          animate={{ strokeDashoffset: [69.1, 0] }}
                          transition={{ duration: 2.8, ease: "easeInOut" }}
                        />
                      </svg>
                    )}
                    {/* Node */}
                    <motion.div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        background: isDone ? "#FF9E00" : isActive ? "rgba(255,158,0,0.14)" : "rgba(0,0,0,0.05)",
                        border: isActive ? "1.5px solid #FF9E00" : isDone ? "none" : "1.5px solid rgba(0,0,0,0.14)",
                      }}
                      animate={{ scale: isActive ? [1, 1.12, 1] : 1 }}
                      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                    >
                      {isDone && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <polyline points="1.5,4 3.2,5.8 6.5,2.2"
                            stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </motion.div>
                  </div>
                  <span className="text-[7.5px] font-medium" style={{ whiteSpace: "nowrap",
                    color: isDone || isActive ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.28)" }}>
                    {stage.short}
                  </span>
                </div>

                {/* Connector between nodes */}
                {i < VALIDATION_STAGES.length - 1 && (
                  <div className="flex-1 mx-1 mb-4" style={{
                    height: 1,
                    background: i < activeStage ? "#FF9E00" : "rgba(0,0,0,0.1)",
                    transition: "background 0.4s ease",
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active stage label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeStage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28 }}
            className="mt-1.5 flex items-center gap-1.5 text-[8.5px]"
            style={{ color: "#FF9E00" }}
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "#FF9E00" }}
            />
            Running: {VALIDATION_STAGES[activeStage].label} check
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[8.5px] font-medium uppercase tracking-wide"
            style={{ color: "rgba(0,0,0,0.35)" }}>Validation Progress</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={pct}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-[8.5px] font-bold"
              style={{ color: "#FF9E00" }}
            >
              {pct}%
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="h-1 w-full rounded-full" style={{ background: "rgba(0,0,0,0.07)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #FF9E00 0%, #2652B1 100%)" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* ── Metrics ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 px-5 pb-5 mt-auto">
        {[
          { label: "Claims Validated", value: "1,284", color: "#FF9E00"           },
          { label: "Denials Blocked",  value: "94.2%", color: "#2652B1"           },
          { label: "Avg. Resolution",  value: "< 2m",  color: "rgba(0,0,0,0.55)" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.45 }}
            className="rounded-lg p-2.5 flex flex-col gap-1"
            style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <motion.span
              className="text-sm font-extrabold leading-none"
              style={{ color: m.color }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
            >
              {m.value}
            </motion.span>
            <span className="text-[8px] leading-tight" style={{ color: "rgba(0,0,0,0.4)" }}>
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function SpecialtiesPage() {
  return (
    <main className="bg-brand-dark text-white">

      {/* ── 1. Hero — text left + illustration right ─────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16 py-24 md:py-40">

        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-blue opacity-[0.06] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col md:flex-row md:items-center gap-16 md:gap-20">

          {/* Left: text */}
          <div className="md:w-[48%] flex flex-col gap-6">
            <AnimatedContainer>
              <span className="inline-flex items-center rounded-full bg-[#FCA311]/15 border border-[#FCA311]/30 px-5 py-2 text-sm font-semibold text-[#FCA311] tracking-wide">
                Specialty Revenue Integrity
              </span>
            </AnimatedContainer>

            <AnimatedContainer delay={0.15}>
              <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                Revenue integrity for specialty healthcare
              </h1>
            </AnimatedContainer>

            <AnimatedContainer delay={0.25}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Every specialty operates under its own documentation rules, coding complexity, and payer policies. Grelin helps specialty organizations prevent denials before claims are submitted — by validating the factors that most often lead to revenue leakage.
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.35}>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#assessment"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-[#0B1120] hover:bg-white/90 transition-colors"
                >
                  Start Assessment <ArrowRight size={15} />
                </a>
                <a
                  href="#specialties"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Explore Specialties
                </a>
              </div>
            </AnimatedContainer>
          </div>

          {/* Right: illustration */}
          <AnimatedContainer delay={0.3} className="md:w-[52%]">
            <div className="w-full aspect-[520/420] rounded-lg overflow-hidden">
              <SpecialtyIllustration />
            </div>
          </AnimatedContainer>

        </div>
      </section>

      {/* ── 2. White expanding — centered text + visual cards ───────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-7xl">

          {/* Centered heading */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Hand-drawn complexity → simplicity illustration */}
            <AnimatedContainer delay={0} className="flex justify-center mb-6">
              <svg viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", maxWidth: 152, height: "auto", display: "block", overflow: "visible" }}>
                <defs>
                  <filter id="hd-sp1" x="-15%" y="-15%" width="130%" height="130%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.030 0.022"
                      numOctaves="3" seed="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise"
                      scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <g filter="url(#hd-sp1)" stroke="#14213D" strokeLinecap="round" strokeLinejoin="round">

                  {/* Left: tangled branching paths — multiple specialties */}
                  {/* Root */}
                  <circle cx="36" cy="86" r="7" fill="rgba(38,82,177,0.10)" strokeWidth="1.8" />

                  {/* Branch up-up */}
                  <path d="M 43 82 C 58 70 68 36 82 26" strokeWidth="1.6" fill="none" />
                  <circle cx="84" cy="24" r="5" fill="rgba(252,163,17,0.15)" strokeWidth="1.6" />

                  {/* Branch up */}
                  <path d="M 43 84 C 60 78 70 58 86 52" strokeWidth="1.6" fill="none" />
                  <circle cx="88" cy="51" r="5" fill="rgba(252,163,17,0.15)" strokeWidth="1.6" />

                  {/* Branch mid */}
                  <path d="M 44 86 C 62 86 74 86 88 86" strokeWidth="1.6" fill="none" />
                  <circle cx="90" cy="86" r="5" fill="rgba(252,163,17,0.15)" strokeWidth="1.6" />

                  {/* Branch down */}
                  <path d="M 43 88 C 60 94 70 114 86 120" strokeWidth="1.6" fill="none" />
                  <circle cx="88" cy="121" r="5" fill="rgba(252,163,17,0.15)" strokeWidth="1.6" />

                  {/* Branch down-down */}
                  <path d="M 43 90 C 58 104 68 136 82 146" strokeWidth="1.6" fill="none" />
                  <circle cx="84" cy="148" r="5" fill="rgba(252,163,17,0.15)" strokeWidth="1.6" />

                  {/* Converging lines → single node */}
                  <path d="M 95 23  C 118 30  128 68 136 86" strokeWidth="1.4" fill="none" strokeDasharray="3.5 2.5" />
                  <path d="M 95 50  C 112 58  128 72 136 86" strokeWidth="1.4" fill="none" strokeDasharray="3.5 2.5" />
                  <path d="M 95 86  C 112 86  128 86 136 86" strokeWidth="1.4" fill="none" strokeDasharray="3.5 2.5" />
                  <path d="M 95 121 C 112 114 128 100 136 86" strokeWidth="1.4" fill="none" strokeDasharray="3.5 2.5" />
                  <path d="M 95 148 C 118 140 128 104 136 86" strokeWidth="1.4" fill="none" strokeDasharray="3.5 2.5" />

                  {/* Center convergence node — Grelin */}
                  <circle cx="148" cy="86" r="13" fill="rgba(38,82,177,0.12)" strokeWidth="2.0" stroke="#2652B1" />
                  {/* G letter */}
                  <text x="148" y="87" textAnchor="middle" dominantBaseline="central"
                    fontSize="11" fontWeight="800" fill="#2652B1" fontFamily="sans-serif"
                    filter="none">G</text>

                  {/* Single clean output arrow */}
                  <path d="M 161 86 C 174 86 184 86 196 86" strokeWidth="2.2" stroke="#2652B1" fill="none" />
                  {/* Arrowhead */}
                  <path d="M 190 80 L 198 86 L 190 92" strokeWidth="1.8" stroke="#2652B1" fill="none" />

                  {/* Small check mark at output end */}
                  <circle cx="210" cy="86" r="9" fill="rgba(22,163,74,0.12)" stroke="rgba(22,163,74,0.5)" strokeWidth="1.6" />
                  <path d="M 205 86 L 208.5 90 L 215 82" strokeWidth="1.8" stroke="#16A34A" fill="none" />

                </g>
              </svg>
            </AnimatedContainer>

            <AnimatedContainer>
              <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                Specialty reimbursement is{" "}
                <span className="text-brand-blue">complex.</span>
                <br />
                Grelin helps simplify it.
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5 text-pretty">
                Healthcare reimbursement is not one-size-fits-all. Each specialty has its own documentation standards, coding requirements, payer policies, and compliance risks — what works for one specialty rarely works for another.
              </p>
            </AnimatedContainer>
            <AnimatedContainer delay={0.25}>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-4 text-pretty">
                That complexity is exactly where revenue problems begin — and where Grelin intervenes. AI intelligence runs during the pre-billing phase, validating documentation, coding alignment, eligibility, and authorization before claims are submitted.
              </p>
            </AnimatedContainer>
          </div>

          {/* Visual mockup cards — wider, no card border/shadow */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Card 1 — Pre-billing validation UI */}
            <AnimatedContainer delay={0.1}>
              <div>
                {/* Mockup image — fixed height */}
                <div className="rounded-2xl overflow-hidden bg-[#0f1929] h-[260px] flex flex-col px-5 pt-5">
                  {/* Window chrome */}
                  <div className="flex items-center gap-1.5 mb-3 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="ml-2 text-[9px] text-white/30 font-mono">pre-bill-validator · CLM-4821</span>
                  </div>
                  {/* UI panel */}
                  <div className="flex-1 rounded-t-lg overflow-hidden" style={{ background: "#141e30" }}>
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF9E00]" />
                        <span className="text-[10px] font-semibold text-white/80">Pre-bill Validation</span>
                      </div>
                      <span className="text-[9px] text-white/30 font-mono">Dr. Kim · Pain Mgmt</span>
                    </div>
                    {[
                      { label: "Eligibility",   status: "PASSED", ok: true  },
                      { label: "Documentation", status: "PASSED", ok: true  },
                      { label: "Prior Auth",    status: "REVIEW", ok: false },
                      { label: "ICD-10 Coding", status: "PASSED", ok: true  },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: row.ok ? "#4ADE80" : "#FF9E00" }} />
                          <span className="text-[9.5px] text-white/60 font-mono">{row.label}</span>
                        </div>
                        <span className="text-[8px] font-bold tracking-wide px-1.5 py-0.5 rounded"
                          style={{ background: row.ok ? "rgba(74,222,128,0.1)" : "rgba(255,158,0,0.12)", color: row.ok ? "#4ADE80" : "#FF9E00" }}>
                          {row.status}
                        </span>
                      </div>
                    ))}
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[8.5px] text-white/30 font-mono">validation progress</span>
                        <span className="text-[8.5px] font-bold text-[#FF9E00]">75%</span>
                      </div>
                      <div className="h-0.5 w-full rounded-full bg-white/[0.06]">
                        <div className="h-full rounded-full w-3/4" style={{ background: "linear-gradient(90deg,#FF9E00,#2652B1)" }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Text below image — no box */}
                <div className="pt-5">
                  <h3 className="text-gray-900 text-lg font-bold mb-2">Pre-billing</h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-pretty">
                    Grelin intervenes before the claim is ever created — resolving issues while the encounter is still active.
                  </p>
                </div>
              </div>
            </AnimatedContainer>

            {/* Card 2 — Proactive denial prevention UI */}
            <AnimatedContainer delay={0.2}>
              <div>
                {/* Mockup image — same fixed height */}
                <div className="rounded-2xl overflow-hidden bg-[#0f1929] h-[260px] flex flex-col px-5 pt-5">
                  {/* Window chrome */}
                  <div className="flex items-center gap-1.5 mb-3 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="ml-2 text-[9px] text-white/30 font-mono">denial-risk · real-time</span>
                  </div>
                  {/* UI panel */}
                  <div className="flex-1 rounded-t-lg overflow-hidden" style={{ background: "#141e30" }}>
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]"
                      style={{ background: "rgba(255,158,0,0.07)" }}>
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,158,0,0.18)" }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4 1.5L6.8 6.5H1.2L4 1.5Z" fill="#FF9E00"/>
                          <rect x="3.5" y="3.8" width="1" height="1.5" rx="0.3" fill="#0f1929"/>
                          <rect x="3.5" y="3" width="1" height="0.6" rx="0.3" fill="#0f1929"/>
                        </svg>
                      </div>
                      <span className="text-[10px] font-semibold" style={{ color: "#FF9E00" }}>Denial Risk Detected</span>
                    </div>
                    {[
                      { text: "Missing prior auth — CPT 64635",    severity: "high"   },
                      { text: "Payer policy mismatch on modifier",  severity: "medium" },
                      { text: "Documentation gap — procedure note", severity: "medium" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-white/[0.04]">
                        <div className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                          style={{ background: item.severity === "high" ? "#f87171" : "#FF9E00" }} />
                        <span className="text-[9px] text-white/55 font-mono leading-relaxed">{item.text}</span>
                      </div>
                    ))}
                    <div className="px-4 py-3">
                      <div className="rounded px-3 py-2 text-center text-[9px] font-semibold"
                        style={{ background: "rgba(38,82,177,0.18)", color: "#7BA5F5", border: "1px solid rgba(38,82,177,0.25)" }}>
                        Resolve before submit →
                      </div>
                    </div>
                  </div>
                </div>
                {/* Text below image — no box */}
                <div className="pt-5">
                  <h3 className="text-gray-900 text-lg font-bold mb-2">Proactive</h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-pretty">
                    Issues are identified and resolved at the point of origin — not discovered weeks later through a denial.
                  </p>
                </div>
              </div>
            </AnimatedContainer>

          </div>

        </div>
      </ExpandingSection>

      {/* ── 3. Dark — Pain management + MSO combined ────────────────────────── */}
      <section id="specialties" className="bg-brand-dark px-4 md:px-8 lg:px-16 py-28 md:py-40">
        <div className="mx-auto max-w-7xl flex flex-col gap-0">

          {/* Pain Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 pb-20 md:pb-28 border-b border-white/8">

            <div className="flex flex-col gap-6">
              <AnimatedContainer>
                <span className="inline-flex items-center rounded-full bg-white/8 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/60 tracking-wider uppercase">
                  Pain Management
                </span>
              </AnimatedContainer>
              <AnimatedContainer delay={0.15}>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                  Highly regulated
                </h2>
              </AnimatedContainer>
              <AnimatedContainer delay={0.2}>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Pain management practices operate in highly regulated payer environments with strict authorization and documentation requirements. Even small inconsistencies between documentation and coding can create reimbursement delays, impacting both cash flow and operational efficiency.
                </p>
              </AnimatedContainer>
              <AnimatedContainer delay={0.25}>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Grelin helps pain management organizations validate authorization requirements, coding alignment, and payer policy compliance before claims are submitted. Practices reduce denials and maintain more predictable reimbursement performance — with greater visibility into the issues driving revenue risk across providers and locations.
                </p>
              </AnimatedContainer>
            </div>

            <div className="flex flex-col gap-6">
              <AnimatedContainer delay={0.1}>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">
                  Applications supporting pain management
                </p>
              </AnimatedContainer>

              {[
                { name: "Pain.ai",        icon: Zap,        color: "#FCA311", bg: "rgba(252,163,17,0.12)",  desc: "AI-powered validation for pain management billing workflows." },
                { name: "Eligibility.ai", icon: FileSearch, color: "#3B82F6", bg: "rgba(59,130,246,0.12)",  desc: "Catch coverage and eligibility breakdowns upstream." },
                { name: "PriorAuth.ai",   icon: Shield,     color: "#A78BFA", bg: "rgba(167,139,250,0.12)", desc: "Detect authorization gaps before they delay reimbursement." },
                { name: "Performance.ai", icon: BarChart2,  color: "#22D3EE", bg: "rgba(34,211,238,0.12)",  desc: "Turn pre-bill insights into operational visibility." },
              ].map((app, i) => (
                <AnimatedContainer key={app.name} delay={0.1 + i * 0.08}>
                  <a
                    href="#"
                    className={`group flex items-center gap-4 py-4 rounded-lg px-3 -mx-3 transition-colors duration-150 hover:bg-white/[0.05] ${i > 0 ? "border-t border-white/8" : ""}`}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: app.bg }}
                    >
                      <app.icon size={16} style={{ color: app.color }} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm">{app.name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{app.desc}</div>
                    </div>
                    <span
                      className="flex items-center gap-1 text-[11px] font-semibold shrink-0 whitespace-nowrap opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      style={{ color: app.color }}
                    >
                      Explore {app.name} <ArrowRight size={11} />
                    </span>
                  </a>
                </AnimatedContainer>
              ))}
            </div>

          </div>

          {/* MSO — Multi-site */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 pt-20 md:pt-28">

            <div className="flex flex-col gap-6">
              <AnimatedContainer>
                <span className="inline-flex items-center rounded-full bg-white/8 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/60 tracking-wider uppercase">
                  MSOs & multi-site healthcare organizations
                </span>
              </AnimatedContainer>
              <AnimatedContainer delay={0.15}>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                  Multi-location scale
                </h2>
              </AnimatedContainer>
              <AnimatedContainer delay={0.2}>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Management Services Organizations operate across multiple providers, specialties, and locations. As organizations scale, revenue cycle complexity increases quickly. Differences in documentation practices, coding consistency, eligibility verification, and authorization workflows can create significant revenue risk across the organization.
                </p>
              </AnimatedContainer>
              <AnimatedContainer delay={0.25}>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  These issues often remain invisible until claims are denied weeks later — by which point the cost of rework and resubmission compounds across dozens or hundreds of claims.
                </p>
              </AnimatedContainer>
              <AnimatedContainer delay={0.3}>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Grelin introduces intelligence into the pre-billing phase of the revenue cycle, validating eligibility, documentation alignment, and billing readiness before claims are submitted. MSOs standardize revenue integrity practices across locations while identifying operational risks earlier in the workflow. The result is cleaner claims, fewer denials, and greater financial visibility across the organization.
                </p>
              </AnimatedContainer>
            </div>

            <div className="flex flex-col gap-6">
              <AnimatedContainer delay={0.1}>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">
                  Applications supporting MSOs
                </p>
              </AnimatedContainer>

              {[
                { name: "Eligibility.ai", icon: FileSearch, color: "#3B82F6", bg: "rgba(59,130,246,0.12)",  desc: "Catch coverage and eligibility breakdowns upstream." },
                { name: "PriorAuth.ai",   icon: Shield,     color: "#A78BFA", bg: "rgba(167,139,250,0.12)", desc: "Detect authorization gaps before they delay reimbursement." },
                { name: "Performance.ai", icon: BarChart2,  color: "#22D3EE", bg: "rgba(34,211,238,0.12)",  desc: "Turn pre-bill insights into operational visibility." },
              ].map((app, i) => (
                <AnimatedContainer key={app.name} delay={0.1 + i * 0.08}>
                  <a
                    href="#"
                    className={`group flex items-center gap-4 py-4 rounded-lg px-3 -mx-3 transition-colors duration-150 hover:bg-white/[0.05] ${i > 0 ? "border-t border-white/8" : ""}`}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: app.bg }}
                    >
                      <app.icon size={16} style={{ color: app.color }} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm">{app.name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{app.desc}</div>
                    </div>
                    <span
                      className="flex items-center gap-1 text-[11px] font-semibold shrink-0 whitespace-nowrap opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      style={{ color: app.color }}
                    >
                      Explore {app.name} <ArrowRight size={11} />
                    </span>
                  </a>
                </AnimatedContainer>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. White expanding — Intelligence layer, vertical divider cards ──── */}
      <ExpandingSection>
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl mx-auto text-center">
            {/* Hand-drawn AI / neural network illustration */}
            <AnimatedContainer delay={0} className="flex justify-center mb-6">
              <svg viewBox="0 0 220 155" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", maxWidth: 148, height: "auto", display: "block", overflow: "visible" }}>
                <defs>
                  <filter id="hd-sp2" x="-15%" y="-15%" width="130%" height="130%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.028 0.020"
                      numOctaves="3" seed="11" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise"
                      scale="3.0" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <g filter="url(#hd-sp2)" stroke="#14213D" strokeLinecap="round" strokeLinejoin="round">

                  {/* Input layer — left column, 3 nodes */}
                  <circle cx="30" cy="36"  r="8" fill="rgba(38,82,177,0.10)" strokeWidth="1.8" />
                  <circle cx="30" cy="78"  r="8" fill="rgba(38,82,177,0.10)" strokeWidth="1.8" />
                  <circle cx="30" cy="120" r="8" fill="rgba(38,82,177,0.10)" strokeWidth="1.8" />

                  {/* Hidden layer — middle column, 4 nodes */}
                  <circle cx="100" cy="24"  r="7" fill="rgba(38,82,177,0.14)" strokeWidth="1.8" />
                  <circle cx="100" cy="60"  r="7" fill="rgba(38,82,177,0.14)" strokeWidth="1.8" />
                  <circle cx="100" cy="96"  r="7" fill="rgba(38,82,177,0.14)" strokeWidth="1.8" />
                  <circle cx="100" cy="131" r="7" fill="rgba(38,82,177,0.14)" strokeWidth="1.8" />

                  {/* Output layer — right column, 2 nodes */}
                  <circle cx="172" cy="52"  r="9" fill="rgba(22,163,74,0.12)" stroke="rgba(22,163,74,0.45)" strokeWidth="1.8" />
                  <circle cx="172" cy="104" r="9" fill="rgba(22,163,74,0.12)" stroke="rgba(22,163,74,0.45)" strokeWidth="1.8" />

                  {/* Connections: input → hidden */}
                  {[36, 78, 120].flatMap((iy) =>
                    [24, 60, 96, 131].map((hy) => (
                      <path key={`${iy}-${hy}`}
                        d={`M 38 ${iy} C 64 ${iy} 76 ${hy} 93 ${hy}`}
                        strokeWidth="1.0" stroke="rgba(38,82,177,0.25)" fill="none" />
                    ))
                  )}

                  {/* Connections: hidden → output */}
                  {[24, 60, 96, 131].flatMap((hy) =>
                    [52, 104].map((oy) => (
                      <path key={`h${hy}-o${oy}`}
                        d={`M 107 ${hy} C 132 ${hy} 146 ${oy} 163 ${oy}`}
                        strokeWidth="1.2" stroke="rgba(22,163,74,0.35)" fill="none" />
                    ))
                  )}

                  {/* Checkmarks inside output nodes */}
                  <path d="M 167 52 L 170 56 L 178 47" strokeWidth="1.6" stroke="#16A34A" fill="none" />
                  <path d="M 167 104 L 170 108 L 178 99" strokeWidth="1.6" stroke="#16A34A" fill="none" />

                  {/* Small "AI" label floating top-right */}
                  <text x="192" y="22" fontSize="13" fontWeight="800"
                    fill="#2652B1" fontFamily="sans-serif">AI</text>
                  {/* Sparkle dots near AI label */}
                  <circle cx="205" cy="34" r="2.4" fill="#FCA311" stroke="none" />
                  <circle cx="194" cy="38" r="1.6" fill="#FCA311" stroke="none" />

                </g>
              </svg>
            </AnimatedContainer>

            <AnimatedContainer>
              <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                Powered by the Grelin AI intelligence layer
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5">
                All specialty deployments run on the same underlying intelligence engine — ensuring shared learning, consistent validation standards, and scalable protection across every application and location.
              </p>
            </AnimatedContainer>
          </div>

          {/* 3 columns with vertical dividers and icons */}
          <div className="mt-20 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">

            {[
              {
                icon: Brain,
                title: "Shared intelligence",
                desc: "Insights from one specialty inform validation across the platform.",
              },
              {
                icon: RefreshCw,
                title: "Cross-application learning",
                desc: "Each application improves as more data flows through the system.",
              },
              {
                icon: TrendingUp,
                title: "Scalable protection",
                desc: "Revenue integrity that grows with your organization — without proportional complexity.",
              },
            ].map((item, i) => (
              <AnimatedContainer key={item.title} delay={0.1 + i * 0.1} className="py-10 md:py-0 md:px-14 first:md:pl-0 last:md:pr-0">
                <item.icon className="text-gray-400 mb-5" size={24} strokeWidth={1.5} />
                <h3 className="text-gray-900 text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </AnimatedContainer>
            ))}

          </div>

        </div>
      </ExpandingSection>

      {/* ── 5. Dark — Pre-bill revenue risk assessment form ─────────────────── */}
      <section id="assessment" className="bg-brand-dark px-4 md:px-8 lg:px-16 py-28 md:py-40">
        <div className="mx-auto max-w-7xl flex flex-col gap-14">

          {/* Centered heading */}
          <AnimatedContainer className="text-center max-w-2xl mx-auto">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
              Pre-bill revenue risk assessment
            </h2>
            <p className="text-slate-400 text-base mt-5 leading-relaxed">
              Answer a few questions about your specialty and revenue cycle workflow. Grelin identifies your top revenue risks and recommends the right application mix for your organization.
            </p>
          </AnimatedContainer>

          {/* What you'll get */}
          <div className="max-w-xl mx-auto w-full">
            {[
              { arrow: "→", label: "Top 3 revenue risk areas",      desc: "Specific to your specialty and workflow" },
              { arrow: "→", label: "Estimated preventable leakage", desc: "Based on specialty benchmarks"           },
              { arrow: "→", label: "Recommended application mix",   desc: "Tailored to your organization"           },
              { arrow: "→", label: "ROI projection",                desc: "Expected impact across your claims volume" },
            ].map((item, i) => (
              <AnimatedContainer key={item.label} delay={0.1 + i * 0.08}>
                <div className="grid grid-cols-[1fr_1fr] items-center gap-8 py-7 border-t border-white/10 last:border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold bg-white/[0.07] text-white">
                      {item.arrow}
                    </div>
                    <span className="text-white font-semibold text-base">{item.label}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>

          {/* Form */}
          <AnimatedContainer delay={0.2} className="w-full max-w-xl mx-auto mt-20">
            <h3 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-center mb-8">
              Start your assessment
            </h3>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col gap-4">

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="sp-firstname">
                    First Name <span className="text-[#FCA311]">*</span>
                  </label>
                  <input id="sp-firstname" type="text" placeholder="First Name" required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="sp-lastname">
                    Last Name <span className="text-[#FCA311]">*</span>
                  </label>
                  <input id="sp-lastname" type="text" placeholder="Last Name" required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="sp-email">
                  Work Email <span className="text-[#FCA311]">*</span>
                </label>
                <input id="sp-email" type="email" placeholder="you@organization.com" required
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="sp-org">
                  Organization <span className="text-[#FCA311]">*</span>
                </label>
                <input id="sp-org" type="text" placeholder="Organization name" required
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="sp-specialty">
                  Specialty
                </label>
                <select id="sp-specialty"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled selected style={{ color: "#4B5563" }}>Select your specialty</option>
                  <option value="pain">Pain Management</option>
                  <option value="wound">Wound Care</option>
                  <option value="mso">MSO / Multi-specialty</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="sp-help">
                  Revenue cycle challenges
                </label>
                <textarea id="sp-help" placeholder="Describe your biggest billing or denial challenges..."
                  className="min-h-[80px] w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors resize-none" />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-[#0B1120] hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                Start your assessment <ArrowRight size={15} />
              </button>
            </div>
          </AnimatedContainer>

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />

    </main>
  );
}
