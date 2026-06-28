"use client";

import { FileSearch, Shield, BadgeCheck, TrendingUp, BarChart2, Lock, Server, Eye, CheckSquare, Zap } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { TabbedPlatformDiagram, IntegrationDiagram } from "@/components/PlatformDiagrams";
import ipadImg from '@/public/ipad.png';
import framePatternImg from '@/public/heroframepattern.png';
import cardImg1 from '@/public/card1-platform.png';
import cardImg2 from '@/public/card2-platform.png'
import cardImg3 from '@/public/card3-platform.png'
import CapImg1 from '@/public/CapImg1.png'
import CapImg2 from '@/public/CapImg2.png'
import CapImg3 from '@/public/CapImg3.png'
import CapImg4 from '@/public/CapImg4.png'
import CapImg5 from '@/public/CapImg5.png'
import PftImg1 from '@/public/PftImg1.png'
import PftImg2 from '@/public/PftImg2.png'
import PftImg3 from '@/public/PftImg3.png'
import PftImg4 from '@/public/PftImg4.png'
import PftImg5 from '@/public/PftImg5.png'



/* ─── Shared animation helpers (mirrors home page) ────────────────────────── */

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

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const capabilities = [
  {
    icon: BadgeCheck,
    title: "Eligibility Validation",
    description: "Confirms payer coverage, benefit rules, and authorization requirements before services are billed.",
  },
  {
    icon: FileSearch,
    title: "Documentation Intelligence",
    description: "Analyzes clinical documentation to ensure services are supported and compliant with payer requirements.",
  },
  {
    icon: TrendingUp,
    title: "Coding & Charge Integrity",
    description: "Identifies inconsistencies between documentation, coding, and billing practices.",
  },
  {
    icon: Shield,
    title: "Payer Policy Alignment",
    description: "Continuously monitors payer requirements to ensure claims meet policy expectations before submission.",
  },
  {
    icon: BarChart2,
    title: "Revenue Performance Insights",
    description: "Surfaces operational trends that impact reimbursement across providers, locations, and specialties.",
  },
];

