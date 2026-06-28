import React, { Children } from 'react'
import { motion, easeInOut } from 'framer-motion'
import { Shield, Lock, FileText, Clock, ArrowRight } from 'lucide-react'
import SPattern from '@/components/ui/s-pattern'
const cards = [
  {
    title: 'HIPAA Compliance',
    body: "Grelin's platform is built with HIPAA requirements at its foundation. Data handling, access controls, and audit logging are designed to meet the administrative, physical, and technical safeguards required under HIPAA.",
    icon: Shield,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'Data Security',
    body: 'All data transmitted to and from the Grelin platform is encrypted in transit and at rest. Access is role-based and logged. Grelin undergoes regular security assessments to maintain the controls expected in healthcare environments.',
    icon: Lock,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Business Associate Agreement',
    body: 'Grelin executes a Business Associate Agreement (BAA) with all customers as required under HIPAA. The BAA outlines data handling responsibilities and obligations for both parties.',
    icon: FileText,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Audit & Access Controls',
    body: 'The platform maintains comprehensive audit logs of data access and system activity. Role-based access controls ensure that users can only access data relevant to their function within the organization.',
    icon: Clock,
    iconBg: 'bg-amber-100',
    iconColor: 'text-orange-500',
  },
]
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
}
export function ComplianceSection() {
  return (
    <section id="compliance" className="w-full max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12">
      {/* Outer Rounded Container with Gradient and Pinstripes */}
      <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl bg-[#030b20]">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#0a2566] to-[#0047ff] opacity-90" />

        {/* Pinstripe Overlay */}
        <SPattern />

        {/* Radial Glow for center-right highlight */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center_right,rgba(0,102,255,0.4)_0%,transparent_70%)] pointer-events-none" />

        {/* Content Wrapper */}
        <div className="relative z-10 px-6 py-20 sm:px-12 sm:py-24 lg:py-32 max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-100px',
            }}
            className="w-full flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-white/90 mb-6"
            >
              <Shield className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-xs font-bold tracking-[0.15em] uppercase mt-0.5">
                Compliance
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="text-white/50">Built for </span>
                <span className="text-white">healthcare</span>
                <span className="text-white/50"> compliance</span>
              </h2>
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-center text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed mb-16"
            >
              Grelin is designed for healthcare environments where data
              security, HIPAA compliance, and audit controls are non-negotiable
              requirements.
            </motion.p>

            {/* Cards Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  className="bg-[#f2f5fc]/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-white/40 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
                    >
                      <card.icon
                        className={`w-6 h-6 ${card.iconColor}`}
                        strokeWidth={2}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Banner */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl"
            >
              <div className="max-w-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Need compliance documentation?
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  We can provide security questionnaire responses, BAA
                  templates, and detailed compliance documentation upon request.
                </p>
              </div>

              {/* <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="shrink-0 bg-[#0a0f1c] hover:bg-black text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-lg"
              >
                Request docs
                <ArrowRight className="w-4 h-4" />
              </motion.button> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
