"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";



type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

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


export default function CtaBottomSection (){
    return(
              <section className="bg-white py-32 px-8 text-center">
        <AnimatedContainer className="mx-auto max-w-4xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0D1C2E] mb-10 leading-tight">
              Ready to move upstream
            </h2>
            <p className="text-[#434655] text-md font-normal mb-12 max-w-xl mx-auto">
              "precision is not just goal in RCM; it's foundation of institutional stability"
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/company?service=request-a-demo" className="bg-[#0B1C30] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#162040] transition-colors flex items-center justify-center gap-2">
               Request Personal Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/company?service=partnership-%26-business-development" className="bg-white border border-[#737686] text-[#0D1C2E] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
               Contact Strategy Team
              </a>
            </div>
          </div>
        </AnimatedContainer>
        </section>
    )
}
