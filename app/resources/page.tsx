"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import {
  BookOpen,
  Video,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Clock,
  ChevronDown,
  Play,
  FileText,
  Lock,
  CheckCircle2,
  Tag,
  Newspaper,
} from "lucide-react";
import { Footer } from "@/components/Footer";
// import { HanddrawnBlogIllustration } from "@/components/HanddrawnBlogIllustrations";
import { ComplianceSection } from "./compliance";
import { ResourcesCard } from "./ResourcesCard";
import { NewsCard } from "./NewsCard";


/* ─── Animation helpers ──────────────────────────────────────────────────────── */

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

function ExpandingSection({
  children,
  innerClassName,
}: {
  children: React.ReactNode;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const paddingX = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  if (mounted && shouldReduceMotion) {
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

/* ─── Preview data ───────────────────────────────────────────────────────────── */

const blogPreviews = [
  {
    tag: "Revenue Integrity",
    title: "Why Pre-Bill Validation Is the Future of Healthcare RCM",
    readTime: "6 min read",
    illustration: "clipboard" as const,
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
  },
  {
    tag: "Wound Care",
    title: "The Hidden Revenue Leak in Wound Care Documentation",
    readTime: "5 min read",
    illustration: "bandage" as const,
    color: "#F68F00",
    bg: "rgba(246,143,0,0.08)",
    border: "rgba(246,143,0,0.22)",
  },
  {
    tag: "Pain Management",
    title: "Authorization Gaps in Pain Management: A Preventable Problem",
    readTime: "7 min read",
    illustration: "shield" as const,
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.2)",
  },
];

const videoPreviews = [
  {
    tag: "Platform",
    title: "Grelin Platform Overview",
    duration: "8 min",
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
    link: "https://youtu.be/6wSflRHS-oo?si=2cj1kft47uJpJCbX"
  },
  {
    tag: "Wound Care",
    title: "Wound.ai Deep Dive",
    duration: "15 min",
    color: "#F68F00",
    bg: "rgba(246,143,0,0.08)",
    border: "rgba(246,143,0,0.22)",
    link: "https://youtu.be/3v2CC3kZZf0?si=TdqK3673CfQMThg_"

  },
  {
    tag: "Pain Management",
    title: "Pain.ai: Authorization Intelligence",
    duration: "10 min",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.2)",
    link: "https://youtu.be/srimqyMTpyA?si=FJ9xg85e9m-HHTh6"

  },
];

const faqs = [
  {
    q: "What is Pre-Bill Revenue Integrity?",
    a: "Pre-Bill Revenue Integrity is the practice of validating clinical documentation, eligibility, coding, authorization, and payer policy requirements before a claim is submitted. Grelin's platform performs this validation automatically, surfacing issues while they can still be resolved — rather than discovering them after a denial.",
  },
  {
    q: "How does Grelin integrate with existing billing systems?",
    a: "Grelin is designed to work alongside existing EHR, billing, and RCM infrastructure. Our platform connects to your current workflow and runs validation checks during the pre-billing phase, without requiring you to replace your existing systems.",
  },
  {
    q: "Which specialties does Grelin support?",
    a: "Grelin currently focuses on wound care and pain management — two specialties with complex documentation and prior authorization requirements that are common drivers of denials. Multi-site organizations and MSOs managing these specialties also benefit from Grelin's platform.",
  },
  {
    q: "How long does implementation take?",
    a: "Implementation timelines vary based on your existing infrastructure and workflow. Grelin's team works with your organization to scope and configure the platform for your environment. Contact us to discuss your specific situation.",
  },
  {
    q: "Is Grelin a replacement for my billing team?",
    a: "No. Grelin is designed to augment your billing team — not replace them. The platform surfaces issues and insights before claims are submitted, so your billing team can focus on resolution rather than rework. Fewer denials means less time spent on post-bill correction.",
  },
  {
    q: "What data does Grelin access?",
    a: "Grelin accesses clinical documentation, claim data, eligibility information, and payer policy rules relevant to the pre-billing validation process. All data handling follows HIPAA-compliant practices. See our compliance documentation for details.",
  },
];

// const complianceItems = [
//   {
//     icon: ShieldCheck,
//     title: "HIPAA Compliance",
//     body: "Grelin's platform is built with HIPAA requirements at its foundation. Data handling, access controls, and audit logging are designed to meet the administrative, physical, and technical safeguards required under HIPAA.",
//     color: "#3152AD",
//     bg: "rgba(49,82,173,0.07)",
//     border: "rgba(49,82,173,0.18)",
//   },
//   {
//     icon: Lock,
//     title: "Data Security",
//     body: "All data transmitted to and from the Grelin platform is encrypted in transit and at rest. Access is role-based and logged. Grelin undergoes regular security assessments to maintain the controls expected in healthcare environments.",
//     color: "#16A34A",
//     bg: "rgba(22,163,74,0.07)",
//     border: "rgba(22,163,74,0.2)",
//   },
//   {
//     icon: FileText,
//     title: "Business Associate Agreement",
//     body: "Grelin executes a Business Associate Agreement (BAA) with all customers as required under HIPAA. The BAA outlines data handling responsibilities and obligations for both parties.",
//     color: "#7C3AED",
//     bg: "rgba(124,58,237,0.07)",
//     border: "rgba(124,58,237,0.2)",
//   },
//   {
//     icon: CheckCircle2,
//     title: "Audit & Access Controls",
//     body: "The platform maintains comprehensive audit logs of data access and system activity. Role-based access controls ensure that users can only access data relevant to their function within the organization.",
//     color: "#F68F00",
//     bg: "rgba(246,143,0,0.08)",
//     border: "rgba(246,143,0,0.22)",
//   },
// ];

/* ─── FAQ accordion item ─────────────────────────────────────────────────────── */

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedContainer delay={0.08 + index * 0.07}>
      <div
        className="border-b last:border-b-0 cursor-pointer"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center justify-between gap-4 py-5">
          <p className="text-white font-semibold text-base leading-snug pr-4">{q}</p>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0"
          >
            <ChevronDown size={18} className="text-white/30" />
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden"
        >
          <p className="text-slate-400 text-sm leading-relaxed pb-5">{a}</p>
        </motion.div>
      </div>
    </AnimatedContainer>
  );
}

