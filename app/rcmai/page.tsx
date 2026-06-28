"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import finalSecImg from "@/public/rcmfinalsecimg.jpg";
import Image, { StaticImageData } from "next/image";
import heroSecImg from '@/public/rcmai/hero.png';
import rcmOperationImg1 from '@/public/rcmai/operationalmodel1.png';
import rcmOperationImg2 from '@/public/rcmai/operationalmodel2.png';
import rcmOperationImg3 from '@/public/rcmai/operationalmodel3.png';
import rcmOperationImg4 from '@/public/rcmai/operationalmodel3.png';
import rcmOperationImg from '@/public/rcmai/rcmoperation.png';
import rcmEngineImg from '@/public/rcmai/rcmshop.png'
import rcmBentoImg1 from "@/public/rcmai/rcmbentoimg1.png"
import rcmBentoImg2 from "@/public/rcmai/rcmbentoimg2.png"
import rcmBentoImg3 from "@/public/rcmai/rcmbentoimg3.png"
import rcmBentoImg4 from "@/public/rcmai/rcmbentoimg4.png"

  ;
import SPattern from "@/components/ui/s-pattern";
import { useRouter } from "next/navigation";

// ── Fade-up animation helper ──────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const AVATARS = [
  { initials: "JD", className: "bg-foreground text-background" },
  { initials: "AK", className: "bg-foreground/80 text-background" },
  { initials: "ML", className: "bg-blue-600 text-white" },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FadeItem({ children, i = 0, className = "" }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp} custom={i} className={className}>
      {children}
    </motion.div>
  );
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return val;
}



// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const words1 = ["Lowest", "cost", "per", "claim."];
  const words2 = ["Compounding", "margin"];
  const words3 = ["per", "client."];
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-[#0d1117] pt-14 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {["PRIOR AUTHORIZATION AUTOMATION", "AI CLAIM SUBMISSION"].map((b) => (
                <span key={b} className="text-[10px] text-blue-400 border border-blue-600/40 rounded-full px-3 py-1 tracking-widest font-medium">
                  {b}
                </span>
              ))}
            </motion.div>

            {/* H1 */}
            <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-2">
              <motion.div className="flex flex-wrap gap-x-3 text-white">
                {words1.map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >{w}</motion.span>
                ))}
              </motion.div>
              <motion.div className="flex flex-wrap gap-x-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {words2.map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.72 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >{w}</motion.span>
                ))}
              </motion.div>
              <motion.div className="flex flex-wrap gap-x-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {words3.map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.88 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >{w}</motion.span>
                ))}
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-slate-400 text-sm sm:text-base mt-5 mb-8 max-w-md leading-relaxed"
            >
              RCM.ai is the next technology company to every day. Built on Grdn Platform, our AI workflows helps increase performance for modern revenue cycle operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 24px rgba(37,99,235,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-white hover:bg-blue-500 text-black text-sm px-5 lg:mr-8 py-2.5 rounded-md font-medium transition-colors cursor-pointer"
                onClick={() => router.push("/company#contact")}
              >
                See RCM.ai in action
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white text-sm px-5 py-2.5 rounded-md font-medium transition-colors cursor-pointer"
                onClick={() => router.push("/company#contact")}
              >
                Talk to the team
              </motion.button>
            </motion.div>
          </div>

          {/* Right — UI mockup */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="relative">

            <div className="absolute -inset-1 rounded-2xl"></div>
            <div className="bg-gray-200 rounded-3xl border-20 border-white shadow-xl relative overflow-hidden">

              <Image
                src={heroSecImg}
                alt="Platform Interface"
                className="relative rounded-2xl border border-white/10 shadow-2xl object-fill h-[400px] w-full object-right-top"
                priority
              />
            </div>

          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-16 border-t border-[#1e2d40] bg-[#E4F2FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 divide-x divide-[#1e2d40]">
            {[
              { val: "98%", label: "CLEAN CLAIM RATIO" },
              { val: "<3%", label: "DENIAL RATE" },
              { val: "<3%", label: "COST TO COLLECT" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="py-6 px-4 sm:px-8 text-center"
              >
                <div className="font-bold text-2xl sm:text-3xl text-[#7CADFF]">{s.val}</div>
                <div className="text-[#7CADFF] text-[10px] sm:text-xs tracking-widest mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Numbers Section ───────────────────────────────────────────────────────────
function Numbers() {
  const cards = [
    {
      title: "Claim Integrity",
      icon: "✓",
      metrics: [
        { label: "Clean Claim Ratio (First-pass)", val: "98%" },
        { label: "Denial Rate (Avg 5-10%)", val: "Below 3%" },
        { label: "Front-End Rejection Capture", val: "90%" },
        { label: "First-Pass Resolution Rate", val: "95–97%" },
      ],
    },
    {
      title: "Financial Efficiency",
      icon: "$",
      metrics: [
        { label: "Net Collection Rate", val: "96–99%" },
        { label: "Days in Accounts Receivable", val: "25–35" },
        { label: "Cost to Collect (% of revenue)", val: "Under 3%" },
        { label: "Gross Collection Rate", val: "92–95%" },
      ],
    },
    {
      title: "Operational Performance",
      icon: "⚡",
      metrics: [
        { label: "Charge Entry Accuracy", val: "99%" },
        { label: "Coding accuracy", val: "97–99%" },
        { label: "Claim Submission TAT", val: "<24 hrs" },
        { label: "Denial Recovery Rate", val: "85–90%" },
        { label: "Automation Rate", val: "60-80" },
        { label: "Manual Intervention Rate", val: "<20%" },


      ],
    },
  ];

  return (
    <Section className="bg-white py-20 px-4 sm:px-6">
      <motion.div className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FadeItem className="text-center mb-4">
          <span className="text-xs text-blue-600 tracking-widest font-medium border border-blue-200 rounded-full px-3 py-1">
            Performance Basis
          </span>
        </FadeItem>
        <FadeItem i={1} className="text-center mb-3">
          <h2 className="font-bold text-3xl sm:text-4xl text-[#0d1117]">
            Numbers that hold up under operator scrutiny.
          </h2>
        </FadeItem>
        <FadeItem i={2} className="text-center mb-12">
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            RCM.ai is built on workflows already proven in production environments, with performance backed by existing operational results.
          </p>
        </FadeItem>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <FadeItem key={i} i={i + 3}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-full transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">
                    {card.icon}
                  </div>
                  <span className="font-semibold text-[#0d1117] text-sm">{card.title}</span>
                </div>
                <div className="space-y-3">
                  {card.metrics.map((m, j) => (
                    <div key={j} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500 text-xs">{m.label}</span>
                      <span className="font-bold text-[#0d1117] text-sm">{m.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </FadeItem>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// ── Quote Banner ──────────────────────────────────────────────────────────────
function QuoteBanner() {
  return (
    <Section className="bg-[#0d1117] py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-8 right-8 text-blue-600/20 font-bold text-[200px] leading-none select-none pointer-events-none">
        "
      </div>
      <motion.div className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FadeItem className="text-center mb-8">
          <h2 className="  font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            The industry is shifting from reactive to predictive.
          </h2>
          <h2 className="  font-bold text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mt-2">
            RCM.ai is built for what comes next.
          </h2>
        </FadeItem>

        <FadeItem i={1} className="text-center mb-12 bg-[#131a24] border border-[#1e2d40] rounded-2xl p-6 max-w-3xl mx-auto">
          <blockquote className="text-white text-sm max-w-2xl mx-auto leading-relaxed">
            "Clearinghouses become rails. Intelligence becomes the product. The value is no longer in the transmission of data, but in the autonomous accuracy of its creation."
          </blockquote>
          <p className="text-slate-600 text-xs tracking-widest mt-3 font-medium">— RCM.AI PERSPECTIVE</p>
        </FadeItem>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "The Paper Arms Race",
              body: "Payers are already using AI to find reasons to deny. If your billing operation is still using manual humans to fight algorithms, you have already lost.We provide the counter- algorithm."
            ,
            },
          {
            title: "Autonomous Operations",
          body: "True margin growth doesn't come from hiring cheaper offshore labor. It comes from removing the labor requirement entirely through high-fidelity AI charge entry and predictive eligibility.",
            },
          ].map((col, i) => (
          <FadeItem key={i} i={i + 2}>
            <div>
              <h3 className="font-semibold text-[#3B82F6] mb-3">{col.title}</h3>
              <p className="text-white text-sm leading-relaxed">{col.body}</p>
            </div>
          </FadeItem>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// ── AI Engine ─────────────────────────────────────────────────────────────────
function AIEngine() {
  return (
    <Section className="bg-white py-20 px-4 sm:px-6">
      <motion.div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <FadeItem i={1}>
            <h2 className="font-bold text-3xl sm:text-4xl text-[#477196] leading-tight mb-4">
              A productized AI engine for the modern RCM shop.
            </h2>
          </FadeItem>
          <FadeItem i={2}>
            <p className="text-[#44474D] text-sm leading-relaxed mb-8">
              RCM.ai isn't just another dashboard. It is a sovereign software application
              that lives within your workflow. Built on the enterprise-grade <span className="text-black">Grelin Platform</span>,
              it integrates with your existing EHRs to automate the most labor-intensive parts of the revenue cycle.
            </p>
          </FadeItem>

          {[
            {
              icon: "⚡",
              title: "Grelin Core",
              body: "Secure, scalable AI infrastructure built for healthcare scale..",
            },
            {
              icon: "🧠",
              title: "Neural Logic",
              body: "Proprietary models trained on millions of clean claim patterns.",
            },
          ].map((f, i) => (
            <FadeItem key={i} i={i + 3}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-2 mb-5 p-4 transition-colors"
              >
                <div className="text-2xl mt-0.5">{f.icon}</div>
                <div>
                  <h4 className="  font-semibold text-[#191C1E] text-sm mb-1">{f.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.body}</p>
                </div>
              </motion.div>
            </FadeItem>
          ))}
        </div>

        {/* Right mockup */}
        <Image
          src={rcmEngineImg}
          alt="Platform Interface"
          className="relative rounded-2xl border border-white/10 shadow-2xl object-fill h-[400px] w-full object-right-top"
          priority
        />
      </motion.div>
    </Section>
  );
}

// ── Workflow ──────────────────────────────────────────────────────────────────
function Workflow() {
  const steps = [
    { num: "1", icon: "📊", title: "Data Intake", desc: "EHR data into a secure system of intelligence" },
    { num: "2", icon: "👁️", title: "Patient Claims", desc: "Auto-verification of demographic info" },
    { num: "3", icon: "📋", title: "Visit Creation", desc: "Dynamic mapping of clinical codes" },
    { num: "4", icon: "🤖", title: "AI Charge Entry", desc: "New and accurate charge entry & codes" },
    { num: "5", icon: "✅", title: "Claim Submission", desc: "Automated submission to payers" },
  ];

  return (
    <Section className="bg-[#EBF6FF] py-20 px-4 sm:px-6">
      <motion.div className="max-w-7xl mx-auto bg-[#0F192A] border border-[#1e2d40] rounded-3xl p-15"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FadeItem className="text-center mb-4">
          <h2 className="  font-bold text-3xl sm:text-4xl text-[#C0E1FF]">
            The Autonomous{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Workflow
            </span>
          </h2>
        </FadeItem>
        <FadeItem i={1} className="text-center mb-14">
          <p className="text-white text-sm">Five stages from encounter to claim, powered by AI.</p>
        </FadeItem>

        {/* Steps */}
        <div className="relative">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-2">
            {steps.map((s, i) => (
              <FadeItem key={i} i={i + 2}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 0 30px rgba(37,99,235,0.2)" }}
                  className="rounded-2xl p-4 text-center transition-all duration-300 cursor-default"
                >
                  <div className="w-12 h-12 bg-[#D8E2FF] border border-blue-600/30 rounded-full flex items-center justify-center text-md mx-auto mb-3">
                    {s.icon}
                  </div>
                  <h4 className="  font-semibold text-[#C0E1FF] text-sm mb-1">{s.num}. {s.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              </FadeItem>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// ── Case Study ────────────────────────────────────────────────────────────────
function CaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <Section className="bg-[#062B6A] rounded-b-3xl py-20 px-4 sm:px-6 relative">
      <SPattern />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          variants={fadeUp}
          className="bg-[#131a24] border border-[#1e2d40] rounded-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-[300px_1fr]">
            {/* Left sidebar */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 flex flex-col justify-between">
              <div>
                <span className="text-blue-200 text-xs tracking-widest font-medium">CASE STUDY</span>
                <p className="  font-light text-white text-sm mt-2">An RCM company processing 2,400
                  daily encounters implemented RCM.ai
                  across their specialty accounts.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  { val: "88%", label: "Human Free" },
                  { val: "12hrs", label: "Reduced TAT" }
                ].map((s) => (
                  <div key={s.label} className="bg-blue-600/30 rounded-xl p-3">
                    <div className="  font-bold text-white text-2xl">{s.val}</div>
                    <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="bg-white p-8 grid sm:grid-cols-2 gap-8">
              <div>
                <div className="text-black text-xs font-medium tracking-widest mb-4 pb-3">
                  Before RCM.ai
                </div>
                {[
                  "12 FTEs required for charge entry",
                  "8.5% initial denial rate",
                  "42 day average AR cycle",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 mb-3 bg-[#F3F3F3] rounded-md px-3 py-2">
                    <span className="text-[#808285] mt-0.5 text-sm">✕</span>
                    <span className="text-[#808285] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[#0059BB] text-xs font-medium tracking-widest mb-4 pb-3">
                  After RCM.ai
                </div>
                {[
                  { label: "2 FTEs for QA/Exceptions", highlight: "2 FTEs" },
                  { label: "2.1% initial denial rate", highlight: "3.1%" },
                  { label: "28 day average AR cycle", highlight: "26 day" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-start gap-2 mb-3 bg-[#C0E1FF] border border-green-400/20 rounded-xl px-3 py-2"
                  >
                    <span className="text-[#0F192A] mt-0.5 text-sm">✓</span>
                    <span className="text-[#0F192A] text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ── Purpose Built ─────────────────────────────────────────────────────────────
function PurposeBuilt() {
  const cards = [
    {
      title: "Multi-Specialty RCM",
      desc: "Handle varied coding requirements across 40+ specialties with AI engine.",
      img: rcmOperationImg1,
    },
    {
      title: "MSO-Owned",
      desc: "Standardize financial outcomes across disparate acquired practices instantly.",
      img: rcmOperationImg2,
    },
    {
      title: "Specialty-Focused",
      desc: "Deep-model training for complex fields like Pathology or Cardiology.",
      img: rcmOperationImg3,
    },
    {
      title: "Offshore Ops",
      desc: "Supercharge offshore teams with AI-driven quality assurance and productivity.",
      img: rcmOperationImg4,
    },
  ];

  return (
    <Section className="bg-gradient-to-r from-[#7EAEFF] to-[#D4E4FF] py-20 px-4 sm:px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FadeItem className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111827]">
            Purpose-built for your operational model.
          </h2>
        </FadeItem>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <FadeItem key={i} i={i + 1}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-[28px] p-5 h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/4.4] overflow-hidden rounded-[18px] mb-5">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[30px] leading-tight font-semibold text-[#1F2937] mb-3">
                    {card.title}
                  </h3>

                  <p className="text-[18px] leading-relaxed text-[#6B7280]">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            </FadeItem>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// ── Built To Fit ──────────────────────────────────────────────────────────────
function BuiltToFit() {
  const platforms = ["Athena Health", "Epic", "Cerner", "Meditech", "NextGen", "eClinicalWorks"];
  const integrations = [
    { icon: "⚡", label: "Bi-directional APIs" },
    { icon: "🔗", label: "SFTP & HL7 Data Flows" },
    { icon: "📁", label: "RPA Emulation" },
    { icon: "🔄", label: "Real-time DB Mirroring" },
  ];

  return (
    <Section className="bg-[#0F192A] py-20 px-4 sm:px-6 border-t border-slate-100">
      <motion.div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <FadeItem>
            <h2 className="font-bold text-3xl max-w-sm sm:text-4xl text-white mb-8 leading-tight">
              Built to fit inside an RCM operation.
            </h2>
          </FadeItem>

          <FadeItem i={1}>
            <p className="text-xs text-[#73B6FF] tracking-widest font-semibold mb-3 uppercase">Supported Platforms</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {platforms.map((p) => (
                <motion.span
                  key={p}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-600 text-white text-xs px-3 py-1.5 rounded-md cursor-default transition-colors"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </FadeItem>

          <FadeItem i={2}>
            <p className="text-xs text-[#73B6FF] tracking-widest font-semibold mb-3 uppercase">Integration Methods</p>
            <div className="grid grid-cols-2 gap-3">
              {integrations.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-white text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </FadeItem>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.2
          }}
          className="relative">

          <div className="absolute -inset-1 rounded-2xl"></div>
          <div className="bg-gray-200 rounded-3xl border-20 border-white shadow-xl relative overflow-hidden">

            <Image
              src={rcmOperationImg}
              alt="Platform Interface"
              className="relative rounded-lg border border-white/10 shadow-2xl object-contain h-[358px] w-full object-right-top"
              priority
            />
          </div>

        </motion.div>
      </motion.div>
    </Section>
  );
}

// ── Compliance ────────────────────────────────────────────────────────────────
function Compliance() {
  const cards = [
    {
      title: "HIPAA Compliant",
      desc: "End-to-end BAA execution with enterprise-grade security, strict data sovereignty policies, and compliance-focused access controls.",
      img: rcmBentoImg1,
    },
    {
      title: "SOC2 Type II",
      desc: "Audited operational security and organizational trust.",
      img: rcmBentoImg2,
    },
    {
      title: "RBAC Control",
      desc: "Granular user permissions mapped to your org chart.",
      img: rcmBentoImg3,
    },
    {
      title: "Audit Logging",
      desc: "Immutable audit logs tracking every AI-generated decision and all human edits with complete transparency and traceability.",
      img: rcmBentoImg4,
    },
  ];

  type CardProps = {
  title: string;
  desc: string;
  img: string | StaticImageData;
  className?: string;
  titleSize: string;
};

  const Card = ({
    title,
    desc,
    img,
    className = "",
    titleSize = "text-3xl",
  }: CardProps) => (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 0 30px rgba(59,130,246,0.2)",
      }}
      className={`relative overflow-hidden rounded-[32px] bg-[#08111F] h-full ${className}`}
    >
      <div className="relative h-full min-h-[280px]">
        <Image
          src={img}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <h3
            className={`${titleSize} font-medium text-[#C0E1FF] mb-3 tracking-tight`}
          >
            {title}
          </h3>

          <p className="text-[#C0E1FF] leading-relaxed max-w-2xl">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Section className="bg-white py-20 px-4 sm:px-6">
      <motion.div
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[32px] border border-[#1e2d40] bg-[#024DA7] p-8 lg:p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SPattern />

        <FadeItem className="mb-10 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Security & Compliance
          </h2>

          <p className="mt-2 text-slate-300 text-sm">
            Enterprise-grade security for every operation.
          </p>
        </FadeItem>

        {/* Bento Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {/* HIPAA */}
          <div className="lg:col-span-2">
            <Card
              {...cards[0]}
              titleSize="text-4xl"
            />
          </div>

          {/* SOC2 */}
          <div className="lg:col-span-1">
            <Card
              {...cards[1]}
              titleSize="text-3xl"
            />
          </div>

          {/* RBAC */}
          <div className="lg:col-span-1">
            <Card
              {...cards[2]}
              titleSize="text-3xl"
            />
          </div>

          {/* Audit */}
          <div className="lg:col-span-2">
            <Card
              {...cards[3]}
              titleSize="text-3xl"
            />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// ── Bottom CTA ────────────────────────────────────────────────────────────────
function BottomCTA() {

  return (
    <Section className="relative bg-slate-50 py-20 px-4 sm:px-6 overflow-hidden min-h-[400px]">
      {/* Background image */}
      <img
        src={finalSecImg.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient wash for text legibility on left side */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.95 0.02 220 / 0.88) 0%, oklch(0.93 0.04 226 / 0.72) 45%, oklch(0.90 0.06 230 / 0.25) 100%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FadeItem>
          <h2 className="  font-bold text-3xl sm:text-4xl max-w-3xl text-[#0d1117] leading-tight mb-4">
            Lower cost per claim is the only RCM metric that compounds.
          </h2>
        </FadeItem>
        <FadeItem i={1}>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mb-8">
            Every dollar saved through automation multiplies across your entire book of clients. RCM.ai is the engine that makes compounding possible at scale.
          </p>
        </FadeItem>
        <FadeItem i={2}>
          {/* Trust badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.36}
            className="mt-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-background/90 px-4 py-2.5 shadow-md backdrop-blur-sm border border-border/40">
              <AvatarGroup>
                {AVATARS.map((av) => (
                  <Avatar key={av.initials} size="sm">
                    <AvatarFallback className={av.className}>
                      {av.initials.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                Trusted by 200+ Healthcare Operators
              </span>
            </div>
          </motion.div>

        </FadeItem>
      </motion.div>
    </Section>
  );
}

// ── Eligibility AI Section ────────────────────────────────────────────────────
function EligibilitySection() {
  return (
    <Section className="bg-white py-20 px-4 sm:px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Label */}
        <FadeItem className="mb-10">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center rounded-[8px] px-3 py-1 text-[10px] font-bold tracking-[1.2px] uppercase"
              style={{
                background: "rgba(8,145,178,0.1)",
                border: "1px solid rgba(8,145,178,0.28)",
                color: "#0891b2",
              }}
            >
              Continuous Verification
            </span>
            <span className="text-[12px] text-slate-400 font-medium">Upstream Module</span>
          </div>
        </FadeItem>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left — mockup */}
          <FadeItem i={1} className="w-full lg:w-[55%]">
            <div
              className="w-full rounded-3xl pt-4 px-4 overflow-hidden"
              style={{ background: "#0891b2", height: "400px" }}
            >
              <div className="w-full rounded-t-xl overflow-hidden flex flex-col h-full">
                <div
                  className="flex items-center gap-1.5 px-3 py-2 shrink-0"
                  style={{ background: "#f0f0f0" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                  <div
                    className="flex-1 max-w-xs ml-3 rounded px-3 py-0.5 text-[10px] text-gray-400"
                    style={{ background: "#e2e2e2" }}
                  >
                    app.grelin.ai/eligibility
                  </div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col bg-white">
                  {/* subheader */}
                  <div
                    className="flex items-center justify-between px-4 py-2.5 shrink-0"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <span className="text-[10px] font-bold tracking-[1.2px] text-[#64748b] uppercase">
                      Coverage Verification
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "#dcfce7", color: "#16a34a" }}
                    >
                      Live
                    </span>
                  </div>
                  {/* patient card */}
                  <div
                    className="mx-4 mt-2.5 rounded-xl px-3 py-2.5 flex items-center justify-between shrink-0"
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                  >
                    <div>
                      <p className="text-[12px] font-semibold text-[#0f172a]">Jane Miller</p>
                      <p className="text-[10px] text-[#64748b] mt-0.5">BCBS Illinois · Plan ID 99420</p>
                    </div>
                    <span className="text-[10px] text-[#94a3b8]">DOB 04/12/1982</span>
                  </div>
                  {/* stat grid */}
                  <div className="grid grid-cols-3 gap-2 mx-4 mt-2.5 shrink-0">
                    {[
                      { label: "Coverage", value: "Active", bg: "#f0fdf4", border: "#bbf7d0", valueColor: "#16a34a" },
                      { label: "Deductible", value: "$1,200", bg: "#f8fafc", border: "#e2e8f0", valueColor: "#0f172a" },
                      { label: "Co-pay", value: "$45", bg: "#f8fafc", border: "#e2e8f0", valueColor: "#0f172a" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg px-3 py-2 flex flex-col gap-0.5"
                        style={{ background: s.bg, border: `1px solid ${s.border}` }}
                      >
                        <span className="text-[9px] font-bold tracking-wide text-[#64748b] uppercase">{s.label}</span>
                        <span className="text-[13px] font-bold" style={{ color: s.valueColor }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                  {/* benefit rows */}
                  <div
                    className="mx-4 mt-2.5 flex-1 min-h-0"
                    style={{ borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}
                  >
                    <p className="text-[9px] font-bold tracking-[1px] text-[#94a3b8] uppercase mb-1.5">
                      Benefit Details
                    </p>
                    <div className="flex flex-col divide-y divide-[#f8fafc]">
                      {[
                        { label: "In-Network Specialist", value: "80%", color: "#0891b2" },
                        { label: "Outpatient Surgery", value: "70%", color: "#0891b2" },
                        { label: "Emergency Care", value: "90%", color: "#16a34a" },
                        { label: "Mental Health", value: "80%", color: "#0891b2" },
                        { label: "Preventive Services", value: "100%", color: "#16a34a" },
                      ].map((r) => (
                        <div key={r.label} className="flex items-center justify-between py-1.5">
                          <span className="text-[11px] text-[#475569]">{r.label}</span>
                          <span className="text-[11px] font-semibold" style={{ color: r.color }}>
                            Covered {r.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* footer */}
                  <div
                    className="flex items-center gap-1.5 px-4 py-2.5 mt-2 shrink-0"
                    style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span className="text-[10px] text-[#94a3b8]">Verified 2 min ago · Re-scan scheduled in 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeItem>

          {/* Right — content */}
          <div className="flex flex-col gap-5 w-full lg:w-[45%]">
            <FadeItem i={2}>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-[#0d1117]">
                <span style={{ color: "#0891b2" }}>Eligibility.ai</span>
                {" — "}Real-time Coverage Verification
              </h2>
            </FadeItem>
            <FadeItem i={3}>
              <p className="text-sm leading-relaxed text-slate-500">
                Eligibility.ai continuously verifies patient coverage, benefit requirements, and payer
                eligibility rules before claims are created — preventing avoidable denials at the source.
              </p>
            </FadeItem>
            <FadeItem i={4}>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Prevent avoidable eligibility denials",
                  "Support front-office and billing teams",
                  "Automate benefit requirement checks",
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                      style={{ background: "#0891b2" }}
                    />
                    <span className="text-sm leading-relaxed text-slate-600">{bullet}</span>
                  </li>
                ))}
              </ul>
            </FadeItem>
            <FadeItem i={5} className="pt-1">
              <a
                href="/eligibility"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ background: "#0891b2" }}
              >
                Explore Eligibility.ai
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </FadeItem>
          </div>
        </div>

        {/* Feature row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: "Real-time Eligibility",
              desc: "Live payer queries before every visit — coverage status, deductibles, and benefit limits verified instantly.",
              stat: "Live Checks",
              accent: "#0891b2",
            },
            {
              label: "Denial Prevention",
              desc: "Flags eligibility mismatches before claim submission so revenue teams can act upstream.",
              stat: "99% Accuracy",
              accent: "#3b82f6",
            },
            {
              label: "Front-Office Integration",
              desc: "Connects directly to scheduling and registration workflows to catch coverage gaps at intake.",
              stat: "Zero Lag",
              accent: "#16a34a",
            },
          ].map((f, i) => (
            <FadeItem key={f.label} i={i + 6}>
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.07)" }}
                className="rounded-2xl px-6 py-5 flex flex-col gap-3 h-full"
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0d1117]">{f.label}</span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: `${f.accent}14`,
                      color: f.accent,
                      border: `1px solid ${f.accent}28`,
                    }}
                  >
                    {f.stat}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">{f.desc}</p>
              </motion.div>
            </FadeItem>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// ── PriorAuth AI Section ──────────────────────────────────────────────────────
function PriorAuthSection() {
  return (
    <Section className="bg-[#0F192A] py-20 px-4 sm:px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Label */}
        <FadeItem className="mb-10">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center rounded-[8px] px-3 py-1 text-[10px] font-bold tracking-[1.2px] uppercase"
              style={{
                background: "rgba(167,139,250,0.12)",
                border: "1px solid rgba(167,139,250,0.3)",
                color: "#a78bfa",
              }}
            >
              Upstream Validation
            </span>
            <span className="text-[12px] text-slate-500 font-medium">Upstream Module</span>
          </div>
        </FadeItem>

        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
          {/* Right (visually left on desktop) — mockup */}
          <FadeItem i={1} className="w-full lg:w-[55%]">
            <div
              className="w-full rounded-3xl pt-4 px-4 overflow-hidden"
              style={{ background: "#a78bfa", height: "400px" }}
            >
              <div className="w-full rounded-t-xl overflow-hidden flex flex-col h-full">
                <div
                  className="flex items-center gap-1.5 px-3 py-2 shrink-0"
                  style={{ background: "#f0f0f0" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                  <div
                    className="flex-1 max-w-xs ml-3 rounded px-3 py-0.5 text-[10px] text-gray-400"
                    style={{ background: "#e2e2e2" }}
                  >
                    app.grelin.ai/priorauth
                  </div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col bg-white">
                  {/* subheader */}
                  <div
                    className="flex items-center justify-between px-4 py-2.5 shrink-0"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <span className="text-[10px] font-bold tracking-[1.2px] text-[#64748b] uppercase">
                      Prior Authorization
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "#ede9fe", color: "#7c3aed" }}
                    >
                      Active
                    </span>
                  </div>
                  {/* request card */}
                  <div
                    className="mx-4 mt-2.5 rounded-xl px-3 py-2.5 shrink-0"
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold text-[#0f172a]">Request #3841</span>
                      <span className="text-[10px] text-[#94a3b8]">UHC · Plan 29104</span>
                    </div>
                    <span className="text-[10px] text-[#64748b]">CPT 27447 · Total Knee Arthroplasty</span>
                  </div>
                  {/* progress bars */}
                  <div className="mx-4 mt-2.5 flex flex-col gap-2 shrink-0">
                    {[
                      { label: "Clinical Criteria", pct: "80%", w: "80%" },
                      { label: "Documentation", pct: "100%", w: "100%" },
                      { label: "Medical Necessity", pct: "90%", w: "90%" },
                    ].map((b) => (
                      <div key={b.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] text-[#64748b]">{b.label}</span>
                          <span className="text-[10px] font-semibold text-[#0f172a]">{b.pct}</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: "#e2e8f0" }}>
                          <div className="h-full rounded-full" style={{ width: b.w, background: "#A78BFA" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* checklist */}
                  <div
                    className="mx-4 mt-2.5 flex-1 min-h-0"
                    style={{ borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}
                  >
                    <p className="text-[9px] font-bold tracking-[1px] text-[#94a3b8] uppercase mb-1.5">
                      Clinical Checklist
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { text: "Conservative treatment >6 months", done: true },
                        { text: "Radiographic evidence attached", done: true },
                        { text: "BMI within payer threshold", done: true },
                        { text: "Additional clinical notes", done: false },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-2">
                          <div
                            className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center"
                            style={{
                              background: item.done ? "#dcfce7" : "#f1f5f9",
                              border: `1px solid ${item.done ? "#86efac" : "#cbd5e1"}`,
                            }}
                          >
                            {item.done && (
                              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                                <path d="M1.5 4.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span
                            className="text-[11px]"
                            style={{ color: item.done ? "#334155" : "#94a3b8" }}
                          >
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* approval */}
                  <div
                    className="mx-4 mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 shrink-0"
                    style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#dcfce7" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                        <path d="M2.5 6.5l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#0f172a]">Approved</p>
                      <p className="text-[10px]" style={{ color: "#16a34a" }}>Decision received in 4.2h</p>
                    </div>
                  </div>
                  {/* footer */}
                  <div
                    className="flex items-center gap-1.5 px-4 py-2.5 mt-2 shrink-0"
                    style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                    <span className="text-[10px] text-[#94a3b8]">Auto-resubmit scheduled · T+24h if no response</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeItem>

          {/* Left (visually right on desktop) — content */}
          <div className="flex flex-col gap-5 w-full lg:w-[45%]">
            <FadeItem i={2}>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-white">
                <span style={{ color: "#a78bfa" }}>PriorAuth.ai</span>
                {" — "}Intelligent Prior Authorization Validation
              </h2>
            </FadeItem>
            <FadeItem i={3}>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.9)" }}>
                PriorAuth.ai helps organizations ensure required authorizations are obtained and
                documented before services are billed — moving the work upstream, where it belongs.
              </p>
            </FadeItem>
            <FadeItem i={4}>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Validate authorization requirements upstream",
                  "Avoid common claim delays from missing auth",
                  "Ensure documentation compliance before billing",
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                      style={{ background: "#a78bfa" }}
                    />
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeItem>
            <FadeItem i={5} className="pt-1">
              <a
                href="/priorauth"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: "#ffffff", color: "#0F192A" }}
              >
                Explore PriorAuth.ai
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </FadeItem>
          </div>
        </div>

        {/* Feature row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: "Upstream Authorization",
              desc: "Moves prior auth verification before claim creation so billing teams are never caught off-guard.",
              stat: "Pre-Bill",
              accent: "#a78bfa",
            },
            {
              label: "Clinical Criteria Mapping",
              desc: "Automatically matches clinical documentation against payer-specific medical necessity criteria.",
              stat: "4.2h Avg",
              accent: "#7cadff",
            },
            {
              label: "Auto-Resubmission",
              desc: "Tracks pending authorizations and triggers automatic follow-up to prevent time-sensitive lapses.",
              stat: "Zero Drop",
              accent: "#34d399",
            },
          ].map((f, i) => (
            <FadeItem key={f.label} i={i + 6}>
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
                className="rounded-2xl px-6 py-5 flex flex-col gap-3 h-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{f.label}</span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: `${f.accent}18`,
                      color: f.accent,
                      border: `1px solid ${f.accent}30`,
                    }}
                  >
                    {f.stat}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                  {f.desc}
                </p>
              </motion.div>
            </FadeItem>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  const router = useRouter();
  return (
    <Section className="bg-[#0F192A] py-28 px-4 sm:px-6 border-t border-slate-100">
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FadeItem>
          <h2 className="font-bold text-4xl sm:text-5xl text-white mb-4">
            Ready to automate?
          </h2>
        </FadeItem>
        <FadeItem i={1}>
          <p className="text-[#FEFCFF] text-sm leading-relaxed mb-8">
            Join leading RCM operations that are replacing manual oversight with AI-powered intelligence. The future of revenue cycle runs itself.
          </p>
        </FadeItem>
        <FadeItem i={2}>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 24px rgba(37,99,235,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
          onClick={() => router.push("/company#contact")}

            >
              See RCM.ai in your profession
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-[#0F192A] hover:border-slate-400 text-sm px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
          onClick={() => router.push("/company#contact")}

            >
              Schedule Discovery Call
            </motion.button>
          </div>
        </FadeItem>
      </motion.div>
    </Section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function RCMPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .  { font-family: 'Syne', sans-serif; }
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1e2d40; border-radius: 3px; }
      `}</style>
      <div className="min-h-screen">
        <Hero />
        <Numbers />
        <QuoteBanner />
        <AIEngine />
        <Workflow />
        <CaseStudy />
        <PurposeBuilt />
        <BuiltToFit />
        <Compliance />
        <BottomCTA />
        <EligibilitySection />
        <PriorAuthSection />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