const securityPrinciples = [
  { icon: Lock,        label: "HIPAA-aligned data protection practices", img: PftImg1 },
  { icon: Shield,      label: "Secure data transmission and storage", img: PftImg2 },
  { icon: CheckSquare, label: "Role-based access controls", img: PftImg3 },
  { icon: Eye,         label: "Audit logging and system transparency", img: PftImg4 },
  { icon: Server,      label: "Enterprise-grade cloud infrastructure", img: PftImg5 },
];

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function PlatformPage() {

  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      const maxScroll =
        container.scrollWidth - container.clientWidth;

      const current = x.get();

      let next = current - e.deltaY * 1.2;

      next = Math.min(0, Math.max(next, -maxScroll));

      animate(x, next, {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.3,
      });

      e.preventDefault();
    };

    container.addEventListener("wheel", onWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [x]);

  return (
    <main className="bg-brand-dark text-white">

      {/* ── 1. Hero — dark with center glow ────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden px-4 md:px-16 py-20 md:py-32">
        {/* Center glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40"
          style={
          {
            backgroundImage: `url(${framePatternImg.src})`
          }
          }
          >
          </div>
          <div className="w-[600px] h-[600px] rounded-full bg-brand-blue opacity-[0.08] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center gap-16">

          {/* Text block — narrower */}
          <div className="w-full text-center flex flex-col gap-6" style={{ maxWidth: 760 }}>
            <AnimatedContainer className="flex flex-col items-center gap-6">
              <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                The Intelligence Layer for Pre-Bill Revenue Integrity
              </h1>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Healthcare lacks pre-claim validation where most errors happen. Grelin users AI to catch and fix issues before claims are submitted, reducing denials and revenue loss.
              </p>
            </AnimatedContainer>
          </div>

          <img
          src={ipadImg.src}
          alt="platformTabSectionImage"
          className="w-full h-auto block"
          style={{ maxWidth: "100%", borderRadius: "12px" }}
          />
        </div>
      </section>
      <section className="bg-white relative flex items-center justify-center overflow-hidden px-4 md:px-16 py-12 md:py-24">
                  {/* Diagram — full width of max-w-5xl */}
          <AnimatedContainer delay={0.5} className="w-full max-w-5xl">
            <TabbedPlatformDiagram />
          </AnimatedContainer>
      </section>

      {/* ── 2. Intelligence before submission — white expanding, cards layout ── */}
      <div className="relative overflow-hidden bg-[#020817] py-14 sm:py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-[#12395d]/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[1200px] -translate-x-1/2 bg-[#1e3a5f]/30 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Top: centered heading */}
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedContainer>
              <h2 className="text-[34px] leading-[1.15] sm:text-[48px] md:text-[58px] font-semibold tracking-[-0.03em] text-white">
                <span className="inline-block bg-[#10263f]/90 px-3 py-1">
                                Intelligence before
                </span>
                <span className="mt-2 inline-block bg-[#10263f]/90 px-3 py-1">
                the claim is submitted
                </span>
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                Traditional revenue cycle management focuses on fixing problems after claims are denied. Grelin focuses on preventing those problems before the claim is ever sent.
              </p>
            </AnimatedContainer>
          </div>

          {/* Cards — 3 columns with vertical dividers */}
          <div className="mt-10 md:mt-16 mx-auto max-w-6xl grid grid-cols-1 gap-5 md:grid-cols-3">

            <AnimatedContainer delay={0.1}>
              <div className="border border-white/10 bg-[#f4f4f5] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]" style={{borderRadius: "20px 0 0 20px"}}>
              <img src={cardImg1.src} alt="" className="h-[160px] sm:h-[200px] w-full rounded-[10px] bg-[#d4d4d8] object-cover"/>
                  <div className="pt-5">

                    <h3 className="text-gray-900 text-[18px] font-bold">What we analyze</h3>
                    <p className="mt-3 text-gray-500 text-[14px] leading-7">
                      Patient eligibility, documentation completeness, coding accuracy, payer policy alignment, and charge integrity — all analyzed before submission.
                    </p>
                  </div>
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <div className="border border-white/10 bg-[#f4f4f5] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
              <img src={cardImg2.src} alt="" className="h-[160px] sm:h-[200px] w-full rounded-[10px] bg-[#d4d4d8] object-cover"/>

                  <div className="pt-5">

                    <h3 className="text-gray-900 text-[18px] font-bold">Real-time risk surfacing</h3>
                    <p className="mt-3 text-gray-500 text-[14px] leading-7 object-contain">
                     When risks are detected, Grelin surfaces them immediately so teams can correct issues before claims enter the billing workflow.
                    </p>
                  </div>
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.3}>
              <div className="rounded-[22px] border border-white/10 bg-[#f4f4f5] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]" style={{borderRadius: "0 20px 20px 0"}}>
              <img src={cardImg3.src} alt="" className="h-[160px] sm:h-[200px] w-full rounded-[10px] bg-[#d4d4d8] object-cover" />

                  <div className="pt-5">
                    <h3 className="text-gray-900 text-[18px] font-bold">Upstream resolution</h3>
                    <p className="mt-3 text-gray-500 text-[14px] leading-7">
                    Instead of discovering problems weeks later through denials, issues are resolved while the encounter is still active — at the lowest possible cost.
                    </p>
                  </div>
              </div>
            </AnimatedContainer>

          </div>
        </div>
      </div>

      {/* ── 3. Capabilities — dark, centered text layout ─────────────────────── */}
