"use client";

import { Footer } from "@/components/Footer";
import { motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Brain,
  Check,
  ClipboardCheck,
  FileText,
  Pill,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════
   Primitives
   ════════════════════════════════════════════════════════════════════════ */

function FadeIn({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Data
   ════════════════════════════════════════════════════════════════════════ */

const riskCards = [
  {
    title: "Margin lives in clean claims",
    body: "You run revenue cycle for dozens of physician clients. Every denial you work is your P&L — not just your client's revenue. Powered by PriorAuth, Eligibility, and Grelin's specialty applications, claim integrity is enforced before submission. The same coder manages more accounts because rework volume drops.",
  },
  {
    title: "Payer logic enforced before the claim is written",
    body: "A pain management group bills nothing like a wound care group. National payer policy varies by region, plan, and LCD. Wound.ai, Pain.ai, Behavioral.ai, and DME.ai enforce specialty-specific payer rules, documentation standards, coding requirements, and claim integrity controls before submission. Denial appeal work moves upstream into documentation and coding, where the leak actually starts.",
  },
  {
    title: "One P&L. Consistent integrity across every practice.",
    body: "Multiple specialties, EHRs, and billing teams — one P&L. Variability across the portfolio creates rework no central team can fully manage. The platform combines Wound.ai, Pain.ai, Behavioral.ai, DME.ai, PriorAuth, and Eligibility into a single operating view across the portfolio. Grelin normalizes claim integrity across every practice and gives central operators a single view of where revenue is leaking.",
  },
  {
    title: "Close audit exposure before billing",
    body: "DME denial rates are among the highest in U.S. healthcare. A missing physician signature or documentation gap can void an entire month of billing. DME.ai validates documentation, physician orders, signatures, LCD requirements, and billing rules before the claim leaves the building.",
  },
  {
    title: "A missed step on a $50,000 claim is a margin event",
    body: "Specialty drugs carry prior authorization complexity, J-code rules, and white-bagging logistics. A missed step on a high-dollar claim is not a denial to appeal later. It is the margin on the dispense, gone. RxAI enforces authorization, coding, and documentation requirements before the drug moves, reducing reimbursement risk and protecting margin across the distribution chain.",
  },
  {
    title: "The claim arrives clean",
    body: "The payer carries the cost of the broken claim. Pended reviews, medical record requests, appeals, and provider calls. Today that work is sampled because a full audit takes too long to build and run. Audit.ai runs every claim through 29 checks in minutes and ranks what to look at first. Audit the whole book, not two percent of it. Lower cost per claim. Cleaner findings. Less friction with providers.",
  },
];

const intelligenceCards = [
  { icon: Brain, title: "Shared intelligence", body: "Insights from one specialty inform validation across the entire platform." },
  { icon: RefreshCw, title: "Cross-application learning", body: "Each application improves as more claim data flows through the system." },
  { icon: TrendingUp, title: "Scalable protection", body: "Revenue integrity that grows with your organization without proportional complexity." },
];

type App = { name: string; icon: React.ComponentType<{ className?: string }>; desc: string };
type Specialty = {
  tab: string;
  badge: string;
  heading: string;
  body: string[];
  stats: { value: string; label: string }[];
  apps: App[];
};

const specialties: Specialty[] = [
  {
    tab: "Pain Management",
    badge: "Pain Management",
    heading: "Highly regulated",
    body: [
      "Pain management practices operate in highly regulated payer environments with strict authorization and documentation requirements. Even small inconsistencies between documentation and coding can create reimbursement delays, impacting both cash flow and operational efficiency.",
      "Grelin validates authorization requirements, coding alignment, and payer policy compliance before claims are submitted — reducing denials and maintaining more predictable reimbursement performance.",
    ],
    stats: [
      { value: "99.4%", label: "Coding compliance accuracy" },
      { value: "-14 days", label: "Average denial delay eliminated" },
    ],
    apps: [
      { name: "Pain.ai", icon: Activity, desc: "AI-powered validation for pain management billing." },
      { name: "Eligibility.ai", icon: BadgeCheck, desc: "Catch coverage and eligibility breakdowns upstream." },
      { name: "PriorAuth.ai", icon: ShieldCheck, desc: "Detect authorization gaps before they delay reimbursement." },
      { name: "Performance.ai", icon: BarChart3, desc: "Turn pre-bill insights into operational visibility." },
    ],
  },
  {
    tab: "Wound Care",
    badge: "Wound Care",
    heading: "Documentation intensive",
    body: [
      "Wound care reimbursement depends on precise, stage-by-stage documentation. Measurements, tissue descriptors, and debridement notes must align with coding before the claim is built or denials follow.",
      "Grelin validates clinical documentation completeness and coding accuracy upstream, so every stage of healing is captured and billed correctly the first time.",
    ],
    stats: [
      { value: "98.1%", label: "Documentation completeness" },
      { value: "-31%", label: "Denials tied to documentation gaps" },
    ],
    apps: [
      { name: "Wound.ai", icon: Stethoscope, desc: "Validates wound documentation and coding before submission." },
      { name: "Eligibility.ai", icon: BadgeCheck, desc: "Confirms coverage and benefits before services are billed." },
      { name: "PriorAuth.ai", icon: ShieldCheck, desc: "Confirms authorization for wound procedures upstream." },
      { name: "Performance.ai", icon: BarChart3, desc: "Surfaces revenue risk across providers and locations." },
    ],
  },
  {
    tab: "DME & Medical",
    badge: "DME & Medical",
    heading: "Signature and order driven",
    body: [
      "DME denial rates are among the highest in healthcare. A missing physician signature, order, or documentation gap can void an entire month of billing.",
      "DME.ai validates documentation, physician orders, signatures, and LCD requirements before the claim leaves the building — closing audit exposure before it becomes lost revenue.",
    ],
    stats: [
      { value: "99.0%", label: "Order & signature integrity" },
      { value: "-27%", label: "Preventable DME denials" },
    ],
    apps: [
      { name: "DME.ai", icon: Boxes, desc: "Validates orders, signatures, and LCD requirements." },
      { name: "Eligibility.ai", icon: BadgeCheck, desc: "Verifies coverage before equipment is billed." },
      { name: "PriorAuth.ai", icon: ShieldCheck, desc: "Confirms authorization before fulfillment." },
      { name: "Audit.ai", icon: ClipboardCheck, desc: "Layered audit checks on submitted claims." },
    ],
  },
  {
    tab: "Specialty Pharmacy",
    badge: "Specialty Pharmacy",
    heading: "High-dollar, auth-heavy",
    body: [
      "Specialty drugs carry prior-authorization complexity, J-code rules, and white-bagging logistics. A missed step on a high-dollar claim is the margin on the dispense, gone.",
      "RxAI enforces authorization, coding, and documentation requirements before the drug moves — reducing reimbursement risk and protecting margin across the distribution chain.",
    ],
    stats: [
      { value: "$50K+", label: "Per-claim margin protected" },
      { value: "-22%", label: "Authorization-driven write-offs" },
    ],
    apps: [
      { name: "RxAI", icon: Pill, desc: "Prescription claim integrity across the supply chain." },
      { name: "PriorAuth.ai", icon: ShieldCheck, desc: "Tracks complex specialty auth requirements." },
      { name: "Eligibility.ai", icon: BadgeCheck, desc: "Confirms benefits and coverage upstream." },
      { name: "Performance.ai", icon: BarChart3, desc: "Real-time revenue risk signals across the stack." },
    ],
  },
  {
    tab: "Behavioral Health",
    badge: "Behavioral Health",
    heading: "Policy variable",
    body: [
      "Behavioral health payer policy varies widely by plan and region, with session limits, authorization windows, and documentation rules that shift frequently.",
      "Behavioral.ai aligns each claim with current payer policy and documentation standards before submission, reducing denials and stabilizing reimbursement.",
    ],
    stats: [
      { value: "97.6%", label: "Policy alignment rate" },
      { value: "-19%", label: "Authorization-related denials" },
    ],
    apps: [
      { name: "Behavioral.ai", icon: ScrollText, desc: "Aligns claims with evolving behavioral health policy." },
      { name: "Eligibility.ai", icon: BadgeCheck, desc: "Confirms coverage and session benefits upstream." },
      { name: "PriorAuth.ai", icon: ShieldCheck, desc: "Detects authorization gaps before they delay payment." },
      { name: "Performance.ai", icon: BarChart3, desc: "Operational visibility across providers and sites." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */

export default function IndustriesPage() {
  const [active, setActive] = useState(0);
  const current = specialties[active];

  return (
    <main className="overflow-x-hidden bg-[#070d1c] font-sans text-white">
      {/* ───────────── 1. HERO ───────────── */}
      <section className="relative overflow-hidden bg-[#070d1c] pt-28 md:pt-36">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 4%,rgba(0,82,255,0.28),transparent 38%),radial-gradient(circle at 6% 20%,rgba(245,160,50,0.10),transparent 32%),linear-gradient(180deg,#070d1c,#0a1730 55%,#070d1c)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-12 px-6 pb-16 md:px-8 md:pb-24 lg:grid-cols-[1fr_1.1fr]">
          {/* Left */}
          <FadeIn className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f5a032]/40 bg-[#f5a032]/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#f5a032]">
              <Sparkles className="h-3.5 w-3.5" /> Specialty Revenue Integrity
            </span>
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[56px]">
              Revenue integrity for{" "}
              <span className="bg-gradient-to-r from-white to-[#6aa6ff] bg-clip-text text-transparent">
                specialty healthcare
              </span>
            </h1>
            <p className="max-w-[520px] text-[16px] leading-7 text-slate-300/85">
              Every specialty operates under its own documentation rules, coding complexity, and payer
              policies. Grelin helps specialty organizations prevent denials before claims are submitted —
              by validating the factors that most often lead to revenue leakage.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href="/company?service=request-a-demo"
                className="group inline-flex items-center gap-2 rounded-[12px] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#06183f] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(120,180,255,0.7)]"
              >
                Start Assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#specialties"
                className="inline-flex items-center rounded-[12px] border border-white/20 bg-white/[0.06] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.12]"
              >
                Explore Specialties
              </a>
            </div>
          </FadeIn>

          {/* Right — PRE-BILL VALIDATION dashboard card */}
          <FadeIn delay={0.15}>
            <div className="rounded-[22px] border border-[#dfe7f5] bg-white p-5 text-[#0f2350] shadow-[0_30px_80px_-40px_rgba(0,60,180,0.8)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a9bbd]">Pre-bill validation</p>
                  <p className="text-[12px] text-[#5a78c5]">Grelin Intelligence Layer</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f5a032]/30 bg-[#f5a032]/10 px-2.5 py-1 text-[10px] font-semibold text-[#d9821a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f5a032]" /> Live
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#e4ebf7] bg-[#f7faff] p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f5a032]/15 text-[#d9821a]"><FileText className="h-3.5 w-3.5" /></span>
                    <p className="text-[13px] font-bold">Claim Intake</p>
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#5a6b8c]">847 claims queued</p>
                  <span className="mt-2 inline-block rounded bg-[#f5a032]/12 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#d9821a]">Intake</span>
                </div>
                <div className="rounded-xl border border-[#cfe0f5] bg-[#eef5ff] p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a3bd6]/12 text-[#0a3bd6]"><Brain className="h-3.5 w-3.5" /></span>
                    <p className="text-[13px] font-bold">Pre-bill Check</p>
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#5a6b8c]">AI analysis running</p>
                  <span className="mt-2 inline-block rounded bg-[#0a3bd6]/12 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#0a3bd6]">Analyzing</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a9bbd]">Validation progress</p>
                <div className="mt-3 flex items-center justify-between">
                  {["Eligibility", "Docs", "Coding", "Policy"].map((s, i) => (
                    <div key={s} className="flex flex-1 items-center">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] ${i <= 1 ? "bg-[#0a3bd6] text-white" : "border border-[#cfd9ec] text-[#aab6cc]"}`}>
                        {i <= 1 ? <Check className="h-3 w-3" /> : i + 1}
                      </span>
                      {i < 3 && <span className={`h-[2px] flex-1 ${i < 1 ? "bg-[#0a3bd6]" : "bg-[#e2e9f5]"}`} />}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-[#5a78c5]">Running: Documentation check</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e7eefb]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#f5a032] to-[#0a3bd6]" style={{ width: "62%" }} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { v: "1,284", l: "Claims validated", c: "#d9821a" },
                  { v: "94.2%", l: "Denials blocked", c: "#16a34a" },
                  { v: "<2m", l: "Avg resolution", c: "#0a3bd6" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-[#e4ebf7] bg-[#f7faff] px-3 py-3 text-center">
                    <p className="text-[16px] font-extrabold tabular-nums" style={{ color: s.c }}>{s.v}</p>
                    <p className="mt-0.5 text-[10px] text-[#5a6b8c]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── 2. COMPLEX / SIMPLIFY (white) ───────────── */}
      <section className="bg-white py-16 text-[#131b2e] md:py-24">
        <div className="mx-auto max-w-[1080px] px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#16224a] md:text-[44px]">
              Specialty reimbursement is <span className="text-[#2563eb]">complex.</span> Grelin helps simplify it.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-[#4a5b7d]">
              Every specialty has unique billing and compliance requirements. Grelin uses AI to validate
              claims before submission and prevent revenue leakage.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { tag: "Pre-billing", icon: ShieldCheck, body: "Grelin intervenes before the claim is ever created — resolving issues while the encounter is still active." },
              { tag: "Proactive", icon: TrendingUp, body: "Issues are identified and resolved at the point of origin, not discovered weeks later through a denial." },
            ].map((c, i) => (
              <FadeIn key={c.tag} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-[#13234b] bg-[#0a1730] p-7 text-white transition-all hover:-translate-y-1 hover:border-[#3b6fd6]/50">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#13306a]/60 text-[#7aa6f5] ring-1 ring-[#3b6fd6]/30">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold">{c.tag}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-300/80">{c.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 3. PRE-BILL REVENUE RISK (blue) ───────────── */}
      <section id="assessment" className="relative overflow-hidden py-16 text-white md:py-24">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 14% 12%,rgba(120,160,255,0.22),transparent 32%),linear-gradient(135deg,#2a47b8,#16307f 52%,#0a1c4a)" }}
        />
        <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[42px]">
              Pre-bill revenue risk assessment
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-blue-100/85">
              Answer a few questions about your specialty and revenue cycle workflow. Grelin identifies
              your top revenue risks and recommends the right application mix for your organization.
            </p>
          </FadeIn>

          {/* Top 3 revenue risk areas — highlighted callout */}
          <FadeIn delay={0.1}>
            <div className="mx-auto mt-9 max-w-2xl rounded-2xl border border-white/15 bg-white/[0.08] px-6 py-5 text-center backdrop-blur">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#bfe0ff]">Top 3 revenue risk areas</p>
              <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-blue-100/85">
                Precision analysis of specialty-specific leakage. We pinpoint the exact stages where claims
                are historically compromised within your organization.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {riskCards.map((c, i) => (
              <FadeIn key={c.title} delay={(i % 3) * 0.06}>
                <div className="group h-full rounded-2xl border border-white/12 bg-white/[0.07] p-6 backdrop-blur transition-all hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/[0.11]">
                  <h3 className="text-[16px] font-bold leading-snug">{c.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.7] text-blue-100/80">{c.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 4. INTELLIGENCE LAYER (white) ───────────── */}
      <section className="bg-white py-16 text-[#131b2e] md:py-24">
        <div className="mx-auto max-w-[1080px] px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#16224a] md:text-[42px]">
              Powered by the Grelin AI intelligence layer
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#4a5b7d]">
              All specialty deployments run on the same underlying intelligence engine — ensuring shared
              learning, consistent validation standards, and scalable protection across every application
              and location.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {intelligenceCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <FadeIn key={c.title} delay={i * 0.08}>
                  <div className="group flex h-full flex-col items-center rounded-2xl border border-[#cfe0f5] bg-gradient-to-b from-[#dcebff] to-[#eef4ff] p-7 text-center transition-transform hover:-translate-y-1.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#2563eb] shadow-sm">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-[17px] font-bold text-[#16224a]">{c.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#4a5b7d]">{c.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 5. SPECIALTY TABS (dark) ───────────── */}
      <section id="specialties" className="relative overflow-hidden bg-[#070d1c] py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6 md:px-8">
          {/* Tab bar */}
          <FadeIn className="mb-10 flex justify-center">
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-white/12 bg-white/[0.05] p-1.5 no-scrollbar">
              {specialties.map((s, i) => (
                <button
                  key={s.tab}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                    active === i ? "bg-white text-[#0b1120] shadow-sm" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {s.tab}
                </button>
              ))}
            </div>
          </FadeIn>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
          >
            {/* Left — specialty detail */}
            <div className="rounded-2xl border border-white/10 bg-[#0a1730] p-7 md:p-9">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3b6fd6]/30 bg-[#13306a]/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ec4f6]">
                {current.badge}
              </span>
              <h3 className="mt-5 text-[30px] font-extrabold tracking-tight md:text-[38px]">{current.heading}</h3>
              {current.body.map((p, i) => (
                <p key={i} className="mt-4 text-[14px] leading-relaxed text-slate-300/85">{p}</p>
              ))}
              <div className="mt-7 grid grid-cols-2 gap-4">
                {current.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[24px] font-extrabold tracking-tight text-[#7aa6f5]">{s.value}</p>
                    <p className="mt-1 text-[12px] leading-snug text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — applications */}
            <div className="rounded-2xl border border-white/10 bg-[#0a1730] p-7 md:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Applications supporting {current.badge}
              </p>
              <div className="mt-5 grid gap-3">
                {current.apps.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.name} className="group flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:-translate-y-0.5 hover:border-[#3b6fd6]/40 hover:bg-white/[0.07]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#13306a]/60 text-[#7aa6f5] ring-1 ring-[#3b6fd6]/30">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold text-white">{a.name}</p>
                        <p className="text-[12px] leading-snug text-slate-400">{a.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-[#06122b] px-4 py-3 text-[12px] text-slate-400">
                Click any application to launch the{" "}
                <span className="font-semibold text-[#9ec4f6]">Live Simulation Sandbox Workflow</span> below.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
