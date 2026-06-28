"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Search, Filter, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

// ─── Color tokens (Figma) ─────────────────────────────────────────────────
// navy-deep   #0b111d
// navy        #0b1c30
// navy-mid    #0f172a
// blue-brand  #1e5aff  / #2563eb
// blue-light  #9bbaff  / #7cadff
// sky-pale    #e4f2ff
// sky-mid     #bcd5ff / #c7d7ff
// text-muted  #94a3b8
// slate-mid   #64748b
// ─────────────────────────────────────────────────────────────────────────

// ─── Data ─────────────────────────────────────────────────────────────────

const STAGES = [
  {
    id: 1,
    code: "01",
    title: "Intake and Eligibility",
    sub: "Pre-routing clinical safeguards",
    detail: {
      heading: "Intake and Eligibility",
      badge: "LAYER 1 OF 6",
      description:
        "Standardizes and validates member data, coverage mapping, and historical linkage before the claim enters adjudication. This layer catches eligibility mismatches, duplicate member records, and coverage gaps before any downstream processing begins.",
      checks: [
        "Member eligibility verification",
        "Coverage period validation",
        "Duplicate claim detection",
        "Historical linkage analysis",
        "Provider enrollment status",
      ],
    },
  },
  {
    id: 2,
    code: "02",
    title: "Classification",
    sub: "Benefit assignment & mapping",
    detail: {
      heading: "Classification",
      badge: "LAYER 2 OF 6",
      description:
        "Categorizes the claim by specialty, facility type, and risk profile. Maps each service line to the correct benefit category, fee schedule, and reimbursement methodology.",
      checks: [
        "Specialty classification",
        "Facility type assignment",
        "Benefit category mapping",
        "Fee schedule alignment",
        "Risk profile scoring",
      ],
    },
  },
  {
    id: 3,
    code: "03",
    title: "Coding and Clinical",
    sub: "CPT compliance layers",
    detail: {
      heading: "Coding and Clinical",
      badge: "LAYER 3 OF 6",
      description:
        "Cross-references CPT/ICD codes against clinical guidelines and historical patterns. Identifies upcoding, unbundling, modifier abuse, and procedure combinations that violate clinical standards.",
      checks: [
        "CPT/ICD cross-reference",
        "Modifier validation",
        "Unbundling detection",
        "Upcoding analysis",
        "Clinical necessity review",
      ],
    },
  },
  {
    id: 4,
    code: "04",
    title: "Billing and Authorization",
    sub: "Contract terms & prior auth",
    detail: {
      heading: "Billing and Authorization",
      badge: "LAYER 4 OF 6",
      description:
        "Verifies prior authorizations, billing limits, and contract terms. Catches services billed without authorization, contract rate violations, and frequency limit overages.",
      checks: [
        "Prior authorization verification",
        "Contract rate validation",
        "Frequency limit checks",
        "Coordination of benefits",
        "Out-of-network detection",
      ],
    },
  },
  {
    id: 5,
    code: "05",
    title: "Fraud, Risk and Payment",
    sub: "Anomalous pattern detection",
    detail: {
      heading: "Fraud, Risk and Payment",
      badge: "LAYER 5 OF 6",
      description:
        "Final check for anomalous patterns, upcoding, and payment integrity. Applies machine learning models trained on known fraud patterns, phantom billing, and payment scheme detection.",
      checks: [
        "Phantom billing detection",
        "Provider pattern analysis",
        "Payment scheme identification",
        "Network anomaly scoring",
        "SIU escalation triggers",
      ],
    },
  },
  {
    id: 6,
    code: "06",
    title: "Documentation and Validation",
    sub: "Medical record & necessity audit",
    detail: {
      heading: "Documentation and Validation",
      badge: "LAYER 6 OF 6",
      description:
        "Analyzes attached medical records for necessity and proper utilization. Validates that documentation supports the level of service billed and meets payer-specific documentation requirements.",
      checks: [
        "Medical necessity documentation",
        "Level of service validation",
        "Operative report review",
        "Payer documentation rules",
        "Appeal-ready audit trail",
      ],
    },
  },
];

const VERDICTS = [
  {
    key: "passed",
    label: "Passed",
    color: "#34d399",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    description: "Fully compliant, ready to pay. Proceed to adjudication and payment.",
  },
  {
    key: "denied",
    label: "Denied",
    color: "#f43f5e",
    bg: "bg-rose-50",
    border: "border-rose-200",
    dot: "bg-rose-500",
    text: "text-rose-700",
    description: "Violates policy or coverage. Deny with policy citation attached.",
  },
  {
    key: "fraud",
    label: "Fraud",
    color: "#db2777",
    bg: "bg-pink-50",
    border: "border-pink-200",
    dot: "bg-pink-600",
    text: "text-pink-700",
    description: "Intentional deceptive billing detected — phantom billing, identity fraud. SIU escalation triggered.",
  },
  {
    key: "abuse",
    label: "Abuse",
    color: "#f59e0b",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    text: "text-amber-700",
    description: "Excessive or improper utilization — duplicate component billing. Investigation queue.",
  },
  {
    key: "coding",
    label: "Coding Issue",
    color: "#3b82f6",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    text: "text-blue-700",
    description: "Coding or documentation mismatch — revenue code error, modifier missing. Route to correction.",
  },
  {
    key: "hold",
    label: "On Hold",
    color: "#54657e",
    bg: "bg-slate-50",
    border: "border-slate-200",
    dot: "bg-slate-500",
    text: "text-slate-600",
    description: "Awaiting manual review. Flagged for auditor queue with reasoning attached.",
  },
];

