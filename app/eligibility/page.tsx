"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight, Zap, Shield, BarChart3, GitBranch, ChevronRight } from "lucide-react";
import { Footer } from "@/components/Footer";

const BRAND_LIGHT = "#67e8f9";

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
        <div className="bg-white px-5 md:px-10 lg:px-20 py-10 md:py-24 lg:py-32">{children}</div>
      </div>
    );
  }

  return (
    <motion.div ref={ref} className="bg-brand-dark" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
      <motion.div className="bg-white px-5 md:px-10 lg:px-20 py-10 md:py-24 lg:py-32" style={{ borderRadius }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─── Live Verification Feed mock UI ────────────────────────────────────── */

const FEED_ITEMS = [
  {
    title: "Verification Task #8421",
    subtitle: "Payer: BCBS IL | Plan ID: 99420",
    status: "VERIFIED",
    statusColor: "#67e8f9",
    statusBg: "rgba(103,232,249,0.12)",
    bg: "linear-gradient(90deg, #071e3b 0%, #0d396f 50%, #071e3b 100%)",
    opacity: 1,
  },
  {
    title: "Rule Conflict Identified",
    subtitle: "Benefit Rule 7b: Out-of-Network Restriction",
    status: "ACTION REQUIRED",
    statusColor: "#67e8f9",
    statusBg: "rgba(103,232,249,0.12)",
    bg: "#051c38",
    opacity: 0.85,
  },
  {
    title: "Verification Task #8419",
    subtitle: "Payer: AETNA | Plan ID: 11029",
    status: "QUEUED",
    statusColor: "#94a3b8",
    statusBg: "rgba(148,163,184,0.1)",
    bg: "#010f1b",
    opacity: 0.65,
  },
];

const METRICS = [
  { value: "99.8%", label: "Accuracy" },
  { value: "0ms", label: "Latency" },
  { value: "2.4k", label: "Daily Verifications" },
];

function VerificationFeedCard() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(21,32,57,0.85)",
        border: "1px solid rgba(103,232,249,0.2)",
        boxShadow: "0 0 32px rgba(103,232,249,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-[11px] font-bold tracking-[1.4px] text-[#c6c6cd] uppercase">
          Live Verification Feed
        </span>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(103,232,249,0.5)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(103,232,249,0.25)" }} />
        </div>
      </div>

      {/* Feed items */}
      <div className="flex flex-col gap-2.5 px-5 py-4">
        {FEED_ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-lg px-3 py-3"
            style={{ background: item.bg, opacity: item.opacity }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: item.statusColor }}
              />
              <div>
                <p className="text-[13px] font-semibold text-[#d9e2ff] leading-snug">{item.title}</p>
                <p className="text-[10px] text-[#c6c6cd] mt-0.5">{item.subtitle}</p>
              </div>
            </div>
            <span
              className="text-[10px] font-bold tracking-[0.8px] px-2 py-0.5 rounded"
              style={{ color: item.statusColor, background: item.statusBg }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Metrics footer */}
      <div
        className="grid grid-cols-3 px-5 pb-5 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {METRICS.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-0.5">
            <span className="text-[22px] font-bold text-[#67e8f9]">{m.value}</span>
            <span className="text-[10px] text-[#c6c6cd]">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Upstream comparison data ───────────────────────────────────────────── */

const DOWNSTREAM_STEPS = [
  { step: "1", text: "Service provided without real-time verification validation." },
  { step: "2", text: "Claim submitted blindly based on legacy insurance card data." },
  { step: "3", text: "Denial received 30–45 days later. High rework costs.", bold: true },
];

const UPSTREAM_STEPS = [
  { step: "1", text: "Autonomous verification triggered at scheduling (T-30 days)." },
  { step: "2", text: "Continuous re-scans for coverage termination until encounter." },
  { step: "3", text: "Zero-Denial submission. Instant cash flow acceleration.", bold: true },
];

/* ─── Feature cards data ─────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: GitBranch,
    title: "Dynamic Benefit Rulesets",
    description:
      "Our AI maps surgical coding against real-time LCD/NCD compliance standards before claims reach the clearinghouse.",
    wide: true,
  },
  {
    icon: Shield,
    title: "Strategic Intervention",
    description: "Identify 'at-risk' patients immediately and automate the re-verification workflow.",
    wide: false,
    stat: { label: "Alignment Score", value: "98%" },
  },
  {
    icon: BarChart3,
    title: "98% Reduction",
    description: "Reduction in verification latency compared to manual portals.",
    wide: false,
  },
  {
    icon: Zap,
    title: "Direct Payer API Tunnels",
    description:
      "Bypass legacy EDI 270/271 clearinghouse latency with direct-to-payer API connectivity.",
    wide: true,
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function EligibilityPage() {
  return (
    <main className="bg-brand-dark text-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-t-[60px] md:rounded-t-[100px]"
        style={{ boxShadow: "0px 0px 15px 0px #0f192a" }}
      >
        {/* SVG background */}
        <img
          src="/hero-bg.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.85 }}
        />

        {/* Плавный переход снизу в bg-brand-dark */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "45%",
            background: "linear-gradient(to bottom, transparent 0%, #0B1120 100%)",
          }}
        />

        {/* Отступ сверху — место для navbar + дыхание до плашки */}
        <div className="relative z-10 pt-[110px] md:pt-[185px] pb-0 px-4 md:px-8">

          {/* Breadcrumb */}
          <div className="mx-auto w-full max-w-[1257px] mb-5">
            <nav className="flex items-center gap-1.5 text-[13px]">
              <a href="/solutions" className="text-white/40 hover:text-white/70 transition-colors">
                Solutions
              </a>
              <ChevronRight size={13} className="text-white/25 shrink-0" />
              <span className="text-white/70">Eligibility.ai</span>
            </nav>
          </div>

          {/* Rectangle 113 — gradient border wrapper */}
          <div
            className="mx-auto w-full max-w-[1257px]"
            style={{
              background: "linear-gradient(90deg, rgba(12,60,180,0.5) 0%, rgba(100,160,255,0.25) 50%, rgba(12,60,180,0.5) 100%)",
              borderRadius: "0px 0px 75px 75px",
              padding: "0 1px 1px 1px",
            }}
          >
            {/* Inner panel */}
            <div
              style={{
                background: "linear-gradient(90deg, rgba(5,35,61,0.5) 51%, rgba(14,93,163,0.5) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: "0px 0px 74px 74px",
              }}
            >
            <div className="px-8 md:px-14 lg:px-20 pt-12 pb-14 md:pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Left — heading + description + buttons */}
                <AnimatedContainer delay={0.1} className="flex flex-col gap-6">
                  <h1
                    className="text-[32px] md:text-[40px] font-bold leading-[1.27] text-white"
                    style={{ letterSpacing: "-0.96px" }}
                  >
                    Eligibility.ai: Continuous Coverage Intelligence
                  </h1>
                  <p className="text-[#c6c6cd] text-base leading-relaxed max-w-lg">
                    Eliminate retroactive denials with a pre-emptive verification engine that
                    monitors eligibility, schedules, and payer rules in real time. Eligibility.ai
                    validates coverage before patient arrival to reduce denials and prevent delays.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <a
                      href="/company?service=eligibility-verification-ai"
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold bg-white text-[#0B1120] hover:bg-white/90 transition-colors"
                    >
                      Schedule Clinical Review<ArrowRight size={14} />
                    </a>
                    <a
                      href="#denialoperationsection"
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold border border-white/25 text-white hover:bg-white/10 transition-colors"
                    >
                      View Denial Operations
                    </a>
                  </div>
                </AnimatedContainer>

                {/* Right — Live Verification Feed */}
                <AnimatedContainer delay={0.2}>
                  <VerificationFeedCard />
                </AnimatedContainer>

              </div>
            </div>
            </div>
          </div>

          {/* Дополнительный fade под плашкой — сглаживает переход */}
          <div className="h-12 md:h-32" />
        </div>
      </section>

      {/* ── Upstream Intervention ─────────────────────────────────────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <AnimatedContainer delay={0.05}>
              <h2 className="text-[#0f192a] text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                The Upstream Intervention
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.12}>
              <p className="text-[#355a7b] mt-3 text-base leading-relaxed max-w-xl mx-auto">
                Stop denials at the intake source, not the billing office. Our autonomous layer
                operates months before the claim is generated.
              </p>
            </AnimatedContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Downstream */}
            <AnimatedContainer delay={0.15}>
              <div
                className="rounded-3xl p-8 flex flex-col gap-6 h-full"
                style={{
                  background: "#152039",
                  border: "1px solid rgba(251,191,36,0.2)",
                }}
              >
                <h3 className="text-[#fbbf24] text-xl font-semibold">Downstream (Traditional)</h3>
                <div className="flex flex-col gap-5">
                  {DOWNSTREAM_STEPS.map((s) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[#fbbf24] text-sm font-medium"
                        style={{ background: "rgba(251,191,36,0.12)" }}
                      >
                        {s.step}
                      </span>
                      <p
                        className="text-sm leading-relaxed pt-1"
                        style={{
                          color: s.bold ? "#fbbf24" : "#94a3b8",
                          fontWeight: s.bold ? 600 : 400,
                        }}
                      >
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>

            {/* Upstream */}
            <AnimatedContainer delay={0.22}>
              <div
                className="rounded-3xl p-8 flex flex-col gap-6 h-full"
                style={{
                  background: "#152039",
                  border: "1px solid rgba(103,232,249,0.25)",
                  boxShadow: "0 0 15px rgba(103,232,249,0.08)",
                }}
              >
                <h3 className="text-[#67e8f9] text-xl font-semibold">
                  Upstream (Eligibility.ai)
                </h3>
                <div className="flex flex-col gap-5">
                  {UPSTREAM_STEPS.map((s) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[#67e8f9] text-sm font-medium"
                        style={{ background: "rgba(103,232,249,0.12)" }}
                      >
                        {s.step}
                      </span>
                      <p
                        className="text-sm leading-relaxed pt-1"
                        style={{
                          color: s.bold ? "#67e8f9" : "rgba(255,255,255,0.75)",
                          fontWeight: s.bold ? 600 : 400,
                        }}
                      >
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </ExpandingSection>

      {/* ── Feature cards ─────────────────────────────────────────────────────── */}
      <section id="denialoperationsection" className="relative bg-brand-dark px-6 md:px-16 lg:px-24 py-10 md:py-28 overflow-hidden">
        {/* glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-64"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(8,145,178,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <AnimatedContainer delay={0.05} className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              Intelligence Built for{" "}
              <span style={{ color: BRAND_LIGHT }}>Zero-Denial</span> Operations
            </h2>
          </AnimatedContainer>

          <div className="flex flex-col gap-5">

          {/* ── Row 1 ── */}
          <div className="flex flex-col md:flex-row gap-5 items-stretch md:min-h-[240px]">

            {/* Card 1 — WIDE */}
            <AnimatedContainer delay={0.1} className="w-full md:flex-[7]">
              <div
                className="rounded-[30px] px-8 py-7 flex flex-col gap-4 h-full"
                style={{ background: "#cde7ff", boxShadow: "inset 0px 0px 27px 4px #c0e1ff" }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "#203243" }}
                  >
                    <GitBranch size={20} style={{ color: BRAND_LIGHT }} />
                  </div>
                  <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#355a7b] bg-white/60 px-3 py-1 rounded-full">
                    Real-time
                  </span>
                </div>

                <div>
                  <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug mb-2">
                    Dynamic Benefit Rulesets
                  </h3>
                  <p className="text-[#355a7b] text-sm leading-relaxed">
                    Our AI maps surgical coding against real-time LCD/NCD compliance standards
                    before claims reach the clearinghouse.
                  </p>
                </div>

                {/* Rule type tags */}
                <div className="flex flex-wrap gap-2">
                  {["LCD", "NCD", "CMS-1500", "ICD-10", "CPT Modifiers"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-3 py-1 rounded-full text-[#05233d]"
                      style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(8,145,178,0.2)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Big number */}
                <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(8,145,178,0.15)" }}>
                  <p className="text-[52px] font-extrabold leading-none text-[#0b1c30] tracking-tight">
                    4,200<span className="text-[#0891B2]">+</span>
                  </p>
                  <p className="text-[#355a7b] text-xs mt-1 font-medium tracking-wide uppercase">
                    Payer rules monitored in real time
                  </p>
                </div>
              </div>
            </AnimatedContainer>

            {/* Card 2 — NARROW */}
            <AnimatedContainer delay={0.16} className="w-full md:flex-[5]">
              <div
                className="rounded-[30px] px-8 py-7 flex flex-col gap-4 h-full"
                style={{ background: "#e9f5ff", boxShadow: "inset 0px 0px 27px 4px #c0e1ff" }}
              >
                {/* Big stat + bar */}
                <div>
                  <p className="text-[64px] font-extrabold leading-none tracking-tight text-[#0b1c30]">
                    98<span className="text-[#0891B2]">%</span>
                  </p>
                  <p className="text-[#355a7b] text-sm mt-1">Alignment score across all payer rules</p>
                  <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: "rgba(8,145,178,0.15)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: "98%", background: "#67e8f9", boxShadow: "0 0 12px rgba(103,232,249,0.5)" }}
                    />
                  </div>
                </div>

                {/* Mini status rows */}
                <div className="flex flex-col gap-2 mt-auto" style={{ borderTop: "1px solid rgba(8,145,178,0.12)", paddingTop: "20px" }}>
                  <p className="text-[11px] font-bold tracking-[1px] uppercase text-[#355a7b] mb-1">
                    Strategic Intervention
                  </p>
                  {[
                    { label: "Coverage Verified", ok: true },
                    { label: "Benefits Confirmed", ok: true },
                    { label: "Authorization Clear", ok: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#67e8f9", boxShadow: "0 0 6px rgba(103,232,249,0.8)" }}
                      />
                      <span className="text-sm text-[#05233d] font-medium">{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>

          </div>{/* end Row 1 */}

          {/* ── Row 2 ── */}
          <div className="flex flex-col md:flex-row gap-5 items-stretch md:min-h-[240px]">

            {/* Card 3 — NARROW */}
            <AnimatedContainer delay={0.22} className="w-full md:flex-[5]">
              <div
                className="rounded-[30px] px-8 py-7 flex flex-col gap-4 h-full"
                style={{ background: "#e9f5ff", boxShadow: "inset 0px 0px 27px 4px #c0e1ff" }}
              >
                <div>
                  <p className="text-[11px] font-bold tracking-[1px] uppercase text-[#355a7b] mb-3">
                    Verification Latency
                  </p>
                  {/* Before �� After */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[32px] font-extrabold text-[#94a3b8] leading-none line-through decoration-[#fbbf24]">
                        48h
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8]">Manual</span>
                    </div>
                    <div className="flex-1 flex items-center gap-1">
                      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #94a3b8, #67e8f9)" }} />
                      <ArrowRight size={14} style={{ color: "#67e8f9" }} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[32px] font-extrabold text-[#0b1c30] leading-none">
                        0<span className="text-[#0891B2]">ms</span>
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#0891B2]">AI-powered</span>
                    </div>
                  </div>
                </div>

                {/* Mini stats row */}
                <div className="grid grid-cols-3 gap-3 mt-auto pt-5" style={{ borderTop: "1px solid rgba(8,145,178,0.15)" }}>
                  {[
                    { val: "99.8%", label: "Accuracy" },
                    { val: "2.4k", label: "Daily checks" },
                    { val: "0", label: "Manual steps" },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-0.5 text-center">
                      <span className="text-[20px] font-extrabold text-[#0b1c30] leading-none">{s.val}</span>
                      <span className="text-[10px] text-[#355a7b] font-medium">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>

            {/* Card 4 — WIDE */}
            <AnimatedContainer delay={0.28} className="w-full md:flex-[7]">
              <div
                className="rounded-[30px] px-8 py-7 flex flex-col gap-4 h-full"
                style={{ background: "#cde7ff", boxShadow: "inset 0px 0px 27px 4px #c0e1ff" }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "#203243" }}
                  >
                    <Zap size={20} style={{ color: BRAND_LIGHT }} />
                  </div>
                  <span
                    className="text-[11px] font-bold tracking-[1px] uppercase px-3 py-1 rounded-full"
                    style={{ background: "rgba(103,232,249,0.15)", color: "#0891B2", border: "1px solid rgba(103,232,249,0.3)" }}
                  >
                    EDI 270/271 bypass
                  </span>
                </div>

                <div>
                  <h3 className="text-[#05233d] font-medium text-xl leading-snug mb-2">
                    Direct Payer API Tunnels
                  </h3>
                  <p className="text-[#355a7b] text-sm leading-relaxed">
                    Bypass legacy clearinghouse latency with direct-to-payer connectivity.
                  </p>
                </div>

                {/* Payer badges */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["BCBS IL", "Aetna", "UnitedHealth", "Cigna", "Humana", "CareFirst"].map((p) => (
                    <span
                      key={p}
                      className="text-[12px] font-semibold px-3 py-1.5 rounded-full text-[#05233d]"
                      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(8,145,178,0.2)" }}
                    >
                      {p}
                    </span>
                  ))}
                  <span
                    className="text-[12px] font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(8,145,178,0.12)", color: "#0891B2", border: "1px solid rgba(8,145,178,0.25)" }}
                  >
                    +200 more
                  </span>
                </div>
              </div>
            </AnimatedContainer>

          </div>{/* end Row 2 */}

          </div>{/* end flex flex-col */}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
          <AnimatedContainer delay={0.05}>
            <h2 className="text-[#0B1120] text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Ready to achieve
              <br />
              Zero-Denial operations?
            </h2>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15}>
            <p className="text-[#355a7b] text-base leading-relaxed max-w-xl">
              Get a comprehensive clinical risk assessment. We&apos;ll analyze your last 6 months
              of denial data and show exactly where Eligibility.ai would have intervened.
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.25} className="flex flex-col sm:flex-row gap-3">
            {/* <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1120] px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-white hover:bg-[#1a2540] transition-colors"
            >
              Request Assessment <ArrowRight size={13} />
            </a> */}
            <a
              href="/company?service=partnership-%26-business-development"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0B1120]/30 px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-[#0B1120] hover:bg-[#0B1120]/5 transition-colors"
            >
              Contact Strategy Team
            </a>
          </AnimatedContainer>
        </div>
      </ExpandingSection>

      <Footer />
    </main>
  );
}
