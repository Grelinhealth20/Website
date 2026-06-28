'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FadeIn } from './FadeIn';
import { ArrowRight, Building2, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Request a Demo',
  'RxAI — Pharmacy Revenue Integrity',
  'Wound.ai — Wound Severity Indexing',
  'Prior Authorization AI',
  'Pain Management AI',
  'Eligibility Verification AI',
  'Solutions Platform Overview',
  'Partnership & Business Development',
  'Other',
];

function ContactSectionInner() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    organization: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-fill service from query param — match by slug
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (!serviceParam) return;
    const slugify = (s: string) =>
      s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const matched = SERVICE_OPTIONS.find(
      (opt) => slugify(opt) === slugify(decodeURIComponent(serviceParam))
    );
    setFormData((prev) => ({ ...prev, service: matched ?? '' }));
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("access_key", "0429f33d-5e69-4b3e-81c2-2aa4d46dfc6f");
    payload.append("subject", `Grelin Inquiry — ${formData.service || "General"} from ${formData.organization}`);
    payload.append("from_name", formData.organization);
    payload.append("organization", formData.organization);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone || "Not provided");
    payload.append("service", formData.service || "Not specified");
    payload.append("message", formData.message || "No message provided");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FF_40%,#DCEBFF_72%,#B8D2FF_100%)] px-6 py-24"
      aria-labelledby="contact-heading"
    >
      {/* Stripe Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg,rgba(255,255,255,0.45) 0px,rgba(255,255,255,0.45) 0px,rgba(140,170,220,0.16) 10px,rgba(140,170,220,0.16) 24px,rgba(255,255,255,0.22) 22px,rgba(255,255,255,0.22) 34px)',
          backgroundSize: '20px 100%',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        {/* Header */}
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2B5FE3]">
              Contact Us
            </p>
            <h2
              id="contact-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-[#0A1530] md:text-4xl"
            >
              Talk to a Grelin Expert
            </h2>
            <p className="mx-auto max-w-xl text-slate-600 leading-relaxed">
              Tell us what you are working on. Specialty practice, MSO, distributor, partner, or
              investor — we will get back to you within the same business week.
            </p>
          </div>
        </FadeIn>

        {/* Form Card */}
        <FadeIn delay={0.1}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-white/80 bg-white/70 px-10 py-16 text-center backdrop-blur-sm shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2B5FE3]">
                <CheckCircle2 size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1530]">Message Received</h3>
              <p className="max-w-sm text-slate-600 leading-relaxed">
                Thank you for reaching out. A member of the Grelin team will be in touch within
                one business week.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/80 bg-white/70 px-8 py-10 backdrop-blur-sm shadow-lg md:px-12"
              noValidate
            >
              <div className="grid gap-6">
                {/* Organization Name */}
                <div>
                  <label
                    htmlFor="organization"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A1530]"
                  >
                    <Building2 size={15} className="text-[#2B5FE3]" aria-hidden="true" />
                    Organization Name
                    <span className="text-[#2B5FE3]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Grelin Health, Inc."
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-[#0A1530] placeholder-slate-400 outline-none transition focus:border-[#2B5FE3] focus:ring-2 focus:ring-[#2B5FE3]/20"
                  />
                </div>

                {/* Email + Phone side by side on md+ */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A1530]"
                    >
                      <Mail size={15} className="text-[#2B5FE3]" aria-hidden="true" />
                      Email Address
                      <span className="text-[#2B5FE3]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@organization.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-[#0A1530] placeholder-slate-400 outline-none transition focus:border-[#2B5FE3] focus:ring-2 focus:ring-[#2B5FE3]/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A1530]"
                    >
                      <Phone size={15} className="text-[#2B5FE3]" aria-hidden="true" />
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-[#0A1530] placeholder-slate-400 outline-none transition focus:border-[#2B5FE3] focus:ring-2 focus:ring-[#2B5FE3]/20"
                    />
                  </div>
                </div>

                {/* Service Interested In */}
                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-semibold text-[#0A1530]"
                  >
                    Service Interested In
                    <span className="text-[#2B5FE3] ml-1" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-[#0A1530] outline-none transition focus:border-[#2B5FE3] focus:ring-2 focus:ring-[#2B5FE3]/20 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a service or product…
                    </option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A1530]"
                  >
                    <MessageSquare size={15} className="text-[#2B5FE3]" aria-hidden="true" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your organization, current workflow challenges, and what you are looking to solve…"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-[#0A1530] placeholder-slate-400 outline-none transition focus:border-[#2B5FE3] focus:ring-2 focus:ring-[#2B5FE3]/20"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A1530] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#162040] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ArrowRight size={16} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500">
                  We read every message and respond within one business week.
                </p>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <Suspense fallback={<div className="h-24" />}>
      <ContactSectionInner />
    </Suspense>
  );
}
