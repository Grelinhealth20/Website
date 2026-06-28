"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { BookOpen, Clock, ArrowRight, ChevronRight, Tag } from "lucide-react";
import { Footer } from "@/components/Footer";
import { HanddrawnBlogIllustration } from "@/components/HanddrawnBlogIllustrations";
import { useRouter } from "next/navigation";
import type { BlogPost as BaseBlogPost } from "@/lib/blog-parser.server";

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

/* ─── Colour palette per eyebrow/tag ─────────────────────────────────────────
   Falls back to a neutral blue if the eyebrow doesn't match any entry.       */

const TAG_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  "Claim Integrity": {
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
  },
  "Revenue Integrity": {
    color: "#3152AD",
    bg: "rgba(49,82,173,0.08)",
    border: "rgba(49,82,173,0.2)",
  },
  "Wound Care": {
    color: "#F68F00",
    bg: "rgba(246,143,0,0.08)",
    border: "rgba(246,143,0,0.22)",
  },
  "Pain Management": {
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.2)",
  },
  MSO: {
    color: "#16A34A",
    bg: "rgba(22,163,74,0.07)",
    border: "rgba(22,163,74,0.2)",
  },
  Platform: {
    color: "#0891B2",
    bg: "rgba(8,145,178,0.07)",
    border: "rgba(8,145,178,0.2)",
  },
};

const DEFAULT_COLOR = {
  color: "#3152AD",
  bg: "rgba(49,82,173,0.08)",
  border: "rgba(49,82,173,0.2)",
};

// Illustration cycle so every post gets a distinct one
const ILLUSTRATIONS = [
  "clipboard",
  "bandage",
  "shield",
  "building",
  "network",
  "chart",
] as const;

/* ─── Shape used inside this component ──────────────────────────────────────── */

interface UIPost extends BaseBlogPost {
  color: string;
  bg: string;
  border: string;
  illustration: (typeof ILLUSTRATIONS)[number];
  featured: boolean;
}

/* ─── Enrich raw BlogPost with UI props ─────────────────────────────────────── */

function enrichPost(post: BaseBlogPost, index: number): UIPost {
  const palette = TAG_COLORS[post.eyebrow] ?? DEFAULT_COLOR;
  return {
    ...post,
    ...palette,
    illustration: ILLUSTRATIONS[index % ILLUSTRATIONS.length],
    featured: index === 0,
  };
}

/* ─── Blog card (non-featured) ───────────────────────────────────────────────── */

function BlogCard({ post, delay }: { post: UIPost; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <AnimatedContainer delay={delay}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => router.push(`/resources/blog/${post.slug}`)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="group h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        style={{
          border: `1px solid ${hovered ? post.border : "rgba(255,255,255,0.08)"}`,
          background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
          boxShadow: hovered
            ? `0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px ${post.border}`
            : "none",
          transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
        }}
      >
        {/* Thumbnail */}
        <div
          className="h-44 flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{ background: post.color }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.06]" />
          <motion.div
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10"
          >
            <HanddrawnBlogIllustration type={post.illustration} />
          </motion.div>
        </div>

        <div className="flex flex-col flex-1 gap-4 p-6">
          {post.eyebrow && (
            <span
              className="self-start inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ color: post.color, background: post.bg, border: `1px solid ${post.border}` }}
            >
              <Tag size={9} />
              {post.eyebrow}
            </span>
          )}

          <h3 className="text-white font-bold text-base leading-snug">{post.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed flex-1">{post.description}</p>

          <div className="flex items-center justify-between pt-3 border-t border-white/8">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Clock size={11} />
              {post.readTime}
            </div>
            <motion.span
              animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.4 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: post.color }}
            >
              Read <ArrowRight size={12} />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </AnimatedContainer>
  );
}

/* ─── Static fallback posts (shown if no HTML files exist yet) ───────────────── */

type BlogPost = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  keywords: string[];
  lead: string;
  intro: any[];
  sections: any[];
  related: any[];
  faqIds: string[];
};

