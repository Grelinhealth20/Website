"use client";

import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Database, BarChart2, Lock, ChevronRight, ScanLine, Activity, ShieldCheck, FileCheck2, Share2 } from "lucide-react";
import { Footer } from "@/components/Footer";

const BRAND = "#FCA311";

/* ─── Animation helpers ──────────────────────────────────────────────────── */

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

function ExpandingSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const paddingX = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (shouldReduceMotion) {
    return (
      <div className="bg-brand-dark">
        <div className="bg-white px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32">{children}</div>
      </div>
    );
  }

  return (
    <motion.div ref={ref} className="bg-brand-dark" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
      <motion.div className="bg-white px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32" style={{ borderRadius }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─── Globe / Orb visual ─────────────────────────────────────────────────── */

type OrbPhase = "upload" | "analyze" | "result";

const phaseVariants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.3 } },
};

function UploadView() {
  return (
    <motion.div key="upload" variants={phaseVariants} initial="initial" animate="animate" exit="exit"
      className="w-[240px] rounded-2xl p-4"
      style={{ background: "#ffffff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Drop zone */}
      <div
        className="w-full rounded-xl flex flex-col items-center justify-center gap-3 py-8 px-4"
        style={{ border: "1.5px dashed #cbd5e1", background: "#f8fafc" }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "#ede9fe" }}
        >
          <ArrowRight size={22} strokeWidth={2.5} className="rotate-[-90deg]" style={{ color: "#7c3aed" }} />
        </motion.div>
        <p className="text-[#334155] text-[11px] text-center font-medium leading-snug">
          Drop PDF, image, or TXT here to upload
        </p>
        <p className="text-[#94a3b8] text-[9px] text-center tracking-wide">
          PDF, TXT, PNG, JPG, JPEG, WEBP
        </p>
      </div>
    </motion.div>
  );
}

function AnalyzeView() {
  return (
    <motion.div key="analyze" variants={phaseVariants} initial="initial" animate="animate" exit="exit"
      className="w-[240px] rounded-2xl p-6 flex flex-col items-center gap-5"
      style={{ background: "#ffffff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Double spinner */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2.5px solid transparent", borderTopColor: BRAND, borderRightColor: BRAND }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[7px] rounded-full"
          style={{ border: "1.5px solid transparent", borderBottomColor: "#e2e8f0", borderLeftColor: "#e2e8f0" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
        <ScanLine size={20} className="text-[#64748b]" strokeWidth={1.5} />
      </div>
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: BRAND }}
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <span className="text-[#94a3b8] text-[10px] tracking-widest uppercase">Analyzing severity…</span>
    </motion.div>
  );
}

const CHART_BARS = [
  { label: "Length", value: 72, cm: "4.5" },
  { label: "Width",  value: 44, cm: "2.8" },
  { label: "Depth",  value: 24, cm: "1.2" },
];

function ResultView() {
  return (
    <motion.div key="result" variants={phaseVariants} initial="initial" animate="animate" exit="exit"
      className="w-[265px] rounded-2xl overflow-hidden"
      style={{ background: "#ffffff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <span className="text-[11px] text-[#0f172a] font-bold">Assessment Summary</span>
        <CheckCircle2 size={14} color="#22c55e" />
      </div>
      {/* Metric tiles 2×2 */}
      <div className="grid grid-cols-2 gap-[4px] p-[4px]" style={{ borderBottom: "1px solid #f1f5f9" }}>
        {[
          { label: "TYPE",     value: "Wound Note",  color: "#0f172a" },
          { label: "SEVERITY", value: "Moderate",    color: BRAND },
          { label: "LOCATION", value: "L. Extrem.",  color: "#0f172a" },
          { label: "LENGTH",   value: "4.5 cm",      color: "#0f172a" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-lg px-2.5 py-2.5" style={{ background: "#f8fafc" }}>
            <div className="text-[8px] text-[#94a3b8] uppercase tracking-wide mb-1">{label}</div>
            <div className="text-[13px] font-semibold leading-none" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div className="px-4 pt-3 pb-4">
        <div className="text-[8px] text-[#94a3b8] uppercase tracking-wide mb-2.5 text-center">Wound Measurements (cm)</div>
        <div className="flex items-end justify-around gap-2" style={{ height: 64 }}>
          {CHART_BARS.map((bar, i) => (
            <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[9.5px] font-semibold" style={{ color: "#334155" }}>{bar.cm}</span>
              <motion.div
                className="w-full rounded-t"
                style={{ background: i === 0 ? BRAND : i === 1 ? "#60a5fa" : "#34d399" }}
                initial={{ height: 0 }}
                animate={{ height: `${bar.value}%` }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: "easeOut" }}
              />
              <span className="text-[8px] text-[#94a3b8]">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function HeroOrb() {
  const [phase, setPhase] = useState<OrbPhase>("upload");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const durations: Record<OrbPhase, number> = { upload: 2500, analyze: 2400, result: 3000 };
    const next: Record<OrbPhase, OrbPhase> = { upload: "analyze", analyze: "result", result: "upload" };
    const t = setTimeout(() => setPhase((p) => next[p]), durations[phase]);
    return () => clearTimeout(t);
  }, [phase, shouldReduceMotion]);

  return (
    <div className="flex items-center justify-center w-[280px] h-[280px] lg:w-[440px] lg:h-[440px] shrink-0">
      <AnimatePresence mode="wait">
        {phase === "upload" && <UploadView />}
        {phase === "analyze" && <AnalyzeView />}
        {phase === "result" && <ResultView />}
      </AnimatePresence>
    </div>
  );
}

/* ─── Wiser Note card ───────────────────────────────────────────────────── */

const WISER_LINES = [
  { text: "MEDICAL RECORD — WOUND CARE", bright: true },
  { text: "", bright: false },
  { text: "ENCOUNTER            LCD L36377 COMPLIANT", bright: false },
  { text: "DOCUMENTATION        AUDIT-READY MEDICAL NOTE", bright: false },
  { text: "─────────────────────────────────────────", bright: false },
  { text: "SECTION 1: PATIENT & ENCOUNTER INFO", bright: true },
  { text: "─────────────────────────────────────────", bright: false },
  { text: "Patient Name:       Doe, J.", bright: false },
  { text: "Medical Record #:   WC-2024-0157", bright: false },
  { text: "Patient ID:         GH-00483-B", bright: false },
  { text: "Date of Service:    May 28, 2026", bright: false },
  { text: "─────────────────────────────────────────", bright: false },
  { text: "SECTION 2: WOUND ASSESSMENT", bright: true },
  { text: "─────────────────────────────────────────", bright: false },
  { text: "Location:           Left lower extremity", bright: false },
  { text: "Stage / Grade:      Stage III  (WISer 3.7)", bright: false },
  { text: "Chronicity:         Chronic — >12 weeks", bright: false },
  { text: "Infection Risk:     Elevated", bright: false },
  { text: "LCD Compliance:     ✓ L36377 VERIFIED", bright: true },
  { text: "─────────────────────────────────────────", bright: false },
  { text: "WISer Score:        3.7 / 5.0", bright: true },
  { text: "Debridement:        Required", bright: false },
  { text: "Healing Trajectory: Declining — 14 days", bright: false },
];

function WiserNoteCard() {
  const [revealed, setRevealed] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) { setRevealed(WISER_LINES.length); return; }
    if (revealed < WISER_LINES.length) {
      const t = setTimeout(() => setRevealed((r) => r + 1), 120);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRevealed(0), 2800);
    return () => clearTimeout(t);
  }, [revealed, shouldReduceMotion]);

  const scanPct = `${Math.min((revealed / WISER_LINES.length) * 100, 99)}%`;

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-t-2xl" style={{ background: "#fff" }}>
      {/* Tabs */}
      <div className="flex items-center justify-between px-3.5 py-2.5 shrink-0" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div className="flex items-center gap-1">
          <span className="px-3 py-1 rounded-md text-[12px] font-semibold text-white" style={{ background: "#5b21b6" }}>
            Wiser Note
          </span>
          <span className="px-3 py-1 rounded-md text-[12px] font-medium text-[#6b7280] cursor-pointer hover:bg-gray-100">
            Ask AI
          </span>
        </div>
        <span className="text-[#9ca3af] text-lg leading-none cursor-pointer select-none">×</span>
      </div>
      {/* Search */}
      <div className="px-3.5 py-2 shrink-0" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ border: "1px solid #e5e7eb" }}>
          <span className="text-[12px] text-[#9ca3af] flex-1">Search note…</span>
          <div className="flex gap-1">
            {["▲", "▼"].map((c) => (
              <span key={c} className="w-5 h-5 rounded flex items-center justify-center text-[9px] text-[#6b7280] cursor-pointer" style={{ background: "#f3f4f6" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Terminal content */}
      <div className="relative flex-1 overflow-hidden px-4 py-3" style={{ background: "#0d1829" }}>
        {/* Scan line */}
        {revealed < WISER_LINES.length && (
          <div
            className="absolute left-0 right-0 h-[1px] z-10 pointer-events-none"
            style={{
              top: scanPct,
              background: `linear-gradient(90deg, transparent 0%, ${BRAND} 20%, ${BRAND} 80%, transparent 100%)`,
              boxShadow: `0 0 8px ${BRAND}, 0 0 16px ${BRAND}60`,
            }}
          />
        )}
        {/* Glow under scan */}
        {revealed < WISER_LINES.length && (
          <div
            className="absolute left-0 right-0 h-8 z-10 pointer-events-none"
            style={{
              top: scanPct,
              background: `linear-gradient(to bottom, ${BRAND}18 0%, transparent 100%)`,
            }}
          />
        )}
        <div className="flex flex-col" style={{ gap: "2px" }}>
          {WISER_LINES.map((line, i) => (
            <motion.div
              key={i}
              animate={{ opacity: i < revealed ? 1 : 0 }}
              transition={{ duration: 0.12 }}
              className="font-mono leading-[1.55] whitespace-pre"
              style={{
                fontSize: "10px",
                color: line.bright ? "#e8f0fa" : "#5a7a96",
              }}
            >
              {line.text || " "}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Feature grid cards ─────────────────────────────────────────────────── */

const FEATURE_CARDS = [
  {
    icon: Activity,
    accent: "#3152AD",
    accentBg: "#e8f1fe",
    title: "WISer Severity Indexing",
    description: "Automated staging and complexity analysis based on real-time clinician input and deep-learning image analysis.",
    stat: { label: "Accuracy", value: "97%" },
  },
  {
    icon: ShieldCheck,
    accent: "#16a34a",
    accentBg: "#dcfce7",
    title: "LCD/NCD Compliance",
    description: "Real-time alerts for missing debridement and documentation gaps.",
    stat: { label: "Rules Checked", value: "4M+" },
  },
  {
    icon: FileCheck2,
    accent: BRAND,
    accentBg: "#fff3dc",
    title: "Audit-Ready Trails",
    description: "Every documentation action is timestamped, traceable, audit-linked.",
    stat: { label: "Uptime", value: "99.9%" },
  },
  {
    icon: Share2,
    accent: "#7c3aed",
    accentBg: "#f3e8ff",
    title: "Comorbidity Cross-Linking",
    description: "Dynamic acuity adjustment based on underlying clinical markers like A1C levels, BMI, and smoking status.",
    stat: { label: "Markers", value: "120+" },
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function WoundPage() {
  return (
    <main className="bg-brand-dark text-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[680px] md:min-h-[760px]">
        {/* Background SVG */}
        <img
          src="/wound-hero-bg.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-left md:object-center pointer-events-none select-none"
        />

        {/* Mobile glow — subtle sphere hint (hidden on md+) */}
        <div
          aria-hidden
          className="md:hidden absolute pointer-events-none"
          style={{
            right: "-80px",
            top: "10%",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(49,82,173,0.22) 0%, rgba(49,82,173,0.08) 45%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        {/* bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: "30%",
            background: "linear-gradient(to bottom, transparent 0%, #0B1120 100%)",
          }}
        />

        {/* Orb — centered on SVG white circle (desktop only) */}
        <div
          className="hidden lg:flex absolute items-center justify-center z-20"
          style={{ left: "67.8%", top: "53%", transform: "translate(-50%, -50%)" }}
        >
          <HeroOrb />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl pl-6 pr-6 md:pl-6 md:pr-16 lg:pl-6 lg:pr-24 pt-28 md:pt-44 pb-16 md:pb-24">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-1.5 text-[13px]">
              <a href="/solutions" className="text-white/40 hover:text-white/70 transition-colors">
                Solutions
              </a>
              <ChevronRight size={13} className="text-white/25 shrink-0" />
              <span className="text-white/70">Wound.ai</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-8">
            {/* Left — text */}
            <div className="flex flex-col gap-5 w-full lg:w-[52%]">
              <AnimatedContainer delay={0.05}>
                <span className="inline-flex items-center rounded-[12px] bg-white/10 border border-white/50 px-[13px] py-[5px] text-[12px] font-semibold text-[#eee] tracking-[0.6px] uppercase whitespace-nowrap">
                  Live Compliance Monitoring
                </span>
              </AnimatedContainer>

              <AnimatedContainer delay={0.12}>
                <h1
                  className="text-[36px] md:text-[44px] lg:text-[48px] font-extrabold leading-[1.15] tracking-tight"
                  style={{ letterSpacing: "-0.96px" }}
                >
                  <span><span className="text-white">Wound.ai: </span><span style={{ color: BRAND }}>Clinical-Grade</span></span>
                  <br />
                  <span className="text-white">Wound Severity Indexing</span>
                </h1>
              </AnimatedContainer>

              <AnimatedContainer delay={0.2}>
                <p className="text-[#c6c6cd] text-base md:text-lg leading-relaxed max-w-lg">
                  Eliminate documentation gaps with WISer™ severity indexing. Automated LCD/NCD
                  compliance locks ensure every clinical encounter is audit-ready before billing.
                </p>
              </AnimatedContainer>

              <AnimatedContainer delay={0.28} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
                <a
                  href="/company?service=wound.ai-%E2%80%94-wound-severity-indexing"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold bg-white text-[#0B1120] hover:bg-white/90 transition-colors"
                >
                  Schedule Clinical Review
                </a>
                <a
                  href="#clinicalflowsection"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold border border-white/25 text-white hover:bg-white/10 transition-colors"
                >
                  View Clinical Flow
                </a>
                  {/* Explore Capability Matrix */}

              </AnimatedContainer>
            </div>

            {/* Right — orb (mobile/tablet only) */}
            <AnimatedContainer delay={0.15} className="w-full lg:hidden flex justify-center">
              <HeroOrb />
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* ── WISer Standard ───────────────────────────────────────────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left — WiserNote interface */}
            <AnimatedContainer delay={0.08} className="w-full lg:w-[45%] shrink-0">
              <div
                className="w-full rounded-[28px] pt-4 px-4 pb-0 overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #dce8f5 0%, #e8f1fa 100%)",
                  aspectRatio: "4/3",
                }}
              >
                <WiserNoteCard />
              </div>
            </AnimatedContainer>

            {/* Right — content */}
            <div className="flex flex-col gap-5 w-full lg:w-[55%]">
              <AnimatedContainer delay={0.1}>
                <h2 className="text-[#11244e] text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-tight tracking-tight">
                  The WISer Standard: Advanced Clinical Intelligence
                </h2>
              </AnimatedContainer>

              <AnimatedContainer delay={0.18}>
                <p className="text-[#4b6182] text-base leading-relaxed">
                  WISer is a clinical-grade AI engine trained on 4M+ patient encounters to detect
                  wound severity, chronicity, and infection risks beyond standard EHR analysis.
                </p>
              </AnimatedContainer>

              <AnimatedContainer delay={0.24}>
                <ul className="flex flex-col gap-3 mt-1">
                  {[
                    "Proprietary chronicity scoring",
                    "Multi-dimensional depth analysis",
                    "Predictive healing trajectories",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="shrink-0" style={{ color: BRAND }} />
                      <span className="text-[#4b6182] text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </ExpandingSection>

      {/* ── Clinical Validation Flow ──────────────────────────────────────────── */}
      <section id="clinicalflowsection" className="bg-brand-dark px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <AnimatedContainer delay={0.05}>
              <h2
                className="text-white text-3xl md:text-4xl lg:text-[48px] font-extrabold leading-tight tracking-tight"
                style={{ letterSpacing: "-0.96px" }}
              >
                Clinical Validation Flow
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.12}>
              <p className="text-white/60 mt-3 text-base md:text-lg leading-relaxed">
                From point-of-care to reimbursement: a seamless, automated integrity chain.
              </p>
            </AnimatedContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Database,
                title: "Ingestion",
                description:
                  "Direct synchronization with EHR data and proprietary clinical photo capture at the bedside.",
              },
              {
                icon: BarChart2,
                title: "Validation",
                description:
                  "Instant benchmarking against millions of rules and LCD guidelines for real-time gap detection.",
              },
              {
                icon: Lock,
                title: "Integrity Lock",
                description:
                  "Cryptographic certification of documentation compliance before it ever touches the billing queue.",
              },
            ].map((card, i) => (
              <AnimatedContainer key={card.title} delay={0.1 + i * 0.08}>
                <div
                  className="rounded-[30px] px-8 py-10 flex flex-col items-center text-center gap-5 h-full bg-white"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                >
                  <div className="rounded-2xl w-[63px] h-[63px] flex items-center justify-center shrink-0" style={{ background: "#e8f1fe" }}>
                    <card.icon size={24} style={{ color: "#3152AD" }} />
                  </div>
                  <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug">{card.title}</h3>
                  <p className="text-[#4b5a72] text-sm leading-relaxed">{card.description}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Grid ─────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark px-6 md:px-10 lg:px-16 pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        <img
          src="/hero-bg.svg"
          alt=""
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            right: 0,
            top: 0,
            width: "55%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0.55,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURE_CARDS.map((card, i) => (
            <AnimatedContainer key={card.title} delay={0.06 + i * 0.07}>
              <div className="bg-white rounded-[28px] p-7 flex flex-col gap-4 h-full" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
                {/* Top row: icon + stat */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: card.accentBg }}>
                    <card.icon size={22} style={{ color: card.accent }} strokeWidth={1.8} />
                  </div>
                  <div className="text-right">
                    <div className="text-[22px] font-extrabold leading-none" style={{ color: card.accent }}>{card.stat.value}</div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5 uppercase tracking-wide">{card.stat.label}</div>
                  </div>
                </div>
                {/* Divider */}
                <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.06)" }} />
                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0f1a2e] text-[18px] font-semibold leading-snug">{card.title}</h3>
                  <p className="text-[#4b5a72] text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      {/* ── Measurable Clinical ROI ───────────────────────────────────────────── */}
      <section className="relative bg-brand-dark px-6 md:px-16 lg:px-24 py-20 md:py-28 overflow-hidden">
        <div
          aria-hidden
          className="absolute pointer-events-none left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-64"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(252,163,17,0.08) 0%, transparent 70%)",
          }}
        />

        <AnimatedContainer delay={0.05} className="relative z-10 mx-auto max-w-6xl">
          <div
            className="rounded-[40px] p-8 md:p-10 lg:p-16 flex flex-col lg:flex-row gap-10 lg:gap-16"
            style={{
              background: "rgba(21,32,57,0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Left — heading + metrics */}
            <div className="flex flex-col gap-7 w-full lg:w-1/2">
              <div>
                <h2
                  className="text-white text-3xl md:text-4xl lg:text-[48px] font-extrabold leading-tight tracking-tight"
                  style={{ letterSpacing: "-0.96px" }}
                >
                  Measurable Clinical ROI
                </h2>
                <p className="text-white/60 text-base mt-4 leading-relaxed">
                  Wound.ai improves care while maximizing accurate severity-based reimbursement.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { label: "First-Pass Acceptance", value: "94%" },
                  { label: "Denial Reduction", value: "31%" },
                  { label: "Avg. Yield Uplift / Center", value: "$1.2M" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-end justify-between pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="text-white/80 text-base">{row.label}</span>
                    <span className="text-base font-semibold" style={{ color: BRAND }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Pre-Bill Integrity Layer card */}
            <div
              className="flex flex-col gap-8 w-full lg:w-1/2 rounded-[24px] p-8"
              style={{
                background: "#141f38",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white text-base font-semibold">Pre-Bill Integrity Layer</span>
                <span
                  className="text-[11px] font-bold tracking-[0.6px] px-3 py-1 rounded-full text-white uppercase"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  Active Monitoring
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { label: "EHR Integration", sub: "Seamless FHIR-based data extraction", accent: BRAND },
                  { label: "Integrity Shield", sub: "LCD/NCD Rule Validation", accent: `${BRAND}99` },
                  { label: "Billing Export", sub: "Verified 837 claim generation", accent: `${BRAND}55` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      background: "#1f2943",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="w-2 h-12 rounded-full shrink-0" style={{ background: item.accent }} />
                    <div>
                      <p className="text-white text-base font-medium">{item.label}</p>
                      <p className="text-[#c6c6cd] text-sm mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32 px-6">
        <div
          aria-hidden
          className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[816px] h-[816px]"
          style={{
            background: "radial-gradient(circle, rgba(5,79,249,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-8 text-center">
          <AnimatedContainer delay={0.05}>
            <h2
              className="text-[#0f192a] text-3xl md:text-4xl lg:text-[48px] font-extrabold leading-tight tracking-tight"
              style={{ letterSpacing: "-0.96px" }}
            >
              Ready to Lock Your Revenue Integrity?
            </h2>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15} className="flex flex-col sm:flex-row gap-3">
            <a
              href="/company?service=wound.ai-%E2%80%94-wound-severity-indexing"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1120] px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-white hover:bg-[#1a2540] transition-colors"
            >
              Schedule Clinical Review
            </a>
            <a
              href="#clinicalflowsection"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0B1120]/30 px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-[#0B1120] hover:bg-[#0B1120]/5 transition-colors"
            >
              View Clinical Flow
            </a>
            {/* Explore Capability Matrix */}
          </AnimatedContainer>

          <AnimatedContainer delay={0.22}>
            <p className="text-[#0f192a] text-sm opacity-60">
              Join 450+ facilities transforming wound care with Grelin AI.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}
