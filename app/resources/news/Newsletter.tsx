"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <section className="bg-[#0B1120] px-6 lg:px-10 pb-20 pt-18">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#0A0B28B2] from-white/[0.04] to-white/[0.01] p-8 md:p-12"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] tracking-widest uppercase text-white/70 mb-6">
              Keep up with Grelin
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-white">
              Sign up to receive press<br />releases & insights<br />directly in your inbox.
            </h2>
            <p className="mt-5 text-sm text-white/60 max-w-md">
              Get the latest updates on global financial infrastructure, artificial intelligence, and developer ecosystem launches directly from our communications team.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <label className="text-[11px] tracking-widest uppercase text-white/60">Work email address</label>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="name@company.com"
                className="flex-1 rounded-md bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="inline-flex items-center gap-2 rounded-md bg-white text-[#0F192A] px-4 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors">
                Subscribe <ArrowRight className="size-4" />
              </button>
            </div>
            <p className="mt-4 text-xs text-white/50 leading-relaxed">
              By signing up, you agree to Grelin's core privacy policy. You can opt out of news notifications at any moment with a single click.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