const FALLBACK_POSTS: BaseBlogPost[] = [
  {
    slug: "01-what-is-claim-integrity",
    eyebrow: "Revenue Integrity",
    title: "What is Claim Integrity?",
    description:
      "Most revenue cycle teams focus on fixing denials after they happen. Shifting intelligence upstream — before claims are submitted — is the key to sustainable revenue integrity.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "6 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],
  },
  {
    slug: "02-where-claim-denials-come-from",
    eyebrow: "Wound Care",
    title: "Where Claim Denials Come From",
    description:
      "Incomplete clinical documentation is the #1 driver of wound care claim denials. This post examines the patterns and how pre-bill AI catches them before submission.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "5 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "03-pre-claim-vs-post-claim",
    eyebrow: "Pain Management",
    title: "Pre Claim vs Post Claim",
    description:
      "Prior authorization failures account for a significant share of pain management denials. We break down the root causes and what a pre-bill approach looks like.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "7 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "04-claim-scrubbing-vs-claim-integrity",
    eyebrow: "MSO",
    title: "Claim Scrubbing vs Claim Integrity",
    description:
      "Multi-site organizations face unique challenges in maintaining consistent billing standards. Pre-bill intelligence provides a unified layer of validation across all locations.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "5 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "05-true-cost-of-a-denied-claim",
    eyebrow: "Platform",
    title: "True Cost of a Denied Claim",
    description:
      "One of the most common questions we get is how Grelin fits alongside existing EHR and billing systems. Here's how the integration model works in practice.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "4 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "06-what-is-a-healthcare-clearinghouse",
    eyebrow: "Revenue Integrity",
    title: "What is a Healthcare Clearinghouse?",
    description:
      "When a claim is denied, the rework cycle begins. We quantify the hidden operational cost of reactive revenue cycle management and what prevention looks like at scale.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "8 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "07-emergency-department-coding-denials",
    eyebrow: "Emergency Department",
    title: "Emergency Department Coding Denials",
    description:
      "Emergency department coding denials are a significant challenge for healthcare organizations. This post explores the common issues and strategies for prevention.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "6 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "08-pharmacy-claim-denials",
    eyebrow: "Pharmacy",
    title: "Pharmacy Claim Denials",
    description:
      "Pharmacy claim denials can significantly impact revenue cycles. This post examines the common causes and prevention strategies.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "5 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "09-claim-integrity-for-msos",
    eyebrow: "MSO",
    title: "Claim Integrity for MSOs",
    description:
      "Multi-site organizations face unique challenges in maintaining consistent billing standards. Pre-bill intelligence provides a unified layer of validation across all locations.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "5 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  },
  {
    slug: "10-ai-in-revenue-cycle-management",
    eyebrow: "AI",
    title: "AI in Revenue Cycle Management",
    description:
      "Artificial intelligence is transforming revenue cycle management in healthcare. This post explores the latest applications and their impact on operational efficiency.",
    author: "Grelin Health Editorial",
    date: "",
    readTime: "6 min read",
    keywords: [],
    lead: "",
    intro: [],
    sections: [],
    related: [],
    faqIds: [],

  }



];

/* ─── All unique categories derived from posts ───────────────────────────────── */

