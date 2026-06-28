import { Navbar } from "@/components/Navbar";
import { FadeIn } from "@/components/FadeIn";
import SPattern from "@/components/ui/s-pattern";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Grelin",
  description: "Read the Terms of Service governing your access to and use of the Grelin Health website.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of These Terms",
    content: `These Terms of Service ("Terms") govern your access to and use of the website located at www.grelinhealth.com and any related pages, content, and features made available by Grelin Health, Inc. and its affiliates (collectively, "Grelin," "we," "us," or "our") (together, the "Website").

By accessing or using the Website, you ("you" or "User") acknowledge that you have read, understood, and agree to be bound by these Terms and by our Privacy Policy, which is incorporated here by reference. If you do not agree to these Terms, do not access or use the Website.

We may update these Terms from time to time. Your continued use of the Website after any change becomes effective constitutes your acceptance of the revised Terms.`,
  },
  {
    id: "about",
    title: "2. About Grelin and the Website",
    content: `Grelin Health, Inc. is a Delaware-incorporated company providing AI-enabled healthcare Revenue Cycle Management ("RCM") and related services to healthcare providers and organizations. The Website is an informational and marketing resource describing our company, our services, and related content.

The Website is not the channel through which our services are delivered. Access to and use of Grelin's RCM platform, applications, and professional services are governed exclusively by the separate written agreements executed between Grelin and the relevant client or partner (for example, a Master Services Agreement, Statement of Work, Business Associate Agreement, and/or Data Processing Agreement). Nothing on the Website creates, modifies, or supersedes those agreements.`,
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    content: `The Website is intended for use by businesses and professionals. By using the Website, you represent that you are at least 18 years old and have the legal capacity to enter into these Terms. If you use the Website on behalf of an organization, you represent that you are authorized to bind that organization to these Terms.`,
  },
  {
    id: "no-medical-advice",
    title: "4. No Medical Advice",
    content: `The content on the Website is provided for general informational purposes only. It does not constitute medical, clinical, legal, financial, regulatory, or professional advice, and it must not be relied upon as a substitute for advice from a qualified professional. Grelin does not provide medical care or clinical services and is not a healthcare provider.`,
  },
  {
    id: "phi",
    title: "5. Protected Health Information (PHI) — Do Not Submit Through the Website",
    content: `The Website is not a secure channel for transmitting Protected Health Information ("PHI") as defined under the Health Insurance Portability and Accountability Act of 1996 ("HIPAA") and its implementing regulations, or for transmitting any other sensitive personal, patient, or health data.

Do not submit PHI, patient records, or any sensitive health information through any form, email link, chat, or other feature on the Website. Any PHI exchanged between Grelin and a client is handled solely under an executed Business Associate Agreement and through the secure systems designated in that agreement. Grelin disclaims responsibility for any PHI a User chooses to submit through the Website in violation of these Terms.`,
  },
  {
    id: "hipaa",
    title: "6. HIPAA and Compliance Posture",
    content: `Grelin acts as a HIPAA Business Associate when providing services to its clients and maintains administrative, physical, and technical safeguards designed to protect the confidentiality, integrity, and availability of information entrusted to it. Statements on the Website regarding our compliance posture, certifications, or attestations (including any SOC 2 status) are provided for general informational purposes and do not constitute a warranty or contractual commitment except as expressly set out in a signed agreement between Grelin and a client.`,
  },
  {
    id: "acceptable-use",
    title: "7. Acceptable Use",
    content: `You agree that you will not, and will not permit any third party to:
• use the Website for any unlawful, fraudulent, or unauthorized purpose;
• attempt to gain unauthorized access to the Website, its servers, or any connected systems or networks;
• introduce viruses, malware, or other harmful code, or otherwise interfere with or disrupt the Website's operation or security;
• scrape, harvest, data-mine, or use automated means to extract content or data from the Website except as permitted by our published robots.txt;
• reverse engineer, decompile, or otherwise attempt to derive the source code of any software made available through the Website;
• misrepresent your identity or affiliation, or impersonate any person or entity;
• use the Website in any way that infringes the intellectual property or other rights of Grelin or any third party; or
• transmit PHI or other sensitive health information in violation of Section 5.

We reserve the right to investigate and take appropriate action against anyone who, in our sole discretion, violates this Section, including suspending or terminating access and reporting conduct to law enforcement.`,
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content: `The Website and all content, design, text, graphics, logos, trademarks, software, and other materials on it (collectively, "Content") are owned by or licensed to Grelin and are protected by intellectual property and other applicable laws. The "Grelin" and "Grelin Health" names and logos are trademarks of Grelin Health, Inc.

We grant you a limited, non-exclusive, non-transferable, revocable license to access and view the Website for your internal, informational, and non-commercial use. No other right or license is granted. You may not copy, reproduce, distribute, modify, create derivative works from, publicly display, or otherwise exploit any Content without our prior written consent, except as permitted by applicable law.`,
  },
  {
    id: "user-submissions",
    title: "9. User Submissions and Feedback",
    content: `If you submit comments, suggestions, ideas, or other feedback regarding the Website or Grelin's services ("Feedback"), you grant Grelin a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, and incorporate that Feedback for any purpose without obligation or compensation to you. Do not submit any Feedback that is confidential, that you are not entitled to disclose, or that includes PHI or sensitive personal data.`,
  },
  {
    id: "third-party",
    title: "10. Third-Party Links and Services",
    content: `The Website may contain links to third-party websites, resources, or services that are not owned or controlled by Grelin. We provide these links for convenience only and do not endorse and are not responsible for the content, products, services, or practices of any third party. Your use of any third-party website or service is at your own risk and subject to that third party's terms and policies.`,
  },
  {
    id: "privacy",
    title: "11. Privacy",
    content: `Your use of the Website is also governed by our Privacy Policy and, where applicable, our Cookie Policy, which describe how we collect, use, and protect information about Website visitors. Please review those documents to understand our practices.`,
  },
  {
    id: "disclaimers",
    title: "12. Disclaimers",
    content: `THE WEBSITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY LAW, GRELIN DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

GRELIN DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT ANY DEFECTS WILL BE CORRECTED. YOU ARE RESPONSIBLE FOR IMPLEMENTING APPROPRIATE SAFEGUARDS TO PROTECT YOUR OWN SYSTEMS AND DATA.`,
  },
  {
    id: "liability",
    title: "13. Limitation of Liability",
    content: `TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL GRELIN OR ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE WEBSITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, EVEN IF GRELIN HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

GRELIN'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS OR THE WEBSITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100). THIS SECTION DOES NOT LIMIT LIABILITY FOR MATTERS THAT CANNOT BE LIMITED OR EXCLUDED UNDER APPLICABLE LAW. NOTHING IN THESE TERMS AFFECTS THE RIGHTS OR OBLIGATIONS SET OUT IN ANY SEPARATE WRITTEN AGREEMENT BETWEEN GRELIN AND A CLIENT.`,
  },
  {
    id: "indemnification",
    title: "14. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Grelin and its affiliates and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to your breach of these Terms, your misuse of the Website, or your violation of any law or the rights of any third party.`,
  },
  {
    id: "governing-law",
    title: "15. Governing Law and Dispute Resolution",
    content: `These Terms and any dispute arising out of or relating to them or the Website will be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict-of-laws principles. You agree that the state and federal courts located in Florida will have exclusive jurisdiction over any such dispute, and you consent to personal jurisdiction in those courts.`,
  },
  {
    id: "termination",
    title: "16. Suspension and Termination of Access",
    content: `We may suspend, restrict, or terminate your access to the Website at any time, with or without notice, for any reason, including any suspected violation of these Terms. Sections that by their nature should survive termination (including Sections 8, 9, and 12 through 18) will continue in effect.`,
  },
  {
    id: "changes",
    title: "17. Changes to the Website",
    content: `We may modify, suspend, or discontinue all or any part of the Website at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the Website.`,
  },
  {
    id: "general",
    title: "18. General",
    content: `Entire Agreement. These Terms, together with the Privacy Policy and any other policies referenced here, constitute the entire agreement between you and Grelin regarding your use of the Website and supersede any prior understandings on that subject.

Severability. If any provision of these Terms is held invalid or unenforceable, that provision will be modified to the minimum extent necessary, and the remaining provisions will remain in full force and effect.

No Waiver. Our failure to enforce any provision of these Terms is not a waiver of our right to do so later.

Assignment. You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.

No Agency. Nothing in these Terms creates any partnership, joint venture, agency, or employment relationship between you and Grelin.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="bg-brand-dark text-white">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0A1530] bg-stripe-dark overflow-hidden"
        aria-label="Terms of Service hero"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1530]/80 pointer-events-none"
          aria-hidden="true"
        />
        <SPattern />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <p className="text-[#7EA6CA] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Legal Information
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Terms of Service
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg text-[#C0E1FF] leading-relaxed max-w-2xl">
              Please read these Terms carefully before using the Grelin Health
              website. They govern your access to and use of our digital
              properties.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-sm text-[#7EA6CA] mt-8">Last Updated: June 2026</p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-[#0A1530]" aria-label="Terms of service content">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <FadeIn key={section.id} delay={0.05 * index}>
                <div id={section.id} className="scroll-mt-20">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-[#C0E1FF] leading-relaxed text-base md:text-lg">
                    {section.content.split("\n\n").map((paragraph, pIdx) => (
                      <p key={pIdx} className="whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Contact Section */}
            <FadeIn delay={0.5}>
              <div
                id="contact"
                className="scroll-mt-20 bg-[#1a3a7c] rounded-2xl p-8 md:p-12 border border-white/10"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                  19. Contact Us
                </h2>
                <p className="text-[#C0E1FF] leading-relaxed mb-8">
                  If you have questions about these Terms, contact us at:
                </p>

                <div className="bg-[#0A1530] rounded-lg p-6 border border-[#3152AD]/30">
                  <p className="text-[#7EA6CA] text-sm font-semibold mb-4 uppercase tracking-wide">
                    Contact Information
                  </p>
                  <div className="space-y-3 text-[#C0E1FF]">
                    <p>
                      <span className="font-semibold">Company:</span> Grelin Health, Inc.
                    </p>
                    <p>
                      <span className="font-semibold">Attention:</span> Compliance
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> 6105 N Wickham Rd # 410253, Melbourne, FL 32941
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      <a
                        href="mailto:Compliance@grelinhealth.com"
                        className="text-[#7EA6CA] hover:text-[#C0E1FF] transition-colors"
                      >
                        Compliance@grelinhealth.com
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-[#C0E1FF] leading-relaxed text-sm mt-6">
                  For privacy-related inquiries, contact our Compliance Officer at{" "}
                  <a
                    href="mailto:Compliance@grelinhealth.com"
                    className="text-[#7EA6CA] hover:text-[#C0E1FF] transition-colors"
                  >
                    Compliance@grelinhealth.com
                  </a>
                  .
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
