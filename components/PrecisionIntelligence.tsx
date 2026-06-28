import { useEffect, useRef } from "react";
import SPattern from '../components/ui/s-pattern';
import PiImg1 from '@/public/PiImg1.png'
import PiImg2 from '@/public/PiImg2.png'
import PiImg3 from '@/public/PiImg3.png'
import PiImg4 from '@/public/PiImg4.png'
import { animate, useMotionValue, motion, useTransform } from "framer-motion";


const cards = [
  { title: "Real-time Claims Monitoring", description: "Proactive revenue monitoring to catch failures before they happen.", glass: true, firstCard: true, img: PiImg1 },
  { title: "Global Registry", description: "Proactive revenue monitoring to catch failures before they happen.", glass: false, img: PiImg2 },
  { title: "Eligibility & Authorization", description: "Verifies coverage and authorizations to prevent revenue delays.", glass: false, img: PiImg3 },
  { title: "Risk Scoring Engine", description: "Assigns risk scores to surface priority issues first.", glass: false, img: PiImg4 },
];

export default function PrecisionIntelligence() {
   const containerRef = useRef<HTMLDivElement>(null);
   const trackRef = useRef<HTMLDivElement>(null);
  
    const x = useMotionValue(0);
   const translateX = useTransform(x, (v) => `translateX(${v}px)`);
 useEffect(() => {
  const container = containerRef.current;
  const track = trackRef.current;

  if (!container || !track) return;

  const onWheel = (e: WheelEvent) => {
    const maxScroll =
      track.scrollWidth - container.clientWidth;

    const current = x.get();
    const atStart = current >=0 && e.deltaY < 0;
    const atEnd =  current <= -maxScroll && e.deltaY > 0;

    if (atStart || atEnd) return;

    e.preventDefault();

    let next = current - e.deltaY * 1.2;

    next = Math.min(0, Math.max(next, -maxScroll));

    animate(x, next, {
      type: "spring",
      stiffness: 140,
      damping: 24,
    });

    e.preventDefault();
  };

  container.addEventListener("wheel", onWheel, {
    passive: false,
  });

  return () => {
    container.removeEventListener("wheel", onWheel);
  };
}, [x]);

  return (
    <div 
    ref={containerRef}
    className="flex items-center min-h-[640px] sm:min-h-[720px] 
        justify-center
        p-3 sm:p-6 
        relative
        w-full 
        overflow-hidden
        bg-[linear-gradient(225deg,#0A1F44_0%,#174EA6_38%,#3B82F6_70%,#93C5FD_100%)]
        cursor-grab
        active:cursor-grabbing
        "
        >
          {/* Stripe pattern */}
        <SPattern />
        
        <div
          className="
            relative overflow-hidden
            rounded-[24px]
            bg-slate/[0.50]
            border-white/20
            backdrop-blur-4xl
            w-full
            min-h-[520px]

            shadow-[0_10px_40px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(255,255,255,0.08),inset_0_0_24px_rgba(255,255,255,0.18)]

            before:absolute
            before:inset-x-0
            before:top-0
            before:h-px
            before:bg-gradient-to-r
            before:from-transparent
            before:via-white/80
            before:to-transparent
            before:content-['']

            after:absolute
            after:left-0
            after:top-0
            after:h-full
            after:w-px
            after:bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent,rgba(255,255,255,0.2))]
            after:content-['']
          "
        >

            {/* Glow */}
            <div
              className="absolute top-0 right-0 pointer-events-none z-0"
              style={{
                width: "60%", height: "100%",
                background: "radial-gradient(ellipse at 88% 8%,rgba(100,160,240,.22) 0%,transparent 58%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full" style={{ padding: "20px 20px 0" }}>
              {/* Badge */}
              <div
                className="w-fit mb-3 text-white/80"
                style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,.3)", background: "rgba(255,255,255,.1)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  padding: "4px 12px", borderRadius: 999,
                }}
              >
                THE GRELIN EDGE
              </div>

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <h1
                  className="text-white font-semibold leading-none text-[2.2rem] sm:text-[3rem] md:text-[4.25rem]"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  Precision Intelligence.
                </h1>
                {/* <button
                  className="flex items-center gap-1.5 whitespace-nowrap"
                  style={{
                    background: "rgba(255,255,255,.97)", color: "#1a3a7c",
                    border: "none", borderRadius: 12, padding: "11px 18px",
                    fontSize: 13.5, fontWeight: 600, cursor: "pointer", marginTop: 8,
                    boxShadow: "0 2px 14px rgba(0,0,0,.2)",
                  }}
                >
                  Explore All Features
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 11L9 7L5 3" stroke="#1a3a7c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button> */}
              </div>

              {/* Cards viewport — no scrollbar */}
              <div className="relative overflow-hidden mt-6 sm:mt-12">
                <motion.div
                  ref={trackRef}
                  style={{ x }}
                  className="flex 
                  items-stretch
                  gap-7
                  pb-10
                  will-change-transform
                  "
                >
                  {cards.map((card, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 flex flex-col"
                      style={{
                        width: "min(220px, 75vw)",
                        borderRadius: card.firstCard ? "20px 0 0 20px" : 20,
                        overflow: "hidden",
                        background: card.glass
                          ? "rgba(255,255,255,.14)"
                          : "#fff",
                        backdropFilter: card.glass ? "blur(18px)" : undefined,
                        WebkitBackdropFilter: card.glass ? "blur(18px)" : undefined,
                        border: card.glass ? "1px solid rgba(255,255,255,.28)" : "none",
                        boxShadow: card.glass
                          ? "0 8px 32px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.3)"
                          : "0 6px 24px rgba(0,0,0,.14)",
                        transition: "transform .22s ease",
                      }}
                    >
                      <div style={{ padding: "12px 15px 0  " }}>
                            <img 
                            src={card.img.src}
                            alt="PrecisionIntelligence Card image"
                            className="object-cover"
                            />
                      </div>
                      <div style={{ padding: "14px 15px 18px" }}>
                        <p
                          style={{
                            fontSize: 14.5, fontWeight: 700, marginBottom: 5, lineHeight: 1.3,
                            color: card.glass ? "#fff" : "#111827",
                          }}
                        >
                          {card.title}
                        </p>
                        <p
                          style={{
                            fontSize: 12.5, lineHeight: 1.55,
                            color: card.glass ? "rgba(255,255,255,.7)" : "#6b7280",
                          }}
                        >
                          {card.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Scroll hint */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none"
              style={{ color: "rgba(255, 255, 255, 0.69)", fontSize: 11, letterSpacing: ".06em", opacity: 1 , transition: "opacity .3s" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7 2v10M3 8l4 4 4-4" />
              </svg>
              scroll to explore
            </div>

        </div>
      </div>
  );
}
