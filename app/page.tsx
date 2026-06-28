"use client";

import React, { useRef } from "react";
import { Zap, FileSearch, Shield, BadgeCheck, TrendingUp, Activity, Building2, ArrowRight, Home, BarChart2, Heart, ArrowDown, ShieldCheck, ChevronRight } from "lucide-react";
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
  // const [active, setActive] =
  //   useState<keyof typeof dashboardData>('revenue');

const active: keyof typeof dashboardData = 'revenue';

  const current = dashboardData[active];

  return (
    <div className="relative mx-auto w-full max-w-[1180px]">

      <div className="flex items-stretch gap-3 sm:gap-5">

        {/* Sidebar — hidden on small mobile, shown sm+ */}
        <div className="hidden sm:flex w-[72px] md:w-[92px] flex-col items-center rounded-[28px] md:rounded-[38px] bg-[#F5F5F6] px-2 md:px-3 py-6 md:py-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">

          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = active === tab.key;

            return (
              <motion.button
                key={tab.key}
                // whileTap={{ scale: 0.9 }}
                // whileHover={{ scale: 1.08 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                }}
                // onClick={() => setActive(tab.key as any)}
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                  // isActive
                  //   ? 'bg-[#E9EEFF] shadow-md'
                  //   : 'bg-transparent'
                  isActive
                ? 'bg-[#E9EEFF] shadow-md'
                : 'bg-transparent opacity-40 cursor-default'
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
    <section className="bg-white text-[#0A192F] py-16 md:py-24 lg:py-32 px-5 md:px-8 flex justify-center items-center text-center">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic font-medium leading-tight mb-6 md:mb-8">
            "Revenue doesn't break at submission. It breaks before it."
          </h2>
          <p className="text-[#0A192FCC] md:text-xl max-w-5xl mx-auto leading-relaxed">
            Most organizations focus on denials after claims are rejected. But
            revenue loss starts earlier — in documentation gaps, eligibility errors,
            missing authorizations, and coding inconsistencies.
          </p>
        </div>
      </section>

      {/* ── 3. Product Cards ── */}
      <ProductCardsSection />




      {/* ── 4. Platform Positioning ── */}
      <section className="bg-brand-dark px-4 md:px-8 lg:px-16 py-8 md:py-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-x-10 lg:gap-x-16 gap-y-8 md:gap-y-10">

            {/* Left: big headline — wider column */}
            <AnimatedContainer>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                Grelin is not a single RCM tool
              </h2>
            </AnimatedContainer>

            {/* Column 1 */}
            <AnimatedContainer delay={0.08} className="border-t border-white/25 pt-6">
              <h3 className="text-white text-sm font-bold mb-3 uppercase tracking-wide">AI Intelligence Layer</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                An AI Intelligence Layer embedded into your existing healthcare workflows — analyzing clinical and financial signals before submission to detect risk, prevent breakdowns, and optimize performance.
              </p>
            </AnimatedContainer>

            {/* Column 2 */}
            <AnimatedContainer delay={0.12} className="border-t border-white/25 pt-6">
              <h3 className="text-white text-sm font-bold mb-3 uppercase tracking-wide">Purpose-Built Apps</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Each Grelin application solves a specific pre-bill challenge. Every application is powered by the same intelligence engine.
              </p>
            </AnimatedContainer>

            {/* Column 3 */}
            <AnimatedContainer delay={0.16} className="border-t border-white/25 pt-6">
              <h3 className="text-white text-sm font-bold mb-3 uppercase tracking-wide">Built to Scale</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                As your organization grows, the intelligence grows with it.
              </p>
            </AnimatedContainer>

          </div>
        </div>
      </section>

      {/* ── 6. Specialties ── */}
      <section className="bg-white bg-grid-pattern py-16 md:py-24 lg:py-32 px-4 md:px-8 relative">
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
                        Built for high-scrutiny specialities
                      </h1>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                      <p className="font-normal leading-relaxed tracking-[-0.02em] text-[14px] sm:text-[15px] md:text-[17px] text-[#6F7C95]">
                        Our platform is engineered for the complex clinical documentation and rigorous audit environments of specialized care.
                      </p>
                    </div>
                  </div>

            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[23px] before:w-[2px] before:bg-gray-200">
              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center z-10">
                  <Activity className="w-5 h-5 text-[#0A192F]" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-2">Wound Care</h4>
                <p className="text-[#77859A] text-sm leading-relaxed">
                  Intelligent documentation analysis for complex clinical cases,
                  ensuring every stage of healing is accurately captured and billed.
                </p>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center z-10">
                  <FileText className="w-5 h-5 text-[#0A192F]" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-2">
                  Pain Management
                </h4>
                <p className="text-[#77859A] text-sm leading-relaxed">
                  Automated pre-bill verification for interventional procedures,
                  managing rigorous authorization requirements without slowing
                  throughput.
                </p>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center z-10">
                  <Users className="w-5 h-5 text-[#0A192F]" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-2">
                  MSO & Multi-Specialty
                </h4>
                <p className="text-[#77859A] text-sm leading-relaxed">
                  Centralized revenue intelligence for multi-facility operations,
                  providing uniform quality standards across a diverse portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ���─ 7. Proof + Form ── */}
<section className="py-12 md:py-20 lg:py-28 px-4 md:px-8 relative overflow-hidden mx-auto w-full bg-[radial-gradient(140%200%_at_120%_20%,#1A66DA_0%,#0E52B8_30%,#0A3C8A_60%,#061F4E_80%,#020B1D_100%)]">
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
      <section className="bg-white py-16 md:py-24 lg:py-32 px-4 md:px-8 text-center">
        <AnimatedContainer className="mx-auto max-w-4xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D1C2E] mb-8 leading-tight text-balance">
              See where your revenue is at risk{" "}
              <span className="text-blue-600">before claims go out the door</span>
            </h2>
            <p className="text-[#434655] text-sm sm:text-base font-normal mb-10 max-w-xl mx-auto">
              Grelin identifies pre-bill revenue risk across documentation,
              eligibility, authorization, and coding before it becomes a denial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* <a href="#" className="bg-[#0B1C30] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0B1C30] transition-colors flex items-center justify-center gap-2">
                Find My Revenue Risks <ArrowRight className="w-4 h-4" />
              </a> */}
              <a href="/company?service=request-a-demo" className="bg-white border border-[#737686] text-[#0D1C2E] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Talk to a Grelin Expert
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
