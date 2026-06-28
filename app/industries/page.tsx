"use client";

import {
  ArrowRight,
  Building2,
  Pill,
  Package,
  Users,
  Stethoscope,
  CreditCard,
  ShieldCheck,
  TrendingDown,
  LayoutGrid,
  TrendingUp,
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

/* ─── Claim Pipeline Monitor ────────────────────────────────────────────────── */

type PipelineNode = { key: string; label: string; pct: number; isGrelin?: boolean };

const PIPELINE_NODES: PipelineNode[] = [
  { key: "elig", label: "Eligibility", pct: 10 },
  { key: "auth", label: "Auth",        pct: 28 },
  { key: "grel", label: "GRELIN",      pct: 50, isGrelin: true },
  { key: "code", label: "Coding",      pct: 72 },
  { key: "sub",  label: "Submit",      pct: 90 },
];

const CLAIM_QUEUE = [
  { id: "CLM-4821", org: "RCM Partners",   specialty: "Pain Mgmt",    clean: true },
  { id: "CLM-4822", org: "Midwest Wound",  specialty: "Wound Care",   clean: false, issue: "Missing prior auth · CPT 64635"  },
  { id: "CLM-4823", org: "Desert Pain",    specialty: "Pain Mgmt",    clean: true },
  { id: "CLM-4824", org: "Valley DME",     specialty: "DME Supply",   clean: false, issue: "LCD documentation gap detected"  },
  { id: "CLM-4825", org: "Northeast MSO",  specialty: "Multi-spec",   clean: true },
  { id: "CLM-4826", org: "Pacific Pharma", specialty: "Specialty Rx", clean: true },
];

type LogEntry = typeof CLAIM_QUEUE[number];

function ClaimPipelineMonitor() {
  const [claimIdx, setClaimIdx] = useState(0);
  const [tokenPct, setTokenPct] = useState(-8);
  const [activeNode, setActiveNode] = useState(-1);
  const [showFlag, setShowFlag] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([CLAIM_QUEUE[4], CLAIM_QUEUE[2]]);

  const claim = CLAIM_QUEUE[claimIdx];

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      setTokenPct(-8);
      setActiveNode(-1);
      setShowFlag(false);
      setTokenVisible(false);

      await wait(300);
      if (cancelled) return;
      setTokenVisible(true);
      setTokenPct(10); setActiveNode(0);

      await wait(700); if (cancelled) return;
      setTokenPct(28); setActiveNode(1);

      await wait(700); if (cancelled) return;
      setTokenPct(50); setActiveNode(2);

      if (!claim.clean) {
        await wait(450); if (cancelled) return;
        setShowFlag(true);
        await wait(1500); if (cancelled) return;
        setShowFlag(false);
        await wait(300); if (cancelled) return;
      } else {
        await wait(900); if (cancelled) return;
      }

      setTokenPct(72); setActiveNode(3);
      await wait(700); if (cancelled) return;
      setTokenPct(90); setActiveNode(4);
      await wait(600); if (cancelled) return;
      setTokenPct(108);
      await wait(500); if (cancelled) return;

      setLog(prev => [claim, ...prev].slice(0, 4));
      setTokenVisible(false);

      await wait(700); if (cancelled) return;
      setClaimIdx(i => (i + 1) % CLAIM_QUEUE.length);
    };

    run();
    return () => { cancelled = true; };
  }, [claimIdx]);

  const tokenColor = showFlag ? "#FF9E00" : "#4ADE80";

  return (
    <div
      className="w-full h-full flex flex-col select-none overflow-hidden rounded-xl"
      style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3.5 shrink-0"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div>
          <p className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: "rgba(0,0,0,0.82)" }}>
            Claim Pipeline Monitor
          </p>
          <p className="text-[8.5px] mt-0.5" style={{ color: "rgba(0,0,0,0.38)" }}>
            Grelin Intelligence Layer
          </p>
        </div>
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ background: "rgba(74,222,128,0.13)", border: "1px solid rgba(74,222,128,0.25)" }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#4ADE80" }}
          />
          <span className="text-[9px] font-semibold" style={{ color: "#4ADE80" }}>Live</span>
        </motion.div>
      </div>

      {/* ── Pipeline ───────────────────────────────────────────── */}
      <div className="px-5 pt-5 pb-3 shrink-0">

        {/* Labels */}
        <div className="relative h-3.5 mb-3">
          {PIPELINE_NODES.map((node) => (
            <div
              key={node.key}
              className="absolute text-center leading-none"
              style={{
                left: `${node.pct}%`,
                transform: "translateX(-50%)",
                fontSize: node.isGrelin ? 8 : 7.5,
                fontWeight: node.isGrelin ? 800 : 600,
                letterSpacing: node.isGrelin ? "0.08em" : "0.04em",
                textTransform: "uppercase",
                color: node.isGrelin
                  ? "#2652B1"
                  : activeNode >= PIPELINE_NODES.findIndex(n => n.key === node.key)
                    ? "rgba(0,0,0,0.68)"
                    : "rgba(0,0,0,0.22)",
                transition: "color 0.4s ease",
              }}
            >
              {node.label}
            </div>
          ))}
        </div>

        {/* Track + nodes + token */}
        <div className="relative h-9">
          {/* Base track */}
          <div
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
            style={{ height: 1, background: "rgba(0,0,0,0.1)" }}
          />

          {/* Filled track */}
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2"
            style={{ height: 1, background: "rgba(38,82,177,0.7)", originX: 0 }}
            animate={{ width: `${Math.max(0, Math.min(tokenPct, 100))}%` }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />

          {/* Nodes */}
          {PIPELINE_NODES.map((node, i) => {
            const passed = activeNode > i;
            const active = activeNode === i;
            return (
              <div
                key={node.key}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${node.pct}%`, zIndex: 2 }}
              >
                {/* Grelin glow */}
                {node.isGrelin && active && (
                  <motion.div
                    animate={{ opacity: [0, 0.6, 0], scale: [1, 1.8, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: showFlag ? "#FF9E00" : "#2652B1",
                      filter: "blur(5px)",
                      width: 22, height: 22,
                      left: -3, top: -3,
                    }}
                  />
                )}

                <motion.div
                  className="rounded-full flex items-center justify-center"
                  animate={node.isGrelin && active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 1.2, repeat: node.isGrelin && active ? Infinity : 0 }}
                  style={{
                    width: node.isGrelin ? 16 : 11,
                    height: node.isGrelin ? 16 : 11,
                    background: node.isGrelin
                      ? active
                        ? showFlag ? "#FF9E00" : "#2652B1"
                        : passed ? "#2652B1" : "rgba(38,82,177,0.15)"
                      : passed
                        ? "#2652B1"
                        : active
                          ? "rgba(0,0,0,0.07)"
                          : "rgba(0,0,0,0.04)",
                    border: `1.5px solid ${
                      node.isGrelin
                        ? active ? (showFlag ? "#FF9E00" : "#3B6FE8") : passed ? "#3B6FE8" : "rgba(38,82,177,0.25)"
                        : passed ? "rgba(38,82,177,0.7)" : active ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.14)"
                    }`,
                    transition: "all 0.35s ease",
                    position: "relative",
                  }}
                >
                  {passed && !node.isGrelin && (
                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
                      <polyline points="0.8,2.5 2,3.7 4.2,1.3" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {node.isGrelin && (
                    <span style={{ fontSize: 6.5, fontWeight: 900, color: "white", lineHeight: 1 }}>G</span>
                  )}
                </motion.div>
              </div>
            );
          })}

          {/* Moving token */}
          <AnimatePresence>
            {tokenVisible && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ zIndex: 3 }}
                animate={{ left: `${Math.max(0, Math.min(tokenPct, 100))}%` }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0.4 }}
                exit={{ opacity: 0, scale: 0.4 }}
              >
                <motion.div
                  animate={{ boxShadow: [`0 0 0px ${tokenColor}`, `0 0 8px ${tokenColor}`, `0 0 0px ${tokenColor}`] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{
                    width: 9, height: 9,
                    borderRadius: "50%",
                    background: tokenColor,
                    border: `1.5px solid ${tokenColor}`,
                    transition: "background 0.3s, border-color 0.3s",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active claim row */}
        <div className="mt-3 flex items-center justify-between min-h-[20px]">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-medium tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
              Processing
            </span>
            <span className="text-[9px] font-mono font-semibold" style={{ color: "rgba(0,0,0,0.78)" }}>
              {claim.id}
            </span>
            <span className="text-[9px]" style={{ color: "rgba(0,0,0,0.4)" }}>
              · {claim.org}
            </span>
          </div>

          <AnimatePresence>
            {showFlag && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-md shrink-0"
                style={{ background: "rgba(255,158,0,0.1)", border: "1px solid rgba(255,158,0,0.28)" }}
              >
                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "#FF9E00" }} />
                <span className="text-[8px] font-medium" style={{ color: "#FF9E00" }}>
                  {claim.issue}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Live log ───────────────────────────────────────────── */}
      <div className="flex-1 px-5 overflow-hidden" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <p className="text-[7px] font-bold tracking-[0.12em] uppercase mt-3 mb-2" style={{ color: "rgba(0,0,0,0.3)" }}>
          Recent
        </p>
        <div className="flex flex-col">
          <AnimatePresence initial={false}>
            {log.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5 py-1.5"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: entry.clean ? "#4ADE80" : "#FF9E00" }}
                />
                <span className="text-[9px] font-mono w-[58px] shrink-0" style={{ color: "rgba(0,0,0,0.65)" }}>
                  {entry.id}
                </span>
                <span className="text-[9px] flex-1 min-w-0 truncate" style={{ color: "rgba(0,0,0,0.38)" }}>
                  {entry.org}
                </span>
                <span
                  className="text-[7.5px] font-bold tracking-wide px-1.5 py-0.5 rounded shrink-0"
                  style={{
                    background: entry.clean ? "rgba(74,222,128,0.13)" : "rgba(255,158,0,0.08)",
                    color: entry.clean ? "#4ADE80" : "#FF9E00",
                    border: `1px solid ${entry.clean ? "rgba(74,222,128,0.2)" : "rgba(255,158,0,0.2)"}`,
                  }}
                >
                  {entry.clean ? "CLEAN" : "FLAGGED"}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-3 shrink-0"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        {[
          { label: "Validated",  value: "1,284", color: "rgba(0,0,0,0.75)"  },
          { label: "Clean Rate", value: "94.2%", color: "#16A34A"            },
          { label: "Flags",      value: "74",    color: "#D97706"             },
        ].map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center py-3.5"
            style={{ borderRight: i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
          >
            <span className="text-sm font-extrabold leading-none" style={{ color: s.color }}>
              {s.value}
            </span>
            <span className="text-[7.5px] mt-1 uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.35)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Industries data ───────────────────────────────────────────────────────── */

const INDUSTRIES = [
  {
    badge: "RCM Service Providers",
    tabLabel: "RCM Providers",
    title: "Margin lives in clean claims",
    body: "You run revenue cycle for dozens of physician clients. Every denial you work is your P&L — not just your client's revenue. Grelin catches what would have been kicked back before submission. The same coder manages more accounts because rework volume drops.",
    longBody1: "You run revenue cycle for dozens or hundreds of physician clients. Your margin lives in the gap between what your team has to touch and what flows clean. Every denial you work is your P&L — not just your client's revenue.",
    longBody2: "Grelin catches what would have been kicked back before submission. The same coder can manage more accounts because the rework volume drops. That is how RCM service providers scale clients without scaling headcount.",
    icon: Users,
    color: "#FCA311",
    accent: "rgba(252,163,17,0.13)",
  },
  {
    badge: "Physician Groups & Specialty Practices",
    tabLabel: "Physician Groups",
    title: "Payer logic enforced before the claim is written",
    body: "A pain management group bills nothing like a wound care group. National payer policy varies by region, plan, and LCD. Grelin learns the specialty's rules and enforces them upstream — moving denial appeal work into documentation and coding, where the leak actually starts.",
    longBody1: "Specialty practices live and die on payer-specific rules. A pain management group bills nothing like a wound care group. A wound care group bills nothing like an infusion clinic. National payer policy varies by region, by plan, and by Local Coverage Determination (LCD).",
    longBody2: "Grelin learns the specialty's payer logic and enforces it before the claim is written. The work that used to live in denial appeals moves upstream into the documentation and coding workflow. That is where the leak actually starts.",
    icon: Stethoscope,
    color: "#3B82F6",
    accent: "rgba(59,130,246,0.13)",
  },
  {
    badge: "MSOs & Multi-Specialty Operators",
    tabLabel: "MSOs",
    title: "One P&L. Consistent integrity across every practice.",
    body: "Multiple specialties, EHRs, and billing teams — one P&L. Variability across the portfolio creates rework no central team can fully manage. Grelin normalizes claim integrity across every practice and gives central operators a single view of where revenue is leaking.",
    longBody1: "Management Service Organizations carry a problem that single-specialty groups do not. Multiple specialties, multiple EHRs, multiple billing teams — one P&L. Variability across the portfolio creates rework no central team can fully manage.",
    longBody2: "Grelin normalizes claim integrity across every practice under the umbrella. The intelligence layer stays consistent even when the underlying systems are not. Central operators get a single view of where revenue is leaking and why.",
    icon: Building2,
    color: "#A78BFA",
    accent: "rgba(167,139,250,0.13)",
  },
  {
    badge: "DME & Medical Supply Providers",
    tabLabel: "DME & Medical",
    title: "Close audit exposure before billing",
    body: "DME denial rates are among the highest in U.S. healthcare. A missing physician signature or documentation gap can void an entire month of billing. Grelin validates the claim against payer requirements and LCDs before it leaves the building.",
    longBody1: "DME denial rates are among the highest in U.S. healthcare. Documentation requirements are unforgiving. Audit risk is constant. A missing physician signature, a documentation gap, or a coding mismatch can void an entire month of billing.",
    longBody2: "Grelin validates the claim against payer documentation requirements and Local Coverage Determinations before the claim leaves the building. Audit exposure shrinks because the work was correct before it was billed.",
    icon: Package,
    color: "#22D3EE",
    accent: "rgba(34,211,238,0.13)",
  },
  {
    badge: "Specialty Pharmacy & Pharma Distribution",
    tabLabel: "Specialty Pharmacy",
    title: "A missed step on a $50,000 claim is a margin event",
    body: "Specialty drugs carry prior authorization complexity, J-code rules, and white-bagging logistics. The cost of getting it wrong is the entire dispense. Grelin enforces the authorization, coding, and documentation chain before dispense or billing.",
    longBody1: "Specialty drugs carry prior authorization complexity, J-code rules, and white-bagging logistics. A single missed step on a $50,000 drug claim is a margin event, not a denial. The cost of getting it wrong is not a few dollars — it is the entire dispense.",
    longBody2: "Grelin enforces the authorization, coding, and documentation chain before dispense or billing. Distributors and specialty pharmacies see the failure points before they create cash exposure.",
    icon: Pill,
    color: "#4ADE80",
    accent: "rgba(74,222,128,0.13)",
  },
  {
    badge: "Payers",
    tabLabel: "Payers",
    title: "The claim arrives clean",
    body: "Every pended claim has a cost — and so do the appeals, record requests, and provider calls that follow. Today that gets handled after the fact. Grelin applies payer logic before the claim is written. Fewer pended claims. Lower cost per claim. Less friction with providers.",
    longBody1: "You adjudicate millions of claims a year. A claim that cannot auto-adjudicate gets pended — it stops and waits for a human to review it. Every pended claim has a cost. So does every appeal, every medical record request, and every provider call that follows.",
    longBody2: "Grelin applies payer logic before the claim is written. Eligibility, authorization, coding, and documentation get checked against the payer's own rules at the source. The claim arrives clean. Fewer pended claims. Lower cost per claim. Less friction with the provider network.",
    icon: CreditCard,
    color: "#F472B6",
    accent: "rgba(244,114,182,0.13)",
  },
];

/* ─── Scaled illustration wrapper ──────────────────────────────────────────── */

const DESIGN_W = 520;
const DESIGN_H = 420;

function ScaledMonitor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESIGN_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", width: "100%", height: DESIGN_H * scale, overflow: "hidden" }}
    >
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <ClaimPipelineMonitor />
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function IndustriesPage() {
  return (
    <main className="bg-brand-dark text-white">

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16 py-24 md:py-40">

        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-blue opacity-[0.06] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col md:flex-row md:items-center gap-16 md:gap-20">

          {/* Left: text */}
          <div className="md:w-[48%] flex flex-col gap-6">
            <AnimatedContainer>
              <span className="inline-flex items-center rounded-[12px] bg-white/10 border border-white/50 px-[13px] py-[5px] text-[12px] font-semibold text-[#eee] tracking-[0.6px] uppercase whitespace-nowrap">
                Claim Integrity
              </span>
            </AnimatedContainer>

            <AnimatedContainer delay={0.15}>
              <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                If claim integrity drives your revenue, you need it enforced. Grelin is the{" "}
                <span className="text-brand-blue">AI Intelligence</span>{" "}
                layer built for that.
              </h1>
            </AnimatedContainer>

            <AnimatedContainer delay={0.25}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Every claim that flows through U.S. healthcare passes through the same fragile chain — eligibility, authorization, documentation, coding, charge capture, submission. When that chain breaks, the work shows up later as denials, appeals, and lost revenue. Both sides pay for it.
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
                  href="#industries"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  View Industries
                </a>
              </div>
            </AnimatedContainer>
          </div>

          {/* Right: illustration */}
          <AnimatedContainer delay={0.3} className="md:w-[52%]">
            <div className="relative">
              {/* Radial gradient glow */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  inset: "-30% -20%",
                  background: "radial-gradient(ellipse at 50% 60%, #306BFF 0%, #152039 50%, transparent 75%)",
                  opacity: 0.8,
                  zIndex: 0,
                }}
              />
              <div className="relative z-10 w-full rounded-xl overflow-hidden">
                <ScaledMonitor />
              </div>
            </div>
          </AnimatedContainer>

        </div>
      </section>

      {/* ── 2. White — how Grelin operates ──────────────────────────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl mx-auto text-center">
            <AnimatedContainer>
              <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                Grelin operates on the integrity of the claim itself —{" "}
                <span className="text-brand-blue">before the chain breaks.</span>
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5 text-pretty">
                When the chain breaks, the work shows up later as denials, appeals, manual reviews, and lost revenue. The provider pays in rework and cash. The payer pays in administrative cost and friction.
              </p>
            </AnimatedContainer>
            <AnimatedContainer delay={0.25}>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-4 text-pretty">
                The buyers who feel this pain today sit on the provider side. The same logic applies to the payer side of the wire.
              </p>
            </AnimatedContainer>
          </div>

          {/* UI mockup cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Card 1 — Pre-billing validation */}
            <AnimatedContainer delay={0.1}>
              <div>
                <div className="rounded-2xl overflow-hidden bg-[#0f1929] h-[260px] flex flex-col px-5 pt-5">
                  <div className="flex items-center gap-1.5 mb-3 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="ml-2 text-[9px] text-white/30 font-mono">pre-bill-validator · CLM-4821</span>
                  </div>
                  <div className="flex-1 rounded-t-lg overflow-hidden" style={{ background: "#141e30" }}>
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF9E00]" />
                        <span className="text-[10px] font-semibold text-white/80">Pre-bill Validation</span>
                      </div>
                      <span className="text-[9px] text-white/30 font-mono">Claim integrity check</span>
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
                <div className="pt-5">
                  <h3 className="text-gray-900 text-lg font-bold mb-2">Before the claim is created</h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-pretty">
                    Grelin intervenes before the claim is ever written — resolving issues while the encounter is still active.
                  </p>
                </div>
              </div>
            </AnimatedContainer>

            {/* Card 2 — Denial risk */}
            <AnimatedContainer delay={0.2}>
              <div>
                <div className="rounded-2xl overflow-hidden bg-[#0f1929] h-[260px] flex flex-col px-5 pt-5">
                  <div className="flex items-center gap-1.5 mb-3 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="ml-2 text-[9px] text-white/30 font-mono">denial-risk · real-time</span>
                  </div>
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
                <div className="pt-5">
                  <h3 className="text-gray-900 text-lg font-bold mb-2">Not weeks later — right now</h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-pretty">
                    Issues are identified at the point of origin — not discovered through a denial that arrives weeks after submission.
                  </p>
                </div>
              </div>
            </AnimatedContainer>

          </div>

        </div>
      </ExpandingSection>

      {/* ── 3. Dark — Industries ─────────────────────────────────────────────── */}
      <section id="industries" className="relative overflow-hidden bg-[#07111f] py-10 md:py-14">

        {/* SVG background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/bg-pattern.svg')",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "top center",
          }}
        />

        <div className="relative px-6 md:px-16">
          {/* Rounded glass container */}
          <div
            className="rounded-[27px] py-8 md:py-10"
            style={{
              background: "rgba(11,28,48,0.35)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="mx-auto max-w-7xl px-5 md:px-0">

              <div className="max-w-2xl mb-8 md:mb-10">
                <AnimatedContainer>
                  <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                    Who carries this problem today
                  </h2>
                </AnimatedContainer>
                <AnimatedContainer delay={0.15}>
                  <p className="text-base leading-relaxed mt-5 text-white">
                    The pain sits on both sides of the wire. The provider side carries the denial. The payer carries the cost of working the same broken claim.
                  </p>
                </AnimatedContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INDUSTRIES.map((industry, i) => (
                  <AnimatedContainer key={industry.badge} delay={0.05 + (i % 3) * 0.1}>
                    <div className="bg-white rounded-[20px] px-5 py-5 md:px-8 md:py-7 flex flex-col gap-3 h-full">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: industry.accent }}
                        >
                          <industry.icon size={15} style={{ color: industry.color }} strokeWidth={2} />
                        </div>
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: industry.color }}
                        >
                          {industry.badge}
                        </span>
                      </div>
                      <h3 className="text-[#0f192a] font-bold text-xl leading-snug">
                        {industry.title}
                      </h3>
                      <p className="text-[#355a7b] text-base leading-relaxed">
                        {industry.body}
                      </p>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 4. White — two sides ─────────────────────────────────────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <AnimatedContainer>
              <h2 className="text-[#05233d] text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                Billing and claim integrity are two sides of the same problem.
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.15}>
              <p className="text-[#355a7b] text-base md:text-lg leading-relaxed mt-5 text-pretty">
                The provider side carries the denial. The payer carries the cost of working the same broken claim. Both sides pay for a problem that starts before the claim ever leaves the building.
              </p>
            </AnimatedContainer>

            {/* Button above cards */}
            <AnimatedContainer delay={0.25}>
              <div className="mt-8">
                <a
                  href="#assessment"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0B1120] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#0B1120]/80 transition-colors"
                >
                  Start Assessment <ArrowRight size={15} />
                </a>
              </div>
            </AnimatedContainer>
          </div>

          {/* 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "The provider side",
                desc: "The provider side carries the denial. Rework, appeals, and lost revenue show up weeks after the claim was submitted wrong. The provider pays in cash and time.",
              },
              {
                icon: CreditCard,
                title: "The payer side",
                desc: "The payer carries the cost of the same broken claim — pended reviews, medical record requests, provider calls, and administrative friction.",
              },
              {
                icon: ShieldCheck,
                title: "Before the chain breaks",
                desc: "The claim arrives correct before it leaves. No denials to work, no pended claims to review. Lower cost per claim for everyone who touches it.",
              },
            ].map((card, i) => (
              <AnimatedContainer key={card.title} delay={0.1 + i * 0.1}>
                <div
                  className="rounded-[30px] px-10 py-10 flex flex-col items-center text-center gap-5 h-full"
                  style={{
                    background: "#cde7ff",
                    boxShadow: "inset 0px 0px 30px -2px rgba(53,90,123,0.5)",
                  }}
                >
                  <div className="bg-white rounded-2xl w-[60px] h-[60px] flex items-center justify-center shrink-0">
                    <card.icon size={24} style={{ color: "#355a7b" }} />
                  </div>
                  <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug">{card.title}</h3>
                  <p className="text-[#05233d] text-sm leading-relaxed">{card.desc}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>

        </div>
      </ExpandingSection>

      {/* ── 5. Dark — Assessment ─────────────────────────────────────────────── */}
      <section id="assessment" className="bg-[#0a111c] px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-7xl flex flex-col gap-10">

          {/* Two-column content */}
          <AnimatedContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* Left: problem framing from the doc */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-10 flex flex-col gap-6 h-full">
                {/* Badge */}
                <div>
                  <span className="inline-flex items-center rounded-[12px] bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 px-[13px] py-[5px] text-[12px] font-semibold text-[#0d9488] tracking-[0.6px] uppercase whitespace-nowrap">
                    Claim Integrity
                  </span>
                </div>
                {/* Title */}
                <h3 className="text-[#0f192a] text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                  Find exactly where your revenue is leaking.
                </h3>
                {/* Body */}
                <p className="text-[#224360] text-lg leading-relaxed">
                  The denial does not start at the payer. It starts before the claim is written — in documentation, coding, and authorization. By the time the claim is submitted wrong, the rework is already set.
                </p>
                <p className="text-[#224360] text-lg leading-relaxed">
                  Tell us about your specialty and workflow. We'll identify the three biggest revenue risks specific to your organization and show you what Grelin does about each one.
                </p>
              </div>

              {/* Right: what you get + form CTA */}
              <div className="lg:col-span-5 bg-[#cfe8ff] rounded-3xl p-8 flex flex-col gap-5 h-full">
                <p className="text-[#0f192a] text-xs font-bold uppercase tracking-[2px]">
                  What you'll get from your assessment
                </p>

                <div className="flex flex-col gap-3">
                  {[
                    { icon: ShieldCheck,  label: "Top 3 revenue risk areas",      desc: "Specific to your industry and workflow",       iconBg: "rgba(20,184,166,0.12)",  iconBorder: "rgba(20,184,166,0.25)",  iconColor: "#0d9488" },
                    { icon: TrendingDown, label: "Estimated preventable leakage",  desc: "Based on industry benchmarks",                 iconBg: "rgba(59,130,246,0.12)",   iconBorder: "rgba(59,130,246,0.25)",   iconColor: "#2563eb" },
                    { icon: LayoutGrid,   label: "Recommended application mix",    desc: "Tailored to your organization",                iconBg: "rgba(168,85,247,0.12)",   iconBorder: "rgba(168,85,247,0.25)",   iconColor: "#9333ea" },
                    { icon: TrendingUp,   label: "ROI projection",                 desc: "Expected impact across your claims volume",    iconBg: "rgba(249,115,22,0.12)",   iconBorder: "rgba(249,115,22,0.25)",   iconColor: "#ea580c" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl p-4 flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: item.iconBg, border: `1px solid ${item.iconBorder}` }}
                      >
                        <item.icon size={18} style={{ color: item.iconColor }} />
                      </div>
                      <div>
                        <p className="text-[#0f192a] font-bold text-sm">{item.label}</p>
                        <p className="text-[#355a7b] text-sm leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA box */}
                <div className="bg-[#0a111c] border border-[#1e293b] rounded-xl px-6 py-5 text-center">
                  <p className="text-[#94a3b8] text-sm leading-relaxed">
                    Fill in the form below to get your{" "}
                    <strong className="text-[#e2e8f0]">personalized assessment</strong>{" "}
                    tailored to your industry.
                  </p>
                  <a
                    href="#assessment-form"
                    className="mt-4 inline-flex items-center gap-2 bg-white text-[#0B1120] rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                  >
                    Start Assessment <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedContainer>

          {/* Form */}
          <div id="assessment-form">
          <AnimatedContainer delay={0.2} className="w-full max-w-xl mx-auto mt-12 md:mt-28">
            <h3 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-center mb-8">
              Start your assessment
            </h3>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col gap-4">

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="ind-firstname">
                    First Name <span className="text-[#FCA311]">*</span>
                  </label>
                  <input id="ind-firstname" type="text" placeholder="First Name" required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="ind-lastname">
                    Last Name <span className="text-[#FCA311]">*</span>
                  </label>
                  <input id="ind-lastname" type="text" placeholder="Last Name" required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="ind-email">
                  Work Email <span className="text-[#FCA311]">*</span>
                </label>
                <input id="ind-email" type="email" placeholder="you@organization.com" required
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="ind-org">
                  Organization <span className="text-[#FCA311]">*</span>
                </label>
                <input id="ind-org" type="text" placeholder="Organization name" required
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="ind-industry">
                  Industry
                </label>
                <select id="ind-industry"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/30 transition-colors appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled selected style={{ color: "#4B5563" }}>Select your industry</option>
                  <option value="rcm">RCM Service Provider</option>
                  <option value="physician">Physician Group / Specialty Practice</option>
                  <option value="mso">MSO / Multi-Specialty Operator</option>
                  <option value="dme">DME / Medical Supply</option>
                  <option value="pharmacy">Specialty Pharmacy / Pharma Distribution</option>
                  <option value="payer">Payer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide" htmlFor="ind-challenge">
                  Revenue cycle challenges
                </label>
                <textarea id="ind-challenge" placeholder="Describe your biggest billing or denial challenges..."
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

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />

    </main>
  );
}
