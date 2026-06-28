"use client";

import React, { useRef } from "react";
import { Zap, FileSearch, Shield, BadgeCheck, TrendingUp, Activity, Building2, ArrowRight, Home, BarChart2, Heart, ArrowDown, ShieldCheck, ChevronRight, Cpu, Layers3 } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { WovenLightHero } from "@/components/WovenHero";
import { ProductCardsSection } from "@/components/ProductCards";
import { Footer } from "@/components/Footer";
import PrecisionIntelligence from "@/components/PrecisionIntelligence";
import spealitiesImg from '@/public/spealitiesImg.jpg'
import preClaimImg from '@/public/Pre-Claim Validation Dashboard.png';
import revenueImg from '@/public/BgAbstractElement.jpg';
import GImg from '@/public/G.png'

import {  
  FileText,
  Users,
  ArrowUp,

 } from 'lucide-react';

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
      viewport={{ once: true, amount: 0.01 }}
      transition={{ delay: delay * 0.15, duration: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll-driven expanding white section
function ExpandingSection({ children, innerClassName }: { children: React.ReactNode; innerClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const paddingX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [48, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [40, 0]);

  if (shouldReduceMotion) {
    return (
      <div className="bg-brand-dark">
        <div className={`bg-white px-5 md:px-10 lg:px-20 py-12 md:py-18 lg:py-24 ${innerClassName ?? ""}`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div ref={ref} className="bg-brand-dark" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
      <motion.div
        className={`bg-white px-5 md:px-10 lg:px-20 py-12 md:py-18 lg:py-24 ${innerClassName ?? ""}`}
        style={{ borderRadius }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Page() {

const router = useRouter();

const dashboardData = {
  revenue: {
    title: 'Revenue Health Overview',
    cardTitle: 'Preventable Denials',
    subtitle: 'Caught upstream before submission',
    tags: ['Documentation', 'Eligibility'],
    description:
      'Our AI-driven engine identifies gaps in authorization and coding documentation in real-time, preventing high-risk claims from moving downstream.',
    button: 'Explore Revenue Intelligence',
    metrics: [
      {
        label: 'Manual Review Time',
        value: '-42%',
        desc: 'Automated risk detection at scale',
        positive: false,
      },
      {
        label: 'Clean Claim Rate',
        value: '98.4%',
        desc: 'Consistent pre-bill validation',
        positive: true,
      },
      {
        label: 'Cash Predictability',
        value: '+15%',
        desc: 'Fewer surprises, fewer rework cycles',
        positive: true,
      },
    ],
  },

  analytics: {
    title: 'Analytics Performance',
    cardTitle: 'Workflow Efficiency',
    subtitle: 'Operational bottlenecks identified',
    tags: ['Automation', 'Insights'],
    description:
      'Advanced analytics continuously monitor workflow latency and throughput, helping teams optimize operations proactively.',
    button: 'View Analytics',
    metrics: [
      {
        label: 'Processing Speed',
        value: '+61%',
        desc: 'Faster automated processing',
        positive: true,
      },
      {
        label: 'Error Reduction',
        value: '-31%',
        desc: 'Improved validation accuracy',
        positive: false,
      },
      {
        label: 'Operational Accuracy',
        value: '99.1%',
        desc: 'Consistent workflow integrity',
        positive: true,
      },
    ],
  },

  care: {
    title: 'Patient Experience',
    cardTitle: 'Care Coordination',
    subtitle: 'Improved communication efficiency',
    tags: ['Patients', 'Engagement'],
    description:
      'Integrated coordination systems streamline patient communication and reduce friction throughout the care journey.',
    button: 'Open Care Insights',
    metrics: [
      {
        label: 'Patient Satisfaction',
        value: '+28%',
        desc: 'Improved service experience',
        positive: true,
      },
      {
        label: 'Follow-Up Delays',
        value: '-19%',
        desc: 'Faster coordination workflows',
        positive: false,
      },
      {
        label: 'Engagement Rate',
        value: '94.6%',
        desc: 'Higher patient participation',
        positive: true,
      },
    ],
  },
};

const tabs = [
  {
    key: 'revenue',
    icon: Home,
  },
  {
    key: 'analytics',
    icon: BarChart2,
  },
  {
    key: 'care',
    icon: Heart,
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const UpstreamMockup = () => {
  const [active, setActive] = React.useState<keyof typeof dashboardData>('revenue');

  const current = dashboardData[active];

  return (
    <div className="relative mx-auto w-full max-w-[960px]">

      <div className="flex items-stretch gap-3 sm:gap-5">

        {/* Sidebar — hidden on small mobile, shown sm+ */}
        <div className="hidden sm:flex w-[72px] md:w-[92px] flex-col items-center rounded-[28px] md:rounded-[38px] bg-[#F5F5F6] px-2 md:px-3 py-6 md:py-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">

          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = active === tab.key;

            return (
              <motion.button
                key={tab.key}
                type="button"
                aria-label={tab.key}
                aria-pressed={isActive}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: isActive ? 1 : 1.08 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                }}
                onClick={() => setActive(tab.key as keyof typeof dashboardData)}
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer ${
                  isActive
                ? 'bg-[#E9EEFF] shadow-md'
                : 'bg-transparent opacity-50 hover:opacity-100'
                } ${i !== 0 ? 'mt-8' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-2xl bg-[#E9EEFF]"
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 24,
                    }}
                  />
                )}

                <Icon
                  className={`relative z-10 h-5 w-5 ${
                    isActive
                      ? 'text-[#6695F5]'
                      : 'text-[#9BA7BA]'
                  }`}
                  strokeWidth={2.2}
                >
                </Icon>

              </motion.button>
            );
          })}

          <motion.div
            className="
              mt-auto
              flex
              h-[42px]
              w-[42px]
              items-center
              justify-center
              rounded-full
              bg-[#DAE8FF]
              overflow-hidden
            "
          >
            <img
              src={GImg.src}
              alt="G-logo-icon"
              className="h-5 w-5 object-contain"
            />
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-6">

          <AnimatePresence mode="wait">

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
              className="space-y-6"
            >

              {/* Top Card */}
              <div className="rounded-[24px] sm:rounded-[38px] border border-white/10 bg-[#1a3a7c] px-4 sm:px-8 py-6 sm:py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">

                <h3 className="text-[22px] sm:text-[30px] font-semibold tracking-[-0.03em] text-white">
                  {current.title}
                </h3>

                {/* Consistent aligned grid */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-[0.85fr_1.15fr] gap-4 sm:gap-6">

                  {/* Left */}
                  <motion.div
                    layout
                    className="flex flex-col rounded-[20px] sm:rounded-[28px] bg-[#D7DEE8] p-4 sm:p-7 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  >

                    {/* Header */}
                    <div className="flex items-start justify-between gap-5">

                      <div className="space-y-1.5">
                        <h4 className="text-[20px] font-semibold tracking-[-0.02em] text-[#2A3950]">
                          {current.cardTitle}
                        </h4>

                        <p className="text-[14px] text-[#64748B]">
                          {current.subtitle}
                        </p>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFDCDC]">
                        <ArrowDown className="h-4 w-4 text-[#FF5F5F]" />
                      </div>
                    </div>

                    {/* Pills */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-4 py-1 text-[12px] font-medium text-[#5B6C84]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-[15px] leading-[1.7] text-[#66768B]">
                      {current.description}
                    </p>

                    {/* Button */}

                  </motion.div>

                  {/* Right Placeholder */}
                  <div className="rounded-[28px] bg-[#D7DEE8]/95 p-4 flex items-center justify-center min-h-[160px]">
                        <img
                        src={revenueImg.src}
                        alt="Revenue health overview image"
                        className="object-contain w-full h-auto max-h-[200px]"
                        />
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="rounded-[24px] sm:rounded-[38px] border border-white/10 bg-[linear-gradient(135deg,#5B87BF_0%,#4B78B2_40%,#3D6FAE_100%)] px-4 sm:px-7 py-5 sm:py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">

                <h4 className="text-[15px] sm:text-[17px] font-semibold tracking-[-0.02em] text-[#2E4058]">
                  Performance Metrics
                </h4>

                <div className="mt-5 sm:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">

                  {current.metrics.map((metric) => (
                    <motion.div
                      layout
                      key={metric.label}
                      whileHover={{ y: -3 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="rounded-[20px] bg-[#F8F8F9] px-5 py-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                    >
                      <div className="flex items-start justify-between">

                        <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#6A768A]">
                          {metric.label}
                        </span>

                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            metric.positive
                              ? 'bg-[#DDE3FF]'
                              : 'bg-[#D8F5E0]'
                          }`}
                        >
                          {metric.positive ? (
                            <ArrowUp className="h-4 w-4 text-[#5865FF]" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-[#16A34A]" />
                          )}
                        </div>
                      </div>

                      <div className="mt-3 text-[22px] font-bold leading-none tracking-[-0.05em] text-[#1A263B]">
                        {metric.value}
                      </div>

                      <p className="mt-3 text-[13px] text-[#69778A]">
                        {metric.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};




  return (
    <main className="bg-brand-dark text-white">

      {/* ── 1. Hero ── */}
      <WovenLightHero />

      {/* ── 2. Problem Reframe ── */}
    <section className="bg-white text-[#0A192F] py-12 md:py-18 lg:py-24 px-5 md:px-8 flex justify-center items-center text-center">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic font-medium leading-tight mb-6 md:mb-8">
            "The claim is decided long before billing ever sees it."
          </h2>
          <p className="text-[#0A192FCC] md:text-xl max-w-5xl mx-auto leading-relaxed">
            The same intelligence that prevents a bad claim is the intelligence that
            recognizes one. Upstream it catches the error. Downstream it audits the
            claim. The direction changes. The judgment does not.
          </p>
        </div>
      </section>

      {/* ── 3. Product Cards ── */}
      <ProductCardsSection />




      {/* ── 4. Platform Positioning ── */}
      <section className="bg-brand-dark px-4 md:px-8 lg:px-16 pt-2 md:pt-4 lg:pt-6 pb-16 md:pb-20 lg:pb-24">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <AnimatedContainer className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6a97e8] mb-4">
              The Platform
            </span>
            <h2 className="text-white text-3xl md:text-4xl lg:text-[2.9rem] font-extrabold leading-[1.1] tracking-tight text-balance">
              Grelin is a platform, not a point tool.
            </h2>
          </AnimatedContainer>

          {/* Three aligned cards */}
          <div className="mt-12 md:mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: "One Engine",
                desc: "One engine reads the claim and applies payer logic before it exists and after.",
              },
              {
                icon: Layers3,
                title: "Flagship Applications",
                desc: "RxAI and Audit.ai are the flagships. Specialty apps share the same engine.",
              },
              {
                icon: TrendingUp,
                title: "Every Claim Makes It Sharper",
                desc: "The model that protected a pharmacy yesterday helps a payer today. Every claim makes the platform smarter.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedContainer key={item.title} delay={i * 0.6} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3b6fd6]/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_-24px_rgba(59,111,214,0.6)]">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#3b6fd6]/30 bg-[#13306a]/60 text-[#7aa6f5] transition-colors group-hover:border-[#3b6fd6]/60 group-hover:text-[#a6c6ff]">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-sm tabular-nums text-white/15">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold tracking-tight text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                </AnimatedContainer>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Specialties ── */}
      <section className="bg-white bg-grid-pattern py-12 md:py-18 lg:py-24 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>
          <div
    className="absolute inset-0 opacity-[0.15] pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(rgba(10,25,47,0.45) 1px, transparent 1px),
        linear-gradient(90deg, rgba(10,25,47,0.45) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
      maskImage:
        'radial-gradient(circle_at_center, black 45%, transparent 100%)',
      WebkitMaskImage:
        'radial-gradient(circle_at_center, black 45%, transparent 100%)',
    }}
  />
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
            <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] bg-gray-200 rounded-3xl border-20 border-white shadow-xl relative overflow-hidden">
              {/* Placeholder for image/graphic */}
              <img
              src={spealitiesImg.src}
              alt="specialties cover image"
              />
            </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-10">
            <div className="w-full">
                    {/* Heading Box */}
                    <div className="relative w-full border border-[#AEB7C8] bg-[#F2F2F2] px-4 py-4">
                      {/* Corner handles */}
                      <span className="absolute -top-[5px] -left-[5px] h-[10px] w-[10px] border border-[#AEB7C8] bg-white" />
                      <span className="absolute -top-[5px] -right-[5px] h-[10px] w-[10px] border border-[#AEB7C8] bg-white" />
                      <span className="absolute -bottom-[5px] -left-[5px] h-[10px] w-[10px] border border-[#AEB7C8] bg-white" />
                      <span className="absolute -bottom-[5px] -right-[5px] h-[10px] w-[10px] border border-[#AEB7C8] bg-white" />

                      {/* Title */}
                      <h1 className="font-bold tracking-[-0.04em] leading-tight text-[#6F7C95] text-[20px] sm:text-[24px] md:text-[30px] lg:text-[34px] xl:text-[40px]">
                        Built for every market that runs on claims
                      </h1>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                      <p className="font-normal leading-relaxed tracking-[-0.02em] text-[14px] sm:text-[15px] md:text-[17px] text-[#6F7C95]">
                        One platform serves every organization that touches a claim. From providers and pharmacies to payers and government programs, the same intelligence applies judgment before the claim is created and after it is filed.
                      </p>
                    </div>
                  </div>

            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[23px] before:w-[2px] before:bg-gray-200">
              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center z-10">
                  <ShieldCheck className="w-5 h-5 text-[#0A192F]" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-2">Payers &amp; Audit Organizations</h4>
                <p className="text-[#77859A] text-sm leading-relaxed">
                  Verify claim accuracy at full volume, not a sample. Audit every claim
                  with reasoned findings and ranked review queues.
                </p>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center z-10">
                  <Building2 className="w-5 h-5 text-[#0A192F]" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-2">
                  Pharmacy &amp; Distribution
                </h4>
                <p className="text-[#77859A] text-sm leading-relaxed">
                  Enforce authorization, coding, and documentation integrity across the
                  supply chain before dispense or billing.
                </p>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center z-10">
                  <Users className="w-5 h-5 text-[#0A192F]" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-2">
                  Providers &amp; MSOs
                </h4>
                <p className="text-[#77859A] text-sm leading-relaxed">
                  Apply payer logic before submission to prevent documentation, coding,
                  authorization, and billing errors.
                </p>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center z-10">
                  <BadgeCheck className="w-5 h-5 text-[#0A192F]" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-2">
                  Government Program Integrity
                </h4>
                <p className="text-[#77859A] text-sm leading-relaxed">
                  Support Medicare, Medicaid, and CMS initiatives that reduce fraud,
                  waste, and improper payments at scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ���─ 7. Proof + Form ── */}
<section className="py-10 md:py-16 lg:py-20 px-4 md:px-8 relative overflow-hidden mx-auto w-full bg-[radial-gradient(140%200%_at_120%_20%,#1A66DA_0%,#0E52B8_30%,#0A3C8A_60%,#061F4E_80%,#020B1D_100%)]">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="max-w-3xl mb-8 md:mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          What happens when revenue intelligence moves upstream
        </h2>
        <p className="text-base text-gray-300">
          Catch issues before they become denials. Grelin surfaces pre-bill risk
          across documentation, eligibility, authorization, and coding.
        </p>
      </div>
      <UpstreamMockup />
    </div>
  </section>


    
  {/* Precision Section */}
  
  <PrecisionIntelligence />

      {/* ── 9. Final CTA ── */}
      {/* <section className="bg-brand-dark px-4 md:px-8 lg:px-16 py-28 md:py-40">
        <AnimatedContainer className="mx-auto max-w-4xl text-center">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
            See where your revenue is at risk{" "}
            <span className="text-brand-blue">before claims go out the door</span>
          </h2>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto">
            Grelin identifies pre-bill revenue risk across documentation, eligibility, authorization, and coding — before it becomes a denial.
          </p>
          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[#0B1120] hover:bg-white/90 transition-colors">
              Find My Revenue Risks <ArrowRight size={16} />
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Talk to a Grelin Expert
            </a>
          </div>
        </AnimatedContainer>
      </section> */}
      <section className="bg-white py-12 md:py-18 lg:py-24 px-4 md:px-8 text-center">
        <AnimatedContainer className="mx-auto max-w-4xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D1C2E] mb-8 leading-tight text-balance">
              See what the platform does to a claim{" "}
              <span className="text-blue-600">in both directions.</span>
            </h2>
            <p className="text-[#434655] text-sm sm:text-base font-normal mb-10 max-w-xl mx-auto">
              Grelin identifies pre-bill revenue risk across documentation,
              eligibility, authorization, and coding before it becomes a denial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/company?service=request-a-demo" className="bg-white border border-[#737686] text-[#0D1C2E] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Talk to the Claim Integrity team
              </a>
            </div>
          </div>
        </AnimatedContainer>
        </section>

      {/* ── 10. Footer ── */}
      <Footer />

    </main>
  );
}