<section className="bg-[#f5f5f5] py-20 sm:py-24 lg:py-32 overflow-hidden">

  <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="max-w-2xl">

      <AnimatedContainer>
        <h2 className="text-[34px] leading-[1.02] sm:text-[46px] lg:text-[58px] font-[750] tracking-[-0.04em] text-[#111111]">
          AI designed specifically for revenue cycle risk
        </h2>
      </AnimatedContainer>

      <AnimatedContainer delay={0.15}>
        <p className="mt-5 mb-8 max-w-xl text-[14px] sm:text-[15px] leading-[1.8] text-[#7a7a7a]">
          The platform applies automation and machine learning to analyze revenue
          cycle data in real time, identifying potential claim risks before
          submission.
        </p>
      </AnimatedContainer>

    </div>

    {/* Rows */}
    <div className="mt-14 sm:mt-16 space-y-5 sm:space-y-6">

      {[
        {
          title: "Eligibility Validation",
          desc: "Confirms payer coverage, benefit eligibility, authorization requirements, and billing policies before services are billed, helping reduce denials, delays, claim errors, reimbursement risks, and unnecessary rework across the revenue cycle.",
          reverse: false,
          img: CapImg1
        },
        {
          title: "Documentation Intelligence",
          desc: "Analyzes clinical documentation to ensure services are accurately supported, properly documented, and compliant with payer-specific requirements, helping reduce errors, avoid deficiencies, and limit downstream claim risk.",
          reverse: true,
          img: CapImg2

        },
        {
          title: "Coding & Charge Integrity",
          desc: "Identifies inconsistencies between clinical documentation, coding, and billing practices before claims are submitted, helping reduce compliance risks, prevent denials, improve claim accuracy, and minimize costly rework across teams.",
          reverse: false,
          img: CapImg3

        },
        {
          title: "Payer Policy Alignment",
          desc: "Continuously monitors evolving payer requirements to ensure claims align with policy expectations before submission, helping reduce denials, improve compliance, minimize reimbursement delays, and strengthen revenue consistency.",
          reverse: true,
          img: CapImg4

        },
        {
          title: "Revenue Performance Insights",
          desc: "Surfaces operational trends impacting reimbursement across providers, locations, and specialties, enabling healthcare teams to identify performance gaps, reduce revenue leakage, improve decision-making, and strengthen financial outcomes.",
          reverse: false,
          img: CapImg5

        },
      ].map((item, i) => (

        <AnimatedContainer
          key={item.title}
          delay={0.08 * i}
        >

          <div
            className={`
              rounded-[22px]
              border
              border-[#e7e7e7]
              bg-[#f1f1f1]
              p-4
              sm:p-5
              lg:p-6
              shadow-[0_1px_0_rgba(255,255,255,0.6)]
            `}
          >

            <div
              className={`
                m-5
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
                md:gap-8
                items-center
                ${item.reverse ? "md:[&>*:first-child]:order-2" : ""}
              `}
            >

              {/* Content */}
              <div className="min-w-0">

                <h3 className="text-[15px] sm:text-[16px] font-[700] tracking-[-0.02em] text-[#111111]">
                  {item.title}
                </h3>

                <p className="text-[18px] leading-[28px] font-normal align-middle tracking-normal mt-3 sm:text-[14px] text-[#6b6b6b]">
                  {item.desc}
                </p>

              </div>

              {/* Placeholder/Image block */}
              <img
              src={item.img.src}
              alt="Claim card image"
              className="                 
                   h-[150px]
                  sm:h-[140px]
                  lg:h-[200px]
                  w-full
                  rounded-[20px]
                  object-cover
                  "
              />

            </div>

          </div>

        </AnimatedContainer>

      ))}

    </div>

  </div>

