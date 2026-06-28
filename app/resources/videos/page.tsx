"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Video, Play, Clock, ArrowRight, ChevronRight, Tag } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

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

/* ─── Data ───────────────────────────────────────────────────────────────────── */

const CATEGORIES = ["All", "Platform", "Wound Care", "Pain Management", "MSO", "Integration", "Rx AI", "Affiliate"];

const videos: {
  tag: string; featured: boolean; title: string; description: string;
  duration: string; color: string; bg: string; border: string;
  illustration: string; link: string;
}[] = [
    {
    tag: "Platform",
    featured: true,
    illustration: "dashboard",
    title: "AI Powered RCA Dashboard",
    description:
      "See how Grelin's AI-Powered RCA Dashboard surfaces root cause insights from claim denials, empowering revenue cycle teams to identify and address systemic issues across payers, providers, and specialties.",
    duration: "8 min",
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
    link: "https://youtu.be/6wSflRHS-oo?si=2cj1kft47uJpJCbX",
  },
    {
    tag: "Platform",
    featured: true,
    illustration: "dashboard",
    title: "Grelin Health Intelligence System ",
    description:
      "A comprehensive walkthrough of how Grelin's pre-bill intelligence platform works — from data ingestion to claim validation, AI analysis, and outcomes reporting. See the end-to-end workflow in action.",
    duration: "8 min",
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
    link: "https://youtu.be/04bo7qlW5Nk?si=Vbv_3GMCebPs33bd",
  },
  {
    tag: "Platform",
    featured: true,
    illustration: "dashboard",
    title: "Grelin Channel Partner Overview",
    description:
      "A comprehensive walkthrough of how Grelin's pre-bill intelligence platform works — from data ingestion to claim validation, AI analysis, and outcomes reporting. See the end-to-end workflow in action.",
    duration: "8 min",
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
    link: "https://youtu.be/9vfhNqUEKpI?si=UbAifjAVG-g6qvYv",
  },
  {
    tag: "Platform",
    featured: false,
    illustration: "clipboard",
    title: "Pre-Billing Revenue Integrity Overview",
    description:
      "We explore the five validation factors Grelin checks before a claim leaves the billing system — and how each one reduces denial exposure across specialties.",
    duration: "12 min",
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
    link: "https://youtu.be/-6rMVtg4bwg?si=p7A7qzykjGMmBIlW",
  },
  {
    tag: "Wound Care",
    featured: false,
    illustration: "bandage",
    title: "Wound Care General Overview Video",
    description:
      "A product walkthrough of Wound.ai — covering documentation analysis, coding validation, and how it integrates with existing wound care workflows.",
    duration: "15 min",
    color: "#F68F00",
    bg: "rgba(246,143,0,0.08)",
    border: "rgba(246,143,0,0.22)",
      link: "https://youtu.be/3v2CC3kZZf0?si=TdqK3673CfQMThg_",
  },
  {
    tag: "Pain Management",
    featured: false,
    illustration: "shield",
    title: "Pain Management General Video Final",
    description:
      "See how Pain.ai validates prior authorization requirements against payer policy rules before claims are submitted, catching gaps that would otherwise result in denials.",
    duration: "10 min",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.2)", 
    link: "https://youtu.be/srimqyMTpyA?si=FJ9xg85e9m-HHTh6",
  },
  {
    tag: "MSO",
    featured: false,
    illustration: "building",
    title: "MSO Overview",
    description:
      "How MSOs and multi-location groups use Grelin to standardize pre-bill validation across all sites, providers, and payer contracts from a single intelligence layer.",
    duration: "9 min",
    color: "#0891B2",
    bg: "rgba(8,145,178,0.07)",
    border: "rgba(8,145,178,0.2)",
    link: "https://youtu.be/_3AKetHZVjQ?si=6mkE_BAqA-oZFK3h",
  },
  {
    tag: "Rx AI",
    featured: false,
    illustration: "network",
    title: "RxAI: Pre-Claim Intelligence for Pharmacy Revenue Cycle(Product Demo)",
    description:
      "A technical walkthrough of how Grelin connects Pre-Claim Intelligence for Pharmacy Revenue Cycle(Product Demo)",
    duration: "14 min",
    color: "#DC2626",
    bg: "rgba(220,38,38,0.07)",
    border: "rgba(220,38,38,0.2)",
    link: "https://youtu.be/iLKRoLYqq8o?si=zV1dDSYIFuLO0VdR",
  },
    {
    tag: "Rx AI",
    featured: true,
    illustration: "network",
    title: "RxAI Powered by Grelin",
    description:
      "A technical walkthrough of how Grelin connects Pre-Claim Intelligence for Pharmacy Revenue Cycle",
    duration: "14 min",
    color: "#DC2626",
    bg: "rgba(220,38,38,0.07)",
    border: "rgba(220,38,38,0.2)",
    link: "https://youtu.be/vI2_vpYyXpo?si=mx1gID4zOOtMt95j",
  },
      {
    tag: "Platform",
    featured: true,
    illustration: "network",
    title: "Most Behavioral Health Denials Start Before the Claim Exists",
    description:
      "A technical walkthrough of how Grelin connects Pre-Claim Intelligence for Pharmacy Revenue Cycle",
    duration: "14 min",
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
    link: "https://youtu.be/XRlpLflpnl4?si=wgIcE213H9Csjotg",
  },
        {
    tag: "Affiliate",
    featured: true,
    illustration: "network",
    title: "Healthcare Consultants - Grelin Affiliate Partner Program",
    description:
      "Learn how Healthcare Consultants can partner with Grelin to expand their reach and drive revenue in the pharmacy revenue cycle space.",
    duration: "14 min",
    color: "#ee2079",
    bg: "rgba(220,38,38,0.07)",
    border: "rgba(220, 38, 129, 0.2)",
    link: "https://youtu.be/COgGAF6o23I?si=hA4pSsg9Kbyh5VMz",
  },
  
];
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

