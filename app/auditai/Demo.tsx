"use client";

import React from "react";
import { motion, easeOut, type HTMLMotionProps } from "framer-motion";

type PresetAnomaly = { id: number; label: string };
type ClaimData = { initials: string; value: string; cpt: string; specialty: string; notes: string; preset: number };
type ProcessingLayer = { id: number; code: string; title: string; status: "PENDING GATEWAY" };

const presets: PresetAnomaly[] = [1, 2, 3, 4, 5].map(n => ({ id: n, label: `#${n}` }));
const layers: ProcessingLayer[] = [
    { id: 1, code: "L1", title: "INTAKE AND ELIGIBILITY", status: "PENDING GATEWAY" },
    { id: 2, code: "L2", title: "CLASSIFICATION", status: "PENDING GATEWAY" },
    { id: 3, code: "L3", title: "CODING AND CLINICAL", status: "PENDING GATEWAY" },
    { id: 4, code: "L4", title: "BILLING AND AUTHORIZATION", status: "PENDING GATEWAY" },
    { id: 5, code: "L5", title: "DOCUMENTATION AND UTILIZATION", status: "PENDING GATEWAY" },
    { id: 6, code: "L6", title: "FRAUD, RISK AND PAYMENT", status: "PENDING GATEWAY" },
];

const cardV = {
    hidden: { y: 50, opacity: 0 },
    show: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.2, duration: 0.5, ease: easeOut },
    }),
};
export default function AuditClaimsDemo() {
    const [data, setData] = React.useState<ClaimData>({
        initials: "M.H.", value: "1250", cpt: "92134",
        specialty: "Vision", notes: "Phantom billing for specialized advanced retinal scan equipment not present at the facility.",
        preset: 1
    });
    const set = (k: keyof ClaimData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setData(v => ({ ...v, [k]: e.target.value }));
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="min-h-screen bg-gradient-to-b from-[#0A1628] to-[#1E3A8A] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 space-y-6">
            <div className="text-center space-y-2">
                <div className="text-xs tracking-widest uppercase text-[#3B82F6]">HANDS-ON PROOF</div>
                <h1 className="text-3xl md:text-5xl font-semibold">See Audit.ai on your own claims.</h1>
                <p className="text-sm md:text-base text-[#94A3B8]">Bring a representative claim parameters below. Run it through our interactive six layers and generate a reasoned, defensible queue verdict instantly.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-x-[4vw] gap-y-8">
                {/* <AnimatePresence> */}
                    <motion.div custom={0} initial="hidden" animate="show" variants={cardV} className="bg-[#0F172A] rounded-2xl p-8 border border-blue-900/30 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_40px_rgba(59,130,246,0.08)]">
                        <div className="text-xs text-[#94A3B8] mb-4">SELECT A KNOWN PRESET ANOMALY</div>
                        <div className="flex gap-2 mb-1">
                            {presets.map(p => (<motion.button key={p.id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} onClick={() => setData(v => ({ ...v, preset: p.id }))} className={`flex-1 py-2 rounded-md text-sm border ${data.preset === p.id ? "bg-[#3B82F6] border-transparent" : "bg-[#0F172A] border-slate-700"} `}>{p.label}</motion.button>))}
                        </div>
                        <div className="text-[11px] text-[#94A3B8] mb-4">Preset #1: Flagging 'Fraud' anomaly factors.</div>
                        <div className="space-y-4">
                            <Field label="Patient Initials">
                                <Input value={data.initials} onChange={set("initials")} />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Claim Value (USD)">
                                    <Input value={data.value} onChange={set("value")} />
                                </Field>
                                <Field label="Service CPT Code">
                                    <Input value={data.cpt} onChange={set("cpt")} />
                                </Field>
                            </div>
                            <Field label="Claim Specialty Type">
                                <Select value={data.specialty} onChange={set("specialty")}>
                                    <option>Vision</option>

                                </Select>
                            </Field>
                            <Field label="Auditing Clinical/Billing Notes or Diagnoses">
                                <Textarea value={data.notes} onChange={set("notes")} />
                            </Field>

                            <div className="text-[11px] text-[#94A3B8]">Use words like 'phantom billing', 'duplicate', 'upcycle' or 'completer' to trigger the respective logic checks.</div>
                            <motion.button whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgba(59,130,246,.6),0 0 24px rgba(59,130,246,.35)" }} transition={{ duration: 0.3 }} className="w-full inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:brightness-110 active:scale-95 text-white rounded-lg py-3 text-sm">
                                <ShieldIcon /> PROCESS 29 AUDIT CHECKS
                            </motion.button>
                        </div>
                    </motion.div>
                    <motion.div custom={1} initial="hidden" animate="show" variants={cardV} className="bg-[#0F172A] rounded-2xl p-8 border border-blue-900/30 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_40px_rgba(59,130,246,0.08)]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-xs text-[#94A3B8] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />CLAIMS INTEGRITY PROCESSING UNIT
                            </div>
                            <div className="text-[11px] text-[#94A3B8]">Prepared id Grelin</div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-4">
                            <span>Audit analysis compliance: 0%</span>
                            <span className="text-[#3B82F6]">Active Layer: 0/6</span>
                        </div>
                        <div className="space-y-4">{layers.map(l => (<motion.div key={l.id} whileHover={{ scale: 1.1 }} className="flex items-center justify-between bg-[#0F172A] border-b border-slate-700/60 px-4 py-3">
                            <span className="text-sm text-slate-200">{l.code}&nbsp;&nbsp;{l.title}</span>
                            <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="text-xs text-slate-400">PENDING GATEWAY</motion.span>
                        </motion.div>))}
                        </div>
                        <div className="mt-6 text-center text-[11px] text-[#94A3B8]">Confederate claims data parameters on the left and select 'Process' to test live results.</div>
                    </motion.div>
                {/* </AnimatePresence> */}
            </div>
        </div>
    </motion.div>);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block text-sm">{<span className="mb-2 block text-[#94A3B8]">
            {label}</span>}{children}</label>
    )
}

function Input(props: HTMLMotionProps<"input">) {
  return (
    <motion.input
      whileFocus={{ boxShadow: "0 0 0 2px rgba(59,130,246,.5)" }}
      className="w-full bg-[#1E293B] border border-slate-600/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
      {...props}
    />
  );
}
function Textarea(props: HTMLMotionProps<"textarea">) {
  return (
    <motion.textarea
      whileFocus={{ boxShadow: "0 0 0 2px rgba(59,130,246,.5)" }}
      rows={4}
      className="w-full bg-[#1E293B] border border-slate-600/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
      {...props}
    />
  );
}
function Select(props: HTMLMotionProps<"select">) {
  return (
    <motion.select
      whileFocus={{ boxShadow: "0 0 0 2px rgba(59,130,246,.5)" }}
      className="w-full bg-[#1E293B] border border-slate-600/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B82F6]"
      {...props}
    />
  );
}

function ShieldIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V5l7-3z" stroke="white" strokeWidth="1.5" /></svg>) }