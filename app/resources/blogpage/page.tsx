"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion, useReducedMotion } from "framer-motion";
import { Bookmark, Calendar, ChevronDown, ChevronRight, Clock, Share2 } from "lucide-react";
import { useEffect, useState } from "react";



const FAQS = [
  {
    q: "Does implementing Claim Integrity require changing our EMR/EHR provider?",
    a: "No. Grelin Health is built as a lightweight intelligence layer. We integrate directly into your existing Epic, Cerner, or Athena workflows via silent, standard HL7/FHIR APIs. Doctors and registrars work in their preferred systems; Grelin simply delivers warnings right into their native interface.",
  },
  { q: "How does Claim Integrity differ from traditional Claim Scrubbing?", a: "" },
  { q: "Where do most claim errors actually originate?", a: "" },
  { q: "Why does reactive post-claim processing cost hospitals so much?", a: "" },
];

const RELATED = [
  { title: "Optimizing Out-of-Network Revenue...", desc: "How to spot medical contracts use automated workflows to capture the missing." },
  { title: "The Future of Hospital Billing...", desc: "Anticipating the shift in regulatory compliance and the move toward transparent..." },
  { title: "Navigating Payer Contracts in 2024", desc: "A guide to ERAs in managing dynamic contracts, negotiations and rebuilding claim detail..." },
  { title: "Introducing Automated...", desc: "Explore how our latest platform reduces manual entry in medical..." },
];

/* ─── Animation helper ───────────────────────────────────────────────────────── */