/* ─── Video card ─────────────────────────────────────────────────────────────── */

function VideoCard({ video, delay }: { video: typeof videos[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedContainer delay={delay}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="group h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        style={{
          border: `1px solid ${hovered ? video.border : "rgba(255,255,255,0.08)"}`,
          background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
          boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px ${video.border}` : "none",
          transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
        }}
      >
        {/* Thumbnail */}
        <div
          className="h-44 relative flex items-center justify-center shrink-0 overflow-hidden"
          style={{ background: "#f8fafc" }}
        >
          <YouTubeThumbnail
            url={video.link}
            alt={video.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Play button — centered */}

            <Play size={18} className="text-white ml-1 relative" />

          {/* Duration badge */}
          <span
            className="absolute bottom-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10"
            style={{ background: "rgba(15,23,42,0.08)", color: "rgba(15,23,42,0.45)" }}
          >
            <Clock size={9} />
            {video.duration}
          </span>

          {/* Tag */}
          <span
            className="absolute top-3 left-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
            style={{ color: video.color, background: video.bg, border: `1px solid ${video.border}` }}
          >
            <Tag size={8} />
            {video.tag}
          </span>
        </div>

        <div className="flex flex-col flex-1 gap-3 p-5">
          <h3 className="text-white font-bold text-base leading-snug">{video.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed flex-1">{video.description}</p>

          <motion.a
            animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-xs font-semibold pt-3 border-t border-white/8"
            style={{ color: video.color }}
            href={video.link} target="_blank" rel="noopener noreferrer"

          >
            Watch video <ArrowRight size={12} />
          </motion.a>
        </div>
      </motion.div>
    </AnimatedContainer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? videos : videos.filter((v) => v.tag === activeCategory);

  const featured = filtered.find((v) => v.featured) ?? filtered[0];
  const rest = filtered.filter((v) => v !== featured);

  const router = useRouter();
  return (
    <main className="bg-brand-dark text-white overflow-x-hidden min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-16 pt-32 pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#3152AD] opacity-[0.06] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl relative z-10">

          {/* Breadcrumb */}
          <AnimatedContainer delay={0}>
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <a href="/resources" className="hover:text-white transition-colors">Resources</a>
              <ChevronRight size={12} />
              <span className="text-white/60">Videos</span>
            </nav>
          </AnimatedContainer>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <AnimatedContainer delay={0.08}>
                <div className="flex items-center gap-2 mb-3">
                  <Video size={15} className="text-[#FCA311]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FCA311]">Videos</span>
                </div>
                <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                  Walkthroughs & demos
                </h1>
              </AnimatedContainer>
              <AnimatedContainer delay={0.18}>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-3 max-w-xl">
                  See Grelin in action — platform overviews, product walkthroughs, and specialty-specific demos.
                </p>
              </AnimatedContainer>
            </div>

            <AnimatedContainer delay={0.22}>
              <span
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold text-white/30 shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
              >
                {videos.length} videos
              </span>
            </AnimatedContainer>
          </div>

          {/* Category filters */}
          <AnimatedContainer delay={0.26}>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeCategory === cat ? "#ffffff" : "rgba(255,255,255,0.05)",
                    color: activeCategory === cat ? "#0B1120" : "rgba(255,255,255,0.55)",
                    border: `1px solid ${activeCategory === cat ? "transparent" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* ── Featured video ────────────────────────────────────────────────────── */}
      {featured && (
        <section className="px-4 md:px-8 lg:px-16 pb-10">
          <div className="mx-auto max-w-6xl">
            <AnimatedContainer delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col md:flex-row-reverse"
                style={{
                  background: featured.bg,
                  border: `1px solid ${featured.border}`,
                  minHeight: 320,
                }}
              >
                {/* Right (reversed): player area */}
                <div
                  className="md:w-[45%] min-h-[200px] md:min-h-0 flex items-center justify-center relative overflow-hidden"
                  style={{ background: "#f8fafc" }}
                >
                  <YouTubeThumbnail
                    url={featured.link}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play ring animation */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: 100, height: 100, background: "rgba(15,23,42,0.06)", border: "1px solid rgba(15,23,42,0.1)" }}
                      animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center relative z-10 shadow-lg"
                      style={{ background: "#0B1120" }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play size={28} className="text-white ml-1.5" />
                    </motion.div>
                  </div>

                  {/* Duration */}
                  <span
                    className="absolute bottom-4 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{ background: "rgba(15,23,42,0.08)", color: "rgba(15,23,42,0.45)" }}
                  >
                    <Clock size={9} />
                    {featured.duration}
                  </span>
                </div>

                {/* Left: text */}
                <div className="flex flex-col justify-between gap-6 p-6 md:p-10 md:flex-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ color: featured.color, background: `${featured.color}18`, border: `1px solid ${featured.border}` }}
                      >
                        <Tag size={9} />
                        {featured.tag}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ color: "#FCA311", background: "rgba(252,163,17,0.12)", border: "1px solid rgba(252,163,17,0.25)" }}
                      >
                        Featured
                      </span>
                    </div>

                    <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
                      {featured.title}
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {featured.description}
                    </p>
                  </div>

                  <motion.a
                    className="flex items-center gap-2 text-sm font-semibold self-start"
                    style={{ color: featured.color }}
                    whileHover={{ x: 4 }}
                    // onClick={() => router.push(`${featured.link ?? "#"}`) }
                    href={featured.link} target="_blank" rel="noopener noreferrer"
                  >
                    Watch now <ArrowRight size={14} />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatedContainer>
          </div>
        </section>
      )}

      {/* ── All videos grid ───────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 lg:px-16 py-10 pb-24">
        <div className="mx-auto max-w-6xl">

          {rest.length > 0 ? (
            <>
              <AnimatedContainer delay={0.05}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
                  More videos
                </p>
              </AnimatedContainer>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((video, i) => (
                  <VideoCard key={video.title} video={video} delay={0.08 + i * 0.08} />
                ))}
              </div>
            </>
          ) : (
            <AnimatedContainer delay={0.1}>
              <div
                className="rounded-2xl px-8 py-16 flex flex-col items-center gap-4 text-center"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
              >
                <Video size={28} className="text-white/20" />
                <p className="text-white/40 text-sm">No videos in this category yet.</p>
              </div>
            </AnimatedContainer>
          )}
        </div>
      </section>

      {/* ── Back CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 lg:px-16 py-12 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p className="text-white font-semibold">Explore more resources</p>
            <p className="text-slate-500 text-sm mt-0.5">Articles, FAQs, and compliance documentation</p>
          </div>
          <a
            href="/resources"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/12 transition-colors"
          >
            Back to Resources
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
