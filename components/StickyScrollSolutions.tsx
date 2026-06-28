"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, FileText, Zap, Clock, User, BarChart2 } from "lucide-react";

type StatusItem = { label: string; ok: boolean };

type Solution = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  Icon: React.ElementType;
  statusItems: StatusItem[];
};

const solutions: Solution[] = [
  {
    number: "01",
    title: "Wound.ai",
    category: "Wound Care Revenue Intelligence",
    description:
      "Pre-bill analysis built for wound care complexity. Detects ICD-10 misalignment, documentation gaps, and medical necessity breakdowns before claims are transmitted.",
    tags: ["Documentation Analysis", "ICD-10 Validation", "Denial Prevention"],
    Icon: FileText,
    statusItems: [
      { label: "Documentation Gap Detected", ok: false },
      { label: "ICD-10 Code Aligned", ok: true },
      { label: "Denial Risk: Low", ok: true },
    ],
  },
  {
    number: "02",
    title: "Pain.ai",
    category: "Pain Management Billing Validation",
    description:
      "Catches coding inconsistencies and CPT misalignment in pain management workflows. Prevents submission errors before they become payer denials.",
    tags: ["CPT Validation", "Coding Alignment", "Submission Readiness"],
    Icon: Zap,
    statusItems: [
      { label: "CPT Code Validated", ok: true },
      { label: "Payer Rule Check", ok: false },
      { label: "Authorization Match", ok: true },
    ],
  },
  {
    number: "03",
    title: "PriorAuth.ai",
    category: "Authorization Gap Detection",
    description:
      "Identifies missing or expired prior authorizations before services hit the revenue cycle. Eliminates downstream disruption and costly rework cycles.",
    tags: ["Auth Gap Detection", "Payer Verification", "Claim Protection"],
    Icon: Clock,
    statusItems: [
      { label: "Authorization Valid", ok: true },
      { label: "Expiry Date Checked", ok: true },
      { label: "Coverage Confirmed", ok: false },
    ],
  },
  {
    number: "04",
    title: "Eligibility.ai",
    category: "Coverage & Eligibility Validation",
    description:
      "Catches coverage gaps and eligibility mismatches upstream. Reduces preventable claim rejections tied to payer verification before submission.",
    tags: ["Real-Time Eligibility", "Coverage Match", "Rejection Prevention"],
    Icon: User,
    statusItems: [
      { label: "Active Coverage Verified", ok: true },
      { label: "Benefits Confirmed", ok: false },
      { label: "Deductible Status", ok: true },
    ],
  },
  {
    number: "05",
    title: "Performance.ai",
    category: "Revenue Performance Analytics",
    description:
      "Turns pre-bill intelligence into operational visibility. Surfaces risk trends, workflow gaps, and performance benchmarks across your organization.",
    tags: ["Revenue Intelligence", "Risk Scoring", "Workflow Analytics"],
    Icon: BarChart2,
    statusItems: [
      { label: "Risk Score: 87 / 100", ok: true },
      { label: "Denial Trend ↓ 12%", ok: true },
      { label: "Clean Claim Rate ↑", ok: true },
    ],
  },
];

const TOTAL = solutions.length;

// ECG line decoration
const ECGLine = () => (
  <svg viewBox="0 0 260 28" className="w-full" fill="none">
    <path
      d="M0,14 L40,14 L48,14 L53,4 L58,24 L63,14 L74,14 L79,8 L84,20 L89,14 L130,14 L138,14 L143,4 L148,24 L153,14 L164,14 L169,8 L174,20 L179,14 L220,14 L228,14 L233,4 L238,24 L243,14 L254,14 L260,14"
      stroke="#3152AD"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Medical card visual (right side)
function MedicalCard({ solution }: { solution: Solution }) {
  const { Icon, statusItems } = solution;

  return (
    <div
      className="relative w-full max-w-[340px] md:max-w-[380px] mx-auto"
      style={{ aspectRatio: "4/5" }}
    >
      <div
        className="w-full h-full rounded-[32px] overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(160deg, #0d1a3a 0%, #07101f 100%)",
          border: "1px solid rgba(49,82,173,0.22)",
          boxShadow: "0 0 60px rgba(49,82,173,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Dot grid bg */}
        <div
          className="absolute inset-0 rounded-[32px] opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top status bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6">
          <span
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Pre-Bill Analysis
          </span>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: "#22c55e",
              boxShadow: "0 0 6px #22c55e",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Center icon */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 gap-8">
          <div className="relative">
            <div
              className="absolute rounded-2xl"
              style={{
                inset: "-16px",
                background: "rgba(49,82,173,0.35)",
                filter: "blur(24px)",
              }}
            />
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(49,82,173,0.1)",
                border: "1px solid rgba(49,82,173,0.4)",
              }}
            >
              <Icon size={36} color="#6B8EE8" />
            </div>
          </div>

          {/* Status items */}
          <div className="w-full flex flex-col gap-2.5">
            {statusItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: item.ok ? "#22c55e" : "#f59e0b",
                    boxShadow: `0 0 5px ${item.ok ? "#22c55e" : "#f59e0b"}`,
                  }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ECG bottom */}
        <div className="relative z-10 px-6 pb-5 opacity-25">
          <ECGLine />
        </div>
      </div>
    </div>
  );
}

// Progress dot — must be its own component to use hooks
function ProgressDot({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;
  const scale = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.03, end - 0.03, end + 0.02],
    [0.8, 1.4, 1.4, 0.8]
  );
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.03, end - 0.03, end + 0.02],
    [0.25, 1, 1, 0.25]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-1.5 h-1.5 rounded-full bg-brand-blue"
    />
  );
}

// Individual slide — must be its own component to use hooks
function SolutionSlide({
  solution,
  index,
  scrollYProgress,
}: {
  solution: Solution;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.01, start + 0.04, end - 0.04, end + 0.01],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start - 0.02, start + 0.04, end - 0.04, end + 0.02],
    ["18px", "0px", "0px", "-18px"]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-20"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left: text */}
        <div>
          <span
            className="text-xs font-mono tracking-[0.2em] uppercase"
            style={{ color: "rgba(49,82,173,0.6)" }}
          >
            {solution.number} / {String(TOTAL).padStart(2, "0")}
          </span>
          <h3
            className="text-white font-black mt-3 tracking-tight leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {solution.title}
          </h3>
          <p
            className="text-sm font-medium mt-2 tracking-wide"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {solution.category}
          </p>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mt-5 max-w-lg">
            {solution.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {solution.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  border: "1px solid rgba(49,82,173,0.3)",
                  color: "rgba(107,142,232,0.85)",
                  background: "rgba(49,82,173,0.06)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-8 text-white font-semibold hover:text-blue-400 transition-colors group"
          >
            Explore {solution.title}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Right: card */}
        <div className="flex justify-center md:justify-end">
          <MedicalCard solution={solution} />
        </div>
      </div>
    </motion.div>
  );
}

export function StickyScrollSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      style={{ height: `${TOTAL * 120}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-brand-dark">
        {/* Header strip */}
        <div className="absolute top-6 left-6 right-6 md:left-12 lg:left-20 flex items-center justify-between z-20 pointer-events-none">
          <p
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            AI Applications
          </p>
          <div className="flex items-center gap-2">
            {solutions.map((_, i) => (
              <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Slides */}
        {solutions.map((solution, i) => (
          <SolutionSlide
            key={solution.title}
            solution={solution}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