const CLEAR_VISION = [
  { label: "Passed (382)", pct: 31.7, color: "#10b981", width: "32%" },
  { label: "Denied (216)", pct: 17.9, color: "#f43f5e", width: "18%" },
  { label: "Fraud (129)", pct: 10.7, color: "#db2777", width: "11%" },
  { label: "Abuse (173)", pct: 14.4, color: "#f59e0b", width: "14%" },
  { label: "Coding (200)", pct: 16.6, color: "#2563eb", width: "17%" },
  { label: "On Hold (104)", pct: 8.6, color: "#94a3b8", width: "9%" },
];

const TABLE_ROWS = [
  { id: "CLM-9832", patient: "J. D.", specialty: "Vision", provider: "Dr. Smith", cpt: "92014", value: "$1,250", verdict: "Passed", notes: "Routine billing, fully compliant." },
  { id: "CLM-7741", patient: "A. M.", specialty: "Surgery", provider: "Mercy Gen", cpt: "22551", value: "$14,400", verdict: "Coding", notes: "Modifier 59 missing on secondary." },
  { id: "CLM-5529", patient: "R. K.", specialty: "Dental", provider: "Valley Dental", cpt: "D2740", value: "$1,100", verdict: "Fraud", notes: "Duplicate crown billing detected." },
  { id: "CLM-1184", patient: "S. T.", specialty: "Medical", provider: "City Clinic", cpt: "99215", value: "$350", verdict: "Hold", notes: "Level 5 visit without supporting documentation." },
  { id: "CLM-3920", patient: "M. P.", specialty: "Pharma", provider: "CareRx", cpt: "J0178", value: "$4,800", verdict: "Denied", notes: "Prior authorization missing for specialty drug." },
  { id: "CLM-8842", patient: "L. L.", specialty: "OB/GYN", provider: "Women's Health", cpt: "59400", value: "$3,200", verdict: "Passed", notes: "Global maternity package verified." },
  { id: "CLM-2105", patient: "E. C.", specialty: "Medical", provider: "Dr. Jones", cpt: "93000", value: "$150", verdict: "Hold", notes: "Awaiting manual review for unbundling." },
  { id: "CLM-4417", patient: "B. N.", specialty: "DME", provider: "MedEquip Co", cpt: "E0601", value: "$2,900", verdict: "Abuse", notes: "Excessive supply billing per member history." },
];

const PRESET_CLAIMS = [
  { initials: "M.H.", value: "1250", cpt: "92134", specialty: "Vision", notes: "Phantom billing for specialized advanced retinal scan equipment not present at the facility." },
  { initials: "J.D.", value: "14400", cpt: "22551", specialty: "Surgery", notes: "Modifier 59 missing on secondary procedure. Potential unbundling of spinal procedures." },
  { initials: "A.K.", value: "4800", cpt: "J0178", specialty: "Pharmacy", notes: "Prior authorization missing for specialty drug. Duplicate billing same DOS." },
  { initials: "S.T.", value: "350", cpt: "99215", specialty: "Medical", notes: "Level 5 E&M visit billed without supporting documentation for medical decision complexity." },
  { initials: "R.P.", value: "2900", cpt: "E0601", specialty: "DME", notes: "Excessive CPAP supply billing — quantities exceed clinical necessity per member history." },
];

const PROCESSING_LAYERS = [
  { code: "L1", title: "INTAKE AND ELIGIBILITY" },
  { code: "L2", title: "CLASSIFICATION" },
  { code: "L3", title: "CODING AND CLINICAL" },
  { code: "L4", title: "BILLING AND AUTHORIZATION" },
  { code: "L5", title: "DOCUMENTATION AND UTILIZATION" },
  { code: "L6", title: "FRAUD, RISK AND PAYMENT" },
];

// ─── Helper ───────────────────────────────────────────────────────────────

function verdictStyle(v: string) {
  switch (v.toLowerCase()) {
    case "passed": return "bg-emerald-100 text-emerald-700";
    case "denied": return "bg-rose-100 text-rose-700";
    case "fraud":  return "bg-pink-100 text-pink-700";
    case "abuse":  return "bg-amber-100 text-amber-700";
    case "coding": return "bg-blue-100 text-blue-700";
    case "hold":   return "bg-slate-100 text-slate-600";
    default:       return "bg-slate-100 text-slate-600";
  }
}

// ─── Section: Hero ────────────────────────────────────────────────────────

