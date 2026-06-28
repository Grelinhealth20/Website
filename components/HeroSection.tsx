"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GShape } from "@/components/GShape";

export const HeroSection = () => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    textControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.07 + 1.2,
        duration: 1.0,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));
    buttonControls.start({
      opacity: 1,
      transition: { delay: 2.4, duration: 0.8 },
    });
  }, [textControls, buttonControls]);

  const headline = "The AI Intelligence Layer for Pre-Bill Revenue Integrity";

  return (
    <section className="relative w-full min-h-screen bg-brand-dark overflow-hidden flex flex-col items-center">
      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(49,82,173,0.28) 0%, transparent 70%)",
        }}
      />

      {/* Orbit + G centerpiece */}
      <div
        className="relative flex items-center justify-center mt-28 md:mt-32 shrink-0"
        style={{ perspective: "700px" }}
      >
        {/* Ambient glow blob */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "360px",
            height: "360px",
            background:
              "radial-gradient(circle, rgba(49,82,173,0.38) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />

        {/* Orbit ring 1 — outer */}
        <div
          className="absolute rounded-full border"
          style={{
            width: "500px",
            height: "500px",
            borderColor: "rgba(49,82,173,0.2)",
            animation: "orbit-spin-1 18s linear infinite",
          }}
        >
          {/* Dot on ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "10px",
              height: "10px",
              top: "-5px",
              left: "50%",
              marginLeft: "-5px",
              background: "#3152AD",
              boxShadow: "0 0 12px 3px rgba(49,82,173,0.9)",
            }}
          />
        </div>

        {/* Orbit ring 2 — inner */}
        <div
          className="absolute rounded-full border"
          style={{
            width: "390px",
            height: "390px",
            borderColor: "rgba(107,142,232,0.16)",
            animation: "orbit-spin-2 26s linear infinite reverse",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "7px",
              height: "7px",
              top: "-3.5px",
              left: "50%",
              marginLeft: "-3.5px",
              background: "rgba(107,142,232,0.85)",
              boxShadow: "0 0 8px 2px rgba(107,142,232,0.8)",
            }}
          />
        </div>

        {/* Outer subtle halo ring — no animation */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "580px",
            height: "580px",
            border: "1px solid rgba(49,82,173,0.07)",
          }}
        />

        {/* The G */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="relative z-10 hero-g-glow"
          style={{
            width: "clamp(160px, 22vw, 280px)",
            height: "clamp(145px, 20vw, 255px)",
          }}
        >
          <GShape />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-12 md:mt-14 pb-24 max-w-4xl">
        <h1
          className="text-2xl md:text-4xl lg:text-[2.75rem] text-white font-bold leading-tight"
          style={{ textShadow: "0 0 50px rgba(255,255,255,0.1)" }}
        >
          {headline.split(" ").map((word, i) => (
            <span key={i} className="inline-block">
              {word.split("").map((char, j) => (
                <motion.span
                  key={j}
                  custom={i * 4 + j}
                  initial={{ opacity: 0, y: 28 }}
                  animate={textControls}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
              {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.9 }}
          className="mt-5 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed"
        >
          Purpose-built AI applications that detect and resolve revenue risk before claims are submitted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={buttonControls}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3 font-semibold text-white hover:bg-brand-blue/80 transition-colors"
          >
            Explore Solutions <ArrowRight size={16} />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Assess My Revenue Risk
          </a>
        </motion.div>
      </div>

      {/* ECG line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none"
        style={{ opacity: 0.14 }}
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,32 L100,32 L130,32 L140,8 L148,56 L155,32 L170,32 L178,18 L186,46 L192,32 L300,32 L330,32 L340,8 L348,56 L355,32 L370,32 L378,18 L386,46 L392,32 L500,32 L530,32 L540,8 L548,56 L555,32 L570,32 L578,18 L586,46 L592,32 L700,32 L730,32 L740,8 L748,56 L755,32 L770,32 L778,18 L786,46 L792,32 L900,32 L930,32 L940,8 L948,56 L955,32 L970,32 L978,18 L986,46 L992,32 L1100,32 L1130,32 L1140,8 L1148,56 L1155,32 L1170,32 L1178,18 L1186,46 L1192,32 L1300,32 L1330,32 L1340,8 L1348,56 L1355,32 L1370,32 L1378,18 L1386,46 L1392,32 L1440,32"
            fill="none"
            stroke="#3152AD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
};
