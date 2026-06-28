"use client";

import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { ArrowRight, Check, X, ChevronRight } from "lucide-react";
import { Footer } from "@/components/Footer";

/* ─── Animation primitives ───────────────────────────────────────────────── */

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const skip = useReducedMotion();
  if (skip) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Browser-frame wrapper ──────────────────────────────────────────────── */

function BrowserFrame({
  url,
  accent,
  children,
  height = 420,
}: {
  url: string;
  accent: string;
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <div
      className="w-full rounded-3xl pt-4 px-4 overflow-hidden"
      style={{ background: accent, height }}
    >
      <div className="w-full rounded-t-xl overflow-hidden flex flex-col h-full">
        <div className="flex items-center gap-1.5 px-3 py-2 shrink-0" style={{ background: "#f0f0f0" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          <div
            className="flex-1 max-w-xs ml-3 rounded px-3 py-0.5 text-[10px] text-gray-400"
            style={{ background: "#e2e2e2" }}
          >
            {url}
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/* ─── RxAI Mockup ────────────────────────────────────────────────────────── */

function RxAIMockup() {
  return (
    <div className="flex flex-col h-full bg-[#0d1117]">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold" style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>Rx</div>
          <span className="text-[11px] font-bold text-white">Rx.ai</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[9px] text-[#94a3b8]">Live</span>
        </div>
      </div>
      {/* metrics */}
      <div className="grid grid-cols-3 gap-2 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {[
          { label: "Claims Reviewed", value: "2,847", color: "#6366f1" },
          { label: "Auth Flags", value: "124", color: "#f59e0b" },
          { label: "Approved Today", value: "98%", color: "#22c55e" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-0.5">
            <span className="text-[8px] text-[#64748b] uppercase tracking-wide">{m.label}</span>
            <span className="text-[15px] font-bold leading-none" style={{ color: m.color }}>{m.value}</span>
          </div>
        ))}
      </div>
      {/* claim rows */}
      <div className="flex-1 min-h-0 flex flex-col mx-3 mt-2.5 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-4 px-3 py-2 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>
          {["NDC", "DRUG", "PAYER", "STATUS"].map((h) => (
            <span key={h} className="text-[8px] font-bold text-[#64748b] tracking-wide uppercase">{h}</span>
          ))}
        </div>
        {[
          { ndc: "00071-0155", drug: "Lipitor 40mg", payer: "BCBS", status: "Approved", ok: true },
          { ndc: "00310-0221", drug: "Ozempic 1mg", payer: "Aetna", status: "PA Required", ok: false },
          { ndc: "59762-3727", drug: "Jardiance", payer: "UHC", status: "Approved", ok: true },
          { ndc: "00006-0072", drug: "Januvia 50mg", payer: "Cigna", status: "Approved", ok: true },
        ].map((r, i, arr) => (
          <div key={r.ndc} className="grid grid-cols-4 items-center px-3 py-2" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <span className="font-mono text-[9px] text-[#6366f1]">{r.ndc}</span>
            <span className="text-[9.5px] text-[#e2e8f0]">{r.drug}</span>
            <span className="text-[9.5px] text-[#94a3b8]">{r.payer}</span>
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full w-fit" style={{ background: r.ok ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", color: r.ok ? "#22c55e" : "#f59e0b", border: `1px solid ${r.ok ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}` }}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 shrink-0 grid grid-cols-3 gap-2">
        {[
          { val: "99%", label: "Formulary Match", color: "#6366f1" },
          { val: "<2s", label: "Response Time", color: "#22c55e" },
          { val: "0", label: "Manual Checks", color: "#94a3b8" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg px-2.5 py-2 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="text-[13px] font-extrabold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-[7.5px] text-[#64748b] mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Audit.ai Mockup ────────────────────────────────────────────────────── */

function AuditMockup() {
  const layers = [
    { label: "Coverage", color: "#1d63ed", pct: 100 },
    { label: "Coding", color: "#2563eb", pct: 86 },
    { label: "Patterns", color: "#3b82f6", pct: 74 },
    { label: "Clear to Pay", color: "#22c55e", pct: 62 },
  ];
  return (
    <div className="flex flex-col h-full bg-[#0a0e1a]">
      <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-[11px] font-bold text-white">Audit.ai</span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(29,99,237,0.15)", color: "#7cadff", border: "1px solid rgba(29,99,237,0.3)" }}>Processing</span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col justify-center px-4 py-4 gap-3">
        {layers.map((l, i) => (
          <motion.div
            key={l.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-white">{l.label}</span>
              <span className="text-[10px] text-[#7cadff]">{l.pct}%</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: l.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${l.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mx-4 mb-4 rounded-xl px-4 py-3 flex items-center gap-3 shrink-0" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(34,197,94,0.15)" }}>
          <Check size={13} color="#22c55e" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-white">Clear to Pay</p>
          <p className="text-[10px]" style={{ color: "#22c55e" }}>All 4 layers passed · Claim certified</p>
        </div>
      </div>
    </div>
  );
}

/* ─── RCM.ai Mockup ──────────────────────────────────────────────────────── */

function RCMMockup() {
  return (
    <div className="flex flex-col h-full bg-[#0a0f1e]">
      <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-[11px] font-bold text-white">RCM.ai</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[9px] text-[#94a3b8]">All systems operational</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {[
          { label: "Clean Claim Rate", value: "97.4%", color: "#3b82f6" },
          { label: "Avg. Days AR", value: "18.2", color: "#f59e0b" },
          { label: "Denial Rate", value: "1.8%", color: "#22c55e" },
        ].map((m) => (
          <div key={m.label}>
            <span className="text-[8px] text-[#64748b] uppercase tracking-wide">{m.label}</span>
            <div className="text-[15px] font-bold" style={{ color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 min-h-0 flex flex-col mx-3 mt-2.5 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-4 px-3 py-2 shrink-0 text-[8px] font-bold text-[#64748b] uppercase tracking-wide" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>
          <span>CLAIM</span><span>SPECIALTY</span><span>PAYER</span><span>STATUS</span>
        </div>
        {[
          { id: "RCM-0041", spec: "Orthopedics", payer: "BCBS", status: "Clean", ok: true },
          { id: "RCM-0042", spec: "Cardiology", payer: "UHC", status: "Review", ok: false },
          { id: "RCM-0043", spec: "Neurology", payer: "Aetna", status: "Clean", ok: true },
          { id: "RCM-0044", spec: "Wound Care", payer: "Cigna", status: "Clean", ok: true },
        ].map((r, i, arr) => (
          <div key={r.id} className="grid grid-cols-4 items-center px-3 py-2" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <span className="font-mono text-[9px] text-[#7cadff]">{r.id}</span>
            <span className="text-[9.5px] text-[#e2e8f0]">{r.spec}</span>
            <span className="text-[9.5px] text-[#94a3b8]">{r.payer}</span>
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full w-fit" style={{ background: r.ok ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", color: r.ok ? "#22c55e" : "#f59e0b", border: `1px solid ${r.ok ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}` }}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 shrink-0">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
          <span className="text-[10px] text-[#93c5fd]">4 claims processed · No manual intervention required</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Product section (shared layout) ───────────────────────────────────── */

type ProductSectionProps = {
  badge: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  name: string;
  heading: string;
  description: string;
  bullets: string[];
  cta: string;
  ctaHref: string;
  mockup: React.ReactNode;
  mockupAccent: string;
  mockupUrl: string;
  imageLeft?: boolean;
};

function ProductSection({
  badge, badgeColor, badgeBg, badgeBorder,
  name, heading, description, bullets, cta, ctaHref,
  mockup, mockupAccent, mockupUrl,
  imageLeft = false,
}: ProductSectionProps) {
  const content = (
    <div className="flex flex-col gap-5 w-full lg:w-[45%]">
      <FadeUp delay={0.05}>
        <span
          className="inline-flex items-center rounded-[8px] px-3 py-1 text-[10px] font-bold tracking-[1.2px] uppercase"
          style={{ background: badgeBg, border: `1px solid ${badgeBorder}`, color: badgeColor }}
        >
          {badge}
        </span>
      </FadeUp>
      <FadeUp delay={0.12}>
        <h2 className="text-2xl md:text-[1.75rem] font-extrabold leading-tight tracking-tight text-white">
          <span style={{ color: badgeColor }}>{name}</span>
          <span className="text-white/60 font-semibold"> — </span>
          {heading}
        </h2>
      </FadeUp>
      <FadeUp delay={0.18}>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.9)" }}>{description}</p>
      </FadeUp>
      <FadeUp delay={0.24}>
        <ul className="flex flex-col gap-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: badgeColor }} />
              <span className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>{b}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
      <FadeUp delay={0.3} className="pt-1">
        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-[#0B1120] bg-white hover:bg-white/90 transition-colors"
        >
          {cta} <ArrowRight size={13} />
        </a>
      </FadeUp>
    </div>
  );

  const visual = (
    <FadeUp delay={0.08} className="w-full lg:w-[55%]">
      <BrowserFrame url={mockupUrl} accent={mockupAccent} height={400}>
        {mockup}
      </BrowserFrame>
    </FadeUp>
  );

  return (
    <section className="bg-[#0B1120] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {imageLeft ? <>{visual}{content}</> : <>{content}{visual}</>}
      </div>
    </section>
  );
}

/* ─── Chart.ai section ──────────────────────────────����������������────────────────────── */

const COMPARISON_ROWS = [
  {
    feature: "Form format spelling check",
    desc: "Checks basic loop structure, fields, names, and identifiers (grammatical verification).",
    scrubber: true,
    grelin: true,
  },
  {
    feature: "Code validity matches taxonomy",
    desc: "Confirms HCPCS / CPT codes exist within standard dictionary tables.",
    scrubber: true,
    grelin: true,
  },
  {
    feature: "Clinical electronic health chart verification",
    desc: "Validates that clinician notes contain clinical necessity records before claim exists.",
    scrubber: false,
    grelin: true,
  },
  {
    feature: "Payer playbook specific rule checking",
    desc: "Screens claim against actual historical payer decisions, not general standard policies.",
    scrubber: false,
    grelin: true,
  },
  {
    feature: "Specialty criteria qualification (LCD)",
    desc: "Applies deep specialty-specific constraints (e.g. hyperbaric chamber hours, facet spinal levels).",
    scrubber: false,
    grelin: true,
  },
];

const PILLARS = [
  {
    num: "1",
    title: "Playbooks",
    body: "Every payer has its own logic. Every specialty has its own documentation standards. Chart.ai encodes both into executable rules that run against the encounter, not the finished claim. Generic edit libraries check what a claim says. Playbooks check whether the claim should exist in that form at all.",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vPnx7JilrIIlCTX77SVVPX3V7Y5FT1.png",
    imgAlt: "Playbooks — stacked 3D cards showing Specialty Aware, Documentation Standards, Executable Rules with bookmark icon",
  },
  {
    num: "2",
    title: "Specialty depth",
    body: "Wound care fails for different reasons than pain management. Behavioral health has documentation requirements DME never sees. Each specialty app inherits the certification engine with Playbooks built for that specialty's actual failure modes. One architecture, certified to the standards of each market it serves.",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U6Km1G4zrl9QwAIzQFhnyDurvbBVKb.png",
    imgAlt: "Specialty depth — hub-spoke diagram connecting Wound Care, Behavioral Health, Pain Management, DME to Specialty Playbooks",
  },
  {
    num: "3",
    title: "Compounding learning",
    body: "Chart.ai shares the platform with RxAI and Audit.ai. RxAI sees how pharmacy claims fail at distribution scale. Audit.ai sees what payers flag before payment. Those patterns flow back into provider Playbooks. Chart.ai certifies claims against what payers actually do, not what their manuals say.",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SRdeqj8whKTCK5QkQT46bei907ocWM.png",
    imgAlt: "Compounding learning — circular diagram with RxAi, Chart.ai, Audit.ai orbiting Provider Playbooks",
  },
];

/* Inline SVG icons for table — avoids img tag rendering issues */
function GreenCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Yes">
      <path d="M8.33 21.67L15 28.33L31.67 11.67" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function RedCross() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="No">
      <path d="M10 30L30 10M10 10L30 30" stroke="#FF6565" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartAISection() {
  const [tab, setTab] = useState<"scrubbed" | "pillars">("scrubbed");

  return (
    <>
      {/* ── Chart.ai hero ── */}
      <section
        className="relative px-6 md:px-14 lg:px-20 py-10 md:py-14 overflow-hidden"
        style={{ background: "#0b1120" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,153,0,0.12), transparent)" }} aria-hidden />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-[600px] flex flex-col gap-4">
            <FadeUp>
              <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: "#ff9900" }}>
                For Providers
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Chart.ai. One foundation. Every specialty.
              </h2>
            </FadeUp>
            <FadeUp delay={0.14}>
              <div className="px-4 py-3" style={{ borderLeft: "3px solid #ff9900", background: "rgba(255,153,0,0.06)" }}>
                <p className="text-[13px] italic leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Claim Integrity that speaks your specialty&apos;s language.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.20}>
              <div className="flex flex-col gap-3">
                <p className="text-[13px] leading-[1.75]" style={{ color: "rgba(203,213,225,0.85)" }}>
                  Provider billing breaks in specialty-specific ways. Wound care fails differently than pain management. Behavioral health has documentation rules DME never sees.
                </p>
                <p className="text-[13px] leading-[1.75]" style={{ color: "rgba(203,213,225,0.85)" }}>
                  Chart.ai is the provider foundation. Each specialty application is tailored from it, with Playbooks built for that specialty&apos;s documentation standards, coding rules, and payer requirements.
                </p>
                <p className="text-[13px] font-medium leading-[1.75]" style={{ color: "rgba(255,255,255,0.9)" }}>
                  The result is Claim Integrity that speaks your specialty&apos;s language from day one.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Tier-2 card: Foundational Methodology ── */}
      <section className="px-6 md:px-14 lg:px-20 pb-10 md:pb-14" style={{ background: "#0b1120" }}>
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div
              className="rounded-2xl p-7 md:p-9 flex flex-col gap-7"
              style={{
                background: "#142238",
                border: "1px solid rgba(255,225,225,0.05)",
                boxShadow: "0 16px 40px -8px rgba(0,0,0,0.4)",
              }}
            >
              {/* ── Header row: title + enterprise toggle ── */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-[560px]">
                  <span
                    className="text-[10px] font-bold tracking-[2px] uppercase"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Foundational Methodology
                  </span>
                  <h3
                    className="text-[1.4rem] md:text-[1.65rem] font-extrabold leading-[1.2] text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Why Chart.ai certifies instead of scrubbing
                  </h3>
                </div>

                {/* Enterprise-grade segmented toggle */}
                <div
                  className="flex items-center self-start shrink-0 p-1 gap-1 rounded-full w-full sm:w-auto"
                  style={{
                    background: "#0b1222",
                    border: "1px solid rgba(255,255,255,0.10)",
                    minWidth: "min(300px, 100%)",
                  }}
                  role="tablist"
                  aria-label="Methodology view"
                >
                  <button
                    role="tab"
                    aria-selected={tab === "scrubbed"}
                    onClick={() => setTab("scrubbed")}
                    className="flex-1 rounded-full px-4 py-3 text-[13px] font-bold leading-[1.4] text-center transition-all duration-200 focus-visible:outline-none"
                    style={
                      tab === "scrubbed"
                        ? {
                            background: "rgba(255,225,225,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#ffffff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          }
                        : {
                            background: "transparent",
                            border: "1px solid transparent",
                            color: "rgba(255,255,255,0.38)",
                          }
                    }
                  >
                    Scrubbed vs<br />Certified
                  </button>
                  <button
                    role="tab"
                    aria-selected={tab === "pillars"}
                    onClick={() => setTab("pillars")}
                    className="flex-1 rounded-full px-4 py-3 text-[13px] font-bold leading-[1.4] text-center transition-all duration-200 focus-visible:outline-none"
                    style={
                      tab === "pillars"
                        ? {
                            background: "rgba(255,225,225,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#ffffff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          }
                        : {
                            background: "transparent",
                            border: "1px solid transparent",
                            color: "rgba(255,255,255,0.38)",
                          }
                    }
                  >
                    The 3<br />Pillars
                  </button>
                </div>
              </div>

              {/* ── Description (shared) ── */}
              <p className="text-[15px] leading-[1.625] max-w-[860px]" style={{ color: "rgba(255,255,255,0.60)" }}>
                Most clean claim tools are scrubbers. They check format, code validity, and basic edits after the claim is built.{" "}
                <strong style={{ color: "#ffffff", fontWeight: 500 }}>That is proofreading.</strong> Chart.ai works earlier, validating charge capture and payer requirements before the claim exists.{" "}
                <strong style={{ color: "#ffffff", fontWeight: 500 }}>A scrubbed claim is grammatically correct. A certified claim is payable.</strong>
              </p>

              {/* ── Tab: Scrubbed vs Certified ── */}
              {tab === "scrubbed" && (
                <div className="w-full overflow-x-auto -mx-1 px-1">
                  {/* Column header */}
                  <div
                    className="grid mb-1"
                    style={{ gridTemplateColumns: "1fr minmax(80px,140px) minmax(80px,140px)" }}
                  >
                    <span className="text-[10px] font-bold tracking-[2px] uppercase pb-4" style={{ color: "rgba(255,255,255,0.38)" }}>
                      Capability Feature
                    </span>
                    <span className="text-[10px] font-bold tracking-[2px] uppercase pb-4 text-center" style={{ color: "rgba(255,255,255,0.38)" }}>
                      Standard Scrubbed
                    </span>
                    <span className="text-[10px] font-bold tracking-[2px] uppercase pb-4 text-center" style={{ color: "#ffffff" }}>
                      Grelin Certified
                    </span>
                  </div>

                  {/* Data rows */}
                  {COMPARISON_ROWS.map((row) => (
                    <div
                      key={row.feature}
                      className="grid"
                      style={{
                        gridTemplateColumns: "1fr minmax(80px,140px) minmax(80px,140px)",
                        borderTop: "1px solid rgba(255,225,225,0.05)",
                      }}
                    >
                      {/* Feature cell */}
                      <div className="flex flex-col gap-1 py-5 pr-8">
                        <span
                          className="text-[15px] font-bold text-white"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {row.feature}
                        </span>
                        <span className="text-[11px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.38)" }}>
                          {row.desc}
                        </span>
                      </div>

                      {/* Standard Scrubbed cell */}
                      <div className="flex items-center justify-center py-5">
                        {row.scrubber ? <GreenCheck /> : <RedCross />}
                      </div>

                      {/* Grelin Certified cell — subtle highlight */}
                      <div
                        className="flex items-center justify-center py-5"
                        style={{ background: "rgba(255,255,255,0.018)" }}
                      >
                        <GreenCheck />
                      </div>
                    </div>
                  ))}

                  {/* Footer metric row */}
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: "1fr minmax(80px,140px) minmax(80px,140px)",
                      borderTop: "1px solid rgba(255,225,225,0.05)",
                    }}
                  >
                    <div className="flex flex-col gap-1 py-7 pr-8">
                      <span
                        className="text-[15px] font-bold text-white"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Claim Rework Avoidance Rate
                      </span>
                      <span className="text-[11px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.38)" }}>
                        Average rate of avoidance from claims entering multiple re-filings and audits.
                      </span>
                    </div>
                    <div className="flex items-center justify-center py-7 px-4">
                      <span
                        className="text-[11px] font-bold text-center uppercase leading-[1.4]"
                        style={{ color: "#ffffff" }}
                      >
                        Standard (15–20%<br />Denials)
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-center py-7 px-4"
                      style={{ background: "rgba(255,255,255,0.018)", borderRadius: "0 0 8px 0" }}
                    >
                      <span
                        className="text-[11px] font-bold text-center uppercase leading-[1.4]"
                        style={{ color: "#ffffff" }}
                      >
                        Superior (99.4% Paid on<br />1st Pass)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Tab: The 3 Pillars ── */}
              {tab === "pillars" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {PILLARS.map((p) => (
                    <motion.div
                      key={p.num}
                      className="flex flex-col overflow-hidden rounded-3xl"
                      style={{
                        background: "#11141d",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                      {/* Image area — fixed square, object-contain so all 4 edges are equally padded */}
                      <div
                        className="w-full shrink-0 flex items-center justify-center"
                        style={{
                          aspectRatio: "1 / 1",
                          background: "#0d1729",
                          padding: "16px",
                        }}
                      >
                        <img
                          src={p.img}
                          alt={p.imgAlt}
                          className="w-full h-full block"
                          style={{ objectFit: "contain", objectPosition: "center" }}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex flex-col gap-3 px-6 py-5">
                        <h4
                          className="text-[18px] font-bold text-white"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {p.num}. {p.title}
                        </h4>
                        <p className="text-[13px] leading-[1.72]" style={{ color: "#94a3b8" }}>
                          {p.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

/* ─── Specialty cards grid ───────────────────────────────────────────────── */

const SPECIALTIES = [
  {
    name: "Wound.ai",
    subtitle: "Claim Integrity for wound care documentation and billing",
    desc: "Bridges hyperbaric oxygen therapy criteria, wound measurement tracking, and specialized modifier rules to guarantee clinical compliance before submission.",
    href: "/wound",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S0LDFHtjejSQsub738O88NSd8AJOw4.png",
    imgAlt: "Wound.ai — Claim integrity for wound care documentation and billing",
  },
  {
    name: "Pain.ai",
    subtitle: "Claim Integrity for pain management practices",
    desc: "Enforces documentation standards for facet joint injections, epidural procedures, and toxicology screenings against rigorous payer LCDs.",
    href: "/pain",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HASyI7l2d46fh1tLdQJiZV5mlo9BcR.png",
    imgAlt: "Pain.ai — Claim Integrity for pain management practices",
  },
  {
    name: "Behavioral.ai",
    subtitle: "Claim Integrity for behavioral health providers",
    desc: "Solves complex authorization tracking, session concurrency limits, and strict telehealth documentation guidelines across commercial and Medicaid lines.",
    href: "#",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YkzmX2qIiRbFfcSmr67wOlDuBNeiKV.png",
    imgAlt: "Behavioral.ai — Intelligence behind every valid claim",
  },
  {
    name: "DME.ai",
    subtitle: "Claim Integrity for durable medical equipment claims",
    desc: "Automates certificate of medical necessity (CMN) checks, supplier standards tracking, and specific equipment documentation alignments.",
    href: "#",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZHl2Gy6IiOJqYqdu7kny8jfKF0Yngn.png",
    imgAlt: "DME.ai — Claim Integrity for Durable Medical Equipment Claims",
  },
];

function SpecialtiesGrid() {
  return (
    <section className="py-12 md:py-16" style={{ background: "#ffffff" }}>
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10">

        {/* Header */}
        <FadeUp className="text-center mb-10">
          <span
            className="block text-[11px] font-bold tracking-[1.2px] uppercase mb-3"
            style={{ color: "#355a7b", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The Chart.AI Family
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-balance"
            style={{ color: "#072e71", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Purpose-Built AI for High-Scrutiny Specialties
          </h2>
          <p
            className="text-[15px] leading-[1.625] mt-3 mx-auto max-w-[580px]"
            style={{ color: "#064277" }}
          >
            Provider billing breaks in specialty-specific ways. We built custom specialty playbooks on top of the shared Chart.ai architecture.
          </p>
        </FadeUp>

        {/* Cards tray */}
        <div
          className="rounded-3xl p-4 md:p-5"
          style={{ background: "#d6e7ff" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIALTIES.map((s, i) => (
              <FadeUp key={s.name} delay={0.07 * i}>
                <motion.a
                  href={s.href}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(7,46,113,0.14)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="flex flex-col overflow-hidden rounded-3xl h-full cursor-pointer"
                  style={{ background: "#ffffff", border: "1px solid rgba(7,46,113,0.08)" }}
                >
                  {/* Image — square container, object-contain, equal padding all 4 sides */}
                  <div
                    className="w-full shrink-0 flex items-center justify-center"
                    style={{
                      background: "#f0f6ff",
                      padding: "12px",
                      aspectRatio: "1 / 1",
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.imgAlt}
                      className="w-full h-full block"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5 p-4">
                    <h3
                      className="text-[15px] font-bold"
                      style={{ color: "#1d4a73", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {s.name}
                    </h3>
                    <p
                      className="text-[12px] font-semibold leading-snug"
                      style={{ color: "#456c8f" }}
                    >
                      {s.subtitle}
                    </p>
                    <p
                      className="text-[11px] leading-[1.6] mt-0.5"
                      style={{ color: "#485d7b" }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </motion.a>
              </FadeUp>
            ))}
          </div>

          {/* Bottom dark strip */}
          <FadeUp delay={0.3}>
            <div
              className="mt-4 rounded-b-2xl h-[72px]"
              style={{ background: "#0d274c" }}
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Platform unifier section ───────────────────────────────────────────── */

function PlatformUnifier() {
  const apps = [
    { name: "Rx.ai", color: "#6366f1", desc: "Pharmacy" },
    { name: "Audit.ai", color: "#1d63ed", desc: "Auditing" },
    { name: "RCM.ai", color: "#3b82f6", desc: "Revenue Cycle" },
    { name: "Chart.ai", color: "#ff9900", desc: "Documentation" },
    { name: "Wound.ai", color: "#FCA311", desc: "Wound Care" },
    { name: "Pain.ai", color: "#22c55e", desc: "Pain Mgmt" },
  ];

  return (
    /*
      Figma Frame 186 / Group 209:
      - Outer section bg: #ffffff (white page)
      - Inner card bg: #1241d4 (vivid royal blue), border-radius 100px 100px 0 0
      - Vertical stripe texture: repeating white lines at ~38px interval
      - Left: dark #050810 image box, radius 30px, padding 38px all sides
      - Right: all text white, JetBrains Mono label, Plus Jakarta Sans heading, Inter body
    */
    <section className="px-2 sm:px-4 md:px-10 lg:px-14 py-5 md:py-8" style={{ background: "#ffffff" }}>
      <div className="mx-auto max-w-[1298px]">
        <div
          className="overflow-hidden flex flex-col lg:flex-row"
          style={{
            background: "#1241d4",
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 38px)",
            borderRadius: "32px 32px 0 0",
            padding: "20px",
            gap: "16px",
          }}
        >
          {/* Left — dark image container */}
          <div
            className="w-full lg:w-[480px] shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              background: "#050810",
              borderRadius: "18px",
              minHeight: "220px",
            }}
          >
            <FadeUp delay={0.05} className="w-full h-full flex items-center justify-center p-5">
              <motion.img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kzFHra9VrR0fMH7xs6e366N3DobIT9.png"
                alt="Stacked perspective cards showing One Platform, Four Markets, Every Claim Workflow, Every Grelin Application"
                className="w-full h-auto block"
                style={{ maxWidth: "420px" }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />
            </FadeUp>
          </div>

          {/* Right — copy */}
          <div className="flex-1 flex flex-col justify-center gap-4 px-2 md:px-6 lg:px-10 py-5 lg:py-0">
            <FadeUp>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "1.2px",
                  lineHeight: "16px",
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                }}
              >
                Platform Feeds Applications
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="text-[1.75rem] sm:text-[2rem] md:text-[2.375rem]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  lineHeight: "1.15",
                  letterSpacing: "-1px",
                  color: "#ffffff",
                }}
              >
                One platform. Four markets. Every claim workflow.
              </h2>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="flex flex-col gap-4">
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "1.65",
                    color: "rgba(255,255,255,0.88)",
                    maxWidth: "480px",
                  }}
                >
                  Every Grelin application runs on the same intelligence platform. Playbooks encode payer logic, billing rules, and specialty requirements before a claim ever moves.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "1.65",
                    color: "rgba(255,255,255,0.88)",
                    maxWidth: "480px",
                  }}
                >
                  What one application learns, every application inherits. That is what makes Claim Integrity possible across the whole claim lifecycle.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    /*
      Figma RX section: background is the hero photo (image 13) — a deep blue
      abstract scene. Over it sits a large semi-transparent white frosted card
      (Frame 174: fill #ffffff at 50% opacity, radius 30px). All text is dark blue.
    */
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "#0f2d5a",
        backgroundImage: `url("https://s3-alpha-sig.figma.com/img/808f/3e54/b53d755d947aa26719272c9373c68110?Expires=1783296000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=R7HtMw1TpEYMHXBYsmWybjbKEPHoLDIJgOyJvvvYWUFlHIgs6nYdxdKWdiL-w36O-oZxzW81wT90JkKbsDaGFae7rHl0fUdehfPPkuLXryF9g9mJHkVtSxQ3qJPOEtyNRSNAKqDaZnzxDVChHLZbr8Icq4D7wRutPS7~NcX~1ZQ2vyDUCVBLUQ8BvK4XZ505NLeL2USS2uQe~G3TsOUWNBuCbU9gIkmaQQF~AiiNURJ~QP0u~T2bDO9qiuPM3O9VsHBoVt1SjPHml83fO-IRIe5bCnxyUdb~IloGL-f1eQ1Fhi1k4PfcR2Y4pn9B0MYNxdCISuiMyJyflhRfieYp2w__")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to brighten/lighten the photo so the frosted card pops */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(210,228,255,0.45)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1247px] px-4 md:px-8 lg:px-10">
        <FadeUp>
          {/* Frosted white card */}
          <div
            className="rounded-[24px] flex flex-col items-center text-center gap-5 px-8 md:px-14 lg:px-20 py-10 md:py-12"
            style={{
              background: "rgba(255, 255, 255, 0.50)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          >
            {/* "READY TO MOVE UPSTREAM" — #0e69d9, tracking 3.6px, uppercase */}
            <span
              className="text-[12px] font-bold uppercase"
              style={{
                color: "#0e69d9",
                letterSpacing: "3.6px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Ready to Move Upstream
            </span>

            {/* Heading */}
            <h2
              className="text-3xl md:text-[2.25rem] font-extrabold leading-[1.15] tracking-tight text-balance max-w-[600px]"
              style={{ color: "#0f3873", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              If your business runs on claims, it runs through Grelin.
            </h2>

            {/* Subtitle */}
            <p
              className="text-[15px] leading-[1.6] max-w-[560px]"
              style={{ color: "#294e8c", fontFamily: "'Inter', sans-serif" }}
            >
              Wherever you sit on the claim, there is a Grelin application built for how your work actually happens. Let us secure your claim integrity.
            </p>

            {/* Buttons — Figma exact: primary #0f192a + white text, secondary #ffffff + dark text */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {/* Primary button — #0f192a bg, white text, radius 6px */}
              <a
                href="/company?service=request-a-demo"
                className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{
                  background: "#0f192a",
                  borderRadius: "6px",
                  padding: "12px 32px",
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/figma-assets/d17d2fe9120b143ad3483572f51a1453b3d7eb180a97315fae6c01ce5d10406f.svg"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                />
                Book a Demo
              </a>

              {/* Secondary button — #ffffff bg, #0f192a text, radius 6px */}
              <a
                href="/company?service=partnership-%26-business-development"
                className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "#ffffff",
                  color: "#0f192a",
                  borderRadius: "6px",
                  padding: "12px 32px",
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/figma-assets/b70a68a9af1b5f197867b9f487de50507ac98316d2e210541edb55becd2d1e9d.svg"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                />
                Talk to the Team
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function SolutionsPage() {
  return (
    <main className="bg-[#0B1120] text-white">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 lg:px-20 pt-28 pb-12 md:pt-32 md:pb-16"
        style={{ background: "#0B1120" }}
      >
        {/* dot-grid texture right side */}
        <div
          aria-hidden
          className="absolute pointer-events-none right-0 top-0 bottom-0 w-[55%]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(99,130,200,0.18) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to right, transparent 0%, black 40%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Left — copy */}
          <div className="w-full lg:w-[52%] flex flex-col gap-4">
            <FadeUp>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[1px] uppercase"
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.55)" }}
              >
                Solutions
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-extrabold leading-[1.1] tracking-tight">
                <span className="text-white">Every claim has a business behind it.</span>{" "}
                <span style={{ color: "#4b9eff" }}>We built an app for each </span>
                <span className="text-white">one.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="text-[14px] leading-[1.7]" style={{ color: "rgba(148,163,184,0.85)" }}>
                Grelin is one AI Intelligence Platform with purpose-built applications for every business on the claim. Pharma distributors. Payers. RCM and billing companies. Providers. Pick your seat on the claim. The platform does the rest.
              </p>
            </FadeUp>
            <FadeUp delay={0.26} className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href="/company?service=request-a-demo"
                className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[12px] font-bold tracking-[0.6px] uppercase transition-colors"
                style={{ background: "#1d63ed", color: "#ffffff" }}
              >
                Book Grelin Demo
              </a>
              <a
                href="/platform"
                className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[12px] font-bold tracking-[0.6px] uppercase transition-colors"
                style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)" }}
              >
                How It Runs in Both Directions
              </a>
            </FadeUp>
          </div>

          {/* Right — Grelin Platform hub diagram */}
          <FadeUp delay={0.14} className="w-full lg:w-[48%] flex justify-center">
            <motion.div
              className="w-full max-w-[420px] rounded-xl overflow-hidden"
              style={{ background: "#0d1829", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 48px rgba(0,0,0,0.45)" }}
              whileHover={{ scale: 1.012, boxShadow: "0 28px 64px rgba(29,99,237,0.15)" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VIWsGNeBYb5atrDU1BeHwGfsATgg7g.png"
                alt="Grelin Platform hub diagram showing RxAi, RCM.ai, Audit.ai, and Chart.ai connected to a central CORE ENGINE circle"
                className="w-full h-auto block"
              />
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ── Platform unifier ───���────────────────────────────────────────────── */}
      <PlatformUnifier />

      {/* ── RxAI ────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#e2eeff" }} className="px-6 md:px-14 lg:px-20 py-10 md:py-12">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">

          {/* Left — content */}
          <div className="flex flex-col gap-3 w-full lg:w-[46%]">
            <FadeUp>
              <span
                className="text-[10px] font-bold tracking-[2px] uppercase"
                style={{ color: "#2563eb" }}
              >
                For Pharma Distributors
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="text-[2.25rem] md:text-[2.75rem] font-extrabold tracking-tight leading-none"
                style={{ color: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                RxAI
              </h2>
            </FadeUp>
            <FadeUp delay={0.14}>
              <div
                className="px-3.5 py-2.5 rounded-sm"
                style={{ background: "#cbe0fd", borderLeft: "3px solid #355a7b" }}
              >
                <p className="text-[13px] font-medium italic leading-relaxed" style={{ color: "#334155" }}>
                  Claim Integrity for pharmacy claims at distribution scale.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-3">
                <p className="text-sm leading-[1.75]" style={{ color: "#1e293b" }}>
                  Pharmacy claims move fast and fail quietly. A single coding error or payer rule miss repeats across thousands of transactions before anyone sees it.
                </p>
                <p className="text-sm leading-[1.75]" style={{ color: "#1e293b" }}>
                  RxAI validates pharmacy claims against payer logic before they move. Errors get caught at the source, not discovered in reconciliation.
                </p>
                <p className="text-sm leading-[1.75]" style={{ color: "#1e293b" }}>
                  Distributors and their pharmacy networks get cleaner claims, fewer reversals, and revenue that arrives the first time.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.26}>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Validates claims against payer-specific logic before submission",
                  "Catches repeat errors at the source instead of in reconciliation",
                  "Scales across entire pharmacy networks from one platform",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ border: "1.5px solid #2563eb" }}
                    >
                      <Check size={9} color="#2563eb" />
                    </span>
                    <span className="text-[13px] leading-relaxed" style={{ color: "#0f172a" }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.32}>
              <a
                href="/rxai"
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-[12px] font-bold tracking-[1.4px] uppercase transition-opacity hover:opacity-90 w-fit"
                style={{ background: "#0e2c60", color: "#ffffff" }}
              >
                See RxAI in Action <ArrowRight size={12} />
              </a>
            </FadeUp>
          </div>

          {/* Right ��� image card */}
          <FadeUp delay={0.1} className="w-full lg:w-[46%] flex justify-center">
            <motion.div
              className="flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cO8SidN1z1uvw8a5zO7ry3MnZNKHdA.png"
                alt="RxAI speedometer gauge dashboard with Validate Before Submission, Catch Errors at the Source, Scale Across Networks feature nodes and Rx prescription document with shield checkmark"
                className="w-full h-auto block"
                style={{
                  borderRadius: "28px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                  display: "block",
                }}
              />
            </motion.div>
          </FadeUp>

        </div>
      </section>

      {/* ── Audit.ai ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0b1120" }} className="px-6 md:px-14 lg:px-20 py-10 md:py-14">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">

          {/* Left — Audit.ai image */}
          <FadeUp delay={0.05} className="w-full lg:w-[50%] flex items-center justify-center">
            <motion.div
              className="flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HwrD8wOQIdibnHAqRoGQawoIVtzYQl.png"
                alt="Audit.ai stacked glassmorphism cards showing Coverage, Coding, Patterns, and Clear to Pay layers with Audit.ai branding below"
                className="w-full h-auto block"
                style={{
                  borderRadius: "28px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  display: "block",
                }}
              />
            </motion.div>
          </FadeUp>

          {/* Right — content */}
          <div className="flex flex-col gap-4 w-full lg:w-[50%]">
            <FadeUp>
              <span
                className="text-[10px] font-bold tracking-[2px] uppercase"
                style={{ color: "#2563eb" }}
              >
                For Payers
              </span>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2
                className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none"
                style={{ color: "#ffffff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Audit.ai
              </h2>
            </FadeUp>

            <FadeUp delay={0.14}>
              <div
                className="px-4 py-3 rounded-sm"
                style={{ background: "rgba(203,224,253,0.08)", border: "1px solid rgba(203,224,253,0.22)", borderLeft: "3px solid #2563eb" }}
              >
                <p className="text-[13px] font-medium italic leading-relaxed" style={{ color: "#cbe0fd" }}>
                  Pre-payment claim intelligence for payers who want to stop overpaying before it happens.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.20}>
              <div className="flex flex-col gap-3">
                <p className="text-[13px] leading-[1.75]" style={{ color: "#e2e8f0" }}>
                  Payers audit claims after they pay them. Recovery is slow, adversarial, and incomplete.
                </p>
                <p className="text-[13px] leading-[1.75]" style={{ color: "#e2e8f0" }}>
                  Audit.ai moves the audit upstream. Claims get screened against coverage rules, coding standards, and historical patterns before payment is released.
                </p>
                <p className="text-[13px] leading-[1.75]" style={{ color: "#e2e8f0" }}>
                  Overpayments stop being a recovery project. They stop happening.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.26}>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Screens claims against coverage and coding rules pre-payment",
                  "Flags patterns human auditors miss at volume",
                  "Turns post-payment recovery into pre-payment prevention",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ border: "1.5px solid #4b9eff" }}
                    >
                      <Check size={9} color="#4b9eff" />
                    </span>
                    <span className="text-[13px] leading-relaxed" style={{ color: "#e2e8f0" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.32} className="pt-1">
              <a
                href="/auditai"
                className="inline-flex items-center gap-2.5 rounded-lg px-6 py-3 text-[12px] font-bold tracking-[1.4px] uppercase transition-opacity hover:opacity-90 w-fit"
                style={{ background: "#0e2c60", color: "#ffffff" }}
              >
                See Audit.ai in Action <ArrowRight size={13} />
              </a>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* ── RCM.ai ───────────────────────────────────────────────────────────── */}
      <section style={{ background: "#ffffff" }} className="px-6 md:px-14 lg:px-20 py-10 md:py-14">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">

          {/* Left — content */}
          <div className="flex flex-col gap-4 w-full lg:w-[50%]">
            <FadeUp>
              <span
                className="text-[10px] font-bold tracking-[2px] uppercase"
                style={{ color: "#2563eb" }}
              >
                For RCM and Billing Companies
              </span>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2
                className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none"
                style={{ color: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                RCM.ai
              </h2>
            </FadeUp>

            <FadeUp delay={0.14}>
              <div
                className="px-4 py-3 rounded-sm"
                style={{ background: "#cbe0fd", borderLeft: "3px solid #355a7b" }}
              >
                <p className="text-sm font-medium italic leading-relaxed" style={{ color: "#334155" }}>
                  Claim Integrity across every client, specialty, and payer you bill for.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.20}>
              <div className="flex flex-col gap-3">
                <p className="text-[13px] leading-[1.75]" style={{ color: "#334155" }}>
                  Billing companies absorb the rework their clients create. Every denial worked is margin lost on a contract priced for clean claims.
                </p>
                <p className="text-[13px] leading-[1.75]" style={{ color: "#334155" }}>
                  RCM.ai applies Claim Integrity across your entire book of business. Playbooks run client by client, specialty by specialty, payer by payer, so errors get caught before submission instead of worked after denial.
                </p>
                <p className="text-[13px] leading-[1.75]" style={{ color: "#334155" }}>
                  Claims go out certified. Rework drops. Margins recover. Clients see the difference in their first remittance cycle.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.26}>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Runs Playbooks across every client, specialty, and payer from one platform",
                  "Catches errors before submission instead of working denials after",
                  "Turns clean claims performance into a client retention story",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ border: "1.5px solid #2563eb" }}
                    >
                      <Check size={9} color="#2563eb" />
                    </span>
                    <span className="text-[13px] leading-relaxed" style={{ color: "#334155" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.32} className="pt-1">
              <a
                href="/rcmai"
                className="inline-flex items-center gap-2.5 rounded-lg px-6 py-3 text-[12px] font-bold tracking-[1.4px] uppercase transition-opacity hover:opacity-90 w-fit"
                style={{ background: "#0e2c60", color: "#ffffff" }}
              >
                See RCM.ai in Action <ArrowRight size={13} />
              </a>
            </FadeUp>
          </div>

          {/* Right — RCM.ai app card */}
          <FadeUp delay={0.1} className="w-full lg:w-[50%] flex justify-center">
            <motion.div
              className="flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZITn8Z1fLRI3z1dQUaJ4MEa49URFZj.png"
                alt="RCM.ai card showing a glowing 3D blue shield with checkmark, floating document cards for patient profile, dollar invoice, and analytics report, with target, bar chart, and handshake icons at the bottom"
                className="w-full h-auto block"
                style={{
                  borderRadius: "28px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
                  display: "block",
                }}
              />
            </motion.div>
          </FadeUp>

        </div>
      </section>

      {/* ── Chart.ai + comparison ────────────────────���───────────────────────── */}
      <ChartAISection />

      {/* ── Specialties grid ─────────────────────────────────────────────────── */}
      <SpecialtiesGrid />

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <FinalCTA />

      <Footer />
    </main>
  );
}
