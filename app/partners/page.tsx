"use client";

import { Footer } from "@/components/Footer";
import { motion, useReducedMotion } from "framer-motion";
import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Check,
  Database,
  FileText,
  GitBranch,
  Layers3,
  Network,
  Pill,
  Rocket,
  ScrollText,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";

const asset = (n: string) => `/partners-figma/${n}`;

/* ════════════════════════════════════════════════════════════════════════
   Primitives
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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* 3D mouse-tilt wrapper for the diagram panels */
function Tilt({
  children,
  className = "",
  max = 8,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });
  const reduce = useReducedMotion();
  function move(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 2 * max, ry: (px - 0.5) * 2 * max, gx: px * 100, gy: py * 100, on: true });
  }
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })}
      className={className}
      style={{
        ...style,
        transform: `perspective(1200px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.on ? 1.012 : 1})`,
        transition: t.on ? "transform 80ms linear" : "transform 420ms ease",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          opacity: t.on ? 1 : 0,
          transition: "opacity 240ms ease",
          background: `radial-gradient(440px circle at ${t.gx}% ${t.gy}%, rgba(120,180,255,0.16), transparent 60%)`,
        }}
      />
    </div>
  );
}

function Pinstripes({ color = "rgba(255,255,255,0.05)", gap = 28 }: { color?: string; gap?: number }) {
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

function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color }}>
      {children}
    </p>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */

