"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, AlertCircle, Brain, Activity, Shield } from "lucide-react";
import { Footer } from "@/components/Footer";

const BRAND = "#2563EB";

/* ─── Animation helpers ──────────────────────────────────────────────────────── */

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


/* ─── Expanding section (light wrapper for light hero) ──────────────────────── */

function ExpandingSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const paddingX = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (shouldReduceMotion) {
    return (
      <div style={{ background: "#dde8f8" }}>
        <div className="bg-white px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32">{children}</div>
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ background: "#dde8f8", paddingLeft: paddingX, paddingRight: paddingX }}>
      <motion.div className="bg-white px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32" style={{ borderRadius }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero Dashboard (static) ───────────────────────────────────────────────── */

function HeroDashboard() {
  return (
    <div className="w-full max-w-[400px] lg:max-w-[420px] rounded-[20px] overflow-hidden shrink-0"
      style={{
        background: "rgba(10,18,40,0.96)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(147,197,253,0.08)",
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-5 py-3"
        style={{ background: "#1a2640", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(251,74,52,0.75)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,216,59,0.83)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(52,233,52,0.8)" }} />
        </div>
        <span className="font-mono text-[10px] text-[#c6c6cd] ml-3">PAIN_AI_MONITOR_V2.1</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[10px] text-[#22c55e]">Active</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Top metrics */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Payer Policies", value: "1,248", color: "#93c5fd" },
            { label: "Alert Signals",  value: "12",    color: "#fbbf24" },
            { label: "Claims Today",   value: "847",   color: "#34d399" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-[8.5px] text-[#94a3b8] uppercase tracking-wide mb-1">{m.label}</div>
              <div className="text-[18px] font-bold leading-none" style={{ color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* CPT validation */}
        <div className="rounded-xl p-3.5"
          style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <div className="text-[9.5px] font-bold text-[#93c5fd] uppercase tracking-wide mb-2.5">CPT Validation — Active</div>
          <div className="flex flex-col gap-0">
            {[
              { code: "62323", label: "Epidural Injection",  ok: true },
              { code: "64483", label: "Nerve Block",         ok: true },
              { code: "99215", label: "E&M Complex Visit",   ok: false },
            ].map((c, i, arr) => (
              <div key={c.code} className="flex items-center justify-between py-2"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[9.5px] font-bold" style={{ color: "#93c5fd" }}>{c.code}</span>
                  <span className="text-[9.5px] text-[#94a3b8]">{c.label}</span>
                </div>
                {c.ok
                  ? <CheckCircle2 size={12} color="#22c55e" />
                  : <AlertCircle size={12} color="#fbbf24" />
                }
              </div>
            ))}
          </div>
        </div>

        {/* Alignment score + LCD rules */}
        <div className="flex items-center justify-between px-1">
          <div>
            <div className="text-[9px] text-[#94a3b8] uppercase tracking-wide mb-1">Alignment Score</div>
            <div className="text-[28px] font-extrabold text-white leading-none">
              98<span style={{ color: BRAND }}>%</span>
            </div>
          </div>
          <div className="h-10 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="text-right">
            <div className="text-[9px] text-[#94a3b8] uppercase tracking-wide mb-1">LCD/NCD Rules</div>
            <div className="text-[28px] font-extrabold text-white leading-none">
              4,200<span style={{ color: BRAND }}>+</span>
            </div>
          </div>
          <div className="h-10 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="text-right">
            <div className="text-[9px] text-[#94a3b8] uppercase tracking-wide mb-1">Precision</div>
            <div className="text-[28px] font-extrabold text-white leading-none">
              94<span style={{ color: BRAND }}>%</span>
            </div>
          </div>
        </div>

        {/* CMS Alert */}
        <div className="rounded-xl p-3.5"
          style={{ background: "rgba(183,196,255,0.05)", border: "1px solid rgba(183,196,255,0.15)" }}>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-0.5 h-3.5 rounded-full shrink-0" style={{ background: "#b7c4ff" }} />
            <span className="text-[11px] font-semibold text-white">New CMS Policy Update</span>
          </div>
          <p className="text-[9.5px] text-[#94a3b8] leading-relaxed pl-3">
            SCS documentation requirements shift effective next Monday — 94% of affected claims pre-flagged.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ─── Active Surveillance mockup ─────────────────────────────────────────────── */

function ActiveSurveillanceMockup() {
  return (
    <div className="w-full rounded-[16px] overflow-hidden"
      style={{
        background: "rgba(21,32,57,0.5)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-6 py-3 shrink-0"
        style={{ background: "#1f2943", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(251,74,52,0.75)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,216,59,0.83)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(52,233,52,0.8)" }} />
        </div>
        <span className="ml-4 font-mono text-[10px] text-[#c6c6cd]">REGULATORY_MONITOR_V4.02</span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-6">
        {/* Active Surveillance header */}
        <div className="flex items-center justify-between">
          <span className="text-white text-[18px] font-semibold">Active Surveillance</span>
          <span className="text-[12px] text-white px-3 py-1 rounded-full"
            style={{ background: "rgba(248,249,255,0.1)", border: "1px solid rgba(183,196,255,0.2)" }}>
            Real-time
          </span>
        </div>

        {/* Metric tiles */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Payer Policies", value: "1,248" },
            { label: "Alert Signals", value: "12" },
          ].map((m) => (
            <div key={m.label} className="rounded-[12px] p-4"
              style={{
                background: "#e3e3e3",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "inset 0 0 9px 0 #355a7b",
              }}>
              <div className="text-[12px] font-semibold tracking-[0.6px] text-[#14395a] mb-1">{m.label}</div>
              <div className="text-[24px] font-semibold text-[#0f192a]">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Notification */}
        <div className="rounded-[12px] p-4 flex flex-col gap-2"
          style={{ background: "rgba(183,196,255,0.05)", border: "1px solid rgba(183,196,255,0.2)" }}>
          <div className="flex items-center gap-3">
            <div className="w-0.5 h-4 rounded-full shrink-0" style={{ background: "#b7c4ff" }} />
            <span className="text-white text-[14px] font-semibold">New CMS Policy Update</span>
          </div>
          <p className="text-[#c6c6cd] text-[12px] leading-relaxed">
            Major shift in documentation requirements for Spinal Cord Stimulation (SCS) procedures effective next Monday.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature cards ──────────────────────────────────────────────────────────── */

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function PainPage() {
  return (
    <main className="bg-brand-dark text-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[680px] md:min-h-[760px]">
        <img src="/pain-hero-bg.svg" alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-left md:object-center pointer-events-none select-none"
        />

        {/* Mobile glow */}
        <div aria-hidden className="md:hidden absolute pointer-events-none"
          style={{ right: "-80px", top: "10%", width: "420px", height: "420px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.08) 45%, transparent 70%)",
            filter: "blur(24px)" }}
        />

        {/* Dashboard — desktop only, centered on SVG circle */}
        <div className="hidden lg:flex absolute items-center justify-center z-20"
          style={{ left: "73%", top: "54%", transform: "translate(-50%, -50%)" }}>
          <HeroDashboard />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl pl-6 pr-6 md:pl-6 md:pr-16 lg:pl-6 lg:pr-24 pt-28 md:pt-44 pb-16 md:pb-24">
          <div className="mb-8">
            <nav className="flex items-center gap-1.5 text-[13px]">
              <a href="/solutions" className="text-[#0B1120]/40 hover:text-[#0B1120]/70 transition-colors">Solutions</a>
              <ChevronRight size={13} className="text-[#0B1120]/25 shrink-0" />
              <span className="text-[#0B1120]/60">Pain.ai</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-8">
            {/* Left — text */}
            <div className="flex flex-col gap-5 w-full lg:w-[52%]">
              <AnimatedContainer delay={0.05}>
                <span className="inline-flex items-center rounded-[12px] px-[13px] py-[5px] text-[12px] font-semibold tracking-[0.6px] uppercase whitespace-nowrap"
                  style={{ background: "rgba(37,99,235,0.10)", border: "1px solid rgba(37,99,235,0.28)", color: BRAND }}>
                  Intelligence Layer
                </span>
              </AnimatedContainer>

              <AnimatedContainer delay={0.12}>
                <h1 className="text-[36px] md:text-[44px] lg:text-[48px] font-extrabold leading-[1.15] tracking-tight"
                  style={{ letterSpacing: "-0.96px" }}>
                  <span className="text-[#0B1120]">Pain.ai: </span>
                  <span style={{ color: BRAND }}>Smarter Revenue</span>
                  <br />
                  <span className="text-[#0B1120]">Integrity for Pain Practices</span>
                </h1>
              </AnimatedContainer>

              <AnimatedContainer delay={0.2}>
                <p className="text-[#334155] text-base md:text-lg leading-relaxed max-w-lg">
                  A clinical intelligence layer designed to monitor regulatory shifts, align complex
                  coding patterns, and defend revenue with precision-engineered AI for surgical environments.
                </p>
              </AnimatedContainer>

              <AnimatedContainer delay={0.28} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
                <a href="/company?service=pain-management-ai"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold bg-[#0B1120] text-white hover:bg-[#1a2540] transition-colors">
                  Schedule Clinical Review
                </a>
                <a href="#intelligencesection"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold border border-[#0B1120]/25 text-[#0B1120] hover:bg-[#0B1120]/5 transition-colors">
                  View Intelligence
                </a>
                  {/* Explore Capability Matrix */}
              </AnimatedContainer>
            </div>

            {/* Right — dashboard (mobile/tablet only) */}
            <AnimatedContainer delay={0.15} className="w-full lg:hidden flex justify-center">
              <HeroDashboard />
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* ── Multi-Dimensional Intelligence ───────────────────────────────────── */}
      <ExpandingSection>
        <div id="intelligencesection" className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <AnimatedContainer delay={0.05}>
              <h2 className="text-[#0f192a] text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-tight tracking-tight"
                style={{ letterSpacing: "-0.88px" }}>
                Multi-Dimensional Intelligence
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.12}>
              <p className="text-[#4b6182] mt-3 text-base leading-relaxed">
                Beyond simple automation, Pain.ai acts as a persistent observer, aligning every clinical
                action with the latest regulatory and reimbursement mandates.
              </p>
            </AnimatedContainer>
          </div>

          <div className="flex flex-col gap-5">

            {/* ── Row 1 ── */}
            <div className="flex flex-col md:flex-row gap-5 items-stretch md:min-h-[260px]">

              {/* Card 1 — WIDE — Regulatory Pattern Analysis */}
              <AnimatedContainer delay={0.1} className="w-full md:flex-[7]">
                <div className="rounded-[30px] px-8 py-7 flex flex-col gap-4 h-full"
                  style={{ background: "#dbeafe", boxShadow: "inset 0px 0px 27px 4px #bfdbfe" }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#1e3a6e" }}>
                      <Activity size={20} style={{ color: "#93c5fd" }} />
                    </div>
                    <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#1e4080] bg-white/60 px-3 py-1 rounded-full">Real-time</span>
                  </div>
                  <div>
                    <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug mb-2">Regulatory Pattern Analysis</h3>
                    <p className="text-[#1e4080] text-sm leading-relaxed">
                      Our AI maps surgical coding against real-time LCD/NCD compliance standards before claims reach the clearinghouse.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["LCD", "NCD", "CMS-1500", "CPT Modifiers", "ICD-10"].map((tag) => (
                      <span key={tag} className="text-[11px] font-semibold px-3 py-1 rounded-full text-[#1e3a6e]"
                        style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(37,99,235,0.2)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedContainer>

              {/* Card 2 — NARROW — Coding Alignment */}
              <AnimatedContainer delay={0.16} className="w-full md:flex-[5]">
                <div className="rounded-[30px] px-8 py-7 flex flex-col gap-5 h-full"
                  style={{ background: "#eff6ff", boxShadow: "inset 0px 0px 27px 4px #bfdbfe" }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#1e3a6e" }}>
                    <Brain size={20} style={{ color: "#93c5fd" }} />
                  </div>
                  <div>
                    <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug mb-1.5">Coding Alignment</h3>
                    <p className="text-[#1e4080] text-sm leading-relaxed">
                      Automated Crosswalks for CPT and ICD-10 combinations specific to interventional pain procedures.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold tracking-[1.1px] uppercase text-[#355a7b]">Alignment Score</span>
                      <span className="text-[14px] font-extrabold" style={{ color: BRAND }}>98%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(37,99,235,0.12)" }}>
                      <div className="h-full rounded-full" style={{ width: "98%", background: BRAND, boxShadow: "0 0 10px rgba(37,99,235,0.4)" }} />
                    </div>
                  </div>
                </div>
              </AnimatedContainer>

            </div>

            {/* ── Row 2 ── */}
            <div className="flex flex-col md:flex-row gap-5 items-stretch md:min-h-[260px]">

              {/* Card 3 — NARROW — Clinical Evidence Integration */}
              <AnimatedContainer delay={0.22} className="w-full md:flex-[5]">
                <div className="rounded-[30px] px-8 py-7 flex flex-col gap-4 h-full"
                  style={{ background: "#dbeafe", boxShadow: "inset 0px 0px 27px 4px #bfdbfe" }}>
                  <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug">Clinical Evidence Integration</h3>
                  <p className="text-[#1e4080] text-sm leading-relaxed">
                    Automatically link physician notes to supporting medical literature to justify high-complexity procedures.
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    {["Facet Joint Injection Protocol", "Spinal Cord Stimulator Justification"].map((tag) => (
                      <div key={tag} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
                        style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)" }}>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: BRAND }} />
                        <span className="text-[12px] font-semibold" style={{ color: BRAND }}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedContainer>

              {/* Card 4 — WIDE — Predictive Audit Defense */}
              <AnimatedContainer delay={0.28} className="w-full md:flex-[7]">
                <div className="rounded-[30px] px-8 py-7 flex flex-col gap-4 h-full"
                  style={{ background: "#eff6ff", boxShadow: "inset 0px 0px 27px 4px #bfdbfe" }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#1e3a6e" }}>
                      <Shield size={20} style={{ color: "#93c5fd" }} />
                    </div>
                    <span className="text-[11px] font-bold tracking-[1px] uppercase px-3 py-1 rounded-full"
                      style={{ background: "rgba(37,99,235,0.1)", color: BRAND, border: "1px solid rgba(37,99,235,0.25)" }}>
                      94% precision
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug mb-2">Predictive Audit Defense</h3>
                    <p className="text-[#1e4080] text-sm leading-relaxed">
                      Identify high-risk claim profiles before submission. Our AI simulates payer audit logic to flag potential denials with 94% precision.
                    </p>
                  </div>
                </div>
              </AnimatedContainer>

            </div>

          </div>
        </div>
      </ExpandingSection>

      {/* ── Anticipatory Compliance ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* Background pattern */}
        <img src="/hero-bg.svg" alt="" aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            right: 0,
            top: 0,
            width: "55%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0.5,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />

        {/* Glassmorphism overlay panel */}
        <div className="absolute inset-x-4 md:left-1/2 md:-translate-x-1/2 top-16 bottom-16 md:top-28 md:bottom-28 md:w-full md:max-w-[1300px] pointer-events-none"
          style={{ background: "rgba(159,203,255,0.08)", borderRadius: "40px", border: "1px solid rgba(159,203,255,0.12)" }} />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 lg:px-0 py-32 md:py-44">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-16">

            {/* Left — dashboard mockup */}
            <AnimatedContainer delay={0.08} className="w-full lg:w-[48%] shrink-0">
              <ActiveSurveillanceMockup />
            </AnimatedContainer>

            {/* Right — content */}
            <div className="flex flex-col gap-6 w-full lg:w-[52%]">
              <AnimatedContainer delay={0.1}>
                <h2 className="text-white text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight"
                  style={{ letterSpacing: "-0.96px" }}>
                  Anticipatory Compliance
                </h2>
              </AnimatedContainer>

              <AnimatedContainer delay={0.18}>
                <p className="text-white text-base md:text-[18px] leading-relaxed">
                  Pain management is under a microscope. Our regulatory dashboard provides a
                  "look-ahead" capability, simulating the impact of policy changes on your specific
                  revenue cycle before they take effect.
                </p>
              </AnimatedContainer>

              <AnimatedContainer delay={0.24}>
                <ul className="flex flex-col gap-3 mt-1">
                  {[
                    "Automated LCD/NCD parsing & implementation",
                    "Real-time claim simulation vs. new mandates",
                    "AI-driven physician workflow adjustment",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(255,255,255,0.2)" }}>
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <span className="text-[#d9e2ff] text-[16px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA — Stabilize ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-dark py-24 md:py-32 px-6">
        {/* Bottom gradient */}
        <div aria-hidden className="absolute bottom-0 left-0 right-0 pointer-events-none h-40"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(37,99,235,0.08) 100%)" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-8 text-center">
          <AnimatedContainer delay={0.05}>
            <h2 className="text-white text-3xl md:text-4xl lg:text-[48px] font-extrabold leading-tight tracking-tight"
              style={{ letterSpacing: "-0.96px" }}>
              Stabilize Your Clinical Revenue Layer.
            </h2>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <p className="text-white/60 text-base leading-relaxed max-w-xl">
              Stop reacting to denials after the fact. Pain.ai moves compliance upstream — so your
              documentation, coding, and payer alignment are locked before a single claim is submitted.
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2} className="flex flex-col sm:flex-row gap-3">
            <a href="/company?service=pain-management-ai"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-[#0B1120] hover:bg-white/90 transition-colors">
              Schedule Clinical Review <ArrowRight size={13} />
            </a>
            <a href="#intelligencesection"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-white hover:bg-white/10 transition-colors">
                  View Intelligence
            </a>
              {/* Explore Capability Matrix */}
          </AnimatedContainer>

          <AnimatedContainer delay={0.26}>
            <p className="text-white/40 text-sm">
              Trusted by pain management groups across 12 states.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}