/* ─── Nav button ─────────────────────────────────────────────────────────────── */

function NavButton({
  label,
  icon: Icon,
  href,
  delay,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.3, duration: 0.3 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200"
      style={{
        background: hovered ? "#ffffff" : "rgba(255,255,255,0.07)",
        color: hovered ? "#0B1120" : "rgba(255,255,255,0.85)",
        border: `1px solid ${hovered ? "transparent" : "rgba(255,255,255,0.14)"}`,
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.25)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <Icon size={16} style={{ opacity: hovered ? 0.7 : 0.6 }} />
      {label}
      <ArrowRight size={13} style={{ opacity: hovered ? 0.5 : 0.35 }} />
    </motion.a>
  );
}

/* ─── Section header shared component ───────────────────────────────────────── */

function SectionHeader({
  icon: Icon,
  label,
  title,
  subtitle,
  href,
  ctaText,
  dark,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  subtitle: string;
  href: string;
  ctaText: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <AnimatedContainer>
          <div className="flex items-center gap-2 mb-3">
            <Icon size={15} className="text-[#FCA311]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#FCA311]">{label}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
            {title}
          </h2>
        </AnimatedContainer>
        <AnimatedContainer delay={0.15}>
          <p className={`text-sm md:text-base leading-relaxed mt-3 max-w-lg ${dark ? "text-slate-400" : "text-gray-500"}`}>
            {subtitle}
          </p>
        </AnimatedContainer>
      </div>
      <AnimatedContainer delay={0.2}>
        <a
          href={href}
          className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            dark
              ? "border border-white/15 bg-white/[0.06] text-white hover:bg-white/12"
              : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 shadow-sm"
          }`}
        >
          {ctaText}
          <ArrowRight size={14} />
        </a>
      </AnimatedContainer>
    </div>
  );
}

// ─── Thumbnail ───────────────────────────────────────────────────────────────────
function YouTubeThumbnail({ url, alt, className }: { url: string; alt: string; className?: string }) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  const id = match?.[1];
  const [src, setSrc] = useState(id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "");

  useEffect(() => {
    if (!id) return;
    fetch(`https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`)
      .then(r => r.json())
      .then(data => setSrc(data.thumbnail_url))
      .catch(() => {}); // keep maxresdefault on error
  }, [id]);

  if (!src) return null;
  return <img src={src} alt={alt} className={className} />;
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function ResourcesPage() {
  return (
    <main className="bg-brand-dark text-white overflow-x-hidden">

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 pt-32 pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[640px] h-[500px] rounded-full bg-[#3152AD] opacity-[0.06] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl w-full flex flex-col items-center gap-8 text-center">
          <AnimatedContainer>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FCA311]/15 border border-[#FCA311]/30 px-5 py-2 text-sm font-semibold text-[#FCA311] tracking-wide">
              <BookOpen size={14} />
              Resources
            </span>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Learn about pre-bill<br />revenue integrity
            </h1>
          </AnimatedContainer>

          <AnimatedContainer delay={0.22}>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Explore articles, product demos, compliance information, and answers to common questions about how Grelin helps healthcare organizations prevent revenue leakage upstream.
            </p>
          </AnimatedContainer>

          {/* Category nav buttons */}
          <AnimatedContainer delay={0.34}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                { label: "Blog", icon: BookOpen, href: "/resources/blog" },
                { label: "Videos", icon: Video, href: "/resources/videos" },
                { label: "News", icon: Newspaper, href: "/resources/news" },
                { label: "FAQs", icon: HelpCircle, href: "#faqs" },
                { label: "Compliance", icon: ShieldCheck, href: "#compliance" },
              ].map((btn, i) => (
                <NavButton key={btn.label} {...btn} delay={0.38 + i * 0.06} />
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* ── 2. Blog preview ──────────────────────────────────────────────────── */}
      {/* <section className="bg-brand-dark px-4 md:px-8 lg:px-16 py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex flex-col gap-10">

          <SectionHeader
            icon={BookOpen}
            label="Blog"
            title="Insights & articles"
            subtitle="Practical perspectives on revenue integrity, denial prevention, and healthcare billing operations."
            href="/resources/blog"
            ctaText="View all articles"
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogPreviews.map((post, i) => (
              <AnimatedContainer key={post.title} delay={0.1 + i * 0.1}>
                <motion.a
                  href="/resources/blog"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="group h-full flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = post.border;
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {/* Thumbnail */}
                  {/* <div
                    className="h-36 flex items-center justify-center shrink-0 relative overflow-hidden"
                    style={{ background: post.color }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.06]" />
                    <div className="relative z-10 scale-75">
                      <HanddrawnBlogIllustration type={post.illustration} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 gap-3 p-5">
                    <span
                      className="self-start inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ color: post.color, background: post.bg, border: `1px solid ${post.border}` }}
                    >
                      <Tag size={8} />
                      {post.tag}
                    </span>
                    <h3 className="text-white font-bold text-sm leading-snug">{post.title}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-auto pt-3 border-t border-white/8">
                      <Clock size={10} />
                      {post.readTime}
                    </div>
                  </div>
                </motion.a>
              </AnimatedContainer>
            ))}
          </div>

        </div> */}
      {/* </section> */}
      <ResourcesCard/>

      {/* ── 3. Videos preview ────────────────────────────────────────────────── */}
      <ExpandingSection>
        <div className="mx-auto max-w-6xl flex flex-col gap-10">

          <SectionHeader
            icon={Video}
            label="Videos"
            title="Walkthroughs & demos"
            subtitle="See Grelin in action — platform overviews, product walkthroughs, and specialty-specific demos."
            href="/resources/videos"
            ctaText="View all videos"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {videoPreviews.map((vid, i) => (
              <AnimatedContainer key={vid.title} delay={0.1 + i * 0.1}>
                <motion.a
                  href="/resources/videos"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="group h-full flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(15,23,42,0.09)",
                    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
                    background: "#ffffff",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-36 relative flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ background: "#f8fafc" }}
                  >
                      <YouTubeThumbnail
                      url={vid.link}
                      alt={vid.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Play size={18} className="text-white ml-0.5 relative" />
                    <span
                      className="absolute bottom-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                      style={{ background: "rgba(15,23,42,0.08)", color: "rgba(15,23,42,0.45)" }}
                    >
                      <Clock size={8} />
                      {vid.duration}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 gap-2 p-5">
                    <span
                      className="self-start inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ color: vid.color, background: vid.bg, border: `1px solid ${vid.border}` }}
                    >
                      <Tag size={8} />
                      {vid.tag}
                    </span>
                    <h3 className="text-gray-900 font-bold text-sm leading-snug">{vid.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-auto pt-3 border-t border-gray-100">
                      <Play size={10} />
                      Watch video
                    </div>
                  </div>
                </motion.a>
              </AnimatedContainer>
            ))}
          </div>

        </div>
      </ExpandingSection>

      <NewsCard />

      {/* ── 4. FAQs ──────────────────────────────────────────────────────────── */}
      <section id="faqs" className="bg-brand-dark px-4 md:px-8 lg:px-16 py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl flex flex-col gap-12">

          <div className="text-center">
            <AnimatedContainer>
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle size={15} className="text-[#FCA311]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#FCA311]">FAQ</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                Frequently asked questions
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.18}>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-5 max-w-xl mx-auto">
                Common questions about Grelin, pre-bill revenue integrity, and how the platform works in practice.
              </p>
            </AnimatedContainer>
          </div>

          <div
            className="rounded-2xl border px-6 md:px-8"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          >
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

          <AnimatedContainer delay={0.3}>
            <div className="text-center">
              <p className="text-slate-500 text-sm mb-4">Have a question that isn&apos;t answered here?</p>
              <a
                href="/company#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0B1120] hover:bg-white/90 transition-colors"
              >
                Contact us
                <ArrowRight size={14} />
              </a>
            </div>
          </AnimatedContainer>

        </div>
      </section>

      {/* ── 5. Compliance ────────────────────────────────────────────────────── */}

      <ComplianceSection />
      {/* <ExpandingSection>
        <div className="mx-auto max-w-6xl flex flex-col gap-12" id="compliance">

          <div className="text-center max-w-2xl mx-auto">
            <AnimatedContainer>
              <div className="flex items-center justify-center gap-2 mb-4">
                <ShieldCheck size={15} className="text-[#3152AD]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#3152AD]">Compliance</span>
              </div>
              <h2 className="text-gray-900 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                Built for healthcare compliance
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.18}>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5">
                Grelin is designed for healthcare environments where data security, HIPAA compliance, and audit controls are non-negotiable requirements.
              </p>
            </AnimatedContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {complianceItems.map((item, i) => (
              <AnimatedContainer key={item.title} delay={0.1 + i * 0.1}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col gap-5"
                  style={{
                    border: "1px solid rgba(15,23,42,0.09)",
                    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
                    background: "#ffffff",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: item.bg, border: `1px solid ${item.border}` }}
                    >
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <h3 className="text-gray-900 font-bold text-base leading-snug">{item.title}</h3>
                  </div>
                  <div className="h-px" style={{ background: `linear-gradient(to right, ${item.color}25, transparent)` }} />
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{item.body}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>

          <AnimatedContainer delay={0.4}>
            <div
              className="rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              style={{ background: "rgba(49,82,173,0.05)", border: "1px solid rgba(49,82,173,0.15)" }}
            >
              <div>
                <p className="text-gray-900 font-semibold text-sm">Need compliance documentation?</p>
                <p className="text-gray-500 text-sm mt-1">
                  We can provide security questionnaire responses, BAA templates, and detailed compliance documentation upon request.
                </p>
              </div>
              <a
                href="#"
                className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#0B1120] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B1120]/85 transition-colors"
              >
                Request docs
                <ArrowRight size={14} />
              </a>
            </div>
          </AnimatedContainer>

        </div>
      </ExpandingSection> */}

      <Footer />
    </main>
  );
}
