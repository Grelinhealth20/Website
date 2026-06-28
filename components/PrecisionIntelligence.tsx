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
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-24
        bg-[linear-gradient(225deg,#0A1F44_0%,#174EA6_38%,#3B82F6_70%,#93C5FD_100%)]"
    >
      {/* Stripe texture */}
      <SPattern />

      {/* Inner glass panel — centered, constrained */}
      <div
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[28px]
          border border-white/20 px-5 py-10 sm:px-10 sm:py-14
          shadow-[0_20px_60px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_0_24px_rgba(255,255,255,0.12)]"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        {/* Soft top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-0 h-full w-3/5"
          style={{ background: "radial-gradient(ellipse at 88% 8%, rgba(120,170,250,0.25) 0%, transparent 58%)" }}
        />

        {/* Header — centered */}
        <div className="relative z-10 mx-auto mb-10 flex max-w-2xl flex-col items-center text-center sm:mb-14">
          <span
            className="mb-4 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur"
          >
            The Grelin Edge
          </span>
          <h2
            className="text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.025em] text-white sm:text-[3.25rem] md:text-[3.75rem]"
          >
            Precision Intelligence.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            Four capabilities working as one engine — monitoring, verifying, and scoring every claim in both directions.
          </p>
        </div>

        {/* 4-card grid — centered, equal sizing */}
        <div className="relative z-10 mx-auto grid max-w-[1120px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white
                shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
            >
              {/* Image panel — uniform aspect */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#EEF3FB] p-3">
                <img
                  src={card.img.src}
                  alt={card.title}
                  className="h-full w-full rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              {/* Text */}
              <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
                <h3 className="text-[15.5px] font-bold leading-snug text-[#0E1B33]">{card.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#5B6B82]">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
