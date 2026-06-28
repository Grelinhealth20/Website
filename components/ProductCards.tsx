"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";

/* ─── Shared primitives ──────────────────────────────────────────────────── */

type PillVariant = "gap" | "ok" | "review" | "blue";

const Pill = ({ variant, children }: { variant: PillVariant; children: React.ReactNode }) => {
  const cls: Record<PillVariant, string> = {
    gap:    "bg-[#FDEBD0] text-[#B7560A]",
    ok:     "bg-[#E8F5E9] text-[#2E7D32]",
    review: "bg-[#FFF3E0] text-[#E65100]",
    blue:   "bg-[#E8EDF7] text-[#1A2F5A]",
  };
  return (
    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${cls[variant]}`}>
      {children}
    </span>
  );
};

const SheetBtn = ({ children }: { children: React.ReactNode }) => (
  <a
    href="#"
    className="block w-full rounded-lg py-2.5 text-center text-[11px] font-semibold mt-3 bg-[#FCA311] text-[#0B1120] hover:bg-[#E8940A] transition-colors"
  >
    {children}
  </a>
);

const CardTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(49,82,173,0.1)] text-[#3152AD] tracking-wide mb-1.5">
    {children}
  </span>
);

const CardBody = ({
  tag,
  name,
  desc,
  cta,
}: {
  tag: string;
  name: string;
  desc: string;
  cta: string;
}) => (
  <div className="bg-white border-t border-[rgba(20,33,61,0.07)] px-4 py-3.5">
    <CardTag>{tag}</CardTag>
    <p className="text-[15px] font-semibold text-[#0B1120] mb-1">{name}</p>
    <p className="text-[11.5px] text-[#4A5568] leading-relaxed mb-2.5">{desc}</p>
    <a href="#" className="text-[11.5px] font-semibold text-[#FCA311] hover:opacity-70 transition-opacity inline-flex items-center gap-1">
      {cta}
    </a>
  </div>
);

/* ─── Texture overlays ──────────────────────────────────────────────────── */

/** Subtle dot-grid background */
const DotGrid = ({ opacity = 0.14 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
      backgroundSize: "22px 22px",
    }}
  />
);

/** Thin line grid background */
const LineGrid = ({ opacity = 0.09 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
      backgroundSize: "26px 26px",
    }}
  />
);

/** Large overlapping arcs (like reference 2) */
const ArcPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 400 210"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
  >
    <circle cx="80"  cy="55"  r="155" stroke="rgba(255,255,255,0.13)" strokeWidth="1"/>
    <circle cx="320" cy="160" r="140" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
    <circle cx="200" cy="220" r="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
    <circle cx="-10" cy="210" r="180" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
  </svg>
);

/** Large transparent G watermark */
const GWatermark = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
    <span
      style={{
        fontSize: "210px",
        fontWeight: 900,
        color: "rgba(255,255,255,0.06)",
        lineHeight: 1,
        letterSpacing: "-0.05em",
      }}
    >
      G
    </span>
  </div>
);

/* ─── Card 0 — Rx.ai ────────────────────────────────────────────────────── */
/* Deep indigo bg · panel centered with real screenshot */

const RxAiCard = ({ showBody = true }: { showBody?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden ${showBody ? "border border-[rgba(49,82,173,0.25)]" : ""}`}>
    <div className="relative overflow-hidden" style={{ height: showBody ? "260px" : "420px", background: "#312e81" }}>
      <ArcPattern />
      <DotGrid opacity={0.1} />
      {/* Panel centered */}
      <div className="absolute inset-5 bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 shrink-0" style={{ background: "#f0f0f0" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          <div className="flex-1 max-w-xs ml-3 rounded px-3 py-0.5 text-[10px] text-gray-400" style={{ background: "#e2e2e2" }}>
            app.grelin.ai/rx
          </div>
        </div>
        <img
          src="/rxai-screenshot.png"
          alt="Rx.ai interface"
          className="w-full flex-1 object-cover object-left-top min-h-0"
        />
      </div>
    </div>
    {showBody && (
      <div className="bg-white border-t border-[rgba(20,33,61,0.07)] px-4 py-3.5">
        <CardTag>Prescription integrity</CardTag>
        <p className="text-[15px] font-semibold text-[#0B1120] mb-1">Rx.ai</p>
        <p className="text-[11.5px] text-[#4A5568] leading-relaxed mb-2.5">Prescription claim integrity before dispensing. Catch documentation and coverage gaps before they become denials.</p>
        <a href="#" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold text-white transition-colors" style={{ background: "#4F46E5" }}>
          Explore Rx.ai →
        </a>
      </div>
    )}
  </div>
);

/* ─── Card 1 — Wound.ai ──────────────────────────────────────────────────── */
/* Teal bg · panel anchored left+bottom (bleeds left edge) */

const WoundCard = ({ showBody = true }: { showBody?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden ${showBody ? "border border-[rgba(49,82,173,0.25)]" : ""}`}>
    <div className="relative overflow-hidden" style={{ height: showBody ? "260px" : "420px", background: "#073D50" }}>
      <DotGrid opacity={0.18} />
      {/* Panel: flush left, raised top, bleeds bottom — creates "cropped UI" feel */}
      <div className="absolute left-0 right-6 top-6 bottom-0 bg-white rounded-tr-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(20,33,61,0.08)] flex items-center justify-between shrink-0">
          <div>
            <p className="text-[13px] font-bold text-[#0B1120] tracking-tight">Chart.ai — Documentation Review</p>
            <p className="text-[10.5px] text-[#6B7280] mt-0.5">Patient #3847 · Sarah M. · Admitted 04/01/26</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <Pill variant="gap">Stage III</Pill>
            <Pill variant="review">High Risk</Pill>
          </div>
        </div>
        {/* Doc completeness progress */}
        <div className="px-5 pt-3 pb-2 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-[#374151]">Documentation completeness</span>
            <span className="text-[11px] font-bold text-[#D97706]">61%</span>
          </div>
          <div className="h-2 bg-[rgba(20,33,61,0.08)] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#FCA311]" style={{ width: "61%" }} />
          </div>
        </div>
        {/* Audit table */}
        <div className="px-5 py-1 flex-1 overflow-hidden">
          <table className="w-full text-[11.5px]">
            <tbody>
              {[
                { key: "Wound type",     val: "Pressure ulcer — sacral",  pill: <Pill variant="gap">Gap</Pill> },
                { key: "ICD-10 code",    val: "L89.313 · L89.154",        pill: <Pill variant="ok">Verified</Pill> },
                { key: "Debridement",    val: "Note missing 04/03",        pill: <Pill variant="review">Review</Pill> },
                { key: "Photo doc.",     val: "2 of 4 uploaded",            pill: <Pill variant="gap">Incomplete</Pill> },
                { key: "Complexity",     val: "Multi-wound · 3 sites",     pill: <Pill variant="review">Flag</Pill> },
                { key: "Measurements",   val: "Dimensions not recorded",   pill: <Pill variant="gap">Missing</Pill> },
              ].map((row, i) => (
                <tr key={i} className="h-[28px] border-b border-[rgba(20,33,61,0.06)] last:border-0">
                  <td className="font-semibold text-[#374151] w-[36%] pr-2">{row.key}</td>
                  <td className="text-[#6B7280] text-[10.5px]">{row.val}</td>
                  <td className="text-right">{row.pill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Alert footer */}
        <div className="px-5 pb-5 shrink-0">
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-[#92400E]">4 documentation gaps detected</p>
              <p className="text-[10px] text-[#B45309] mt-0.5">Est. $2,640 at risk · Pre-bill action required</p>
            </div>
            <span className="text-[11px] font-bold text-[#D97706] ml-4 shrink-0">Resolve →</span>
          </div>
        </div>
      </div>
    </div>
    {showBody && <CardBody tag="Clinical integrity" name="Chart.ai" desc="Clinical claim integrity before billing. Validate documentation, coding, and payer requirements before the claim exists." cta="Explore Chart.ai →" />}
  </div>
);

/* ─── Card 2 — Pain.ai ───────────────────────────────────────────────────── */
/* Brand blue bg · panel anchored right+bottom */

const PainCard = ({ showBody = true }: { showBody?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden ${showBody ? "border border-[rgba(49,82,173,0.25)]" : ""}`}>
    <div className="relative overflow-hidden" style={{ height: showBody ? "260px" : "420px", background: "#3152AD" }}>
      <ArcPattern />
      {/* Panel: flush right, raised top, bleeds bottom */}
      <div className="absolute left-6 right-0 top-6 bottom-0 bg-[#FAFAFA] rounded-tl-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(20,33,61,0.07)] flex items-center justify-between shrink-0">
          <div>
            <p className="text-[13px] font-bold text-[#0B1120]">Pain.ai — Code Validation</p>
            <p className="text-[10.5px] text-[#6B7280] mt-0.5">Epidural steroid inj. · CPT 64483 · 04/09/26</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <Pill variant="blue">CPT 64483</Pill>
            <Pill variant="gap">Mismatch</Pill>
          </div>
        </div>
        {/* Score indicator */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-4 shrink-0">
          <div className="relative w-14 h-14 shrink-0">
            <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(20,33,61,0.08)" strokeWidth="5" />
              <circle cx="28" cy="28" r="22" fill="none" stroke="#FCA311" strokeWidth="5"
                strokeDasharray={`${2 * Math.PI * 22 * 0.67} ${2 * Math.PI * 22 * 0.33}`}
                strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[14px] font-bold text-[#0B1120]">67</span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#374151]">Validation Score</p>
            <p className="text-[10.5px] text-[#6B7280]">3 of 5 checks passed</p>
            <p className="text-[10px] text-[#E24B4A] font-medium mt-0.5">Action required before submission</p>
          </div>
        </div>
        {/* Validation bars */}
        <div className="px-5 py-2 flex-1 overflow-hidden">
          {[
            { label: "Code accuracy",    pct: 82, color: "#FCA311" },
            { label: "Doc alignment",    pct: 52, color: "#E24B4A" },
            { label: "Modifier check",   pct: 74, color: "#FCA311" },
            { label: "Laterality match", pct: 95, color: "#27AE60" },
            { label: "Diagnosis link",   pct: 61, color: "#FCA311" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-3 mb-3 last:mb-0">
              <span className="text-[11px] text-[#6B7280] w-[115px] shrink-0">{b.label}</span>
              <div className="flex-1 h-[7px] bg-[rgba(20,33,61,0.08)] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
              <span className="text-[11px] font-semibold text-[#374151] w-8 text-right">{b.pct}%</span>
            </div>
          ))}
        </div>
        {/* Alert footer */}
        <div className="px-5 pb-5 shrink-0">
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-[#991B1B]">Risk: Medium · 2 code issues flagged</p>
              <p className="text-[10px] text-[#B91C1C] mt-0.5">Modifier 59 conflict · Diagnosis linkage incomplete</p>
            </div>
            <span className="text-[11px] font-bold text-[#DC2626] ml-4 shrink-0">Review →</span>
          </div>
        </div>
      </div>
    </div>
    {showBody && <CardBody tag="Pain management" name="Pain.ai" desc="AI-powered billing validation for pain management. Prevent coding and documentation misalignment before submission." cta="Explore Pain.ai →" />}
  </div>
);

/* ─── Card 3 — PriorAuth.ai ──────────────────────────────────────────────── */
/* Yellow bg · panel centered (inset) */

const PriorAuthCard = ({ showBody = true }: { showBody?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden ${showBody ? "border border-[rgba(49,82,173,0.25)]" : ""}`}>
    <div className="relative overflow-hidden" style={{ height: showBody ? "260px" : "420px", background: "#E8940A" }}>
      {/* Subtle arc pattern on yellow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 420" fill="none" preserveAspectRatio="xMidYMid slice">
        <circle cx="60"  cy="80"  r="180" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
        <circle cx="350" cy="340" r="160" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
        <circle cx="200" cy="440" r="140" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
      </svg>
      {/* Panel centered */}
      <div className="absolute inset-5 bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(20,33,61,0.08)] flex items-center justify-between shrink-0">
          <div>
            <p className="text-[13px] font-bold text-[#0B1120]">PriorAuth.ai — Gap Scan</p>
            <p className="text-[10.5px] text-[#6B7280] mt-0.5">Claim #PA-2024-881 · Multi-procedure · 04/09/26</p>
          </div>
          <Pill variant="gap">2 Gaps Found</Pill>
        </div>
        {/* Auth items */}
        <div className="px-5 py-2 flex-1 overflow-hidden">
          {[
            { dot: "#27AE60", label: "Spine injection L3–L4",    sub: "Auth #AUT-4412 · valid thru 06/30/26",    pill: <Pill variant="ok">Approved</Pill> },
            { dot: "#E24B4A", label: "MRI lumbar w/ contrast",   sub: "No active authorization on file",         pill: <Pill variant="gap">Gap</Pill> },
            { dot: "#FCA311", label: "PT sessions — 12 req.",    sub: "6 of 12 approved · renewal pending",       pill: <Pill variant="review">Partial</Pill> },
            { dot: "#3152AD", label: "Lab panel — CBC/CMP",      sub: "Payer response awaited · sent 04/07",      pill: <Pill variant="blue">Pending</Pill> },
            { dot: "#27AE60", label: "Fluoroscopy guidance",      sub: "Bundled with spine auth · confirmed",     pill: <Pill variant="ok">Approved</Pill> },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-[rgba(20,33,61,0.06)] last:border-0">
              <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: item.dot }} />
              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] font-semibold text-[#1F2937]">{item.label}</p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">{item.sub}</p>
              </div>
              <div className="shrink-0 mt-0.5">{item.pill}</div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="px-5 pb-5 shrink-0">
          <div className="bg-[#0B1120] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-white">2 upstream gaps · Est. $3,200 at risk</p>
              <p className="text-[10px] text-white/50 mt-0.5">MRI auth missing · PT partial approval</p>
            </div>
            <span className="text-[11px] font-bold text-[#FCA311] ml-4 shrink-0">Fix now →</span>
          </div>
        </div>
      </div>
    </div>
    {showBody && <CardBody tag="Authorization" name="PriorAuth.ai" desc="Detect authorization gaps before they delay reimbursement. Reduce friction and prevent claim disruption." cta="Explore PriorAuth.ai →" />}
  </div>
);

/* ─── Card 4 — Eligibility.ai ────────────────────────────────────────────── */
/* Very dark navy bg · panel anchored bottom (flush) */

const EligibilityCard = ({ showBody = true }: { showBody?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden ${showBody ? "border border-[rgba(49,82,173,0.25)]" : ""}`}>
    <div className="relative overflow-hidden" style={{ height: showBody ? "260px" : "420px", background: "#0A3D2E" }}>
      <GWatermark />
      <LineGrid opacity={0.06} />
      {/* Panel: flush bottom, equal sides, raised top — sits like a tray */}
      <div className="absolute left-4 right-4 top-5 bottom-0 bg-[#FAFAFA] rounded-t-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Patient header */}
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(20,33,61,0.07)] flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#3152AD] flex items-center justify-center text-[12px] font-bold text-white shrink-0">JD</div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-[#0B1120]">John Doe · DOB 04/15/1972</p>
            <p className="text-[10.5px] text-[#6B7280]">BlueCross PPO · Member XY-8821043</p>
          </div>
          <Pill variant="gap">Inactive</Pill>
        </div>
        {/* Lapse alert */}
        <div className="mx-5 mt-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-2.5 shrink-0">
          <p className="text-[11px] font-semibold text-[#991B1B]">⚠ Coverage lapsed — verify eligibility before service</p>
          <p className="text-[9.5px] text-[#B91C1C] mt-0.5">Last active: 12/31/25 · Renewal not confirmed</p>
        </div>
        {/* Coverage table */}
        <div className="px-5 py-2 flex-1 overflow-hidden">
          <table className="w-full text-[11.5px]">
            <tbody>
              {[
                { key: "Effective date",  val: "01/01/26 – 12/31/25",  pill: <Pill variant="gap">Lapsed</Pill> },
                { key: "Network status",  val: "In-network (PPO)",      pill: <Pill variant="ok">Verified</Pill> },
                { key: "Deductible",      val: "$1,200 remaining",      pill: <Pill variant="review">Alert</Pill> },
                { key: "Copay",           val: "$40 specialist visit",  pill: <Pill variant="ok">OK</Pill> },
                { key: "Out-of-pocket",   val: "$3,500 max · $2,100 met", pill: <Pill variant="blue">Tracking</Pill> },
                { key: "Authorization",   val: "Required for this svc", pill: <Pill variant="gap">Missing</Pill> },
              ].map((row, i) => (
                <tr key={i} className="h-[28px] border-b border-[rgba(20,33,61,0.06)] last:border-0">
                  <td className="font-semibold text-[#374151] w-[38%] pr-2">{row.key}</td>
                  <td className="text-[#6B7280] text-[10.5px]">{row.val}</td>
                  <td className="text-right">{row.pill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {showBody && <CardBody tag="Eligibility" name="Eligibility.ai" desc="Catch coverage and eligibility breakdowns upstream. Minimize preventable claim rejections tied to payer verification." cta="Explore Eligibility.ai →" />}
  </div>
);

/* ─── Card 5 — Performance.ai ────────────────────────────────────────────── */
/* Dark indigo bg · panel anchored right+bottom */

const weeklyBars = [
  { h: 45, c: "#8FA8D0" },
  { h: 60, c: "#8FA8D0" },
  { h: 72, c: "#FCA311" },
  { h: 55, c: "#8FA8D0" },
  { h: 38, c: "#E24B4A" },
  { h: 82, c: "#27AE60" },
  { h: 65, c: "#8FA8D0" },
  { h: 50, c: "#8FA8D0" },
  { h: 70, c: "#FCA311" },
  { h: 44, c: "#8FA8D0" },
  { h: 90, c: "#27AE60" },
  { h: 62, c: "#8FA8D0" },
];

const PerformanceCard = ({ showBody = true }: { showBody?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden ${showBody ? "border border-[rgba(49,82,173,0.25)]" : ""}`}>
    <div className="relative overflow-hidden" style={{ height: showBody ? "260px" : "420px", background: "#1D2C66" }}>
      <DotGrid opacity={0.14} />
      {/* Panel: flush right, raised top, bleeds bottom */}
      <div className="absolute left-5 right-0 top-6 bottom-0 bg-white rounded-tl-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(20,33,61,0.07)] flex items-center justify-between shrink-0">
          <div>
            <p className="text-[13px] font-bold text-[#0B1120]">RCM.ai — Revenue Dashboard</p>
            <p className="text-[10.5px] text-[#6B7280] mt-0.5">Revenue overview · Apr 2026</p>
          </div>
          <Pill variant="ok">+11% vs last month</Pill>
        </div>
        {/* KPI tiles */}
        <div className="px-5 pt-3 pb-2 shrink-0">
          <div className="flex gap-2">
            {[
              { val: "$2.4M", label: "At-risk revenue", color: "#0B1120" },
              { val: "18%",   label: "Denial rate",     color: "#E24B4A" },
              { val: "+11%",  label: "Recovery trend",  color: "#27AE60" },
            ].map((s) => (
              <div key={s.label} className="flex-1 bg-[rgba(20,33,61,0.04)] rounded-xl py-2.5 text-center">
                <p className="text-[15px] font-bold leading-none" style={{ color: s.color }}>{s.val}</p>
                <p className="text-[9.5px] text-[#6B7280] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Bar chart */}
        <div className="px-5 flex-1 flex flex-col pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF] mb-2">Weekly denial trend — Q2 2026</p>
          <div className="flex items-end gap-1 flex-1">
            {weeklyBars.map((b, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${b.h}%`, background: b.c }} />
            ))}
          </div>
          <div className="flex mt-1.5">
            {["W1","","W3","","W5","","W7","","W9","","W11",""].map((w, i) => (
              <span key={i} className="flex-1 text-center text-[9px] text-[#D1D5DB]">{w}</span>
            ))}
          </div>
        </div>
        {/* Top risk items */}
        <div className="px-5 py-2 shrink-0 border-t border-[rgba(20,33,61,0.06)]">
          {[
            { dot: "#E24B4A", text: "Wound care — 34 claims flagged" },
            { dot: "#FCA311", text: "Prior auth gaps — $142K exposure" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: r.dot }} />
              <span className="text-[10.5px] text-[#374151]">{r.text}</span>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="px-5 pb-5 shrink-0">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-[#166534]">Recovery up 11% · 3 risk patterns resolved</p>
              <p className="text-[10px] text-[#15803D] mt-0.5">Avg resolution time: 1.4 days pre-bill</p>
            </div>
            <span className="text-[11px] font-bold text-[#15803D] ml-4 shrink-0">Full report →</span>
          </div>
        </div>
      </div>
    </div>
    {showBody && <CardBody tag="Revenue integrity" name="RCM.ai" desc="Revenue integrity before claim submission. Prevent client-specific, specialty, and payer errors before they become rework." cta="Explore RCM.ai →" />}
  </div>
);

/* ─── Card — Audit.ai ────────────────────────────────────────────────────── */
/* Deep teal-navy bg · payment-integrity audit panel */

const AuditCard = ({ showBody = true }: { showBody?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden ${showBody ? "border border-[rgba(49,82,173,0.25)]" : ""}`}>
    <div className="relative overflow-hidden" style={{ height: showBody ? "260px" : "420px", background: "#0B2E4A" }}>
      <ArcPattern />
      <DotGrid opacity={0.1} />
      {/* Panel centered */}
      <div className="absolute inset-5 bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[rgba(20,33,61,0.08)] flex items-center justify-between shrink-0">
          <div>
            <p className="text-[13px] font-bold text-[#0B1120]">Audit.ai — Payment Integrity</p>
            <p className="text-[10.5px] text-[#6B7280] mt-0.5">Run #AUD-4471 · 12,480 claims · 04/09/26</p>
          </div>
          <Pill variant="review">Review queue</Pill>
        </div>
        {/* Summary tiles */}
        <div className="px-5 pt-3 pb-2 shrink-0">
          <div className="flex gap-2">
            {[
              { val: "100%", label: "Audited", color: "#0B1120" },
              { val: "$8.4K", label: "Leakage", color: "#E24B4A" },
              { val: "98.4%", label: "Clean rate", color: "#27AE60" },
            ].map((s) => (
              <div key={s.label} className="flex-1 bg-[rgba(20,33,61,0.04)] rounded-xl py-2.5 text-center">
                <p className="text-[15px] font-bold leading-none" style={{ color: s.color }}>{s.val}</p>
                <p className="text-[9.5px] text-[#6B7280] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Findings */}
        <div className="px-5 py-1 flex-1 overflow-hidden">
          {[
            { dot: "#E24B4A", label: "Coverage conflict — secondary policy", sub: "CLM-8192 · MSP questionnaire incomplete", pill: <Pill variant="gap">94%</Pill> },
            { dot: "#FCA311", label: "Coding mismatch — modifier bundle", sub: "CLM-7703 · HBOT modifier validation", pill: <Pill variant="review">88%</Pill> },
            { dot: "#FCA311", label: "Policy alignment — prior auth token", sub: "CLM-9021 · epidural without active PA", pill: <Pill variant="review">78%</Pill> },
            { dot: "#27AE60", label: "Documentation — measurements present", sub: "CLM-5521 · cleared by audit engine", pill: <Pill variant="ok">Clean</Pill> },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-[rgba(20,33,61,0.06)] last:border-0">
              <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: item.dot }} />
              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] font-semibold text-[#1F2937] truncate">{item.label}</p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5 truncate">{item.sub}</p>
              </div>
              <div className="shrink-0 mt-0.5">{item.pill}</div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="px-5 pb-5 shrink-0">
          <div className="bg-[#0B1120] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-white">3 overpayment risks flagged before reimbursement</p>
              <p className="text-[10px] text-white/50 mt-0.5">Reasoned findings · ranked review queue</p>
            </div>
            <span className="text-[11px] font-bold text-[#FCA311] ml-4 shrink-0">Review →</span>
          </div>
        </div>
      </div>
    </div>
    {showBody && <CardBody tag="Payment integrity" name="Audit.ai" desc="Payment integrity before reimbursement. Detect coverage, coding, and policy conflicts before overpayments happen." cta="Explore Audit.ai →" />}
  </div>
);

/* ─── Card registry ──────────────────────────────────────────────────────── */

const CARDS = [
  <RxAiCard key="rx" />,
  <AuditCard key="audit" />,
  <PerformanceCard key="rcm" />,
  <WoundCard key="chart" />,
  <PainCard key="pain" />,
  <PriorAuthCard key="prior" />,
  <EligibilityCard key="elig" />,
];

const ILLUSTRATION_CARDS = [
  <RxAiCard key="rx-il" showBody={false} />,
  <AuditCard key="audit-il" showBody={false} />,
  <PerformanceCard key="rcm-il" showBody={false} />,
  <WoundCard key="chart-il" showBody={false} />,
  <PainCard key="pain-il" showBody={false} />,
  <PriorAuthCard key="prior-il" showBody={false} />,
  <EligibilityCard key="elig-il" showBody={false} />,
];

/* ─── Step data ──────────────────────────────────────────────────────────── */

const STEPS = [
  { num: "01", name: "Rx.ai",         desc: "Prescription claim integrity before dispensing. Catch documentation and coverage gaps before they become denials.", href: '/rxai' },
  { num: "02", name: "Audit.ai",      desc: "Payment integrity before reimbursement. Detect coverage, coding, and policy conflicts before overpayments happen.", href: '/auditai' },
  { num: "03", name: "RCM.ai",        desc: "Revenue integrity before claim submission. Prevent client-specific, specialty, and payer errors before they become rework.", href: '/rcmai' },
  { num: "04", name: "Chart.ai",      desc: "Clinical claim integrity before billing. Validate documentation, coding, and payer requirements before the claim exists.", href: '/claimintegrity' },
  { num: "05", name: "Pain.ai",       desc: "AI-powered billing validation for pain management. Prevent coding and documentation misalignment before submission.", href: '/pain' },
  { num: "06", name: "PriorAuth.ai",  desc: "Detect authorization gaps before they delay reimbursement and disrupt claims.", href: '/priorauth' },
  { num: "07", name: "Eligibility.ai", desc: "Catch coverage and eligibility breakdowns upstream. Minimize preventable claim rejections.", href: '/eligibility' },
];

/* ─── Left panel ─────────────────────────────────────────────────────────── */

function LeftPanel({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="lg:w-[44%]">
      <div>
        {STEPS.map((step, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <div
              key={i}
              className={`py-4 border-b border-white/[0.07] last:border-0 transition-opacity duration-300 ${
                !isActive && !isPast ? "opacity-20" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs font-mono font-bold tabular-nums transition-colors duration-300 w-6 shrink-0 ${
                    isActive ? "text-[#FCA311]" : "text-white/20"
                  }`}
                >
                  {step.num}
                </span>
                <span
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isActive ? "text-white" : isPast ? "text-white/40" : "text-white/30"
                  }`}
                >
                  {step.name}
                </span>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-10"
                  >
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                    <a
                      href={step.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/8 hover:text-white transition-colors"
                    >
                      Explore {step.name} →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function ProductCardsSection() {
  const shouldReduceMotion = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const N = CARDS.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(N - 1, Math.floor(v * N)));
  });

  /* ─��� Shared heading (above both mobile and desktop) ── */
  const heading = (
    <div className="bg-brand-dark px-4 sm:px-8 md:px-16 pt-12 md:pt-20 pb-8 md:pb-12">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance">
          Purpose-built AI applications.{" "}
          <span className="text-[#3152AD]">Powered by Grelin</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg mt-4 md:mt-5 leading-relaxed">
          Each application targets a specific pre-bill revenue risk — all powered by the same intelligence engine.
        </p>
      </motion.div>
    </div>
  );

  /* ── Mobile / tablet: card grid ── */
  return (
    <>
      {heading}
      <section className="lg:hidden bg-brand-dark px-4 sm:px-8 md:px-16 pb-12 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {CARDS.map((card, i) => (
              <div key={i}>
                {card}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop: sticky scroll ── */}
      <div
        ref={outerRef}
        className="hidden lg:block relative bg-brand-dark"
        style={{ height: `${N * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center px-8 md:px-16">
          <div className="mx-auto max-w-7xl w-full flex flex-row gap-12 xl:gap-20 items-center">
            <LeftPanel activeIndex={activeIndex} />

            {/* Right: illustration only, fixed height container */}
            <div className="flex-1 relative" style={{ height: "420px" }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {ILLUSTRATION_CARDS[activeIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
