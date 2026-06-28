"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Newsletter } from "./Newsletter";
import newspost1 from "@/public/newsarticle_post1.png";


const ARTICLES = Array.from({ length: 1 }).map(() => ({
  date: "26 May 2026",
  tag: "Revenue Integrity",
  title: "The Difference Between a Correctly Coded Claim and a Payable One",
  link: "https://www.healthcareittoday.com/2026/05/26/the-difference-between-a-correctly-coded-claim-and-a-payable-one/",
  excerpt:
    "Every revenue cycle leader knows denial rates are increasing industry-wide, in part due to AI systems implemented by Payers but also increasingly complex CMS guidelines. Most of them also know that AI",
}));

const FILTERS = ["All", "Product"];

export default function NewsPage() {
  const [active, setActive] = useState("Product");

  return (
    <div className="min-h-screen bg-[#05233D] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(80,90,200,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
                      {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-1.5 text-[13px]">
              <a href="/resources" className="text-white/40 hover:text-white/70 transition-colors">
                Resources
              </a>
              <ChevronRight size={13} className="text-white/25 shrink-0" />
              <span className="text-white/70">News</span>
            </nav>
          </div>
            <div className="mt-8 flex items-center gap-3">
              <span className="border-l-2 border-brand-2 pl-2 text-[11px] tracking-widest uppercase text-white/80">Guest Column</span>
              <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5 text-[10px] tracking-widest uppercase text-white/80">Revenue Integrity</span>
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight">
              The Difference Between a Correctly Coded Claim and a Payable One
            </h1>
            <p className="mt-6 text-white/65 max-w-xl leading-relaxed">
              Every revenue cycle leader knows denial rates are increasing industry-wide, in part due to AI systems implemented by Payers but also increasingly complex CMS guidelines. Most of them also know that AI coding tools are supposed to help with that.
            </p>
            <a href="https://www.healthcareittoday.com/2026/05/26/the-difference-between-a-correctly-coded-claim-and-a-payable-one/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white hover:text-brand-2 transition-colors">
              Read article by Dr. Jenakan Dev <ArrowRight className="size-3.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <img src={newspost1.src} alt="News Hero" className="w-full rounded-2xl shadow-lg object-cover" />
          </motion.div>
        </div>
      </section>

      {/* News list */}
      <section className="bg-[#EFF7FF] text-ink px-6 lg:px-10 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-5xl font-semibold text-[#0F192A] tracking-tight">News</h2>
              <a href="#" className="mt-3 inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink">All news ›</a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#46464F]" />
                <input
                  placeholder="Search press releases..."
                  className="w-72 rounded-lg bg-[#EAEDFF] border border-[#C7C5D080] pl-9 pr-4 py-2 text-sm placeholder:text-[#46464F80] focus:outline-none focus:ring-2 focus:ring-ink/20"
                />
              </div>
              {/* <button className="bg-white p-2 text-[#46464F] hover:text-ink">
                <SlidersHorizontal className="size-4" />
              </button> */}
              <div className="flex items-center gap-1 rounded-full text-[#131B2E] p-1">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`relative cursor-pointer px-4 py-1.5 text-xs font-medium rounded-lg bg-[#EAEDFF] transition-colors ${
                      active === f ? "text-white" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {active === f && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-[#05233D] rounded-lg"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{f}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-10">
            {ARTICLES.map((a, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-[120px_1fr_320px] gap-8 items-start pb-10 border-b border-ink/10 last:border-b-0"
              >
                <div className="text-xs tracking-widest uppercase text-[#46464F]">{a.date}</div>
                <div className="border-l border-ink/15 pl-6">
                  <div className="text-[11px] tracking-widest uppercase text-brand text-[#0C579A] font-semibold">{a.tag}</div>
                  <h3 className="mt-3 text-2xl text-[#131B2E] font-semibold leading-snug max-w-xl">{a.title}</h3>
                  <p className="mt-4 text-sm text-[#46464F] leading-relaxed max-w-xl">{a.excerpt}</p>
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm text-brand text-[#355A7B] font-medium hover:gap-2 transition-all">
                    Read More →
                  </a>
                </div>
                <div>
            <img src={newspost1.src} alt="News Hero" className="w-full rounded-2xl shadow-lg object-cover" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
