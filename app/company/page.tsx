"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { FadeIn } from '@/components/FadeIn';
import SPattern from "@/components/ui/s-pattern";
import { Activity, ArrowRight, CheckCircle2, Layers, Mail, Play, ShieldCheck, User } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { Footer } from "@/components/Footer";
import drDevImg from '@/public/dr-dev.png';
import crupiImg from '@/public/crupi.jpg';
import mikeImg from '@/public/Mike.jpg';
import heroCompanyImg from '@/public/herosec-company.png';
import ContactSection from "@/components/ContactForm";
import companyGrelinexistsImg from "@/public/companyGrelinexistsImg.png";
import { useRouter } from "next/navigation";

function CompanyPageInner(){
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('service')) {
      const el = document.getElementById('contact');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }
  }, [searchParams]);

  const router = useRouter();

  const handleContact = () => {
    router.push("#contact")
  }

  const principles = [
    {
      icon: <Activity size={24} className="text-[#2B5FE3]" aria-hidden="true" />,
      title: 'Claim integrity is upstream work.',
      desc: 'The current healthcare infrastructure is built to react to errors after they occur. We believe the only way to solve the integrity crisis is to validate claims at the point of creation, before they ever enter the payment stream.',
    },
    {
      icon: <Layers size={24} className="text-[#2B5FE3]" aria-hidden="true" />,
      title: 'The stack you have is the stack you keep.',
      desc: "Healthcare doesn't need another disruptive platform that requires ripping and replacing. We believe AI should be an invisible layer that integrates seamlessly with existing EMRs and billing systems, enhancing what works and fixing what doesn't.",
    },
    {
      icon: <ShieldCheck size={24} className="text-[#2B5FE3]" aria-hidden="true" />,
      title: 'Specialty knowledge is the moat.',
      desc: 'Generic AI models cannot audit complex healthcare claims. We believe true claim integrity requires deep, specialty-specific medical intelligence that mirrors the expertise of the highest performing human auditors.',
    },
  ]
    const team = [
    {
      name: 'Dr. Jenakan Dev',
      role: 'CEO & FOUNDER',
      bio: 'A visionary physician and healthcare entrepreneur who recognized the need for AI driven claim integrity through years of clinical and revenue cycle experience.',
      img: drDevImg
    },
    {
      name: 'John Crupi',
      role: 'CHIEF TECHNOLOGY OFFICER',
      bio: 'A world class technologist with deep experience in building high-scale intelligence platforms for complex, data-heavy industries.',
      img: crupiImg
    },
    {
      name: 'Mike Wagner',
      role: 'CHIEF MARKETING OFFICER',
      bio: 'Ensures every Grelin algorithm maintains the highest standards of clinical relevance and medical precision.',
      img: mikeImg
    },
  ]
    const steps = [
    {
      num: '1',
      title: 'Build from the inside out.',
      desc: "We don't build technology for clinicians; we build it from their perspective. Every feature starts with a workflow reality.",
    },
    {
      num: '2',
      title: 'Plain language always.',
      desc: 'Complexity is the enemy of integrity. We translate arcane medical coding and AI outputs into clear, actionable English.',
    },
    {
      num: '3',
      title: 'No "Black Box" AI.',
      desc: 'Auditing requires accountability. Every AI-driven decision must be explainable, citeable, and transparent.',
    },
    {
      num: '4',
      title: 'Precision over Scale.',
      desc: 'We would rather be perfectly accurate in one specialty than moderately helpful in ten. Quality is our true metric.',
    },
    {
      num: '5',
      title: 'Speed with Certainty.',
      desc: "Integrity shouldn't slow down care. Our platform is built for real-time validation without clinical friction.",
    },
  ]
  return(
       <main>
        <Navbar />
        {/* 1.Hero Section */}
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0A1530] bg-stripe-dark overflow-hidden" aria-label="Company hero section">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1530]/80 pointer-events-none" aria-hidden="true" />
      <SPattern />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-[#7EA6CA] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Precision Healthcare AI
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                An AI intelligence
                <br />
                platform for claim
                <br />
                integrity.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-[#C0E1FF] leading-relaxed mb-10 max-w-xl">
                Grelin is the AI intelligence platform that powers claim
                integrity across Healthcare workflows. We specialize in
                transforming complex auditing into a streamlined, automated
                process that ensures precision at every touchpoint.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleContact}
                className="bg-white text-[#0A1530] font-medium px-6 py-3 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Contact Us
              </button>
              <a
                href="/platform"
                className="bg-slate-800 text-white border border-slate-600 font-medium px-6 py-3 rounded-md hover:bg-transparent transition-colors"
              >
                Explore Platform
              </a>
            </FadeIn>
          </div>

          {/* Right Image/Graphic Placeholder */}
          <FadeIn
            delay={0.4}
            direction="left"
            className="relative h-[400px] lg:h-[500px] w-full"
          >
            <div>
              {/* This would be the actual product image/graphic */}
              <div className="w-full h-full flex items-center justify-center rounded-2xl  overflow-hidden shadow-2xl">
                  <img
                    src={heroCompanyImg.src}
                    alt="Grelin AI platform dashboard demonstrating claim integrity features"
                    className="w-full h-full object-cover"
                  />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* 2.Mission section */}
        <SectionCard />
{/* 3.Revenue Cycle Section */}
 <section className="py-24 bg-[#0A1530] bg-stripe-dark relative" aria-label="Why Grelin exists">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <FadeIn>
              <p className="text-[#4597FE] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Section 3. Why Grelin Exists
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                The revenue cycle worked backwards for decades.
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[#6F88AD] text-lg leading-relaxed mb-12">
                Claims went out. Denials came back. Teams investigated,
                corrected, and resubmitted. The work was real. It just happened
                too late. Grelin moves the work upstream. Every claim, every
                specialty, validated before it reaches the payer.
              </p>
            </FadeIn>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
              <FadeIn delay={0.3}>
                <div>
                  <div className="text-[#4597FE] font-bold text-xl mb-1">
                    Fewer
                  </div>
                  <div className="text-slate-400 text-xs tracking-wider uppercase">
                    Denials
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div>
                  <div className="text-[#4597FE] font-bold text-xl mb-1">
                    Less
                  </div>
                  <div className="text-slate-400 text-xs tracking-wider uppercase">
                    Rework
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div>
                  <div className="text-[#4597FE] font-bold text-xl mb-1">
                    On-Time
                  </div>
                  <div className="text-slate-400 text-xs tracking-wider uppercase">
                    Submit
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Video Placeholder */}
          <FadeIn delay={0.3} direction="left">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <img src={companyGrelinexistsImg.src} alt="Grelin platform overview showing claim validation workflow" className="object-cover w-full h-full"/>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
{/* 4.Core Principles */}
<section className="py-24 bg-[#EEF2FA]" aria-label="Company core principles">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <FadeIn>
            <p className="text-[#2B5FE3] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Our Core Principles
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1530] tracking-tight">
              What We Believe
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((item, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <div className="bg-white rounded-xl p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0A1530] mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
{/* 5.Platform */}
    <section className="py-24 bg-white" aria-label="Grelin platform overview">
      <div className="mx-auto px-6 md:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E5BFF] to-[#0A1530] p-10 md:p-16 lg:p-20 shadow-2xl">
          {/* Subtle stripe overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
        <SPattern />

          <div className="relative z-10">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight mb-16">
                One Platform. Specialty Applications on Top.
              </h2>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
              {/* Left Card */}
              <FadeIn delay={0.2}>
                <div className="max-w-xl bg-white/10 backdrop-blur-5xl border border-white/20 rounded-2xl p-8 h-full">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    What the platform does
                  </h3>
                  <p className="text-blue-100 leading-relaxed mb-8">
                    The Grelin Platform acts as the centralized brain. It
                    ingests clinical data, maps it to complex regulatory rules,
                    and provides the foundational AI layer that powers every
                    specialty audit. It is the engine of precision, designed for
                    scale and clinical accuracy.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'CENTRALIZED INGESTION',
                      'REGULATORY MAPPING',
                      'API FIRST',
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#C0E1FF] text-[#002E5D] text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Right Card */}
              <FadeIn delay={0.3}>
                <div className="max-w-xl bg-white rounded-2xl p-8 h-full shadow-xl">
                  <h3 className="text-2xl font-bold text-[#0A1530] mb-4">
                    What the applications do
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    Our vertical applications like Woundal, Painal, and EMail
                    are the expert auditors. Each application is fine-tuned for
                    a specific clinical domain, translating the platform's power
                    into specific, actionable interventions that ensure every
                    specialty claim is compliant.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Woundal: Precision Audit',
                      'Pain Management certification',
                      'EM/Urgent Care Auto-validation',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-[#2B5FE3] shrink-0 mt-0.5"
                          size={20}
                          aria-hidden="true"
                        />
                        <span className="text-[#0A1530] font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
{/* 6.Team */}

    <section className="py-24 bg-white" aria-label="Meet the Grelin team">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1530] text-center tracking-tight max-w-3xl mx-auto mb-20 leading-tight">
            Built by physicians and technologists who have operated inside the
            revenue cycle.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {team.map((member, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div className="flex flex-col items-center">
                  <img
                    src={member.img.src}
                    alt={`${member.name}, ${member.role}`}
                    className="w-35 h-35 rounded-full flex items-center justify-center mb-6 shadow-lg"
                    />
                <h3 className="text-xl font-bold text-[#0A1530] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#2B5FE3] text-xs font-bold tracking-widest uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                  {member.bio}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
{/* 7.How We Work */}
    <section className="relative py-24 bg-[#0A1530] bg-stripe-dark" aria-label="How Grelin works">
    <div
    className="
      absolute inset-0
      opacity-[0.22]
      pointer-events-none
    "
    style={{
      backgroundImage: `
        radial-gradient(circle, #60A5FA 1px, transparent 1px)
      `,
      backgroundSize: "16px 16px",
    }}
    aria-hidden="true"
  />
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center tracking-tight mb-16">
            How We Work
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 flex items-start gap-6 hover:bg-slate-800 transition-colors">
                <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center text-[#2B5FE3] font-bold text-lg shadow-sm" aria-label={`Step ${step.num}`}>
                  {step.num}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
{/* 8.Careers */}
    <section className="py-24 bg-white" aria-label="Careers at Grelin">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="bg-[#E2EDFF] rounded-3xl p-12 md:p-20 text-center">
            <p className="text-[#2B5FE3] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Join the Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1530] tracking-tight mb-6">
              Careers
            </h2>
            <p className="text-slate-600 text-md max-w-xl mx-auto mb-10">
              Grelin is growing. We are looking for engineers, clinicians, and
              operators who believe healthcare infrastructure can be smarter,
              cleaner, and more precise.
            </p>
            <a
              href="mailto:careers@grelinhealth.com"
              className="inline-flex items-center gap-2 bg-[#0A1530] text-white font-medium px-6 py-3 rounded-md hover:bg-slate-800 transition-colors"
            >
              Send a note to careers@grelinhealth.com
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
{/* 9.Contact Form */}
    <ContactSection />
{/* 10.Footer */}
<Footer />
       </main> 
    )
}

import { Suspense } from "react";
export default function CompanyPage() {
  return (
    <Suspense fallback={null}>
      <CompanyPageInner />
    </Suspense>
  );
}