export default function PartnersPage() {
  return (
    <main className="overflow-x-hidden bg-[#030a1a] font-sans text-white">
      {/* ───────────────── 1. HERO ───────────────── */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 85% 0%,rgba(36,96,220,0.4),transparent 40%),radial-gradient(circle at 0% 30%,rgba(60,90,200,0.22),transparent 35%),linear-gradient(180deg,#05153a 0%,#071a44 45%,#030c22 100%)",
          }}
        />
        <Pinstripes color="rgba(150,185,255,0.06)" gap={26} />
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-24 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <FadeIn className="flex flex-col gap-7">
            <h1 className="text-[42px] font-extrabold leading-[1.05] tracking-[-0.025em] md:text-[60px]">
              Build on the platform that sees the{" "}
              <span className="bg-gradient-to-r from-white via-[#bcd4ff] to-[#5e9bff] bg-clip-text text-transparent">
                whole claim.
              </span>
            </h1>
            <p className="max-w-[540px] text-[17px] leading-8 text-slate-300/90">
              You know things about claims that no software currently knows. Grelin turns what you know
              into working software that runs on the Claim Integrity engine. You bring the expertise.
              The platform does the rest.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href="#ecosystem"
                className="group inline-flex items-center gap-2 rounded-[12px] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#06183f] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(120,180,255,0.7)]"
              >
                Become a partner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center rounded-[12px] border border-white/20 bg-white/[0.06] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-white/[0.12]"
              >
                See how it works
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Tilt
              className="overflow-hidden rounded-[26px] border border-white/12 bg-[#04102b]"
              style={{ boxShadow: "0 40px 100px -50px rgba(0,80,220,0.8)" }}
            >
              <img
                src={asset("hero-platform.png")}
                alt="See every claim, act with confidence — the Claim Integrity engine"
                className="h-full w-full object-cover"
              />
            </Tilt>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 2. NINE MARKETS ───────────────── */}
      <section className="relative overflow-hidden bg-[#030a1a] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
          <FadeIn>
            <Tilt
              className="overflow-hidden rounded-[26px] border border-sky-500/15 bg-gradient-to-br from-[#071530] to-[#040e20]"
              style={{ boxShadow: "0 30px 80px -45px rgba(0,80,220,0.6)" }}
            >
              <img
                src={asset("ecosystem-hub.png")}
                alt="Claim Integrity hub connecting EHR, coding, prior authorization, eligibility, clearinghouse, revenue cycle, denial management, payment integrity, and analytics"
                className="h-full w-full object-contain"
              />
            </Tilt>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-6">
            <Eyebrow color="#5680b3">The ecosystem</Eyebrow>
            <h2 className="text-[36px] font-extrabold leading-[1.06] tracking-[-0.02em] md:text-[46px]">
              Nine markets are becoming one.
            </h2>
            <div className="flex flex-col gap-5 text-[16px] leading-[1.72] text-slate-300/85">
              <p>
                Most people see healthcare revenue as a stack of separate tools. The EHR. Coding. Prior
                authorization. Eligibility. The clearinghouse. Revenue cycle. Denial management. Payment
                integrity. Analytics.
              </p>
              <p>
                They are not separate. They are converging on a single question. Is this claim correct
                before it is ever submitted.
              </p>
              <p>
                That question is Claim Integrity. Every tool in the stack touches a different part of the
                same claim at a different moment. None of them sees the whole thing.
              </p>
              <p>A coding tool sees coding. A clearinghouse sees transactions. An EHR sees documentation.</p>
              <p className="font-semibold text-white">
                Grelin sees the entire revenue journey. That is the seat that becomes valuable, because it
                is the only one that can assemble a view nobody else can.
              </p>
              <p>The partner platform opens that seat to you.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 3. PLAYBOOKS (royal blue) ───────────────── */}
      <section className="relative overflow-hidden px-4 py-14 md:px-10 lg:py-20" style={{ background: "#1a3ec2" }}>
        <Pinstripes color="rgba(0,0,0,0.16)" gap={28} />
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div
            className="overflow-hidden rounded-[30px] border border-white/15"
            style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(3px)" }}
          >
            <div className="flex flex-col items-stretch lg:flex-row">
              <FadeIn className="flex flex-1 flex-col justify-center gap-6 px-8 py-12 md:px-14 lg:py-16">
                <Eyebrow color="rgba(255,255,255,0.85)">Playbooks</Eyebrow>
                <h2 className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[48px]">
                  Your expertise, running at scale.
                </h2>
                <div className="flex max-w-[520px] flex-col gap-4 text-[16px] leading-[1.7] text-white/85">
                  <p>A playbook is what you know about claims, turned into software.</p>
                  <p>
                    Today that knowledge lives in your best people. The senior auditor who knows where the
                    money leaks. The specialist who knows the payer logic for their procedures cold. The
                    advisor who has seen the same error a thousand times.
                  </p>
                  <p>
                    That knowledge does not scale. It walks out the door at five o&apos;clock and it cannot
                    be in two places at once.
                  </p>
                  <p>
                    A playbook fixes that. It runs the same way every time, against every claim, without
                    getting tired and without forgetting a rule.
                  </p>
                  <p className="font-semibold text-white">
                    You hold knowledge that no software currently has. A playbook is how you put it to work.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.15} className="flex w-full items-stretch lg:w-[46%]">
                <Tilt
                  className="flex w-full items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(160deg,#0c1e42,#071228 60%,#040d1c)", minHeight: 460 }}
                  max={6}
                >
                  <img
                    src={asset("playbooks-branch.png")}
                    alt="Your expertise branching into live playbooks"
                    className="h-full w-full object-contain p-6"
                  />
                </Tilt>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── 4. YOU DESCRIBE IT (white) ───────────────── */}
      <section id="how-it-works" className="relative bg-white py-20 text-[#131b2e] md:py-28">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-6 md:px-10">
          <FadeIn className="flex flex-col gap-5">
            <Eyebrow color="#3e7ecb">From plain language to live software</Eyebrow>
            <h2 className="max-w-[900px] text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#003099] md:text-[52px]">
              You describe it. The AI builds it. The platform runs it.
            </h2>
            <p className="max-w-[820px] text-[18px] leading-[1.6] text-[#5680b3]">
              You do not need to write code. You do not need an engineering team. You need to know your domain.
            </p>
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                badge: "Step one",
                title: "Describe your method in plain language.",
                body: "What to look for. Where the errors hide. What a good finding requires. You explain it the way you would explain it to a sharp new hire.",
              },
              {
                badge: "Step two",
                title: "The AI generates the code.",
                body: "Your method becomes a working playbook. The logic, the data, the scoring, the structure of every finding. The build that used to take a year and a custom engineering project now happens inside a normal working cycle.",
              },
              {
                badge: "Step three",
                title: "The playbook goes live on the platform.",
                body: "It plugs into the Claim Integrity engine, runs against real claim flow, and starts producing results. The plumbing is already built. The data is already normalized. You are building on a foundation, not from scratch.",
              },
            ].map((s, i) => (
              <FadeIn key={s.badge} delay={i * 0.07}>
                <div
                  className="group flex h-full flex-col gap-5 rounded-[28px] p-8 transition-transform hover:-translate-y-1.5"
                  style={{ background: "#cde7ff", boxShadow: "inset 0 0 30px -2px rgba(53,90,123,0.5)" }}
                >
                  <span
                    className="self-start rounded-full bg-white px-3.5 py-1 text-[13px] font-semibold text-[#355a7b] ring-1 ring-[#94a3b8] transition-colors group-hover:bg-[#355a7b] group-hover:text-white"
                  >
                    {s.badge}
                  </span>
                  <p className="text-[16px] font-bold leading-[1.5] text-[#1e3a63]">{s.title}</p>
                  <p className="text-[14px] leading-[1.8] text-[#475569]">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <hr className="mt-2 border-t border-[#2563eb]" />
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="max-w-[720px] text-[20px] font-medium leading-[1.6] text-[#355a7b]">
              The hard part is already done. The part only you can do is the part you already know.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 5a. THE SUBSTRATE (dark) ───────────────── */}
      <section className="relative overflow-hidden bg-[#030a1a] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <FadeIn className="flex flex-col gap-6">
            <Eyebrow color="#3b82f6">The substrate</Eyebrow>
            <h2 className="text-[38px] font-extrabold leading-[1.04] tracking-[-0.025em] md:text-[52px]">
              You are building on infrastructure that{" "}
              <span className="bg-gradient-to-r from-[#1bcaff] to-[#2686ff] bg-clip-text text-transparent">
                already exists.
              </span>
            </h2>
            <p className="max-w-[440px] border-l-2 border-sky-400/40 pl-6 text-[18px] leading-8 text-slate-300/90">
              Every playbook runs on the same Claim Integrity layer. That is what makes building fast.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Tilt
              className="overflow-hidden rounded-[26px] border border-sky-500/15 bg-gradient-to-br from-[#071530] to-[#040e20]"
              style={{ boxShadow: "0 30px 80px -45px rgba(0,80,220,0.6)" }}
            >
              <img
                src={asset("substrate-layers.png")}
                alt="Your playbooks running on the Claim Integrity layer and platform infrastructure"
                className="h-full w-full object-contain"
              />
            </Tilt>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 5b. THE SUBSTRATE — 3 cards (white) ───────────────── */}
      <section className="relative bg-white py-16 text-[#131b2e] md:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-6 md:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: "One claims data model.",
                body: "Claims, eligibility, remittance, and clinical context, all mapped into one consistent shape. You never touch the chaos of raw payer formats.",
              },
              {
                icon: Network,
                title: "Connections already built.",
                body: "The integrations into clearinghouses, EHRs, and payer systems are built once and shared by everyone. You do not rebuild plumbing.",
              },
              {
                icon: BrainCircuit,
                title: "An engine that learns.",
                body: "Every claim the platform sees teaches it what breaks and why. Your playbook gets the benefit of everything the platform has already learned.",
              },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.07}>
                <div
                  className="group flex h-full flex-col gap-4 rounded-[28px] p-8 transition-transform hover:-translate-y-1.5"
                  style={{ background: "#cde7ff", boxShadow: "inset 0 0 30px -2px rgba(53,90,123,0.5)" }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white text-[#2563eb] ring-1 ring-[#9bc2ee] transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <p className="text-[17px] font-bold leading-[1.4] text-[#1e3a63]">{c.title}</p>
                  <p className="text-[14px] leading-[1.8] text-[#475569]">{c.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.05}>
            <p className="max-w-[760px] text-[19px] font-medium leading-[1.6] text-[#355a7b]">
              This is why a methodology that would have taken years to productize can be live and working
              in weeks.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 6. PARTNER ECOSYSTEM (torn white card on dark) ───────────────── */}
      <section id="ecosystem" className="relative overflow-hidden bg-[#0f192a] py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <FadeIn>
            <div
              className="relative bg-white px-9 py-14 md:px-[72px] md:py-[76px]"
              style={{
                WebkitMaskImage: TORN_MASK,
                maskImage: TORN_MASK,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
                {/* Left — eyebrow, heading, copy */}
                <div className="flex flex-col gap-6 lg:w-[44%]">
                  <Eyebrow color="#255ba8">The partner ecosystem</Eyebrow>
                  <h2 className="max-w-[420px] text-[34px] font-extrabold leading-[1.12] tracking-[-0.015em] text-[#33445f] md:text-[44px]">
                    If you depend on claim integrity, you can build here.
                  </h2>
                  <p className="max-w-[400px] text-[16px] leading-[1.72] text-[#475569]">
                    The ecosystem is wide on purpose. Anyone who works with claims holds knowledge worth
                    encoding.
                  </p>
                  <p className="max-w-[400px] text-[16px] leading-[1.72] text-[#33445f]">
                    You do not have to fit a category. If you understand a corner of the claim better than
                    the software does, there is a playbook in it.
                  </p>
                </div>

                {/* Right — 2-column text grid (no icons, exactly like Figma) */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2">
                    {[
                      { title: "Providers and MSOs.", body: "How care actually gets documented and billed in your specialty." },
                      { title: "Payers and TPAs.", body: "The adjudication logic that decides what gets paid." },
                      { title: "Plan sponsors.", body: "Self funded employers who fund the claims and want to audit what they fund." },
                      { title: "Pharmacy networks.", body: "PSAOs, long term care, and specialty pharmacy, each with logic that does not transfer to anyone else." },
                      { title: "Specialty verticals.", body: "Wound care, pain management, DME, and behavioral health. Logic a general tool guesses at and you know cold." },
                      { title: "RCM firms and advisors.", body: "Consultants, auditors, brokers, and integrators who already sit between many providers and many payers." },
                    ].map((p) => (
                      <div key={p.title} className="group max-w-[260px] transition-transform duration-200 hover:translate-x-0.5">
                        <p className="text-[16px] font-bold text-[#355a7b] transition-colors group-hover:text-[#1d4f8a]">
                          {p.title}
                        </p>
                        <p className="mt-2 text-[14px] leading-[1.65] text-[#5079b2]">{p.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 7. COMPOUNDING EFFECT (dark + flywheel) ───────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg,#040c20 0%,#071535 50%,#030a1a 100%)" }}
        />
        <Pinstripes color="rgba(150,185,255,0.05)" gap={26} />
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1fr_0.95fr]">
          <FadeIn className="flex flex-col gap-6">
            <Eyebrow color="#5680b3">The compounding effect</Eyebrow>
            <h2 className="text-[36px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#d4e3fb] md:text-[46px]">
              Every playbook makes the platform smarter.
            </h2>
            <p className="text-[16px] leading-[1.7] text-slate-400">This is the part that separates a platform from a tool.</p>
            <p className="text-[16px] leading-[1.7] text-slate-300/90">
              More claim flow makes the engine smarter. A smarter engine produces better playbooks. Better
              playbooks attract more builders. More builders bring more claim flow.
            </p>
            <p className="text-[16px] font-semibold leading-[1.7] text-[#7cadf2]">Then it turns again, faster.</p>
            <p className="text-[16px] leading-[1.7] text-slate-300/90">
              When you build here, you are not building on something static. You are building on something
              that improves underneath you while you sleep, fed by every other expert on the platform.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Tilt className="overflow-hidden rounded-[26px] border border-sky-500/15 bg-[#040e22]" max={7}>
              <img
                src={asset("flywheel.png")}
                alt="Compounding flywheel: more builders, more claim flow, a smarter engine, better playbooks"
                className="h-full w-full object-contain p-3"
              />
            </Tilt>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 8. THE ECONOMICS (dark + graph) ───────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "linear-gradient(135deg,#0a2350 0%,#0a1830 55%,#040a16 100%)" }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[0.95fr_1fr]">
          <FadeIn delay={0.1} className="order-last lg:order-first">
            <Tilt className="overflow-hidden rounded-[26px] border border-sky-500/15 bg-[#040e22]" max={7}>
              <img
                src={asset("economics-graph.png")}
                alt="Build, run, outcome, scale — partner economics curve"
                className="h-full w-full object-contain p-2"
              />
            </Tilt>
          </FadeIn>

          <FadeIn className="flex flex-col gap-6">
            <Eyebrow color="#95bef0">The economics</Eyebrow>
            <h2 className="text-[36px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#d4dffa] md:text-[46px]">
              You sell what you build. The platform runs it.
            </h2>
            <p className="text-[16px] leading-[1.7] text-[#9ec4f6]">
              You own your methodology. You own your client relationships. You bring the deal.
            </p>
            <p className="text-[16px] font-semibold leading-[1.7] text-[#9ec4f6]">
              The platform earns on the runtime. You earn on the value you create.
            </p>
            <p className="text-[16px] leading-[1.7] text-[#e8f2ff]">
              There are several ways partners get paid. A one time build credit when a playbook is created.
              Recurring revenue as your playbook runs. Outcome based pricing tied to dollars recovered or
              prevented, which is how the audit world already pays. And revenue share as you build at volume.
            </p>
            <p className="text-[16px] leading-[1.7] text-[#d0e3ff]">
              The right structure depends on your business and your client mix. We size it together during
              onboarding so the model fits how you actually work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 9. FOR PEOPLE (light blue) ───────────────── */}
      <section style={{ background: "linear-gradient(180deg,#f0f6ff 0%,#dbeafe 100%)" }}>
        <div className="mx-auto flex max-w-[940px] flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
          <FadeIn>
            <h2 className="text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#1e3468] md:text-[46px]">
              This is for people who already know where the money goes.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="max-w-[820px] text-[18px] leading-[1.7] text-[#475569]">
              You are a good fit if you hold deep, specific knowledge about a part of the claim. If you have
              a methodology that works and have wished it could run everywhere at once. If you sit close to
              providers, payers, or plans and they trust your judgment.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────── 10. CTA (white) ───────────────── */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[940px] flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
          <FadeIn>
            <h2 className="text-[36px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#3f5382] md:text-[48px]">
              See it run on your claims.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="max-w-[680px] text-[18px] leading-[1.7] text-[#131b2e]">
              Bring us a sample of your claim flow and we will show you what the platform finds. Whether you
              submit claims, pay them, fund them, or audit them.
            </p>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="/company?service=request-a-demo"
                className="group inline-flex items-center gap-2 rounded-[12px] border border-[#001b5c] bg-white px-8 py-4 text-[16px] font-semibold text-[#020617] transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Request a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/company?service=partner"
                className="inline-flex items-center rounded-[12px] border border-teal-400/50 bg-[#131b2e] px-8 py-4 text-[16px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1e293b]"
              >
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

/* Fine torn / deckle paper edge mask for the partner-ecosystem card */
const TORN_MASK = "url(/partners-figma/torn-edge.svg)";
