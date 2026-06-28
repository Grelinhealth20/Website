"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight, CheckCircle2, LayoutGrid, BarChart2, Shield, ChevronRight } from "lucide-react";
import { Footer } from "@/components/Footer";

const BRAND = "#A78BFA";

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

/* ─── Auth Request Monitor card ─────────────────────────────────────────────── */

const AUTH_ITEMS = [
  {
    title: "PA Request #3841",
    subtitle: "CPT 27447 · Total Knee Arthroplasty",
    status: "Approved",
    statusColor: "#16a34a",
    statusBg: "#dcfce7",
    dotColor: "#22c55e",
  },
  {
    title: "Clinical Evidence Required",
    subtitle: "Missing LCD Criteria — Payer: UHC",
    status: "Action Required",
    statusColor: "#7c3aed",
    statusBg: "#ede9fe",
    dotColor: "#A78BFA",
  },
  {
    title: "PA Request #3839",
    subtitle: "CPT 29827 · Rotator Cuff Repair",
    status: "Pending",
    statusColor: "#64748b",
    statusBg: "#f1f5f9",
    dotColor: "#94a3b8",
  },
];

const AUTH_METRICS = [
  { value: "94%", label: "Approval Rate" },
  { value: "4.2h", label: "Avg Turnaround" },
  { value: "47", label: "Active" },
];

