"use client";

import { Footer } from "@/components/Footer";
import { motion, useReducedMotion } from "framer-motion";
import React, { useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Brain,
  Check,
  ClipboardCheck,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileCheck2,
  FileText,
  Gauge,
  LayoutGrid,
  Layers3,
  LockKeyhole,
  Network,
  Pill,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";

const asset = (name: string) => `/ci-figma/${name}`;

/* ════════════════════════════════════════════════════════════════════════
   Shared primitives
   ════════════════════════════════════════════════════════════════════════ */

function FadeIn({
  children,
  delay = 0,
  y = 22,
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
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* 3D mouse-tilt wrapper — used to make the diagram images interactive */
function Tilt({
  children,
  className = "",
  max = 9,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  const reduce = useReducedMotion();

  function move(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 2 * max, ry: (px - 0.5) * 2 * max, gx: px * 100, gy: py * 100, active: true });
  }
  function leave() {
    setT({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={className}
      style={{
        transform: `perspective(1100px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? 1.015 : 1})`,
        transition: t.active ? "transform 80ms linear" : "transform 400ms ease",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {children}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: t.active ? 1 : 0,
            transition: "opacity 250ms ease",
            background: `radial-gradient(420px circle at ${t.gx}% ${t.gy}%, rgba(120,180,255,0.18), transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}

function Badge({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "teal" | "light" | "ghost";
}) {
  const styles: Record<string, string> = {
    blue: "border-sky-400/40 bg-white text-[#1d2f5a] shadow-[0_0_28px_rgba(56,189,248,0.18)]",
    teal: "border-teal-300/45 bg-teal-400/10 text-teal-200",
    light: "border-[#9bd8ff]/60 bg-white text-[#27499a] shadow-sm",
    ghost: "border-white/15 bg-white/10 text-white backdrop-blur",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
}

/* Vertical pinstripe overlay used on the blue + lavender bands */
function Pinstripes({ color = "rgba(255,255,255,0.06)", gap = 14 }: { color?: string; gap?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${gap}px)`,
      }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Data
   ════════════════════════════════════════════════════════════════════════ */

const stakeholders = [
  { label: "Providers", icon: Stethoscope },
  { label: "Payers", icon: ShieldCheck },
  { label: "Plan Sponsors", icon: BadgeCheck },
  { label: "Pharmacy", icon: Pill },
];

const partnerPrograms = [
  {
    eyebrow: "Affiliates",
    title: "Affiliate Partners",
    icon: UsersRound,
    accent: "#2563eb",
    accentSoft: "rgba(37,99,235,0.12)",
    forLine: "FOR INDEPENDENT HEALTHCARE CONSULTANTS",
    body: "Healthcare consultants often uncover revenue cycle gaps while advising provider groups and MSOs. The Grelin Affiliate Program enables them to connect clients with Grelin's Pre-Bill Revenue Integrity platform and support opportunities as trusted advisors.",
    items: [
      "Healthcare consultants",
      "Revenue cycle advisors",
      "Independent healthcare strategists",
      "Fractional executives",
    ],
  },
  {
    eyebrow: "Channel Partners",
    title: "Channel Partners",
    icon: LayoutGrid,
    accent: "#16a34a",
    accentSoft: "rgba(22,163,74,0.12)",
    forLine: "FOR RCM FIRMS, MSOS, AND VALUE-ADDED RESELLERS",
    body: "Channel partners help healthcare organizations improve revenue cycle operations. The Grelin Channel Program enables partners to offer, implement, or bundle Grelin's platform to help clients prevent revenue leakage earlier in workflow.",
    items: [
      "RCM service providers",
      "MSOs",
      "Healthcare technology resellers",
      "Revenue cycle outsourcing firms",
    ],
  },
  {
    eyebrow: "OEM & Integration",
    title: "OEM Partners",
    icon: Cpu,
    accent: "#d9821a",
    accentSoft: "rgba(217,130,26,0.14)",
    forLine: "FOR HEALTHCARE TECHNOLOGY PLATFORMS",
    body: "Grelin's intelligence platform can be embedded into healthcare technology environments. OEM partners integrate our Pre-Bill intelligence capabilities into their own platforms, bringing revenue integrity functionality directly into clinical, revenue, or payment workflows. The same engine that prevents a claim upstream audits it downstream, so it fits on either side of the wire.",
    items: [
      "Clinical: EHRs, workflow platforms",
      "Revenue Cycle: RCM, clearinghouses",
      "Payment Integrity: Adjudication, payment vendors",
      "Audit & Analytics: Healthcare analytics, SIU",
    ],
  },
  {
    eyebrow: "Distribution Partners",
    title: "Distribution Partners",
    icon: Boxes,
    accent: "#7c5cff",
    accentSoft: "rgba(124,92,255,0.14)",
    forLine: "FOR PHARMACY AND PHARMACEUTICAL DISTRIBUTORS",
    body: "Distributors move enormous volume, and every transaction carries integrity risk. RxAI puts Grelin intelligence inside that flow. Distribution partners bring claim integrity to the pharmacies and providers they already supply, and add a margin line without adding headcount.",
    items: [
      "National drug distributors",
      "Regional pharmaceutical distributors",
      "Specialty pharmacy networks",
      "Group Purchasing Organizations (GPOs)",
    ],
  },
];

const sideCards = [
  {
    label: "Providers",
    when: "Before you submit.",
    body: "Catch errors while the encounter is still active, so the claim goes out clean instead of coming back denied.",
    tag: "Chart.ai family",
    icon: Stethoscope,
  },
  {
    label: "Payers and TPAs",
    when: "Before you pay.",
    body: "Validate a claim against policy before money moves, so the wrong claim never gets paid in the first place.",
    tag: "Audit.ai",
    icon: ShieldCheck,
  },
  {
    label: "Plan sponsors",
    when: "After the money moves.",
    body: "Audit what you funded and recover what was wrong, instead of finding it too late to act.",
    tag: "Audit.ai",
    icon: ClipboardCheck,
  },
  {
    label: "Pharmacy",
    when: "Across the pharmacy claim.",
    body: "Check the claim against your own payer logic before it is processed.",
    tag: "RxAI",
    icon: Pill,
  },
];

const sharedChecks = [
  { title: "Eligibility", body: "Confirms coverage, benefits, and authorization.", icon: BadgeCheck },
  { title: "Documentation", body: "Checks whether the record actually supports what is on the claim.", icon: FileText },
  { title: "Coding and charge integrity", body: "Finds the gaps between what was documented, coded, and charged.", icon: Code2 },
  { title: "Payer policy alignment", body: "Tracks payer rules as they change and checks each claim against them.", icon: ScrollText },
  { title: "Performance and leakage", body: "Surfaces where money is lost across providers, plans, locations, and specialties, so the pattern gets fixed, not just the one claim.", icon: Gauge },
];

const trustItems = [
  { label: "HIPAA aligned data protection", icon: ShieldCheck },
  { label: "Secure transmission and storage", icon: LockKeyhole },
  { label: "Role based access controls", icon: UsersRound },
  { label: "Audit logging and transparency", icon: FileCheck2 },
  { label: "Enterprise grade cloud", icon: Cloud },
];

const integrationTree = [
  { head: "EHRs", icon: Database, items: ["Epic", "Cerner", "Oracle"] },
  { head: "Billing & Clearing", icon: FileCheck2, items: ["AdvancedMD", "Waystar", "Availity"] },
  { head: "Payer & TPA", icon: ShieldCheck, items: ["Adjudication", "Plan administration"] },
  { head: "Specialty", icon: Activity, items: ["Wound", "Pain", "Pharmacy"] },
];

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */

export default function ClaimIntegrityPage() {
  return (
    <main className="overflow-x-hidden bg-[#020817] font-sans text-white">
      {/* ───────────────────────── 1. HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#020817] pt-28 md:pt-32">
        {/* dotted map / grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 82% 6%,rgba(0,82,255,0.35),transparent 34%),radial-gradient(circle at 10% 14%,rgba(94,128,255,0.18),transparent 30%),linear-gradient(180deg,#020817 0%,#061633 50%,#020817 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,197,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(148,197,255,0.18) 1px,transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage: "radial-gradient(ellipse 75% 70% at 50% 30%,#000 30%,transparent 80%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1080px] px-6 text-center">
          <FadeIn>
            <Badge>
              <ShieldCheck className="h-4 w-4 text-[#0052ff]" />
              The Claim Integrity Platform
            </Badge>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="mx-auto mt-8 max-w-[860px] text-[44px] font-extrabold leading-[1.02] tracking-[-0.02em] md:text-[68px]">
              The platform that sees the{" "}
              <span className="bg-gradient-to-r from-white via-[#bcd4ff] to-[#6aa6ff] bg-clip-text text-transparent">
                whole claim.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-7 max-w-[720px] text-[17px] leading-8 text-slate-300/90 md:text-[18px]">
              Claim Integrity means knowing a claim is correct, complete, and defensible. Providers,
              payers, plan sponsors, and the firms that serve them all depend on that being true.
              Grelin is the platform that gets you there. It is also the platform others build on.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="/company?service=request-a-demo"
                className="group inline-flex items-center gap-2 rounded-[12px] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#020617] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(120,180,255,0.6)]"
              >
                Request a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/partners"
                className="inline-flex items-center rounded-[12px] border border-white/20 bg-white/[0.06] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-teal-300/50 hover:bg-white/[0.12]"
              >
                Become a partner
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Connected stakeholder panel */}
        <FadeIn delay={0.2} className="relative z-10 mx-auto mt-16 max-w-[1000px] px-6 pb-16">
          <div
            className="relative rounded-[28px] border border-white/10 p-5 md:p-8"
            style={{
              background: "linear-gradient(160deg,rgba(8,20,48,0.9),rgba(2,10,28,0.95))",
              boxShadow: "0 30px 90px -40px rgba(0,60,180,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* connector line */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 hidden h-px w-[78%] -translate-x-1/2 -translate-y-1/2 lg:block"
              style={{ background: "linear-gradient(90deg,transparent,rgba(56,140,255,0.5),transparent)" }}
            />
            <div className="relative grid grid-cols-2 items-center gap-4 lg:grid-cols-5">
              {/* left two */}
              {stakeholders.slice(0, 2).map((s) => (
                <StakeNode key={s.label} {...s} />
              ))}
              {/* center */}
              <div className="order-first col-span-2 lg:order-none lg:col-span-1">
                <div
                  className="group mx-auto flex max-w-[260px] flex-col items-center gap-3 rounded-[20px] border border-sky-400/40 px-6 py-7 text-center transition-transform hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(160deg,#0a3bd6,#06205f)",
                    boxShadow: "0 0 40px rgba(0,90,255,0.45)",
                  }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                    <ShieldCheck className="h-7 w-7 text-white" />
                  </span>
                  <p className="text-[17px] font-bold leading-tight">
                    Claim Integrity
                    <br />
                    Platform
                  </p>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,1)]" />
                </div>
              </div>
              {/* right two */}
              {stakeholders.slice(2).map((s) => (
                <StakeNode key={s.label} {...s} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ───────────────── 2. PARTNER WITH GRELIN ───────────────── */}
      <section className="relative overflow-hidden py-14 md:py-20" style={{ background: "linear-gradient(180deg,#dfeafe,#eef4ff 60%,#e6eeff)" }}>
        <Pinstripes color="rgba(80,120,200,0.06)" gap={13} />
        <div className="relative z-10 mx-auto max-w-[1060px] px-6">
          <FadeIn className="mx-auto max-w-[820px] text-center">
            <h2 className="text-[38px] font-extrabold leading-[1.06] tracking-[-0.02em] text-[#16224a] md:text-[52px]">
              Partner with Grelin
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] text-[16px] leading-7 text-[#4a5a82]">
              Each program is designed around a specific role in the healthcare ecosystem, from
              consultants and technology providers to distributors moving healthcare products at scale.
            </p>
          </FadeIn>

          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            {partnerPrograms.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <PartnerCard {...p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 3. A CLAIM IS RIGHT OR WRONG ───────────── */}
      <section className="relative overflow-hidden bg-white py-14 text-[#131b2e] md:py-20">
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <Badge tone="light">
              <Sparkles className="h-4 w-4" />
              Claim Integrity
            </Badge>
            <h2 className="mt-6 text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#16224a] md:text-[50px]">
              A claim is right or wrong long before anyone pays it.
            </h2>
            <div className="mt-7 space-y-5 text-[16px] leading-8 text-[#41597f]">
              <p>
                Most errors are created upstream, before a claim is even built. By upstream we mean
                patient eligibility, documentation, coding, and payer specific logic. That is where a
                claim becomes correct or broken.
              </p>
              <p>
                Everyone downstream inherits the result. The provider eats the denial. The payer pays
                what it should not have. The plan sponsor funds the mistake. The auditor finds it
                months later, after the money is gone.
              </p>
              <p className="font-semibold text-[#1b2c54]">
                Claim Integrity is whether a claim is correct, complete, and defensible. Checked as
                early as possible, and at every point the claim changes hands.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Tilt className="overflow-hidden rounded-[28px] border border-[#dbe6f7] bg-[#020a1c] shadow-[0_30px_80px_-40px_rgba(10,40,120,0.55)]">
              <img src={asset("cycle.png")} alt="Claim Integrity cycle — upstream, claim created, downstream impact, financial consequences, continuous integrity" className="h-full w-full object-cover" />
            </Tilt>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── 4. ONE CLAIM TRUTH (royal blue) ───────────── */}
      <section className="relative overflow-hidden py-14 text-white md:py-20">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 14%,rgba(255,255,255,0.18),transparent 26%),radial-gradient(circle at 86% 16%,rgba(20,200,255,0.18),transparent 30%),linear-gradient(135deg,#0a4fe0 0%,#0531a0 52%,#06224f 100%)",
          }}
        />
        <Pinstripes color="rgba(255,255,255,0.05)" gap={13} />
        <div className="relative z-10 mx-auto max-w-[1060px] px-6">
          <FadeIn className="text-center">
            <Badge tone="ghost">The now</Badge>
            <h2 className="mx-auto mt-6 max-w-[900px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] md:text-[50px]">
              One claim truth. <span className="text-[#bfe0ff]">Every side of the table.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-7 text-blue-100/85">
              Grelin works from one source of claim truth and lets each party act on it from where they sit.
            </p>
          </FadeIn>

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {sideCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <FadeIn key={c.label} delay={i * 0.06}>
                  <div className="group h-full rounded-[20px] border border-white/15 bg-white/[0.08] p-6 backdrop-blur transition-all hover:-translate-y-1.5 hover:border-white/35 hover:bg-white/[0.13]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 transition-colors group-hover:bg-white/25">
                      <Icon className="h-5 w-5 text-[#bfe6ff]" />
                    </span>
                    <h3 className="mt-5 text-[19px] font-bold">{c.label}</h3>
                    <p className="mt-1 text-[13px] font-semibold text-[#bcd6ff]">{c.when}</p>
                    <p className="mt-3 text-[14px] leading-6 text-blue-100/80">{c.body}</p>
                    <span className="mt-5 inline-flex rounded-md bg-[#06205f]/70 px-3 py-1 text-[12px] font-semibold text-[#9ec7ff] ring-1 ring-white/10">
                      Tag: {c.tag}
                    </span>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 5. THE SHARED CHECKS (torn dark card) ───────────── */}
      <section className="relative overflow-hidden bg-[#020817] py-14 md:py-20">
        <div className="mx-auto max-w-[1060px] px-6">
          <FadeIn>
            <div
              className="relative px-7 py-14 md:px-16 md:py-14"
              style={{
                background: "linear-gradient(160deg,#0a1b3e 0%,#061334 55%,#04102b 100%)",
                WebkitMaskImage: TORN_MASK,
                maskImage: TORN_MASK,
                WebkitMaskSize: "cover",
                maskSize: "cover",
              }}
            >
              <div className="text-center">
                <Badge tone="teal">The shared checks</Badge>
                <h2 className="mt-5 text-[32px] font-extrabold tracking-[-0.02em] md:text-[44px]">
                  The shared checks
                </h2>
                <p className="mx-auto mt-3 max-w-[520px] text-[15px] text-slate-300/80">
                  The core validations running across the platform.
                </p>
              </div>
              <div className="mt-9 grid gap-x-10 gap-y-8 md:grid-cols-3">
                {sharedChecks.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-white/[0.04]">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30 transition-all group-hover:bg-sky-500/25">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-[15px] font-bold text-white">{c.title}</h3>
                        <p className="mt-1.5 text-[13px] leading-6 text-slate-400">{c.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── 6. BUILT ON INFRASTRUCTURE (royal blue) ───────────── */}
      <section className="relative overflow-hidden py-14 text-white md:py-20">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 16%,rgba(120,160,255,0.22),transparent 30%),linear-gradient(135deg,#2a47b8 0%,#16307f 50%,#0a1c4a 100%)",
          }}
        />
        <Pinstripes color="rgba(255,255,255,0.045)" gap={13} />
        <div className="relative z-10 mx-auto grid max-w-[1080px] items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <Badge tone="teal">The foundation</Badge>
            <h2 className="mt-6 text-[36px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[52px]">
              Built on infrastructure that already exists.
            </h2>
            <p className="mt-7 max-w-[460px] text-[16px] leading-8 text-blue-100/85">
              Every check Grelin runs sits on one shared foundation. That foundation is what makes the
              platform fast to extend and able to serve any side of the claim.
            </p>
            <p className="mt-5 max-w-[460px] text-[16px] leading-8 text-blue-100/85">
              Grelin calls it the intelligence layer above the clearinghouse. It is the layer that
              knows whether a claim should exist at all.
            </p>
          </FadeIn>

          <FadeIn delay={0.12} className="flex flex-col gap-4">
            {/* What partners build */}
            <div className="rounded-[20px] border border-white/12 bg-[#030f2c]/85 p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">What partners build</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {["Audit.ai", "RxAI", "Wound.ai", "Partner", "Your playbook"].map((t) => (
                  <span key={t} className="cursor-default rounded-lg border border-sky-400/25 bg-[#0c1f4a]/80 px-3.5 py-2 text-[13px] font-medium text-slate-200 transition-colors hover:border-sky-400/60 hover:text-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* CIP */}
            <div className="rounded-[20px] border border-sky-400/30 bg-[#030f2c]/90 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 ring-1 ring-sky-400/40">
                  <Layers3 className="h-5 w-5 text-sky-300" />
                </span>
                <h3 className="text-[18px] font-bold">Claim Integrity Platform</h3>
              </div>
              <p className="mt-3 text-[14px] font-medium text-sky-300">The intelligence layer above the clearinghouse.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Cpu, t: "Engine learns from every claim" },
                  { icon: Database, t: "One normalized data model" },
                ].map((x) => (
                  <div key={x.t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:bg-white/[0.08]">
                    <x.icon className="h-4 w-4 shrink-0 text-sky-300" />
                    <span className="text-[13px] text-slate-200">{x.t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Shared connections */}
            <div className="rounded-[20px] border border-white/12 bg-[#030f2c]/85 p-6 backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <Network className="h-5 w-5 text-sky-300" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">Shared connections</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Database, t: "Clearinghouses" },
                  { icon: Cpu, t: "EHRs" },
                  { icon: ShieldCheck, t: "Payers" },
                ].map((x) => (
                  <div key={x.t} className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] py-5 transition-all hover:-translate-y-1 hover:bg-white/[0.08]">
                    <x.icon className="h-5 w-5 text-sky-300" />
                    <span className="text-[12px] text-slate-300">{x.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── 7. YOUR EXPERTISE — flow (white) ───────────── */}
      <section className="relative overflow-hidden bg-white py-14 text-[#131b2e] md:py-20">
        <div className="mx-auto max-w-[1060px] px-6">
          <FadeIn className="text-center">
            <Badge tone="light">The platform</Badge>
            <h2 className="mx-auto mt-6 max-w-[840px] text-[36px] font-extrabold leading-[1.06] tracking-[-0.02em] text-[#16224a] md:text-[50px]">
              Your expertise, running on the engine.
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-7 text-[#41597f]">
              A playbook is what someone knows about claims, turned into software that runs. Grelin&apos;s own
              products are playbooks on this platform. The same foundation is open to anyone who holds
              real knowledge about a corner of the claim.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="mt-10 rounded-[28px] border border-[#0c1d44] bg-[#040d22] p-5 md:p-8">
              <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
                {/* Partners & experts */}
                <FlowCard title="Partners & Experts" icon={UsersRound} tone="blue">
                  <ul className="space-y-2.5">
                    {["Providers and MSOs", "Payers and TPAs", "Plan sponsors", "Pharmacy networks", "Specialty verticals", "RCM firms and advisors"].map((x) => (
                      <li key={x} className="flex items-center gap-2.5 text-[13px] text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </FlowCard>

                <FlowArrow />

                {/* How a playbook gets built */}
                <FlowCard title="How a playbook gets built" icon={Code2} tone="blue">
                  <div className="space-y-3">
                    {[
                      { icon: Brain, t: "Domain knowledge in plain language" },
                      { icon: Sparkles, t: "AI generates code" },
                      { icon: Rocket, t: "Playbook is live", teal: true },
                    ].map((s, idx) => (
                      <React.Fragment key={s.t}>
                        <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-transform hover:-translate-y-0.5 ${s.teal ? "border-teal-400/40 bg-teal-400/10" : "border-sky-400/25 bg-sky-500/10"}`}>
                          <s.icon className={`h-4 w-4 ${s.teal ? "text-teal-300" : "text-sky-300"}`} />
                          <span className="text-[13px] font-medium text-slate-100">{s.t}</span>
                        </div>
                        {idx < 2 && <div className="flex justify-center text-sky-500/70">↓</div>}
                      </React.Fragment>
                    ))}
                  </div>
                </FlowCard>

                <FlowArrow />

                {/* CIP runs here */}
                <div className="flex flex-col items-center justify-center rounded-[20px] border border-teal-400/40 bg-teal-400/[0.06] p-7 text-center shadow-[0_0_50px_-12px_rgba(45,212,191,0.5)]">
                  <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-teal-300">
                    <Layers3 className="h-4 w-4" /> Claim Integrity Platform
                  </div>
                  <span className="my-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/15 ring-1 ring-teal-300/40">
                    <Layers3 className="h-7 w-7 text-teal-300" />
                  </span>
                  <p className="text-[18px] font-bold text-white">Every playbook runs here</p>
                  <p className="mt-1 text-[13px] text-teal-200/80">and makes it smarter.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── 8. COMPOUNDING EFFECT (lavender + flywheel) ───────────── */}
      <section className="relative overflow-hidden py-14 md:py-20" style={{ background: "linear-gradient(120deg,#b9d0f7 0%,#dce8fb 55%,#eef4fd 100%)" }}>
        <Pinstripes color="rgba(80,120,200,0.07)" gap={13} />
        <div className="relative z-10 mx-auto grid max-w-[1080px] items-center gap-10 px-6 lg:grid-cols-[1fr_1fr]">
          <FadeIn>
            <Badge tone="light">The compounding effect</Badge>
            <h2 className="mt-6 text-[36px] font-extrabold leading-[1.06] tracking-[-0.02em] text-[#16224a] md:text-[50px]">
              Every claim makes the platform smarter.
            </h2>
            <p className="mt-7 text-[16px] leading-8 text-[#3f578a]">
              More claim flow makes the engine smarter. A smarter engine produces better results.
              Better results bring more claim flow. Then it turns again, faster.
            </p>
            <p className="mt-5 text-[16px] font-semibold leading-8 text-[#27407a]">
              A model is not a moat. The defensible thing is the volume of claims the platform has
              already learned from, and the catalog of expertise built on top of it.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Tilt className="overflow-hidden rounded-[28px] border border-[#0c1d44] bg-[#040d22] shadow-[0_30px_80px_-40px_rgba(10,40,120,0.5)]" max={7}>
              <img src={asset("flywheel.png")} alt="Compounding flywheel — more builders, more claim flow, a smarter engine, better playbooks" className="h-full w-full object-cover" />
            </Tilt>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── 9. INTEGRATION TREE (dark) ───────────── */}
      <section className="relative overflow-hidden bg-[#070d1c] py-14 md:py-20">
        <div className="mx-auto max-w-[1060px] px-6">
          <FadeIn className="text-center">
            <Badge tone="ghost">Integration</Badge>
            <h2 className="mx-auto mt-6 max-w-[900px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white md:text-[50px]">
              Enhances your stack. Replaces none of it.
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-7 text-slate-300/85">
              Grelin sits above your existing systems as an intelligence layer. Any organization that
              touches claims can add Claim Integrity without a rip and replace, and without disrupting
              how teams already work.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="mt-10 rounded-[28px] border border-[#13234b] bg-[#040d22] p-5 md:p-8">
              {/* top node */}
              <div className="mx-auto max-w-[760px] rounded-[20px] border border-sky-400/30 bg-gradient-to-br from-[#0a3bd6]/30 to-[#06205f]/30 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 ring-1 ring-sky-400/40">
                      <ShieldCheck className="h-5 w-5 text-sky-300" />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-bold text-white">Claim Integrity Platform</h3>
                      <p className="text-[13px] text-sky-300/90">The intelligence layer above the clearinghouse.</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[12px] text-slate-300 ring-1 ring-white/10">
                    <Boxes className="h-3.5 w-3.5" /> Sits above existing systems
                  </span>
                </div>
                <p className="mt-3 text-[12px] text-slate-400">Engine learns from every claim · One normalized data model</p>
              </div>

              {/* connector */}
              <div aria-hidden className="mx-auto my-6 h-6 w-px bg-sky-500/30" />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {integrationTree.map((col) => (
                  <div key={col.head} className="group rounded-[18px] border border-white/10 bg-[#071735]/80 p-5 transition-all hover:-translate-y-1.5 hover:border-sky-400/40">
                    <div className="flex items-center gap-2.5">
                      <col.icon className="h-5 w-5 text-sky-300" />
                      <h4 className="text-[15px] font-bold text-white">{col.head}</h4>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {col.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 text-[13px] text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── 10. REGULATED (white pills) ───────────── */}
      <section className="bg-white py-14 text-[#131b2e] md:py-18">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <FadeIn>
            <h2 className="text-[34px] font-extrabold tracking-[-0.02em] text-[#16224a] md:text-[50px]">
              Built for regulated environments.
            </h2>
          </FadeIn>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.label} delay={i * 0.05}>
                  <div className="inline-flex cursor-default items-center gap-3 rounded-[12px] bg-[#8fd1e1] px-6 py-4 text-[15px] font-semibold text-[#0f2350] transition-all hover:-translate-y-1 hover:bg-[#7ec6d9] hover:shadow-[0_10px_28px_-10px_rgba(20,120,160,0.6)]">
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 11. CTA (lavender) ───────────── */}
      <section className="relative overflow-hidden py-14 text-center md:py-20" style={{ background: "linear-gradient(90deg,#b5cef7 0%,#cfe0fb 50%,#bcd3f8 100%)" }}>
        <Pinstripes color="rgba(255,255,255,0.28)" gap={12} />
        <div className="relative z-10 mx-auto max-w-[900px] px-6">
          <FadeIn>
            <h2 className="text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#3f5382] md:text-[52px]">
              See it run on your claims.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mx-auto mt-6 max-w-[660px] text-[17px] leading-8 text-[#26324e]">
              Bring us a sample of your claim flow and we will show you what the platform finds.
              Whether you submit claims, pay them, fund them, or audit them.
            </p>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a href="/company?service=request-a-demo" className="group inline-flex items-center gap-2 rounded-[12px] bg-white px-8 py-4 text-[16px] font-semibold text-[#020617] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                Request a demo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/partners" className="inline-flex items-center rounded-[12px] border border-teal-500/50 bg-[#131b2e] px-8 py-4 text-[16px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1e293b]">
                Become a partner
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Sub-components
   ════════════════════════════════════════════════════════════════════════ */

function StakeNode({ label, icon: Icon }: { label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="group flex flex-col items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-6 text-center transition-all hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.09]">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0c1f4a] ring-1 ring-sky-400/30 transition-colors group-hover:ring-sky-400/60">
        <Icon className="h-5 w-5 text-sky-300" />
      </span>
      <span className="text-[14px] font-semibold text-slate-200">{label}</span>
    </div>
  );
}

function PartnerCard({
  eyebrow,
  title,
  icon: Icon,
  accent,
  accentSoft,
  forLine,
  body,
  items,
}: (typeof partnerPrograms)[number]) {
  return (
    <article
      className="group flex h-full flex-col rounded-[24px] border border-[#dbe3f3] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-28px_rgba(20,40,100,0.4)] md:p-9"
      style={{ borderTopColor: accent, borderTopWidth: 3 }}
    >
      <div className="flex items-center gap-3.5">
        <span className="flex h-12 w-12 items-center justify-center rounded-[12px]" style={{ background: accentSoft, color: accent }}>
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h3 className="text-[22px] font-extrabold text-[#131b2e]">{title}</h3>
        </div>
      </div>

      <p className="mt-7 text-[13px] font-bold uppercase tracking-[0.06em]" style={{ color: accent }}>
        {forLine}
      </p>
      <p className="mt-4 text-[14px] leading-7 text-[#4b5b78]">{body}</p>

      <div className="mt-7 border-t border-slate-200 pt-6">
        <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#737687]">Ideal for</p>
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[14px] font-medium text-[#1f2a44]">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
              {it}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="/company?service=partner"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#101a30] px-6 py-4 text-[15px] font-semibold text-white transition-all hover:bg-[#1c2942]"
      >
        Apply for this program
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </article>
  );
}

function FlowCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "blue";
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-sky-400/20 bg-[#071735]/70 p-5">
      <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-sky-300">
        <Icon className="h-4 w-4" /> {title}
      </div>
      {children}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-sky-400/70">
      <ArrowRight className="hidden h-6 w-6 lg:block" />
      <span className="lg:hidden">↓</span>
    </div>
  );
}

/* SVG torn / deckle edge mask for the shared-checks card */
const TORN_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='560' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M14 26 38 14 70 30 104 12 140 30 176 14 214 30 252 16 292 30 332 16 372 30 414 16 456 30 500 16 544 30 590 16 636 30 682 16 728 30 774 16 820 30 866 16 912 30 958 16 1004 30 1050 16 1096 30 1140 16 1176 28 1186 540 1150 548 1110 534 1066 550 1020 534 974 550 928 534 882 550 836 534 790 550 744 534 698 550 652 534 606 550 560 534 514 550 468 534 422 550 376 534 330 550 284 534 238 550 192 534 146 550 100 534 56 548 18 536 Z'/%3E%3C/svg%3E\")";