function AnimatedContainer({
  delay = 0.1,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (mounted && shouldReduceMotion) return <div className={className}>{children}</div>;
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

export default function BlogPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-[#0B1120] text-white">
      <Navbar />

      {/* Hero */}
      <section id="news-page" className="pt-32 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(80,90,200,0.15),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl m-20"
        >
                    {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <a href="/resources" className="cursor-pointer hover:text-white transition-colors">Resources</a>
              <ChevronRight size={12} />
              <a href="/resources/blog" className="cursor-pointer hover:text-white transition-colors">Blog</a>
              <ChevronRight size={12} />
              <span className="text-white/60">Claim Integrity</span>
            </nav>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight">What Is Claim Integrity?</h1>
          <p className="mt-5 text-white/65 max-w-2xl leading-relaxed">
            Claim Integrity means confirming a healthcare claim is correct before it is created. Here is what the term means and why it matters.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-2 border-[#FFFFFF1A] ">
            <div className="flex flex-wrap items-center gap-5 text-sm text-white">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gradient-to-br from-brand to-brand-2 leading-tight" />
                Grelin Health Editorial
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5"><Clock className="size-4" /> 4 min read</div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5"><Calendar className="size-4" /> June 3, 2026</div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
                <Share2 className="size-3.5" /> Share
              </button>
              <button className="rounded-md border border-white/15 bg-white/5 p-2 hover:bg-white/10">
                <Bookmark className="size-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TLDR card */}
      <section className="bg-[oklch(0.96_0.013_250)] text-ink px-6 lg:px-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01, margin: "0px 0px -120px 0px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl border rounded-xl p-8"
        >
          <blockquote className="border-l-2 border-brand pl-5">
            <p className="text-lg font-medium bg-[#E4F0FF] text-[#334155]">Claim Integrity is the practice of confirming a healthcare claim is correct before it is created.</p>
          </blockquote>
          <p className="mt-6 text-sm text-[#475569] leading-relaxed">
            It is a shift in where the work happens. Instead of checking claims after they are built, Claim Integrity checks the documentation and coding logic at the point the claim forms.
          </p>
          <div className="mt-8 rounded-xl bg-[#E4F0FF] border border-ink/5 p-5">
            <div className="text-[11px] tracking-widest uppercase text-[#002B5B] text-brand font-semibold">The shift in timing</div>
            <p className="mt-3 text-sm text-[#334155] leading-relaxed">
              By sliding logic evaluation to the inception of a code encounter, systems resolve structural inaccuracies in clinical records while the clinical provider still owns the clinical context.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Article body */}
      <section className="px-6 lg:px-10 py-20 bg-[#0B1120] text-white">
        <div className="mx-auto max-w-3xl space-y-12">
          {[
            {
              h: "What a healthcare claim actually is",
              body: [
                "A claim is the record a provider sends to a payer to get paid for care. A payer is the insurer or program responsible for payment.",
                "The claim lists the diagnosis, the services performed, and the codes that describe both. The payer reads it and makes a decision. Pay it, reduce it, or deny it.",
              ],
              quote: '"So a claim is not paperwork. It is a request for a decision. Everything inside it shapes the answer."',
            },
            {
              h: "Where claim errors really start",
              body: [
                "Most claim errors are not created in billing. They are created upstream.",
                "By upstream, I mean the steps that happen before a claim exists: patient registration, insurance verification, prior authorization, clinical documentation, and charge capture.",
                "If a required authorization is missing, the claim is already wrong. If the documentation does not support the code, the claim is already wrong. Billing inherits the error. It does not cause it.",
              ],
            },
            {
              h: "How Claim Integrity differs from the old model",
              body: [
                "The old model is post-claim. Build the claim, submit it, wait for the denial, then rework it. That is reactive and slow.",
                "Claim Integrity is pre-claim. It moves the check to the moment the claim is assembled. The problem gets caught while it is still cheap to fix.",
              ],
              bold: "The difference is timing. Same payer rules, applied earlier.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01, margin: "0px 0px -120px 0px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold">{s.h}</h2>
              <div className="mt-4 space-y-4 text-white/70 leading-relaxed text-[15px]">
                {s.body.map((p, j) => <p key={j}>{p}</p>)}
                {s.quote && (
                  <blockquote className="border-l-2 border-white/20 pl-4 italic text-white/60">{s.quote}</blockquote>
                )}
                {s.bold && <p className="text-white font-medium">{s.bold}</p>}
              </div>
            </motion.div>
          ))}

          {/* Comparison cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white p-5">
              <div className="text-[10px] tracking-widest uppercase text-rose-400 font-semibold">Post-claim model</div>
              <div className="mt-3 font-mono text-sm text-bold text-[#002B5B]">Submit → Deny → Correct</div>
              <p className="mt-3 text-xs text-[#6B7280]">Reactive. Heavy rework cycle with manual work.</p>
            </div>
            <div className="rounded-xl border border-brand/40 bg-white p-5">
              <div className="text-[10px] tracking-widest uppercase text-[#2563EB] font-semibold">Modern claim integrity</div>
              <div className="mt-3 font-mono text-sm text-bold text-[#002B5B]">Validate → Resolve → Submit</div>
              <p className="mt-3 text-xs text-[#6B7280]">Proactive. Catch errors before they still leave a.</p>
            </div>
          </div>

          {[
            {
              h: "What Claim Integrity looks like in practice",
              body: [
                "In practice, Claim Integrity means every claim is validated against payer-specific rules before submission.",
                "It confirms the documentation supports the codes. It confirms required authorizations exist. It confirms the claim matches the rules of the specific payer it is going to.",
                "Clean claims move forward. Problem claims are flagged with the exact reason and the fix, before they leave the building.",
              ],
            },
            {
              h: "Why the category exists now",
              body: [
                "Healthcare billing rules have grown more complex. Each payer maintains its own logic. Claim volume keeps rising. A small error now repeats across thousands of claims.",
                "Checking claims after the fact cannot keep pace with that. Claim Integrity exists because the durable fix is to make claims correct before they are built.",
              ],
            },
          ].map((s, i) => (
            <motion.div
              key={i + "b"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01, margin: "0px 0px -120px 0px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold">{s.h}</h2>
              <div className="mt-4 space-y-4 text-white/70 leading-relaxed text-[15px]">
                {s.body.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            </motion.div>
          ))}

          <div className="border-t border-white/10 pt-10 flex flex-col items-center gap-4">
            <div className="text-[11px] tracking-widest uppercase text-white/50">Was this brief research post helpful?</div>
            <div className="flex gap-3">
              <button className="rounded-md border border-white bg-white/5 px-4 py-2 text-sm hover:bg-white/10">👍 Yes, definitely</button>
              <button className="rounded-md border border-white bg-white/5 px-4 py-2 text-sm hover:bg-white/10">💡 Could use more detail</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white text-ink px-6 lg:px-10 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-[11px] tracking-widest uppercase text-[#1A6CB5] text-brand font-semibold">Expert Board Perspectives</div>
          <h2 className="mt-3 text-4xl font-semibold text-[#082B7A] tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-3 text-sm text-ink/60">
            Clear questions addressing implementation scope, timing logic, and commercial payer parameters.
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-3xl space-y-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <motion.div
                key={i}
                initial={false}
                className={`rounded-xl border transition-colors ${open ? "border-[#6366F1] bg-brand/5" : "border-[#E5E7EB] bg-white"}`}
              >
                <button
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-[#0B1222]">{f.q}</span>
                  <ChevronDown className={`size-4 text-[#6366F1] transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {f.a && (
                    <div className="px-5 pb-5 text-sm text-[#475569] leading-relaxed">{f.a}</div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Related */}
      <section className="bg-ink px-6 lg:px-10 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-[11px] tracking-widest uppercase text-[#3B82F6]">Deepen your domain knowledge</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">Related Reading</h2>
          <p className="mt-3 text-sm text-[#9CA3AF] max-w-2xl">
            Understand the intricacies of hospital billing networks, contract management, and how our platform simplifies complex financial workflows.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RELATED.map((r, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01, margin: "0px 0px -120px 0px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 border-t-[#3B82F6] h-[239px] border-4 bg-[#0A192F] p-5 flex flex-col gap-3 hover:bg-white/[0.06] transition-colors"
              >
                <h3 className="font-semibold leading-snug text-white">{r.title}</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-3">{r.desc}</p>
                <div className="mt-auto pt-6 flex items-center justify-between text-xs text-white/60">
                  <span>Read More</span>
                  <span className="text-[#3B82F6]">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