function PriorAuthFeedCard() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
          <span className="text-[11px] font-bold tracking-[1.2px] text-[#64748b] uppercase">
            Auth Request Monitor
          </span>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "#ede9fe", color: "#7c3aed" }}
        >
          Live
        </span>
      </div>

      {/* Feed items */}
      <div className="flex flex-col divide-y divide-[#f1f5f9]">
        {AUTH_ITEMS.map((item) => (
          <div key={item.title} className="flex items-center justify-between px-5 py-3.5 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: item.dotColor }}
              />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#0f172a] leading-snug truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5 truncate">{item.subtitle}</p>
              </div>
            </div>
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0"
              style={{ color: item.statusColor, background: item.statusBg }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Metrics footer */}
      <div
        className="grid grid-cols-3 px-5 py-4 gap-2"
        style={{ background: "#f8fafc", borderTop: "1px solid #e5e7eb" }}
      >
        {AUTH_METRICS.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-0.5">
            <span className="text-[20px] font-bold text-[#A78BFA]">{m.value}</span>
            <span className="text-[10px] text-[#94a3b8] font-medium">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature cards data ─────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Audit Trail Integrity",
    description: "Immutable audit logs for every validation event and compliance action.",
  },
  {
    icon: BarChart2,
    title: "Status Tracking",
    description: "Automated alerts for pending approvals and unresolved workflow actions.",
  },
  {
    icon: Shield,
    title: "Native EHR Integration",
    description:
      "Direct API hooks for Epic, Cerner, and AthenaHealth ensure data fluidly without tab-switching.",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function PriorAuthPage() {
  return (
    <main className="bg-brand-dark text-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-16 lg:px-24 pt-32 pb-20 md:pb-28"
        style={{
          backgroundImage: "url('/pattern.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      >
        {/* radial glow overlay */}
        <div
          aria-hidden
          className="absolute pointer-events-none inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 60% 30%, rgba(124,58,237,0.14) 0%, transparent 70%)",
          }}
        />

        {/* bottom fade to brand-dark */}
        <div
          aria-hidden
          className="absolute pointer-events-none bottom-0 left-0 right-0 h-40"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #0B1120 100%)",
          }}
        />

        {/* Breadcrumb */}
        <div className="relative z-10 mx-auto max-w-7xl mb-8">
          <nav className="flex items-center gap-1.5 text-[13px]">
            <a href="/solutions" className="text-white/40 hover:text-white/70 transition-colors">
              Solutions
            </a>
            <ChevronRight size={13} className="text-white/25 shrink-0" />
            <span className="text-white/70">PriorAuth.ai</span>
          </nav>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Auth Request Monitor mockup */}
          <AnimatedContainer delay={0.05} className="w-full lg:w-[45%] shrink-0">
            <PriorAuthFeedCard />
          </AnimatedContainer>

          {/* Right — content */}
          <div className="flex flex-col gap-5 w-full lg:w-[55%]">
            <AnimatedContainer delay={0.1}>
              <span className="inline-flex items-center rounded-[12px] bg-white/10 border border-white/50 px-[13px] py-[5px] text-[12px] font-semibold text-[#eee] tracking-[0.6px] uppercase whitespace-nowrap">
                Intelligence Layer
              </span>
            </AnimatedContainer>

            <AnimatedContainer delay={0.18}>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight">
                <span style={{ color: BRAND }}>Priorauth.ai</span>
                {": "}
                <span className="text-white">Precision in Prior Authorization</span>
              </h1>
            </AnimatedContainer>

            <AnimatedContainer delay={0.26}>
              <p className="text-slate-400 text-base leading-relaxed max-w-lg">
                A clinical intelligence layer designed to monitor regulatory shifts, align complex
                coding patterns, and defend revenue with precision-engineered AI for surgical
                environments.
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.32} className="flex flex-wrap gap-3 pt-1">
              <a
                href="/company?service=prior-authorization-ai"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold bg-white text-[#0B1120] hover:bg-white/90 transition-colors"
              >
                Schedule Clinical Review
              </a>
              <a
                href="#clinicalpriorsection"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold border border-white/25 text-white hover:bg-white/10 transition-colors"
              >
                View Clinical Flow
              </a>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* ── Clinical Validation Flow ──────────────────────────────────────────── */}
      <ExpandingSection>
        <div id="clinicalpriorsection" className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <AnimatedContainer delay={0.05}>
              <h2 className="text-[#0f192a] text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                Intelligent Prior Authorization
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.12}>
              <p className="text-[#355a7b] mt-3 text-base leading-relaxed">
                From point-of-care to reimbursement: a seamless, automated integrity chain.
              </p>
            </AnimatedContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <AnimatedContainer key={f.title} delay={0.1 + i * 0.08}>
                <div
                  className="rounded-[30px] px-10 py-10 flex flex-col items-center text-center gap-5 h-full"
                  style={{
                    background: "#cde7ff",
                    boxShadow: "inset 0px 0px 30px -2px rgba(53,90,123,0.5)",
                  }}
                >
                  <div className="bg-white rounded-2xl w-[60px] h-[60px] flex items-center justify-center shrink-0">
                    <f.icon size={24} style={{ color: "#355a7b" }} />
                  </div>
                  <h3 className="text-[#0b1c30] font-semibold text-xl leading-snug">{f.title}</h3>
                  <p className="text-[#05233d] text-sm leading-relaxed">{f.description}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </ExpandingSection>


      {/* ── Persistent Autopilot ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark px-6 md:px-16 lg:px-24 py-28 md:py-36 overflow-hidden">
        {/* bottom glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-64"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(49,82,173,0.25) 0%, transparent 70%)",
          }}
        />

        <AnimatedContainer delay={0.05} className="relative z-10 mx-auto max-w-6xl">
          {/* large rounded card */}
          <div
            className="rounded-3xl p-6 md:p-10 lg:p-16 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
            style={{
              background: "linear-gradient(135deg, #091526 0%, #0e2a50 60%, #132f5a 100%)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Left — UI mockup */}
            <div className="w-full lg:w-[50%] shrink-0 flex flex-col gap-3">
              {/* Status item 1 */}
              <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <Shield size={15} style={{ color: BRAND }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-white text-sm font-medium">Verification Engine</span>
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>ACTIVE</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full w-[82%]" style={{ background: BRAND }} />
                  </div>
                </div>
              </div>

              {/* Status item 2 */}
              <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <LayoutGrid size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Clinical Ruleset Applied</p>
                  <p className="text-slate-500 text-xs mt-0.5">v4.12 Healthcare Standards</p>
                </div>
              </div>

              {/* Status item 3 */}
              <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <ArrowRight size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Auto-Resubmission Loop</p>
                  <p className="text-slate-500 text-xs mt-0.5">Scheduled for T+24h if pending</p>
                </div>
              </div>
            </div>

            {/* Right — content */}
            <div className="flex flex-col gap-5 w-full lg:w-[50%]">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                Persistent{" "}
                <span style={{ color: BRAND }}>Autopilot</span>
                {" "}Status Monitoring
              </h2>

              <p className="text-slate-400 text-base leading-relaxed">
                Our AI agents monitor payer portals 24/7, updating EHRs and triggering workflows in
                real time.
              </p>

              <ul className="flex flex-col gap-3">
                {[
                  "Direct payer portal scraping with enterprise-grade security.",
                  "Smart alerts only when clinical intervention is required.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: BRAND }} />
                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedContainer>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <img
          src="/cta-bg.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
          <div
            className="rounded-2xl px-10 md:px-16 py-14 md:py-16 text-center flex flex-col items-center gap-6"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 4px 40px rgba(49,82,173,0.08)",
            }}
          >
            <AnimatedContainer delay={0.05}>
              <h2 className="text-[#0B1120] text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                Deploy the Intelligence Layer
                <br />
                to your Revenue Cycle
              </h2>
            </AnimatedContainer>

            <AnimatedContainer delay={0.15}>
              <p className="text-[#355a7b] text-base leading-relaxed italic max-w-xl">
                Experience the reduction in administrative friction. Schedule a live technical demo
                with our clinical architecture team.
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.25} className="flex flex-col sm:flex-row gap-3">
              {/* <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1120] px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-white hover:bg-[#1a2540] transition-colors"
              >
                Request a Personal Demo <ArrowRight size={13} />
              </a> */}
              <a
                href="/company?service=partnership-%26-business-development"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0B1120]/30 px-7 py-3 text-xs font-bold tracking-[1.1px] uppercase text-[#0B1120] hover:bg-[#0B1120]/5 transition-colors"
              >
                Contact Strategy Team
              </a>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