function getCategories(posts: UIPost[]) {
  const tags = Array.from(new Set(posts.map((p) => p.eyebrow).filter(Boolean)));
  return ["All", ...tags];
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function BlogIndexPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [allPosts, setAllPosts] = useState<UIPost[]>([]);

  // Load real posts from the API route (server reads the HTML files)
  useEffect(() => {
    fetch("/api/blog/posts")
      .then((r) => r.json())
      .then((data: BaseBlogPost[]) => {
        const enriched =
          data.length > 0
            ? data.map(enrichPost)
            : FALLBACK_POSTS.map(enrichPost);
        setAllPosts(enriched);
      })
      .catch(() => setAllPosts(FALLBACK_POSTS.map(enrichPost)));
  }, []);

  // While loading, use fallbacks so the page isn't blank
  const posts = allPosts.length > 0 ? allPosts : FALLBACK_POSTS.map(enrichPost);

  const CATEGORIES = getCategories(posts);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.eyebrow === activeCategory);

  const featured = filtered.find((p) => p.featured) ?? filtered[0] ?? null;
  const rest = filtered.filter((p) => p !== featured);

  return (
    <main className="bg-[#0B1120] min-h-screen text-white">

      {/* ── Header ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 lg:px-16 pt-36 pb-10">
        <div className="mx-auto max-w-6xl">
          <AnimatedContainer delay={0.04}>
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
              <a href="/resources" className="hover:text-white transition-colors">Resources</a>
              <ChevronRight size={12} />
              <span className="text-white/60">Blog</span>
            </nav>
          </AnimatedContainer>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <AnimatedContainer delay={0.08}>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={15} className="text-[#FCA311]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FCA311]">Blog</span>
                </div>
                <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                  Insights & articles
                </h1>
              </AnimatedContainer>
              <AnimatedContainer delay={0.18}>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-3 max-w-xl">
                  Practical perspectives on revenue integrity, denial prevention, and healthcare billing operations.
                </p>
              </AnimatedContainer>
            </div>

            <AnimatedContainer delay={0.22}>
              <span
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold text-white/30 shrink-0 cursor-pointer"
                style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
              >
                {posts.length} articles
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
                  className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
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

      {/* ── Featured post ──────────────────────────────────────────────────────── */}
      {featured && (
        <section className="px-4 md:px-8 lg:px-16 pb-10">
          <div className="mx-auto max-w-6xl">
            <AnimatedContainer delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={() =>
                  featured.slug
                    ? router.push(`/resources/blog/${featured.slug}`)
                    : undefined
                }
                className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col md:flex-row"
                style={{
                  background: featured.bg,
                  border: `1px solid ${featured.border}`,
                  minHeight: 320,
                }}
              >
                {/* Left: text */}
                <div className="flex flex-col justify-between gap-6 p-6 md:p-10 md:w-[55%]">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          color: featured.color,
                          background: `${featured.color}18`,
                          border: `1px solid ${featured.border}`,
                        }}
                      >
                        <Tag size={9} />
                        {featured.eyebrow}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          color: "#FCA311",
                          background: "rgba(252,163,17,0.12)",
                          border: "1px solid rgba(252,163,17,0.25)",
                        }}
                      >
                        Featured
                      </span>
                    </div>

                    <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
                      {featured.title}
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
                      {featured.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Clock size={12} />
                      {featured.readTime}
                    </div>
                    {featured.slug ? (
                      <motion.button
                        className="flex items-center gap-2 text-sm font-semibold"
                        style={{ color: featured.color }}
                        whileHover={{ x: 4 }}
                      >
                        Read article <ArrowRight size={14} />
                      </motion.button>
                    ) : (
                      <span className="text-xs text-white/30 font-semibold">Coming soon</span>
                    )}
                  </div>
                </div>

                {/* Right: illustration */}
                <div
                  className="md:flex-1 min-h-[220px] md:min-h-0 flex items-center justify-center relative overflow-hidden"
                  style={{ background: featured.color }}
                >
                  <motion.div
                    className="relative z-10"
                    animate={{ scale: [1.1, 1.14, 1.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <HanddrawnBlogIllustration type={featured.illustration} />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedContainer>
          </div>
        </section>
      )}

      {/* ── All posts grid ─────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 lg:px-16 py-10 pb-24">
        <div className="mx-auto max-w-6xl">
          {rest.length > 0 ? (
            <>
              <AnimatedContainer delay={0.05}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
                  More articles
                </p>
              </AnimatedContainer>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, i) => (
                  <BlogCard key={post.slug || post.title} post={post} delay={0.08 + i * 0.08} />
                ))}
              </div>
            </>
          ) : (
            <AnimatedContainer delay={0.1}>
              <div
                className="rounded-2xl px-8 py-16 flex flex-col items-center gap-4 text-center"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <BookOpen size={28} className="text-white/20" />
                <p className="text-white/40 text-sm">No articles in this category yet.</p>
              </div>
            </AnimatedContainer>
          )}
        </div>
      </section>

      {/* ── Back to resources CTA ──────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 lg:px-16 py-12 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p className="text-white font-semibold">Explore more resources</p>
            <p className="text-slate-500 text-sm mt-0.5">Videos, FAQs, and compliance information</p>
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