</section>

      {/* ── 4. Integrations — dark, text left + diagram right ──────────────── */}
      <section className="bg-brand-dark px-4 md:px-8 lg:px-16 py-14 md:py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center gap-16 md:gap-24">

          {/* Left: text */}
          <div className="md:w-[45%]">
            <AnimatedContainer>
              <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                Built to work with the systems you already use
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-6">
                Grelin is designed to enhance those systems rather than replace them. The platform sits above existing workflows as an intelligence layer, integrating with EHR platforms, billing systems, clearinghouses, and specialty software environments.
              </p>
            </AnimatedContainer>
            <AnimatedContainer delay={0.3}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
                This architecture allows healthcare groups to introduce AI-driven revenue integrity without disrupting their current operations.
              </p>
            </AnimatedContainer>
          </div>

          {/* Right: architecture diagram */}
          <AnimatedContainer delay={0.2} className="md:w-[55%]">
            <IntegrationDiagram />
          </AnimatedContainer>

        </div>
      </section>

      {/* ── 5. Security — white expanding ──────────────────────────────────── */}
 <section className="flex items-center min-h-[90vh] justify-center p-6 relative w-full overflow-hidden
        bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FF_40%,#DCEBFF_72%,#B8D2FF_100%)]">

          {/* Stripe pattern */}
          <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
              backgroundImage:
              "repeating-linear-gradient(90deg,rgba(255,255,255,0.45) 0px,rgba(255,255,255,0.45) 0px,rgba(140,170,220,0.16) 10px,rgba(140,170,220,0.16) 24px,rgba(255,255,255,0.22) 22px,rgba(255,255,255,0.22) 34px)",
              backgroundSize: "20px 100%",
              backgroundBlendMode: "soft-light",
              }}
          />

      {/* Bottom blue glow */}
      <div className="absolute inset-x-0 bottom-0 h-[180px] bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.28),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* Main card wrapper */}
        <div
          className="
            relative overflow-hidden
            rounded-[26px]
            bg-slate/[0.50]
            border-white/20
            backdrop-blur-3xl
            p-5
            sm:p-7
            lg:p-9

            shadow-[0_10px_40px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(255,255,255,0.08),inset_0_0_24px_rgba(255,255,255,0.18)]

            before:absolute
            before:inset-x-0
            before:top-0
            before:h-px
            before:bg-gradient-to-r
            before:from-transparent
            before:via-white/80
            before:to-transparent
            before:content-['']

            after:absolute
            after:left-0
            after:top-0
            after:h-full
            after:w-px
            after:bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent,rgba(255,255,255,0.2))]
            after:content-['']
          "
        >

          {/* Heading */}
          <div className="max-w-3xl">

            <h2
              className="
                text-[32px]
                leading-[1]
                sm:text-[42px]
                lg:text-[56px]
                font-[750]
                tracking-[-0.05em]
                text-[#13263f]
              "
            >
              Built for healthcare environments
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-[14px]
                sm:text-[15px]
                leading-[1.8]
                text-[#45607f]
              "
            >
              Grelin is designed to support healthcare organizations operating
              in regulated environments and adheres to industry best practices
              for data protection and system integrity.
            </p>

          </div>

          {/* Horizontal scrolling cards */}
          <div
            ref={containerRef}
            className="
              mt-12
              overflow-hidden
              cursor-grab
              active:cursor-grabbing
            "
          >

            <motion.div
              style={{ x }}
              className="
                flex
                gap-5
                w-max
                will-change-transform
                m-5
              "
            >

              {securityPrinciples.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                  }}
                  viewport={{ once: true }}
                  className="
                    flex-shrink-0
                    w-[260px]
                    sm:w-[290px]
                    lg:w-[310px]
                  "
                >

                  <div
                    className="
                      rounded-[22px]
                      border
                      border-[#d9e3f5]
                      bg-[#f5f5f5]
                      p-4
                      shadow-[0_10px_40px_rgba(15,23,42,0.08)]
                    "
                    style={{borderRadius: "20px 0 0 20px"}}
                  >

                    {/* Image placeholder */}
                    <img
                    src={item.img.src}
                    alt="End section platform card image"
                      className="
                        h-[190px]
                        sm:h-[210px]
                        lg:h-[250px]
                        w-full
                        rounded-[12px]
                        bg-[#d3d3d3]
                        object-cover
                      "
                    />

                    {/* Content */}
                    <div className="mt-5">

                      <item.icon
                        className="mb-3 text-[#60789b]"
                        size={20}
                        strokeWidth={1.8}
                      />

                      <p
                        className="
                          text-[14px]
                          sm:text-[15px]
                          leading-[1.6]
                          font-[650]
                          tracking-[-0.02em]
                          text-[#1f2f46]
                        "
                      >
                        {item.label}
                      </p>

                    </div>

                  </div>

                </motion.div>
              ))}

            </motion.div>

          </div>

        </div>

      </div>

    </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />

    </main>
  );
}
