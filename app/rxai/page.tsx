"use client";
import { useEffect, useRef } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import SPattern from '@/components/ui/s-pattern';
import { animate, motion, useMotionValue } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Play,
  Activity,
  FileText,
  Pill,
  User,
  Building,
  Truck,
  Store,
  AlertCircle,
  FileSearch,
  Stethoscope,
  ClipboardList,
  AlertTriangle,
  Send,
  CheckCircle2,
  BadgeCheck
} from 'lucide-react'
import heroSecImg from '@/public/rxai_herosec.png'
import pillar1Img from '@/public/pillar1_rxai.png'
import pillar2Img from '@/public/pillar2_rxai.png';
import pillar3Img from '@/public/pillar3_rxai.png';
import pillar4Img from '@/public/pillar4_rxai.png';
import pillar5Img from '@/public/pillar5_rxai.png';
import pillar6Img from '@/public/pillar6_rxai.png';
import pillar7Img from '@/public/pillar7_rxai.png';
import rxEngineImg from '@/public/rxEngineImg.png';

// --- Animation Variants ---
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
} as const;
const staggerContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
// --- Components ---

const Hero = () => (
<section>
  <div className="mx-auto">

    {/* Outer blue section */}
    <div
      className="
        relative overflow-hidden
        rounded-[0px_0px_42px_42px]
        bg-[linear-gradient(90deg,#0057FF_0%,#082B7A_100%)]
        px-4
        py-8
        sm:px-8
        sm:py-10
        lg:px-10
        lg:py-40
        shadow-[0_20px_80px_rgba(0,0,0,0.18)]
      "
    >

      {/* Vertical stripe pattern */}
    <SPattern />

      {/* Main glass card */}
      <div
        className="
          relative z-10
          overflow-hidden
          rounded-[34px]
          border border-white/10
          bg-white/[0.06]
          backdrop-blur-5xl
          px-6
          py-8
          sm:px-8
          sm:py-10
          lg:px-10
          lg:py-10
        "
      >

        {/* Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />

        <div 
        className="
        relative 
        z-10 
        grid
        gap-6 xl:gap-10
        lg:grid-cols-[1.08fr_0.92fr]"
        >

          {/* LEFT CONTENT */}
          <div className='w-full'>

            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-white/15
                bg-white/70
                px-3 py-1.5
                backdrop-blur
              "
            >
              <BadgeCheck className="h-4.5 w-4.5 text-[#0039B5]" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#0039B5]
                "
              >
                Claim integrity for pharmacy
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-8
                text-[38px]
                font-[750]
                leading-[1.05]
                tracking-[-0.04em]
                text-[#B9D9FF]
                sm:text-[54px]
                lg:text-[62px]
              "
            >
              Pharmacy revenue starts
              <br />

              <span className="text-white">
                before the claim.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-7
                max-w-[540px]
                text-[15px]
                leading-[1.8]
                text-[#D6E7FF]
                sm:text-[17px]
              "
            >
              RxAI validates every prescription against payer rules,
              formularies, prior authorization requirements, step therapy logic,
              and FDA indication data. The system runs in under five seconds
              and exits every prescription with one clear decision and one
              clear owner.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">

              <button
                className="
                  inline-flex items-center gap-2
                  rounded-xl
                  bg-[#000B23]
                  px-6 py-3.5
                  text-sm font-semibold
                  text-white
                  transition-all duration-300
                  hover:translate-x-[2px]
                  cursor-pointer
                "
                onClick={() => {
                    window.location.href = 'https://rx-ai-ui-v2.fly.dev/rx/pre-claim'
                  }}
                
              >
                See RxAI in action
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                    window.location.href = '/company?service=rxai-%E2%80%94-pharmacy-revenue-integrity'
                  }}
                className="
                  rounded-xl
                  bg-white
                  px-6 py-3.5
                  text-sm font-semibold
                  text-[#09162E]
                  transition-all duration-300
                  hover:bg-[#F3F4F6]
                  cursor-pointer
                "
              >
                Talk to the team
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:self-center">

            <div
              className="
                relative
                w-full
                max-w-[500px]
                overflow-hidden
                rounded-[24px]
                bg-white
                p-5
                shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                before:absolute
                before:inset-0
                before:rounded-[30px]
                before:ring-1
                before:ring-black/5
                before:content-['']
              "
            >

              <img
                src={heroSecImg.src}
                alt="Hero Section RxAi image"
                className="
                  block
                  w-full
                  rounded-[18px]
                  object-cover
                "
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>
)
const StructuralReality = () => (
  <section className="py-24 bg-white px-6">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-100px',
      }}
      variants={staggerContainer}
      className="max-w-4xl mx-auto text-center"
    >
      <motion.span
        variants={fadeUp}
        className="text-[#1E40FF] text-xs font-bold uppercase tracking-widest mb-4 block"
      >
        The Structural Reality
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0F1E] leading-tight tracking-tight mb-16"
      >
        Most pharmacy denials are created long before billing ever sees the
        claim.
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        {[
          {
            num: '01',
            title: 'Patient Access Origin',
            desc: 'The root cause of most denials lies in the initial patient access and intake process, long before a claim is generated.',
            numColorCode: '#0A1B33'
          },
          {
            num: '02',
            title: 'Revenue at Extreme Risk',
            desc: 'By the time a claim is rejected, the pharmacy has already incurred the cost of the medication and the labor to dispense it.',
            numColorCode: '#16376D'
          },
          {
            num: '03',
            title: 'Not a Billing Failure',
            desc: "The denial is rarely a formatting failure. It's a clinical or administrative mismatch between the prescription and the payer's rules.",
            numColorCode: '#2563EB'
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-2xl"
          >
            <div className="text-white text-xs font-bold w-8 h-8 rounded flex items-center justify-center mb-6"
            style={{backgroundColor: item.numColorCode}}
            >
                {item.num}
            </div>
            <h3 className="font-bold text-[#0A0F1E] mb-3">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
)
const DecisioningLayer = () => (
  <section className='bg-[#071B3B] overflow-hidden'>
    <div className="w-full mx-auto bg-[#0A1330]  p-8 md:p-16 lg:p-20 text-white overflow-hidden relative">
            {/* Blue glow */}
      <div className="absolute left-[-10%] bottom-[-20%] h-[500px] w-[700px] rounded-full bg-[#2563EB]/20 blur-[140px]" />
      <div className="absolute right-[-10%] top-[-10%] h-[400px] w-[500px] rounded-full bg-[#1D4ED8]/10 blur-[120px]" />
      <div 
              className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.8fr] lg:gap-16"
      >
        {/* Left side content */}
              <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        variants={staggerContainer}
        className="max-w-[760px] px-12"
      >
        <div>
          <motion.span
            variants={fadeUp}
            className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 block"
          >
            Platform Blueprint
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            A decisioning layer that sits ahead of the claim.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-lg leading-relaxed mb-6"
          >
            RxAI evaluates every prescription against payer rules, formularies,
            prior authorization requirements, step therapy logic, and REMS
            indicator data.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-lg leading-relaxed"
          >
            The system runs in under five seconds and returns every prescription
            with one clear decision and next best action. No guessing, no manual
            lookups, no blind routing.
          </motion.p>
        </div>

                <div className='border-t border-white/8 mt-6 mb-0'></div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 relative z-10"
      >
        {[
          {
            stat: 'Under 5s',
            label: 'Average decision turnaround time',
          },
          {
            stat: '7',
            label: 'Pillars of claim integrity evaluated',
          },
          {
            stat: '7',
            label: 'Executable outcomes generated',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="border border-white/10 rounded-xl p-6 bg-white"
          >
            <div className="text-3xl font-bold text-[#355A7B] mb-2">
              {item.stat}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      </motion.div>

      {/* Right Side Content */}
        <motion.div
             variants={fadeUp}
             className="
             relative bg-[#1E293B] max-w-lg border border-white/10 rounded-2xl p-12 py-24 leading-loose shadow-[0_0_50px_rgba(255,255,255,0.08)]"
        >
                      {/* Glow border */}
            <div className="absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8">
            Integration Standard
          </h3>
          <div className="space-y-8">
            {[
              {
                title: '100% CLIENT-SIDE FREE',
                desc: 'Integration happens entirely in the cloud, requiring zero IT resources.',
              },
              {
                title: 'REAL-TIME PAYER MAPPINGS',
                desc: 'Synchronizes commercial group rules every night automatically.',
              },
              {
                title: 'CLINICIAN OWNERSHIP SESSIONS',
                desc: 'Routes admin work to clerks, instantly inside existing workflows.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 bg-blue-500/20 p-1 rounded-full h-fit">
                  <Check className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  </section>
)

const SevenPillars = () => {
  const pillars = [
    {
      title: 'Clinical Appropriateness',
      desc: 'Evaluates diagnosis codes against label and off-label necessity guidelines.',
      img: pillar1Img
    },
    {
      title: 'Formulary Coverage',
      desc: 'Checks specific plan tiering, exclusions, and preferred alternatives.',
      img: pillar2Img
    },
    {
      title: 'Benefit Channel',
      desc: 'Determines whether the drug falls under medical or pharmacy benefit.',
      img: pillar3Img

    },
    {
      title: 'Utilization Management',
      desc: 'Identifies step therapy, quantity limits, and age/gender restrictions.',
      img: pillar4Img

    },
    {
      title: 'Claim Readiness',
      desc: 'Ensures all required fields (NPI, DEA, DAW) are present and valid.',
      img: pillar5Img

    },
    {
      title: 'Drug Intelligence',
      desc: 'Checks for interactions, duplicate therapies, and REMS requirements.',
      img: pillar6Img

    },
    {
      title: 'Next Best Action',
      desc: 'Provides specific, actionable steps to resolve any identified issues.',
      img: pillar7Img

    },
  ]

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
    <section className="py-24 bg-[#DAEDFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.h2
          initial={{
            opacity: 0,
            x: -20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
          text-3xl 
          md:text-4xl 
          font-bold 
          text-[#0A0F1E] 
          inline-block 
          relative
          pb-2
          tracking-[-0.04em]"
        >
          Seven Pillars of Claim Integrity
          <div
            className="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-full
              bg-[linear-gradient(90deg,#0B1D38_0%,#274B7A_45%,#DDEEFF_100%)]
            "
          />
        </motion.h2>
      </div>

      <div 
      ref={containerRef} 
      className="
              mt-12
              overflow-hidden
              cursor-grab
              active:cursor-grabbing
              ml-40
      ">
        <motion.div 
        style={{ x }}
        className="flex gap-6 px-6 md:px-8 lg:px-12 min-w-max will-change-transform">
          {pillars.map((pillar, i) => (
            <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                  }}
                  viewport={{ once: true }}
              className="w-72 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-shrink-0"
            >
                <img
                  src={pillar.img.src}
                  alt=""
                  className='w-full aspect-square rounded-xl mb-6 object-cover'
                />
              <h3 className="font-bold text-[#0A0F1E] mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
const SevenOutcomes = () => {
  const outcomes = [
    {
      title: 'Submit',
      desc: 'Ready for clean claim submission.',
      icon: Send,
    },
    {
      title: 'Prior Auth',
      desc: 'Returns PA policy details with pre-filled documentation and clinical justification.',
      icon: FileText,
    },
    {
      title: 'Medical Benefit',
      desc: 'Routes to medical billing channel.',
      icon: Activity,
    },
    {
      title: 'Request Data',
      desc: 'Missing documentation flagged with specific gaps.',
      icon: FileSearch,
    },
    {
      title: 'Clinical Review',
      desc: 'Routed to pharmacist or prescriber for clinical decision.',
      icon: Stethoscope,
    },
    {
      title: 'Manual Review',
      desc: 'Held for human reviewer with full context.',
      icon: ClipboardList,
    },
    {
      title: 'Escalate',
      desc: 'Immediate route to compliance or leadership.',
      icon: AlertCircle,
    },
  ]
  return (
    <section className="py-24 bg-[#0A1330] px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Seven Executable Outcomes
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[#BFC3CD] text-2xl md:text-sm max-w-2xl mx-auto"
          >
            Every prescription routed to one of seven outcomes. No dead ends. No
            lost information. Every claim exits the engine with an answer and a
            single next best action.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {outcomes.slice(0, 4).map((outcome, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: i * 0.1,
              }}
              className="bg-white border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-colors"
            >
              <outcome.icon className="w-5 h-5 text-blue-400 mb-4" />
              <h3 className="font-bold text-[#406E97] mb-2">{outcome.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {outcome.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:w-3/4 mx-auto">
          {outcomes.slice(4).map((outcome, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: (i + 4) * 0.1,
              }}
              className="bg-white border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-colors"
            >
              <outcome.icon className="w-5 h-5 text-blue-400 mb-4" />
              <h3 className="font-bold text-[#406E97] mb-2">{outcome.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {outcome.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
const BlockedToPayable = () => (
  <section className="py-20 bg-white px-6">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{
          opacity: 0,
          x: -30,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        className="bg-[#F8FAFC] rounded-2xl shadow-lg relative"
      >

        <div className="mt-4 p-6 bg-[#0F192A] rounded-3xl">
          {/* Blocked Card */}
          <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex justify-between items-start mb-3">
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                Blocked
              </span>
              <span className="text-xs text-gray-400">10:42 AM</span>
            </div>
            <h4 className="font-bold text-[#0A0F1E] mb-1">
              Levothyroxine 50mg
            </h4>
            <p className="text-sm text-gray-500 mb-3">
              Dispense as written (DAW 1)
            </p>
            <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg border border-red-100">
              <strong>Formulary Lock:</strong> Brand not covered. Generic
              equivalent required by plan.
            </div>
          </div>

          <div className="flex justify-center relative z-10 -my-3">
            <div className="bg-white rounded-full p-1 shadow-md border border-gray-100">
              <div className="bg-[#0A0F1E] text-white rounded-full p-2">
                <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
              </div>
            </div>
          </div>

          {/* Payable Card */}
          <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <div className="flex justify-between items-start mb-3">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                Payable
              </span>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <h4 className="font-bold text-[#0A0F1E] mb-1">
              Levothyroxine 50mg
            </h4>
            <p className="text-sm text-gray-500 mb-3">
              Generic substitution applied
            </p>
            <div className="bg-green-50 text-green-800 text-sm p-3 rounded-lg border border-green-100">
              <strong>Resolution applied:</strong> DAW removed, generic
              substituted. Claim ready for submission.
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#0A0F1E] leading-tight tracking-tight mb-6"
        >
          From blocked to payable in one click.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-gray-600 text-lg font-normal leading-7 mb-4"
        >
          BRIVIACT, brand-name antiepileptic, written for a patient on Humana.
        </motion.p>

         <motion.p
          variants={fadeUp}
          className="text-gray-600 text-lg font-normal leading-7 mb-4"
         >
          
          RxAI flags it. Humana formulary excludes BRIVIACT in this plan year. Step therapy requires documented failure of two generic alternatives.
         </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-gray-600 text-lg font-normal leading-7 mb-4"
        >
          RxAI surfaces levetiracetam as the covered generic. The substitution is routed to the prescriber with the formulary citation and the clinical equivalence note already populated.
        </motion.p>

        <div className="space-y-6">
          <motion.div variants={fadeUp}>
            <p className="text-[#0A0F1E] font-medium text-lg leading-relaxed mb-4">
             The prescriber approves. The new claim is submitted, validated, and paid.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-[#0A0F1E] font-medium text-lg leading-relaxed mb-4">
              The rejection never happens. The patient never leaves empty-handed.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
)
const OperatorsBuiltFor = () => (
  <section className="py-24 flex items-center min-h-[90vh] justify-center p-6 relative w-full overflow-hidden
    bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FF_40%,#DCEBFF_72%,#B8D2FF_100%)]">
                <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
              backgroundImage:
              "repeating-linear-gradient(90deg,rgba(255,255,255,0.45) 0px,rgba(255,255,255,0.45) 0px,rgba(140,170,220,0.16) 10px,rgba(140,170,220,0.16) 24px,rgba(255,255,255,0.22) 22px,rgba(255,255,255,0.22) 34px)",
              backgroundSize: "20px 100%",
              backgroundBlendMode: "soft-light",
              }}
          />
    <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
            mx-auto
            w-full
            max-w-7xl
            aspect-video 
            sm:aspect-[16/9]
            md:aspect-[21/9] 
            bg-[#EFEFEF] 
            sm:rounded-[26px]
            sm:border-[14px]

            md:rounded-[20px]
            md:border-[18px]
            
            lg:rounded-[34px]
            lg:border-[24px]
 
            shadow-2xl 
            border-[24px] 
            border-solid 
            [border-image:linear-gradient(123.69deg,_#05233D_10%,_#3B82F6_90%)_1] 
            mb-16 
            overflow-hidden 
            relative"
          >
          

              <iframe className='absolute w-full h-full' src="https://www.youtube-nocookie.com/embed/iLKRoLYqq8o?si=AneWIUt0sZHrFzee" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

          </motion.div>
          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-3xl md:text-4xl font-bold text-[#0B1B3B] text-center mb-12"
          >
            Built for the operators who carry the rejection cost.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Physician groups and specialty practices',
                desc: 'Stop chasing prior auths and focus on patient care.',
                icon: Stethoscope,
              },
              {
                title: 'MSOs and health systems',
                desc: 'Standardize prescribing workflows across all locations.',
                icon: Building,
              },
              {
                title: 'Pharma distributors',
                desc: 'Ensure smooth delivery and payment for high-cost drugs.',
                icon: Truck,
              },
              {
                title: 'Specialty pharmacies',
                desc: 'Eliminate intake bottlenecks and dispense faster.',
                icon: Store,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.1,
                }}
                className="bg-white/60 backdrop-blur-sm border border-white rounded-2xl p-6"
              >
                <item.icon className="w-6 h-6 text-[#0B1B3B] mb-4 leading-7" />
                <h3 className="font-bold text-[#0B1B3B] mb-2 leading-7">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-6">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  </section>
)
const Architecture = () => (
  <section className="py-24 bg-[#0A1330] px-6 text-white overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
        >
          Sits between your prescribing layer and your claims infrastructure.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-lg leading-relaxed mb-8"
        >
          RxAI ingests prescriptions from EHRs, pharmacy systems, or paper
          portals, applies the decisioning logic, formats the claim, and hands
          it off to the billing system. It's the workflow you already run.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-lg leading-relaxed mb-8"
        >
          No rip and replace. No new screens to learn. The decision shows up
          where the work already happens.
        </motion.p>

        <motion.p className='text-[#C9A24A]'>
            Integrations
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
          {[
            'Submission',
            'EHR',
            'Pharmacy systems',
            'EHR systems',
            'RxAI Engine',
          ].map((tag, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-gray-300 bg-white/5"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
      >
        {/* Abstract SVG Diagram */}
        <div className="">
            <img src={rxEngineImg.src} alt="" className='object-cover relative w-full aspect-[4/3] flex flex-col justify-between border border-white/10 rounded-[1.5rem]'/>
        </div>
      </motion.div>
    </div>
  </section>
)
const Implementation = () => (
  <section className="py-24 bg-white px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        variants={staggerContainer}
        className="mb-16"
      >
        <motion.span
          variants={fadeUp}
          className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 block"
        >
          Live Environment Phases
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold text-[#0A0F1E]"
        >
          Implementation
        </motion.h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-4 left-0 w-full h-px bg-gray-100"></div>

        {[
          {
            phase: 'Phase 1',
            title: 'Data integration and payer rule library tuning.',
            link: 'See the timeline →',
          },
          {
            phase: 'Phase 2',
            title: 'Shadow mode testing against live prescription volume.',
            link: 'Read the case study →',
          },
          {
            phase: 'Phase 3',
            title:
              'Production go-live with full routing into existing workflows.',
            link: 'Talk to deployment →',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: i * 0.1,
            }}
            className="relative pt-8"
          >
            <div className="absolute top-0 left-0 w-8 h-8 bg-white border-4 border-gray-100 rounded-full -mt-4 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#1E40FF] rounded-full"></div>
            </div>
            <span className="text-xs font-bold text-[#0E1E4A] uppercase tracking-wider block mb-3">
              {item.phase}
            </span>
            <h3 className="font-bold text-[#1C1C1C] text-lg mb-4 pr-8">
              {item.title}
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-[#6B7280] hover:text-blue-800 transition-colors"
            >
              {item.link}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
const FinalQuote = () => (
  <section className="py-32 bg-[#F8FAFC] px-6 text-center">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      variants={staggerContainer}
      className="max-w-4xl mx-auto"
    >
      <motion.h2
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#0A0F1E] leading-tight tracking-tight mb-8"
      >
        A correctly written prescription and a payable claim are not the same
        thing.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-[#6B7280] text-md md:text-lg leading-6 mb-12 font-light max-w-2xl mx-auto"
      >
        Most pharmacy rework is caused upstream by billing logic trying to fix
        formulary mismatches. RxAI stops the wrong inputs from ever reaching the
        billing team.
      </motion.p>
            <motion.p
        variants={fadeUp}
        className="text-[#6B7280] text-md md:text-lg leading-6 mb-12 max-w-2xl font-light mx-auto"
      >
        Each one looks like a billing problem on the way out. None of them started there.
      </motion.p>
      <motion.div
        variants={fadeUp}
        className="inline-block bg-[#334C64] max-w-5xl text-white px-8 py-4 leading-9 text-3xl font-medium shadow-xl"
      >
        RxAI moves the decision back to where the problem actually originates.
      </motion.div>
    </motion.div>
  </section>
)
// const FinalCTA = () => (
//   <section className="py-32 bg-[#0F192A] h-full overflow px-6 text-center border-b border-white/10">
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{
//         once: true,
//       }}
//       variants={staggerContainer}
//       className="max-w-3xl mx-auto m-15"
//     >
//       <motion.h2
//         variants={fadeUp}
//         className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
//       >
//         See RxAI in your Environment
//       </motion.h2>
//       <p
//         className='text-white mb-6 p-4'
//       >
//         RxAI helps specialty care teams navigate payer restrictions, prescription complexity, and therapy decisions with intelligent clinical and revenue insights before delays impact care.
//       </p>
//         <motion.button
//          onClick={() => {
//                     window.location.href = 'https://rx-ai-ui-v2.fly.dev/rx/pre-claim'
//         }}
//         variants={fadeUp}
//         className="bg-white text-[#0F192A] text-sm px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
//       >
//         Explore RxAi <ArrowRight className="w-5 h-5" />
//       </motion.button>
//     </motion.div>
//   </section>
// )

const FinalCTA = () => (
  <section
    className="
      relative
      py-32
      bg-[#0F192A]
      overflow-hidden
      px-6
      text-center
      border-b border-white/10
    "
  >
    {/* Radial glow layer */}
    <div
      className="
        absolute inset-0
        pointer-events-none
        bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_15%,transparent_35%)]
      "
    />

    {/* Content */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      variants={staggerContainer}
      className="relative z-10 max-w-3xl mx-auto"
    >
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
      >
        See RxAI in your Environment
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="text-white/80 mb-8 text-base md:text-lg leading-relaxed"
      >
        RxAI helps specialty care teams navigate payer restrictions,
        prescription complexity, and therapy decisions with intelligent
        clinical and revenue insights before delays impact care.
      </motion.p>

      <motion.button
        onClick={() => {
          window.location.href =
            'https://rx-ai-ui-v2.fly.dev/rx/pre-claim'
        }}
        variants={fadeUp}
        className="
          inline-flex items-center gap-2
          rounded-xl
          bg-white
          px-8 py-4
          text-sm font-bold
          text-[#0F192A]
          transition-all duration-300
          hover:bg-gray-100
          hover:translate-y-[-1px]
        "
      >
        Explore RxAI
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  </section>
)


export default function RxAI() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <StructuralReality />
        <DecisioningLayer />
        <SevenPillars />
        <SevenOutcomes />
        <BlockedToPayable />
        <OperatorsBuiltFor />
        <Architecture />
        <Implementation />
        <FinalQuote />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
