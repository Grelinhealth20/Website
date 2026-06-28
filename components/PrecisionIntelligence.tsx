"use client";

import SPattern from "../components/ui/s-pattern";
import { motion, useReducedMotion } from "framer-motion";
import PiImg1 from "@/public/PiImg1.png";
import PiImg2 from "@/public/PiImg2.png";
import PiImg3 from "@/public/PiImg3.png";
import PiImg4 from "@/public/PiImg4.png";

const cards = [
  {
    title: "Real-time Claims Monitoring",
    description: "Proactive revenue monitoring that catches failures before they happen.",
    img: PiImg1,
  },
  {
    title: "Global Registry",
    description: "Comprehensive payer coverage validated across a global registry of plans.",
    img: PiImg2,
  },
  {
    title: "Eligibility & Authorization",
    description: "Verifies coverage and authorizations to prevent revenue delays.",
    img: PiImg3,
  },
  {
    title: "Risk Scoring Engine",
    description: "Assigns risk scores to surface the highest-priority issues first.",
    img: PiImg4,
  },
];

export default function PrecisionIntelligence() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden px-3 py-20 sm:px-5 sm:py-28 md:py-32 lg:py-40
        bg-[linear-gradient(225deg,#0A1F44_0%,#174EA6_38%,#3B82F6_70%,#93C5FD_100%)]"
    >
      {/* Stripe texture */}
      <SPattern />

      {/* Inner glass panel — expanded, more generous spacing */}
      <div
        className="relative mx-auto w-full overflow-hidden rounded-[32px] md:rounded-[40px]
          border border-white/25 px-6 py-14 sm:px-12 sm:py-18 md:px-16 md:py-24 lg:px-20 lg:py-28
          shadow-[0_30px_80px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_0_40px_rgba(255,255,255,0.15)]"
        style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      >
        {/* Soft top glow — larger */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-0 h-full w-2/3"
          style={{ background: "radial-gradient(ellipse at 88% 8%, rgba(120,170,250,0.35) 0%, transparent 65%)" }}
        />

        {/* Header — centered with more breathing room */}
        <div className="relative z-10 mx-auto mb-16 md:mb-20 flex max-w-3xl flex-col items-center text-center">
          <span
            className="mb-5 rounded-full border border-white/40 bg-white/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur"
          >
            The Grelin Edge
          </span>
          <h2
            className="text-[2.8rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[3.5rem] md:text-[4.2rem] lg:text-5xl"
          >
            Precision Intelligence.
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/80 sm:text-lg">
            Four capabilities working as one engine — monitoring, verifying, and scoring every claim in both directions.
          </p>
        </div>

        {/* 4-card grid — larger cards with better spacing */}
        <div className="relative z-10 mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -8, boxShadow: "0 24px 56px rgba(0,0,0,0.35)" }}
              className="group flex flex-col overflow-hidden rounded-[24px] md:rounded-[28px] border border-white/20 bg-white
                shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-white/40"
            >
              {/* Image panel — larger aspect ratio */}
              <div className="aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-[#EEF3FB] to-[#E3ECFD] p-4">
                <img
                  src={card.img.src}
                  alt={card.title}
                  className="h-full w-full rounded-[18px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              {/* Text — more spacious */}
              <div className="flex flex-1 flex-col px-6 pb-7 pt-5">
                <h3 className="text-[17px] md:text-[18px] font-bold leading-snug text-[#0E1B33]">{card.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#5B6B82]">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