function Hero() {
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,90,255,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
          <span className="text-[10px] font-bold tracking-[0.1em] text-[#94a3b8] uppercase">
            Audit.AI. Payer Claims Intelligence.
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#0f172a] tracking-tight leading-tight mb-8"
          style={{ color: "#f8fafc", letterSpacing: "-0.03em" }}
        >
          Audit every claim.
          <br />
          Not a sample.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-[#3d4148] max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          style={{ color: "#94a3b8" }}
        >
          A payer can decide to audit one hundred percent of claims. The limit was
          never the decision. It was the time to build the logic, run it, and assemble the
          findings. Audit.ai runs every claim through 29 checks in minutes and hands
          the auditor a ranked, reasoned queue.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => router.push("/company?service=request-a-demo")}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0f172a] border border-[#1e5aff] text-white font-semibold rounded-lg hover:bg-[#1e3a6e] transition-colors shadow-lg text-sm"
          >
            See Audit.ai on your own claims
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("auditengine");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 border border-white/20 text-white/90 font-semibold rounded-lg hover:bg-white/20 transition-colors text-sm backdrop-blur-sm"
          >
            How the engine works
          </button>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 w-full"
        style={{
          background: "#e4f2ff",
          borderRadius: "70px 70px 0 0",
          boxShadow: "inset 0 0 26px -9px #355a7b",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {[
              { value: "100%", sub: "of claims audited, not sampled." },
              { value: "29  CHECKS", sub: "per claim." },
              { value: "6 LAYERS", sub: "30 stages." },
              { value: "MINUTES", sub: "to a reasoned queue." },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1 px-6 py-4 border-r border-[#b2bbce]/40 last:border-r-0">
                <span
                  className="font-extrabold leading-none text-[#7cadff]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(22px,3vw,40px)", letterSpacing: "-0.018em" }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#94a3b8]">
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section: Problem ─────────────────────────────────────────────────────

function Problem() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center bg-[#eff6ff] rounded px-3 py-1 mb-6">
            <span className="text-[10px] font-bold tracking-[0.1em] text-[#2563eb] uppercase">
              Order of Operations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-8"
            style={{ letterSpacing: "-0.03em" }}>
            The problem.
            <br />
            <span className="text-[#2563eb]">Recovery starts before</span>
            <br />
            payment.
          </h2>
          <p className="text-lg text-[#64748b] leading-relaxed mb-8">
            Pay and chase is the order of operations almost everywhere. The
            claim gets paid. The dollar leaves the plan. Recovery becomes a
            slow negotiation that clears cents on the dollar.
          </p>
          <div className="pl-6 border-l-4 border-[#2563eb] py-2">
            <p className="text-base font-bold text-[#0f172a] leading-relaxed">
              Audit.ai changes the order. Six audit layers run before
              adjudication. When fraud or overpayment shows up, the dollar
              does not.
            </p>
          </div>
        </motion.div>

        {/* Right — diagram card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-xl border border-[#e2e8f0]"
          style={{ background: "#f8fafc" }}
        >
          <div className="p-8">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Legacy column */}
              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#dc2626] mb-4">
                  Legacy Order
                </div>
                {["1. Pay Claim", "2. Audit Post-Pay", "3. Chase Recovery"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-[#fecaca]/50 last:border-0">
                    <span className="w-5 h-5 rounded-full bg-[#dc2626]/20 text-[#dc2626] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-[#1f2937]">{s.replace(/^\d\. /, "")}</span>
                  </div>
                ))}
                <div className="mt-4 text-[10px] text-[#dc2626] font-semibold">Dollar leaves the plan</div>
              </div>
              {/* Audit.ai column */}
              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#2563eb] mb-4">
                  Audit.ai Order
                </div>
                {["Audit Pre-Pay (6 layers)", "Intervene / Deny", "Pay Compliant Only"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-[#bfdbfe]/50 last:border-0">
                    <span className="w-5 h-5 rounded-full bg-[#2563eb]/20 text-[#2563eb] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-[#1f2937]">{s}</span>
                  </div>
                ))}
                <div className="mt-4 text-[10px] text-[#16a34a] font-semibold">Dollar stays in the plan</div>
              </div>
            </div>

            {/* ClearVision mini panel */}
            <div className="bg-[#c7d7ff] rounded-2xl p-6 mt-4">
              <div className="text-sm font-bold text-[#355a7b] mb-1">ClearVision Audit</div>
              <div className="text-xs text-[#0f192a] mb-4">1,204 Claims — full resolution status</div>
              <div className="space-y-2">
                {[
                  { label: "Passed (382)", pct: 32, color: "#10b981" },
                  { label: "Denied (216)", pct: 18, color: "#f43f5e" },
                  { label: "Fraud (129)", pct: 11, color: "#db2777" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span style={{ color: item.color }}>{item.label}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#1e293b]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Engine ──────────────────────────────────────────────────────

function Engine() {
  const [active, setActive] = useState(1);
  const stage = STAGES.find((s) => s.id === active)!;

  return (
    <section
      id="auditengine"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: "#0a0f1e",
        borderRadius: "100px 100px 0 0",
        boxShadow: "0 0 15.3px #0f192a",
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center bg-[#eff6ff] rounded-full px-4 py-1.5 mb-6">
            <span className="text-[10px] font-bold tracking-[0.1em] text-[#2563eb] uppercase">
              Engine Core Architecture
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#a3c9ff]"
            style={{ letterSpacing: "-0.025em" }}
          >
            How a claim gets audited.
          </h2>
          <p className="text-lg text-[#d3e5ff] leading-relaxed max-w-3xl mx-auto">
            Six layers per facility, adapting to specialty. Thirty stages. Twenty-nine audit functions.
            Each layer retools per line of business: vision, dental, medical, DME, pharmacy.
          </p>
        </div>

        {/* Two-column: stage nav + detail panel */}
        <div className="grid md:grid-cols-[400px_1fr] gap-6">
          {/* Left sidebar */}
          <div className="space-y-3">
            {STAGES.map((s) => {
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#0b111d] border-[#1e5aff] shadow-[0_0_20px_rgba(30,90,255,0.15)]"
                      : "bg-[#0b111d]/70 border-[#1f2937] hover:bg-[#0b111d]"
                  }`}
                >
                  {/* Number badge */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                      isActive ? "bg-[#1e5aff] text-white" : "bg-[#0f3873] text-[#9ca3af]"
                    }`}
                  >
                    {s.code}
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold leading-tight ${isActive ? "text-white" : "text-[#d1d5db]"}`}>
                      {s.title}
                    </div>
                    <div className="text-xs text-[#9ca3af] mt-0.5">{s.sub}</div>
                  </div>
                  {/* Arrow */}
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? "text-[#1e5aff]" : "text-[#374151]"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0b111d] border border-[#1e3a6e] rounded-2xl p-8 shadow-2xl"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-bold tracking-widest text-[#2563eb] uppercase bg-[#eff6ff] px-3 py-1 rounded-full">
                {stage.detail.badge}
              </span>
              <span className="text-[10px] text-[#64748b]">
                Audit Engine v2 · {stage.title}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-4">
              {stage.detail.heading}
            </h3>
            <p className="text-[#94a3b8] leading-relaxed mb-8 text-sm">
              {stage.detail.description}
            </p>

            {/* Checks list */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold tracking-widest text-[#64748b] uppercase mb-3">
                Audit Checks in This Layer
              </div>
              {stage.detail.checks.map((check, i) => (
                <motion.div
                  key={check}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 bg-[#0f172a] border border-[#1e293b] rounded-lg px-4 py-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1e5aff]/20 border border-[#1e5aff]/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e5aff]" />
                  </div>
                  <span className="text-sm text-[#d1d5db]">{check}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom stats row */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#1e293b]">
              {[
                { label: "TOTAL CHECKS", val: "29" },
                { label: "LAYERS", val: "6" },
                { label: "STAGES", val: "30" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-[#7cadff]">{s.val}</div>
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Verdicts ────────────────────────────────────────────────────

function Verdicts() {
  return (
    <section className="py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center bg-[#eff6ff] rounded px-3 py-1 mb-4">
            <span className="text-[10px] font-bold tracking-[0.1em] text-[#2563eb] uppercase">
              Structured Verdict Output
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-4 tracking-tight">
            Every claim gets a verdict.
          </h2>
          <p className="text-lg text-[#64748b] leading-relaxed">
            Six outcomes, clearly reasoned. No claim leaves without a verdict, its category, and the checks behind it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERDICTS.map((v, i) => (
            <motion.div
              key={v.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl p-6 border ${v.bg} ${v.border} hover:shadow-md transition-shadow`}
            >
              <div className={`inline-flex items-center gap-2 mb-4`}>
                <span className={`w-2 h-2 rounded-full ${v.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${v.text}`}>{v.label}</span>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Surfaces ────────────────────────────────────────────────────

function Surfaces() {
  const [search, setSearch] = useState("");
  const filtered = TABLE_ROWS.filter(
    (r) =>
      search === "" ||
      Object.values(r).some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="py-24 px-6 bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[10px] font-bold tracking-[0.1em] text-[#9bbaff] uppercase mb-4">
            One Payer View
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
            What one audit surfaces.
          </h2>
          <p className="text-[#94a3b8] leading-relaxed">
            Figures shown represent a complete pre-payment health plan audit, not sampled.
          </p>
        </div>

        {/* Top cards row */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 mb-6">
          {/* Total Run Overview */}
          <div className="bg-white rounded-2xl p-8 shadow-xl text-[#0f172a] border border-[#e2e8f0]">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#0f172a]">Total Run Overview</h3>
                <p className="text-xs text-[#94a3b8] mt-1">Coverage across active healthcare facilities</p>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#dbeafe] px-3 py-1 rounded-md uppercase">
                Pre-Payment Complete Audit
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: "Claim Volume", value: "9,716", sub: "100% of pipeline reviewed" },
                { label: "Claims Value", value: "$18.27M", sub: "Claims monetary pool" },
                { label: "Active Providers", value: "324", sub: "Benchmark comparison" },
                { label: "Facilities Checked", value: "5", sub: "Full facility contracts" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-[10px] font-bold tracking-widest text-[#94a3b8] uppercase mb-2">
                    {s.label}
                  </div>
                  <div className="text-3xl font-extrabold text-[#0f172a] mb-1">{s.value}</div>
                  <div className="text-[10px] text-[#94a3b8]">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="pt-6 mt-6 border-t border-[#f1f5f9] flex justify-between text-[10px] text-[#94a3b8]">
              <span>Data integrity: 29 checks run seamlessly per item</span>
              <span>Prepare date: Grelin Representative Demo</span>
            </div>
          </div>

          {/* ClearVision Audit */}
          <div
            className="rounded-2xl p-8 shadow-xl"
            style={{ background: "#c7d7ff" }}
          >
            <h3 className="text-xl font-bold text-[#355a7b] mb-1">ClearVision Audit</h3>
            <p className="text-xs text-[#0f192a] mb-6">1,204 Claims full resolution status</p>
            <div className="space-y-4">
              {CLEAR_VISION.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span style={{ color: item.color }}>{item.label}</span>
                    <span className="text-[#64748b] font-normal">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#1e293b]/30">
              <p className="text-[9px] text-[#64748b] text-right uppercase tracking-wider">
                Sum: Exactly 1,204 processed
              </p>
            </div>
          </div>
        </div>

        {/* Smart Filter Table */}
        <div className="bg-white rounded-2xl shadow-xl text-[#0f172a] overflow-hidden">
          <div className="p-6 border-b border-[#e2e8f0]">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0f172a]">Smart Filter</h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  Pre-payment audit run · 9,716 claims total · Complete pipeline
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g. Show all denied claims from cardiology..."
                    className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-colors"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#475569] hover:bg-[#f1f5f9] transition-colors whitespace-nowrap">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] text-[#94a3b8] uppercase bg-[#f8fafc] border-b border-[#e2e8f0]">
                <tr>
                  {["Claim ID", "Patient", "Specialty", "Provider", "CPT Code", "Value (USD)", "Verdict", "Audit Findings"].map(
                    (col) => (
                      <th key={col} className="px-5 py-3.5 text-left font-bold tracking-wider whitespace-nowrap">
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filtered.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-[#f8fafc] transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs font-semibold text-[#0f172a]">{row.id}</td>
                    <td className="px-5 py-3.5 text-[#475569]">{row.patient}</td>
                    <td className="px-5 py-3.5 text-[#475569]">{row.specialty}</td>
                    <td className="px-5 py-3.5 text-[#475569]">{row.provider}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-[#64748b]">{row.cpt}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#0f172a]">{row.value}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${verdictStyle(row.verdict)}`}>
                        {row.verdict}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[#94a3b8] min-w-[200px]">{row.notes}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Specialty section shared mockup helpers ─────────────────────────────

function WoundAIMockup() {
  return (
    <div
      className="w-full rounded-t-xl overflow-hidden flex flex-col h-full"
      style={{ background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 60%, #eef2ff 100%)" }}
    >
      {/* App nav */}
      <div
        className="flex items-center justify-between px-3 py-2 shrink-0"
        style={{ borderBottom: "1px solid #e2e8f0", background: "rgba(255,255,255,0.92)" }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)" }}
          >
            W
          </div>
          <span className="text-[11px] font-bold text-[#0f172a]">Wound AI</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-0.5 rounded-lg p-[3px]"
            style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
          >
            <span
              className="px-2.5 py-1 rounded-md text-[9px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)" }}
            >
              Wound Assessment
            </span>
            <span className="px-2.5 py-1 text-[9px] font-medium text-[#475569]">Coding Review</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span className="text-[9px] text-[#94a3b8]">Connected</span>
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center pt-3 pb-2 shrink-0">
        <h3 className="text-[13px] font-extrabold text-[#0f172a] tracking-tight">Chart Assessment</h3>
        <p className="text-[9px] text-[#475569] mt-0.5">Upload a wound care chart and let AI analyze it.</p>
      </div>

      {/* Upload card */}
      <div
        className="mx-3 flex-1 min-h-0 rounded-xl p-3 flex flex-col gap-2.5"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(226,232,240,0.8)",
          boxShadow: "0 4px 12px rgba(15,23,42,0.06)",
        }}
      >
        <div
          className="rounded-lg flex flex-col items-center justify-center gap-1.5 py-4"
          style={{
            border: "1.5px dashed #e2e8f0",
            background: "linear-gradient(180deg, rgba(248,250,252,0.5) 0%, rgba(241,245,249,0.8) 100%)",
          }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#6366f1] text-[14px]"
            style={{ background: "linear-gradient(135deg, #eef2ff 0%, rgba(199,210,254,0.5) 100%)" }}
          >
            ↑
          </div>
          <p className="text-[9.5px] font-semibold text-[#0f172a] text-center">Drop PDF, image, or TXT here to upload</p>
          <p className="text-[8.5px] text-[#94a3b8]">PDF, TXT, PNG, JPG, JPEG, WEBP</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div
            className="flex-1 rounded-lg px-2.5 py-1.5 text-[9px] text-[#94a3b8]"
            style={{ background: "#fff", border: "1px solid #e2e8f0" }}
          >
            Select a chart...
          </div>
          <div
            className="px-3 py-1.5 rounded-lg text-[9px] font-semibold text-white opacity-50"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)" }}
          >
            Begin Extraction...
          </div>
          <span className="text-[9px] text-[#475569] cursor-pointer">Clear</span>
        </div>

        <div
          className="flex flex-col gap-1 shrink-0"
          style={{ borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}
        >
          <span className="text-[8.5px] font-semibold text-[#475569]">Or paste chart text directly</span>
          <div
            className="rounded-lg px-2.5 py-2 text-[8.5px] text-[#94a3b8]"
            style={{ background: "#fff", border: "1px solid #e2e8f0", minHeight: "40px" }}
          >
            Paste wound chart text here...
          </div>
        </div>
      </div>
      <div className="shrink-0 h-2" />
    </div>
  );
}

function PainAIMockup() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#f8fafc" }}>
      {/* App top nav */}
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0"
        style={{ background: "#fff", borderBottom: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" }}
          >
            P
          </div>
          <span className="text-[11px] font-bold text-[#0f172a]">Pain.ai</span>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-lg p-[3px]"
          style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
        >
          <span
            className="px-2.5 py-1 rounded-md text-[9px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" }}
          >
            Compliance
          </span>
          <span className="px-2.5 py-1 text-[9px] font-medium text-[#64748b]">CPT Review</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[9px] text-[#64748b]">Live</span>
        </div>
      </div>

      {/* Metrics strip */}
      <div
        className="grid grid-cols-3 gap-2 px-4 py-3 shrink-0"
        style={{ background: "#fff", borderBottom: "1px solid #e2e8f0" }}
      >
        {[
          { label: "Payer Policies", value: "1,248", color: "#2563eb" },
          { label: "Alert Signals", value: "12", color: "#d97706" },
          { label: "Claims Today", value: "847", color: "#16a34a" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-0.5">
            <span className="text-[8px] text-[#94a3b8] uppercase tracking-wide">{m.label}</span>
            <span className="text-[16px] font-bold leading-none" style={{ color: m.color }}>
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* CPT table */}
      <div
        className="flex-1 min-h-0 flex flex-col mx-3 mt-2.5 rounded-xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #e2e8f0" }}
      >
        <div
          className="grid grid-cols-4 px-3 py-2 shrink-0"
          style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}
        >
          {["CODE", "PROCEDURE", "PAYER", "STATUS"].map((h) => (
            <span key={h} className="text-[8px] font-bold text-[#94a3b8] tracking-wide uppercase">
              {h}
            </span>
          ))}
        </div>
        {[
          { code: "62323", proc: "Epidural Inj.", payer: "BCBS", status: "Validated", ok: true },
          { code: "64483", proc: "Nerve Block", payer: "Aetna", status: "Validated", ok: true },
          { code: "99215", proc: "E&M Complex", payer: "UHC", status: "Review", ok: false },
          { code: "64490", proc: "Facet Joint", payer: "Cigna", status: "Validated", ok: true },
        ].map((r, i, arr) => (
          <div
            key={r.code}
            className="grid grid-cols-4 items-center px-3 py-2"
            style={{
              borderBottom: i < arr.length - 1 ? "1px solid #f8fafc" : "none",
              background: i % 2 === 0 ? "#fff" : "#fafbfc",
            }}
          >
            <span className="font-mono text-[9.5px] font-semibold" style={{ color: "#2563eb" }}>
              {r.code}
            </span>
            <span className="text-[9.5px] text-[#334155]">{r.proc}</span>
            <span className="text-[9.5px] text-[#64748b]">{r.payer}</span>
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full w-fit"
              style={{
                background: r.ok ? "#f0fdf4" : "#fffbeb",
                color: r.ok ? "#16a34a" : "#d97706",
                border: `1px solid ${r.ok ? "#bbf7d0" : "#fde68a"}`,
              }}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom stats */}
      <div className="px-3 pt-2.5 pb-3 shrink-0">
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: "98%", label: "Alignment Score", color: "#2563eb" },
            { val: "4,200+", label: "LCD/NCD Rules", color: "#0f172a" },
            { val: "94%", label: "Audit Precision", color: "#16a34a" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg px-2.5 py-2 text-center"
              style={{ background: "#fff", border: "1px solid #e2e8f0" }}
            >
              <div className="text-[13px] font-extrabold leading-none" style={{ color: s.color }}>
                {s.val}
              </div>
              <div className="text-[7.5px] text-[#94a3b8] mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Wound AI Specialty ─────────────────────────────────────────

function WoundAISection() {
  return (
    <section className="bg-[#0b111d] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      {/* Subtle top separator */}
      <div
        className="w-full h-px mb-16 md:mb-20"
        style={{ background: "linear-gradient(to right, transparent, rgba(124,173,255,0.18), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="inline-flex items-center rounded-[8px] px-3 py-1 text-[10px] font-bold tracking-[1.2px] uppercase"
            style={{
              background: "rgba(252,163,17,0.08)",
              border: "1px solid rgba(252,163,17,0.25)",
              color: "#FCA311",
            }}
          >
            Revenue Integrity
          </span>
          <span className="text-[12px] text-[#64748b] font-medium">Specialty Module</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left — content */}
          <div className="flex flex-col gap-6 w-full lg:w-[45%]">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
              style={{ color: "#f8fafc", letterSpacing: "-0.03em" }}
            >
              <span style={{ color: "#FCA311" }}>Wound.ai</span>
              {" — "}Revenue Integrity for Wound Care Programs
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-sm leading-relaxed"
              style={{ color: "rgba(148,163,184,1)" }}
            >
              Wound.ai applies Grelin&apos;s intelligence platform to the documentation, coding, and payer
              policy requirements unique to wound care — including WISer and complexity-based reimbursement.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-col gap-2.5"
            >
              {[
                "Match documentation to complexity-based reimbursement requirements",
                "Align coding with wound care-specific payer policies",
                "Navigate reimbursement complexity automatically",
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <ChevronRight size={15} className="shrink-0 mt-0.5" style={{ color: "#FCA311" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
                    {bullet}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="pt-1"
            >
              <a
                href="/wound"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: "#ffffff", color: "#0B1120" }}
              >
                Explore Wound.ai <ChevronRight size={13} />
              </a>
            </motion.div>
          </div>

          {/* Right — mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full lg:w-[55%]"
          >
            <div
              className="w-full rounded-3xl pt-4 px-4 overflow-hidden"
              style={{ background: "#FCA311", height: "380px" }}
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
                    app.grelin.ai/wound
                  </div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col">
                  <WoundAIMockup />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature highlight row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: "WISer Severity Indexing",
              desc: "Automated staging and complexity analysis based on real-time clinician input.",
              stat: "97% Accuracy",
              accent: "#FCA311",
            },
            {
              label: "LCD/NCD Compliance",
              desc: "Real-time alerts for missing debridement and documentation gaps.",
              stat: "4M+ Rules",
              accent: "#34d399",
            },
            {
              label: "Audit-Ready Trails",
              desc: "Every documentation action is timestamped, traceable, audit-linked.",
              stat: "99.9% Uptime",
              accent: "#7cadff",
            },
          ].map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl px-6 py-5 flex flex-col gap-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{f.label}</span>
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: `${f.accent}18`, color: f.accent, border: `1px solid ${f.accent}30` }}
                >
                  {f.stat}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Pain AI Specialty ───────────────────────────────────────────

function PainAISection() {
  return (
    <section
      className="px-6 md:px-16 lg:px-24 py-20 md:py-28"
      style={{ background: "#0f172a" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="inline-flex items-center rounded-[8px] px-3 py-1 text-[10px] font-bold tracking-[1.2px] uppercase"
            style={{
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(37,99,235,0.3)",
              color: "#3b82f6",
            }}
          >
            Pattern Analysis
          </span>
          <span className="text-[12px] text-[#64748b] font-medium">Specialty Module</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
          {/* Right (visually left on desktop) — content */}
          <div className="flex flex-col gap-6 w-full lg:w-[45%]">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
              style={{ color: "#f8fafc", letterSpacing: "-0.03em" }}
            >
              <span style={{ color: "#3b82f6" }}>Pain.ai</span>
              {" — "}Revenue Integrity for Pain Management
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-sm leading-relaxed"
              style={{ color: "rgba(148,163,184,1)" }}
            >
              Pain.ai applies Grelin&apos;s intelligence platform to the regulatory and coding requirements
              of pain management — validating CPT accuracy, modifier use, and payer policy alignment.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-col gap-2.5"
            >
              {[
                "Analyze documentation and coding patterns",
                "Align with payer policy requirements",
                "Prevent denials and maintain consistent performance",
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <ChevronRight size={15} className="shrink-0 mt-0.5" style={{ color: "#3b82f6" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
                    {bullet}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="pt-1"
            >
              <a
                href="/pain"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: "#ffffff", color: "#0B1120" }}
              >
                Explore Pain.ai <ChevronRight size={13} />
              </a>
            </motion.div>
          </div>

          {/* Left (visually right on desktop) — mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full lg:w-[55%]"
          >
            <div
              className="w-full rounded-3xl pt-4 px-4 overflow-hidden"
              style={{ background: "#2563eb", height: "380px" }}
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
                    app.grelin.ai/pain
                  </div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col">
                  <PainAIMockup />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature highlight row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: "Regulatory Pattern Analysis",
              desc: "Real-time LCD/NCD compliance mapping before claims reach the clearinghouse.",
              stat: "Real-time",
              accent: "#3b82f6",
            },
            {
              label: "Coding Alignment",
              desc: "Automated CPT/ICD crosswalks specific to interventional pain procedures.",
              stat: "98% Alignment",
              accent: "#34d399",
            },
            {
              label: "Predictive Audit Defense",
              desc: "Simulates payer audit logic to flag potential denials before submission.",
              stat: "94% Precision",
              accent: "#7cadff",
            },
          ].map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl px-6 py-5 flex flex-col gap-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{f.label}</span>
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: `${f.accent}18`, color: f.accent, border: `1px solid ${f.accent}30` }}
                >
                  {f.stat}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Quote / Payer Integrity ─────────────────────────────────────

function PayerIntegrity() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center bg-[#f2f3f7] rounded-full px-4 py-1.5 mb-8">
          <span className="text-[10px] font-bold tracking-[0.1em] text-[#47464f] uppercase">
            Next-Generation Audit Intelligence
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-10 tracking-tight">
          Payer Integrity, Uncompromised.
        </h2>
        <blockquote className="text-xl md:text-2xl italic text-[#475569] leading-relaxed mb-10 text-balance max-w-3xl mx-auto">
          &quot;Audit.ai does not replace the auditor. It lets a one hundred percent audit ship verdicts
          faster, with the reasoning already attached, and more recovery dollars on the run for every
          payment integrity team that deploys it.&quot;
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="w-12 h-px bg-[#e2e8f0] mb-4" />
          <div className="font-semibold text-[#0f172a]">Chief Medical Officer</div>
          <div className="text-sm text-[#94a3b8]">National Health Plan</div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Demo ────────────────────────────────────────────────────────

type LayerStatus = "PENDING GATEWAY" | "PROCESSING" | "COMPLETE" | "FLAGGED";

function Demo() {
  const router = useRouter();
  const [preset, setPreset] = useState(0);
  const [data, setData] = useState(PRESET_CLAIMS[0]);
  const [running, setRunning] = useState(false);
  const [layerStatuses, setLayerStatuses] = useState<LayerStatus[]>(
    Array(6).fill("PENDING GATEWAY")
  );
  const [done, setDone] = useState(false);

  const handlePreset = (i: number) => {
    setPreset(i);
    setData(PRESET_CLAIMS[i]);
    setRunning(false);
    setDone(false);
    setLayerStatuses(Array(6).fill("PENDING GATEWAY"));
  };

  const handleProcess = async () => {
    setRunning(true);
    setDone(false);
    const statuses: LayerStatus[] = Array(6).fill("PENDING GATEWAY");

    for (let i = 0; i < 6; i++) {
      await new Promise((r) => setTimeout(r, 500 + i * 200));
      statuses[i] = i === 2 || i === 5 ? "FLAGGED" : "COMPLETE";
      setLayerStatuses([...statuses]);
    }
    setRunning(false);
    setDone(true);
  };

  const statusColor = (s: LayerStatus) => {
    if (s === "COMPLETE") return "text-[#34d399]";
    if (s === "FLAGGED") return "text-[#f43f5e]";
    if (s === "PROCESSING") return "text-[#f59e0b]";
    return "text-[#64748b]";
  };

  const statusDot = (s: LayerStatus) => {
    if (s === "COMPLETE") return "bg-[#34d399]";
    if (s === "FLAGGED") return "bg-[#f43f5e]";
    if (s === "PROCESSING") return "bg-[#f59e0b] animate-pulse";
    return "bg-[#374151]";
  };

  return (
    <section
      className="py-24 px-6"
      style={{ background: "linear-gradient(to bottom, #0a1628, #1e3a8a)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[10px] font-bold tracking-[0.1em] text-[#3b82f6] uppercase mb-3">
            Hands-On Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            See Audit.ai on your own claims.
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
            Bring a representative claim parameters below. Run it through our interactive six layers
            and generate a reasoned, defensible queue verdict instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input card */}
          <div className="bg-[#0f172a] rounded-2xl p-8 border border-blue-900/30 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
            <div className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-4">
              Select a Known Preset Anomaly
            </div>
            <div className="flex gap-2 mb-4">
              {PRESET_CLAIMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePreset(i)}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold border transition-colors ${
                    preset === i
                      ? "bg-[#3b82f6] border-transparent text-white"
                      : "bg-[#0f172a] border-slate-700 text-[#94a3b8] hover:border-slate-500"
                  }`}
                >
                  #{i + 1}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-[#94a3b8] mb-6">
              Preset #{preset + 1}: Flagging anomaly factors for review.
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#94a3b8] block mb-1.5">Patient Initials</label>
                <input
                  value={data.initials}
                  onChange={(e) => setData((d) => ({ ...d, initials: e.target.value }))}
                  className="w-full bg-[#1e293b] border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#94a3b8] block mb-1.5">Claim Value (USD)</label>
                  <input
                    value={data.value}
                    onChange={(e) => setData((d) => ({ ...d, value: e.target.value }))}
                    className="w-full bg-[#1e293b] border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#94a3b8] block mb-1.5">Service CPT Code</label>
                  <input
                    value={data.cpt}
                    onChange={(e) => setData((d) => ({ ...d, cpt: e.target.value }))}
                    className="w-full bg-[#1e293b] border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#94a3b8] block mb-1.5">Claim Specialty Type</label>
                <select
                  value={data.specialty}
                  onChange={(e) => setData((d) => ({ ...d, specialty: e.target.value }))}
                  className="w-full bg-[#1e293b] border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                >
                  {["Vision", "Surgery", "Pharmacy", "Medical", "DME", "Dental", "OB/GYN"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#94a3b8] block mb-1.5">
                  Auditing Clinical / Billing Notes
                </label>
                <textarea
                  rows={4}
                  value={data.notes}
                  onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
                  className="w-full bg-[#1e293b] border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors resize-none"
                />
              </div>
              <div className="text-[11px] text-[#64748b]">
                Use words like &apos;phantom billing&apos;, &apos;duplicate&apos;, or &apos;upcoding&apos; to trigger respective logic checks.
              </div>
              <button
                onClick={handleProcess}
                disabled={running}
                className="w-full flex items-center justify-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-60 text-white font-bold rounded-lg py-3 text-sm transition-colors"
              >
                <Shield className="w-4 h-4" />
                {running ? "PROCESSING..." : "PROCESS 29 AUDIT CHECKS"}
              </button>
            </div>
          </div>

          {/* Output card */}
          <div className="bg-[#0f172a] rounded-2xl p-8 border border-blue-900/30 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[10px] text-[#94a3b8] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                Claims Integrity Processing Unit
              </div>
              <span className="text-[10px] text-[#64748b]">Prepared by Grelin</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#94a3b8] mb-6">
              <span>
                Audit compliance:{" "}
                {done
                  ? "100%"
                  : running
                  ? `${Math.round((layerStatuses.filter((s) => s !== "PENDING GATEWAY").length / 6) * 100)}%`
                  : "0%"}
              </span>
              <span className="text-[#3b82f6]">
                Active Layer:{" "}
                {layerStatuses.filter((s) => s !== "PENDING GATEWAY").length}/6
              </span>
            </div>

            <div className="space-y-1 mb-6">
              {PROCESSING_LAYERS.map((layer, i) => (
                <div
                  key={layer.code}
                  className="flex items-center justify-between border-b border-slate-700/40 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot(layerStatuses[i])}`}
                    />
                    <span className="text-sm text-slate-200 font-mono">
                      {layer.code}&nbsp;&nbsp;
                      <span className="font-sans text-xs text-[#94a3b8]">{layer.title}</span>
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${statusColor(layerStatuses[i])}`}>
                    {layerStatuses[i]}
                  </span>
                </div>
              ))}
            </div>

            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1e293b] border border-[#f43f5e]/30 rounded-xl p-5"
              >
                <div className="text-xs font-bold text-[#f43f5e] uppercase tracking-wider mb-2">
                  Audit Complete — Anomalies Detected
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Layer 3 (Coding &amp; Clinical) and Layer 6 (Fraud, Risk &amp; Payment) flagged
                  potential issues. Claim routed to auditor queue with full reasoning attached.
                  Recommended verdict: <span className="text-[#f43f5e] font-semibold">Fraud Review</span>.
                </p>
              </motion.div>
            )}

            {!done && (
              <div className="text-center text-[11px] text-[#64748b] mt-4">
                Enter claim parameters and select &apos;Process&apos; to run live audit checks.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: CTA / Booking ───────────────────────────────────────────────

function BookingCTA() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");

  return (
    <section className="py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#355a7b] mb-6 tracking-tight">
            Who it is for, and the close.
          </h2>
          <p className="text-lg text-[#355a7b] leading-relaxed max-w-2xl mx-auto">
            Built for the payer side of the wire. Payers and health plans. Audit organizations.
            SIU and payment integrity teams. Government program integrity.
          </p>
        </div>

        <div className="bg-[#0a1628] rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-800">
          <h3 className="text-2xl font-bold text-white mb-3">Book a demo &amp; analysis</h3>
          <p className="text-sm text-[#94a3b8] mb-8 leading-relaxed">
            See Audit.ai on your own claims. Bring a representative claim file. We will run it through
            the six layers and hand back a reasoned queue you can defend.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Organization Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. jsmith@healthplan.com"
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3b82f6] transition-colors placeholder:text-[#475569]"
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Organization
              </label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="e.g. Blue Shield Alliance"
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3b82f6] transition-colors placeholder:text-[#475569]"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => router.push("/company?service=request-a-demo")}
                className="w-full md:w-auto bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold px-8 py-3 rounded-lg transition-colors h-[50px] text-sm whitespace-nowrap"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AuditAIPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Engine />
        <Verdicts />
        <Surfaces />
        <WoundAISection />
        <PainAISection />
        <PayerIntegrity />
        <Demo />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
}
