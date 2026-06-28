"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import type { BlogPost } from "@/lib/blog-parser.server";
import { motion, useReducedMotion } from "framer-motion";
import {  Calendar, ChevronRight, Clock, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaqSection } from "./FaqSection";
import Image from "next/image";
import GrelinLogo from '../public/G.png';

function FadeIn({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (mounted && reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.55 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ArticleSection({
  heading,
  paragraphs,
  delay,
}: {
  heading: string;
  paragraphs: string[];
  delay: number;
}) {
  return (
    <FadeIn delay={delay}>
      <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{heading}</h2>
      <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </FadeIn>
  );
}

// ─── BlogLayout receives a fully-parsed BlogPost from the SERVER ──────────────
// It is a pure "use client" display component — no fs, no parser here.

export function BlogLayout({ post }: { post: BlogPost }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="bg-[#0B1120] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-10 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(80,90,200,0.15),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl mt-20"
        >
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <a href="/resources" className="cursor-pointer hover:text-white transition-colors">Resources</a>
            <ChevronRight size={12} />
            <a href="/resources/blog" className="cursor-pointer hover:text-white transition-colors">Blog</a>
            <ChevronRight size={12} />
            <span className="text-white/60">{post.eyebrow || post.title}</span>
          </nav>

          {post.eyebrow && (
            <span className="inline-block text-[11px] tracking-widest uppercase text-amber-400 font-semibold mb-4">
              {post.eyebrow}
            </span>
          )}

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-white/65 max-w-2xl leading-relaxed">{post.description}</p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-2 border-[#FFFFFF1A]">
            <div className="flex flex-wrap items-center gap-5 text-sm text-white">
              <div className="flex items-center gap-2">
                          <motion.div
            className="
              mt-auto
              flex
              h-[42px]
              w-[42px]
              items-center
              justify-center
              rounded-full
              bg-[#DAE8FF]
              overflow-hidden
            "
          >

                <Image src={GrelinLogo} alt="grelin logo" className="object-cover" />
          </motion.div>
                {post.author}
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5"><Clock className="size-4" />{post.readTime}</div>
              {formattedDate && (
                <>
                  <span className="text-white/30">•</span>
                  <div className="flex items-center gap-1.5"><Calendar className="size-4" />{formattedDate}</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 pt-2">
              {/* <button className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 transition-colors">
                <Share2 className="size-3.5" /> Share
              </button> */}
              {/* <button className="rounded-md border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition-colors">
                <Bookmark className="size-3.5" />
              </button> */}
            </div>
          </div>
        </motion.div>
      </section>

      {/* TLDR card */}
      {post.lead && (
        <section className="bg-[oklch(0.96_0.013_250)] px-6 lg:px-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl border rounded-xl p-8"
          >
            <blockquote className="border-l-2 border-blue-500 pl-5">
              <p className="text-lg font-medium bg-[#E4F0FF] text-[#334155] rounded px-3 py-2">
                {post.lead}
              </p>
            </blockquote>
            {post.intro[0] && (
              <p className="mt-5 text-sm text-[#475569] leading-relaxed">{post.intro[0]}</p>
            )}
            {post.sections[0] && (
              <div className="mt-8 rounded-xl bg-[#E4F0FF] border border-slate-200 p-5">
                <div className="text-[11px] tracking-widest uppercase text-[#002B5B] font-semibold">
                  {post.sections[0].heading}
                </div>
                {post.sections[0].paragraphs[0] && (
                  <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                    {post.sections[0].paragraphs[0]}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* Article body */}
      <section className="px-6 lg:px-10 py-20 bg-[#0B1120]">
        <div className="mx-auto max-w-3xl space-y-2">
          {post.intro.slice(1).length > 0 && (
            <FadeIn>
              <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
                {post.intro.slice(1).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </FadeIn>
          )}

          {post.sections.slice(1).map((sec, i) => (
            <ArticleSection key={i} heading={sec.heading} paragraphs={sec.paragraphs} delay={i * 0.05} />
          ))}

          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              <div className="rounded-xl border border-white/10 bg-white p-5">
                <div className="text-[10px] tracking-widest uppercase text-rose-400 font-semibold">Post-claim model</div>
                <div className="mt-3 font-mono text-sm font-bold text-[#002B5B]">Submit → Deny → Correct</div>
                <p className="mt-3 text-xs text-[#6B7280]">Reactive. Heavy rework cycle with manual work.</p>
              </div>
              <div className="rounded-xl border border-blue-400/40 bg-white p-5">
                <div className="text-[10px] tracking-widest uppercase text-blue-600 font-semibold">Modern claim integrity</div>
                <div className="mt-3 font-mono text-sm font-bold text-[#002B5B]">Validate → Resolve → Submit</div>
                <p className="mt-3 text-xs text-[#6B7280]">Proactive. Catch errors before they leave.</p>
              </div>
            </div>
          </FadeIn>

          {/* <div className="border-t border-white/10 pt-12 mt-8 flex flex-col items-center gap-4">
            <div className="text-[11px] tracking-widest uppercase text-white/50">Was this article helpful?</div>
            <div className="flex gap-3">
              <button className="rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-colors">👍 Yes, definitely</button>
              <button className="rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-colors">💡 Could use more detail</button>
            </div>
          </div> */}
        </div>
      </section>
               {post.faqIds?.length > 0 && (
        <FaqSection faqIds={post.faqIds} eyebrow={post.eyebrow} />
      )}

      {/* Related */}
      {post.related.length > 0 && (
        <section className="bg-slate-900 px-6 lg:px-10 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-[11px] tracking-widest uppercase text-blue-400 font-semibold">Deepen your domain knowledge</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">Related Reading</h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {post.related.map((r, i) => (
                <motion.a
                  key={i}
                  href={r.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border-t-4 border border-white/10 border-t-blue-500 min-h-[200px] bg-[#0A192F] p-5 flex flex-col gap-3 hover:bg-white/[0.06] transition-colors"
                >
                  <h3 className="font-semibold leading-snug text-white">{r.title}</h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-white/60">
                    <span>Read More</span>
                    <span className="text-blue-400">→</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}