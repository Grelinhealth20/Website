import { Navbar } from "@/components/Navbar";
import { FadeIn } from '@/components/FadeIn';
import SPattern from "@/components/ui/s-pattern";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Grelin",
  description: "Learn about how Grelin Health collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction and Scope",
      content: `Grelin Health, Inc. ("Grelin Health," "we," "us," or "our") is committed to protecting the privacy and security of all individuals who interact with our organization. This Website Privacy Policy ("Privacy Policy") sets forth our comprehensive approach to data governance and outlines how we collect, process, use, disclose, and safeguard information obtained through our digital properties.

This Privacy Policy applies to information collected through Grelin Health's public-facing digital properties, including www.grelinhealth.com, affiliated subdomains, web-based contact forms, marketing landing pages, and other online platforms that link to this Privacy Policy (collectively, the "Sites"). These Sites serve healthcare organizations, business partners, prospective clients, employment applicants, and other professional stakeholders throughout the United States.

Grelin Health is an AI-powered Autonomous Revenue Cycle Management (RCM) technology provider delivering specialized services to healthcare organizations across the United States. By accessing or utilizing our Sites, you acknowledge your understanding of this Privacy Policy in its entirety.

This Privacy Policy governs information collected exclusively through our marketing and informational Sites and does not extend to:
• Data processed through our enterprise service platform, which is governed by executed Master Services Agreements, Business Associate Agreements (BAAs), and Data Processing Agreements (DPAs) with healthcare provider customers.
• Information disclosed directly to healthcare provider customers; such information is subject to the privacy policies and practices of the respective healthcare organization.
• Data collected through third-party websites, applications, or services accessible via hyperlinks from our Sites; such third parties maintain independent privacy governance.
• Personnel information of Grelin Health employees and contractors, which is subject to separate internal privacy and data handling protocols.

This Privacy Policy does not create any contractual rights, legal obligations, or third-party beneficiary interests.`
    },
    {
      id: "phi",
      title: "2. Protected Health Information (PHI) Handling",
      content: `Grelin Health processes Protected Health Information (PHI) pertaining to patients of our healthcare provider customers in connection with revenue cycle management services provided under contractual arrangements. In this capacity, Grelin Health functions as a "Business Associate" as defined under the Health Insurance Portability and Accountability Act of 1996 and its regulatory framework (HIPAA).

Our management of PHI is governed by:
• The Health Insurance Portability and Accountability Act (HIPAA) Privacy, Security, and Breach Notification Rules (45 CFR Parts 160 and 164)
• The executed Business Associate Agreement (BAA) between Grelin Health and the applicable healthcare provider entity
• Applicable Data Processing Agreements (DPAs) and supplementary contractual arrangements

Important Notice: Protected Health Information is NOT collected through our Sites.

Our Sites function exclusively as marketing and informational platforms. We do not solicit or accept Protected Health Information through any contact form, communication channel, or submission mechanism on our Sites. Any PHI maintained by Grelin Health is received directly from healthcare provider customers under HIPAA-compliant Business Associate Agreements—not through digital marketing channels.

For individuals seeking information regarding the use, access, or correction of their health information, please contact your healthcare provider directly. Healthcare providers, as Covered Entities under HIPAA, are responsible for providing patients with comprehensive Notice of Privacy Practices documentation.`
    },
    {
      id: "information-collection",
      title: "3. Information Collection Practices",
      content: `Grelin Health collects information through three primary channels: direct provision by users, automatic collection during Site interactions, and limited third-party sources. Below we provide a comprehensive taxonomy of information categories.

3.1 Directly Provided Information
Users may elect to provide information through various Site interaction points:
• Professional Inquiry Submissions: When submitting contact forms, demo requests, or general inquiries, we collect professional contact information including name, business email address, telephone number, organizational affiliation, job title, geographic location, and communication content.
• Marketing Program Enrollment: Participation in newsletter subscriptions, webinar registrations, or content resource downloads requires collection of name, business email, organizational details, and preference selections.
• Employment Applications: Job application submissions require name, contact information, resume/curriculum vitae, cover letters, employment and educational background, professional references, work authorization documentation, and supplementary materials.
• Professional Correspondence: Electronic communications via email, contact forms, chat interfaces, or other messaging channels, including associated attachments and documents.
• Event Participation: Business contact information and communication records from interactions at Grelin Health-sponsored or co-sponsored events, conferences, and industry gatherings.

Voluntary provision of certain information may be restricted; declining to provide requested information may limit access to specific Site features or communications.

3.2 Automatically Collected Information
The Sites generate automatic data collection through our infrastructure and authorized technology partners:
• Technical Environment Data: Internet Protocol (IP) address, device classification and characteristics, operating system specification, browser type and version, language preferences, timezone information, and screen resolution metrics.
• Usage Pattern Data: Visited pages and interface elements, interaction events, time allocation per page, navigation sequences, referral sources, and exit pathways.
• Server Event Records: Technical transaction logs and request records including temporal data and access metadata.
• Geographic Information: General geographic location derived from IP address analysis; precise GPS-based location is not collected via our Sites.
• Cookie and Tracking Technology: See Section 5 for comprehensive cookie utilization documentation.

3.3 Third-Party Information Sources
We may receive supplementary information from carefully selected third parties:
• Marketing Development Partners: Lead generation and marketing partners operating under applicable legal compliance frameworks.
• Professional Data Sources: Business directories, professional networking platforms, and publicly available professional databases utilized for B2B prospecting consistent with applicable regulations.
• Co-Marketing Partnerships: Joint marketing partners with whom we distribute collaborative content, where you have consented to information sharing.
• Recruitment Resources: Recruiting platforms, professional recruiters, and professional references in connection with employment considerations.
• Service Provider Functions: Vendors providing fraud detection, security assessments, and advanced analytics services.

3.4 Sensitive Information Protection
Grelin Health does not request sensitive personal information through our Sites. We strongly advise against submitting Social Security numbers, financial account credentials, payment card numbers, government-issued identification numbers, biometric data, precise geographic location data, or Protected Health Information through any Site communication channel. Should sensitive information be voluntarily submitted, we will treat it in accordance with applicable legal frameworks and this Privacy Policy, and will securely delete such information when retention is not operationally necessary.`
    },
    {
      id: "use-information",
      title: "4. Information Utilization Framework",
      content: `Grelin Health utilizes collected information exclusively for legitimate business and commercial purposes, including:

• Inquiry Response and Support: Responding to contact inquiries, demo requests, technical support questions, and professional communications.
• Service Delivery: Fulfilling content delivery requests, managing event registrations, and providing comprehensive product and service information.
• Recruitment Operations: Evaluating employment applications, conducting candidate communications, and fulfilling recruitment and verification obligations.
• Marketing and Business Development: Delivering marketing communications regarding Grelin Health's offerings, events, and thought leadership content, in compliance with applicable legal requirements and subject to recipient opt-out rights.
• Experience Personalization: Customizing Site experience through content recommendations and targeted advertising in accordance with applicable legal frameworks.
• Analytics and Continuous Improvement: Analyzing visitor engagement patterns, measuring marketing campaign performance, and optimizing content, design, performance, and overall user experience.
• Security and Fraud Prevention: Detecting, investigating, and preventing fraudulent activity, unauthorized access, and unlawful conduct; protecting the security and integrity of our Sites, network infrastructure, and information assets.
• Legal and Regulatory Compliance: Fulfilling legal obligations, regulatory requirements, court orders, and valid legal process requests; enforcing terms of service and contractual agreements.
• Corporate Transaction Evaluation: Assessing and executing potential or actual corporate transactions including mergers, acquisitions, financing arrangements, and organizational restructuring.

Grelin Health does not utilize Site-collected information to train, fine-tune, or evaluate production artificial intelligence or machine learning models. Site-collected information is reserved exclusively for marketing, sales, recruitment, and operational functions described in this Section. Information collected through the Sites is specifically excluded from use in developing or improving AI/ML models that power our customer-facing revenue cycle management platform. Customer data, including Protected Health Information processed under executed BAAs, is governed separately through BAAs, DPAs, and customer-specific contractual arrangements.

Information may be aggregated or de-identified such that it no longer reasonably identifies individuals, and such aggregated or de-identified information may be utilized and disclosed for any lawful purpose, including service improvement and product development initiatives.`
    },
    {
      id: "cookies",
      title: "5. Cookie and Tracking Technology Implementation",
      content: `The Grelin Health Sites utilize cookies, pixels, web beacons, tracking tags, scripts, software development kits, and similar tracking technologies (collectively, "Cookies") to provide essential functionality, analyze traffic patterns, and support marketing initiatives. Cookies are small data files stored on user browsers or devices. Session cookies are automatically deleted upon browser closure; persistent cookies remain on devices until expiration or manual deletion. First-party cookies are set by Grelin Health; third-party cookies are set by authorized service providers and partners.

5.1 Cookie Classification and Purpose
• Essential Functional Cookies: Required for Site operation, security protocols, user authentication, infrastructure load balancing, and cookie preference recording. These cookies cannot be disabled without compromising Site functionality.
• Performance Analytics Cookies: Enable analysis of visitor interaction patterns, page visitation behavior, and navigational pathways. Third-party analytics services including Google Analytics may be utilized for this purpose.
• Preference Management Cookies: Store user preferences including language selection, regional settings, and display customization to enhance user experience consistency.
• Marketing and Advertising Cookies: Track cross-website activity to deliver contextually relevant marketing communications, measure campaign performance, and control advertisement frequency. These cookies may be deployed by advertising networks and platforms operating under our authorization.

5.2 Cookie Management and User Controls
Users have multiple options to manage cookie utilization:
• Cookie Consent Management: Where required by law, the Sites display a cookie management interface enabling users to accept, reject, or customize non-essential cookie deployment. Cookie preferences may be revisited at any time through Site-based preference controls.
• Browser-Level Controls: Most web browsers offer cookie management options through settings and preferences. Refer to your browser's documentation for specific instructions. Disabling essential cookies may impair Site functionality.
• Industry Opt-Out Mechanisms: Users may opt out of interest-based advertising through the Digital Advertising Alliance (optout.aboutads.info), the Network Advertising Initiative (thenai.org/opt-out), and the European Interactive Digital Advertising Alliance (youronlinechoices.eu).
• Mobile Device Preferences: Mobile device advertising settings enable users to manage ad tracking ("Limit Ad Tracking" on iOS; "Opt out of Ads Personalization" on Android).

5.3 Do-Not-Track Signal Handling
Some browsers transmit "Do Not Track" (DNT) signals to web properties. Due to the absence of industry-standardized DNT interpretation protocols, the Sites do not currently respond to DNT signals. We do honor opt-out preferences submitted through the Global Privacy Control (GPC) signal where required by applicable U.S. state privacy legislation.`
    },
    {
      id: "sharing",
      title: "6. Information Sharing and Disclosure",
      content: `Grelin Health does not sell personal information for monetary or other direct consideration. Information is shared only as described in this Privacy Policy and as permitted by applicable law. Information recipients include:

• Service Provider Network: Vendors and contractors providing services including website hosting, customer relationship management (CRM), email and marketing automation, advanced analytics, targeted advertising, recruitment and applicant tracking, security and fraud prevention, customer support, and event management. Service providers are contractually required to maintain information confidentiality and utilize information exclusively for contracted purposes.
• Corporate Affiliates: Grelin Health's affiliated entities, including U.S. and India-based group companies, with whom information is shared for business purposes described in this Privacy Policy consistent with applicable law.
• Healthcare Provider Customers: Where individuals contact Grelin Health in a professional capacity as workforce members of our customers, relevant information may be shared with the customer organization in the ordinary course of the business relationship.
• Professional Advisory Services: Legal counsel, auditors, financial advisors, insurance providers, and other professional advisors engaged to provide professional guidance or manage corporate, regulatory, and legal matters.
• Government and Law Enforcement: Disclosure where required by law, court order, subpoena, search warrant, or valid legal process; or where disclosure is necessary to protect the rights, property, safety, or security of Grelin Health, our customers, or third parties, or to detect, prevent, or remediate fraud, security vulnerabilities, or technical issues.
• Corporate Transaction Participants: In connection with mergers, acquisitions, financing arrangements, reorganizations, asset sales, bankruptcy proceedings, or similar corporate transactions (whether actual or contemplated), information may be shared with transaction participants and their advisors, subject to appropriate confidentiality obligations.
• User Direction: Any other circumstances where users provide explicit consent or direction.

Grelin Health may share aggregated or de-identified information for any lawful purpose, including industry research initiatives, marketing analysis, and product development activities.`
    },
    {
      id: "data-retention",
      title: "8. Data Retention Framework",
      content: `Grelin Health maintains personal information for the duration necessary to fulfill collection purposes, including:

• Inquiry and Request Management: Responding to and following up on user inquiries, requests, and communications.
• Business Relationship Continuity: Maintaining ongoing customer and partner relationships.
• Legal and Regulatory Obligation: Complying with legal requirements, accounting standards, tax obligations, regulatory mandates, and contractual obligations.
• Legal Claim Management: Establishing, exercising, or defending legal claims, including applicable statute of limitations periods.
• Agreement Enforcement: Enforcing contractual arrangements and preventing fraud, abuse, and unauthorized access.

Upon determination that information is no longer operationally necessary, Grelin Health will securely delete or de-identify such information. Retention periods vary depending on information category and processing purpose. Specific retention timelines are documented in Grelin Health's internal Records Retention Policy and are applied consistently across all information categories.`
    }
  ];

  return (
    <main className="bg-brand-dark text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0A1530] bg-stripe-dark overflow-hidden" aria-label="Privacy Policy hero">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1530]/80 pointer-events-none" aria-hidden="true" />
        <SPattern />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <p className="text-[#7EA6CA] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Legal Information
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Privacy Policy
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg text-[#C0E1FF] leading-relaxed max-w-2xl">
              Learn how Grelin Health collects, uses, and protects your information. This policy explains our commitment to your privacy and data security.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-sm text-[#7EA6CA] mt-8">
              Last Updated: June 2026
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-[#0A1530]" aria-label="Privacy policy content">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <FadeIn key={section.id} delay={0.05 * index}>
                <div id={section.id} className="scroll-mt-20">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-[#C0E1FF] leading-relaxed text-base md:text-lg">
                    {section.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Additional Sections */}
            <FadeIn delay={0.4}>
              <div id="security" className="scroll-mt-20">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                  9. Information Security Safeguards
                </h2>
                <div className="space-y-4 text-[#C0E1FF] leading-relaxed text-base md:text-lg">
                  <p>Grelin Health implements comprehensive administrative, technical, and physical security controls designed to protect personal information from unauthorized access, use, disclosure, alteration, and destruction. These controls are applied commensurate with information sensitivity and regulatory requirements:</p>
                  <div className="space-y-2 pl-4 border-l-2 border-[#7EA6CA]/30">
                    <p>• Data Encryption: Encryption of data in transit utilizing industry-standard Transport Layer Security (TLS) protocols and encryption of data at rest within production environments using FIPS-validated cryptographic algorithms.</p>
                    <p>• Access Controls: Role-based access control (RBAC) implementation, multi-factor authentication (MFA) requirements, and least-privilege access principles governing personnel information access.</p>
                    <p>• Network Security Infrastructure: Advanced network segmentation, firewall protection, intrusion detection and prevention systems (IDPS), and continuous security monitoring.</p>
                    <p>• Personnel Security: Background verification for personnel with information access, mandatory security awareness training, and periodic security certification renewal.</p>
                    <p>• Vendor Governance: Comprehensive due diligence procedures for service providers and sub-processors, contractual security requirements, and continuous compliance oversight.</p>
                    <p>• Incident Response: Documented incident response procedures including detection, investigation, containment, remediation, and notification protocols consistent with applicable legal requirements.</p>
                    <p>• Vulnerability Management: Regular security assessments, penetration testing, vulnerability scanning, and timely remediation of identified deficiencies.</p>
                    <p>• Business Continuity: Disaster recovery and business continuity planning to ensure information availability and integrity.</p>
                  </div>
                  <p className="mt-4">Grelin Health acknowledges that no internet transmission method or electronic storage system provides absolute security. While we implement commercially reasonable security measures consistent with industry best practices, we cannot guarantee absolute information security. Users retain responsibility for maintaining credential confidentiality and exercising appropriate care when transmitting information to Grelin Health.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div id="contact" className="scroll-mt-20 bg-[#1a3a7c] rounded-2xl p-8 md:p-12 border border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                  10. Privacy Inquiries and Data Subject Requests
                </h2>
                <p className="text-[#C0E1FF] leading-relaxed mb-8">
                  Grelin Health is committed to addressing privacy inquiries, data subject requests, and concerns regarding our information handling practices. Should you have questions regarding this Privacy Policy, our data governance practices, or wish to exercise your privacy rights, please direct your inquiry to our Privacy Office using the contact information provided below.
                </p>
                
                <div className="bg-[#0A1530] rounded-lg p-6 mb-6 border border-[#3152AD]/30">
                  <p className="text-[#7EA6CA] text-sm font-semibold mb-4 uppercase tracking-wide">Primary Contact Information</p>
                  <div className="space-y-3 text-[#C0E1FF]">
                    <p>
                      <span className="font-semibold">Organization:</span> Grelin Health, Inc.
                    </p>
                    <p>
                      <span className="font-semibold">Privacy Office Email:</span> <a href="mailto:Compliance@grelinhealth.com" className="text-[#7EA6CA] hover:text-[#C0E1FF] transition-colors">Compliance@grelinhealth.com</a>
                    </p>
                    <p>
                      <span className="font-semibold">Response Timeline:</span> Grelin Health commits to acknowledging all privacy inquiries and data subject requests within five (5) business days of receipt. Comprehensive responses to documented requests will be provided within thirty (30) calendar days, consistent with applicable legal requirements.
                    </p>
                  </div>
                </div>

                <p className="text-[#C0E1FF] leading-relaxed text-sm">
                  When submitting privacy inquiries or data subject requests, please provide sufficient information to enable Grelin Health to accurately identify you and process your request. This may include your name, email address, organization affiliation, and a clear description of your inquiry or request.
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
