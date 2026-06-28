import {
  CheckCircle2,
  FileText,
  Code2,
  DollarSign,
  Send,
  ShieldCheck,
  RefreshCw,
  Zap,
  Maximize,
  Activity,
  FileSearch,
  Building2,
  Stethoscope,
  Landmark,
  ClipboardList } from
'lucide-react';

export const landingPageData = {
  nav: {
    logo: 'Grelin',
    links: [
    'Solutions',
    'Platform',
    'Specialties',
    'Proof',
    'Partners',
    'Resources',
    'Company'],

    loginText: 'Log In',
    ctaText: 'Request Demo'
  },
  hero: {
    tag: 'THE CATEGORY',
    headline: 'Claim Integrity. The discipline',
    headlineHighlight: 'we built for.',
    description:
    'The claim is decided long before billing ever sees it. The integrity of the claim determines the integrity of the business. That is the idea every line of our code and every dollar of our revenue traces back to.',
    primaryCta: 'SEE THE PLATFORM',
    secondaryCta: 'HOW IT RUNS IN BOTH DIRECTIONS'
  },
  axiom: {
    tag: 'THE CATEGORY AXIOM',
    textPart1: 'Claim Integrity, defined: whether the claim is ',
    textHighlight1: 'correct before it exists',
    textPart2: ' and ',
    textHighlight2: 'verifiable after it is filed.'
  },
  coreIdea: {
    tag: 'THE CORE IDEA',
    headline: 'The work that breaks downstream was created upstream.',
    description1:
    'Claims break downstream because they are built wrong upstream. The old answer was to throw analysts at the back end.',
    description2:
    'We took the other path. We built software that reads clinical and financial data, understands payer rules, and applies judgment at scale. We placed that intelligence in front of the claim, where the work actually begins.',
    cards: [
    {
      icon: CheckCircle2,
      title: 'Eligibility',
      description:
      'Verifies patient benefits and active insurance coverages at the very start.'
    },
    {
      icon: FileText,
      title: 'Authorization',
      description:
      'Secures medical necessity clearance and payer approval prior to care.'
    },
    {
      icon: Activity,
      title: 'Documentation',
      description:
      'Logs clinical findings and physician records accurately within the EHR.'
    },
    {
      icon: Code2,
      title: 'Coding',
      description:
      'Translates clinical records into standardized diagnostic billing codes.'
    },
    {
      icon: DollarSign,
      title: 'Charge Capture',
      description:
      'Records and bundles all billable items and clinical services rendered.'
    },
    {
      icon: Send,
      title: 'Submission',
      description:
      'The compiled claim is formatted and dispatched to the clearinghouse.'
    }]

  },
  dualDirection: {
    tag: 'DUAL-DIRECTION INTELLIGENCE',
    headline: 'One engine, two directions.',
    description:
    'The same underlying intelligence that prevents a bad claim also recognizes one. The direction changes. The analytical logic does not.',
    cards: [
    {
      title: 'Prevent the bad claim before creation.',
      description:
      'The Grelin engine catches clinical and administrative validation gaps while the encounter is still active, correcting mistakes at the lowest possible cost.',
      bullets: [
      {
        label: 'RxAI:',
        text: 'Enforces compliance in pharmacy supply chains.'
      },
      {
        label: 'Specialty Apps:',
        text: 'Validates intricate diagnosis codes.'
      }]

    },
    {
      title: 'Recognize the bad claim retrospectively.',
      description:
      'Immediately following claim generation, Grelin audits claims for correctness, code bundles, and payer compliance rules before outbound dispatch.',
      bullets: [
      { label: 'Auditor:', text: 'Evaluates bills through 20 checks.' },
      {
        label: 'Validation layer:',
        text: 'Secure of compliance rules scans.'
      }]

    }],
   bottomDescription: 'One engine. Same brain. Every claim processed sharpens the system. A rule optimized to protect a pharmacy yesterday immediately helps a corporate health plan today.'

  },
  platform: {
    tag: 'PLATFORM OVERVIEW',
    headline: 'Why it compounds.',
    description:
    'A platform is one engine resolving many administrative problems. Every transaction expands capability.',
    cards: [
    {
      icon: Zap,
      title: 'It learns.',
      subtitle: 'EVERY CLAIM SHARPENS IT.',
      description:
      'The same core rules engine processes thousands of unique healthcare transactions daily. When a payer alters a compliance policy, the adjustment immediately reinforces the models. The rules sharpen, the edge cases narrow, and the longer Grelin runs, the more domains it protects.'
    },
    {
      icon: RefreshCw,
      title: 'It transfers.',
      subtitle: 'SHARED INTELLIGENCE IN BOTH DIRECTIONS.',
      description:
      'Verifying whether a claim is valid is the exact same fundamental puzzle, whether you are trying to write it cleanly (Provider/Pharmacy) or audit it for accuracy (Payer/Plan). What our engine learns preventing a pharmacy error yesterday helps audit a health plan payment today.'
    },
    {
      icon: Maximize,
      title: 'It scales.',
      subtitle: 'UNIVERSAL REACH ACROSS VERTICALS.',
      description:
      'The financial systems of healthcare might look highly fragmented, but they all converge on the same data structures. The vertical changes, but the underlying verification logic stays the same. The platform operates natively across all four key domains of administration risk.'
    }]

  },
  markets: {
    tag: 'MARKETS EXPANSION',
    headline: 'Served markets running on claims.',
    description:
    'Administrative software that learns is cheaper to operate than human pipelines that do not. Preemptive intelligence guarantees continuous margin protection.',
    cards: [
    {
      title: 'Payers and Health Plans',
      description:
      'Eliminate overpayments, detect billing abuse, and audit outbound payments continuously before the capital leaves the trust account.'
    },
    {
      title: 'Pharmacy and Distribution',
      description:
      'Power complex Rx networks. RxAI enforces compliance across the pharmacy supply chain, stopping prescription-level risks at the dispenser.'
    },
    {
      title: 'Providers and MSOs',
      description:
      'Validate patient documentation, verify medical necessity, and execute zero-rework claims without bloating administrative staff.'
    },
    {
      title: 'Medicare and Medicaid',
      description:
      'Protect public programs from systematic leakage, validate billing rules for managed care groups, and capture clinical integrity at scale.'
    },
    {
      title: 'CMS and State Agencies',
      description:
      'Deploy real-time program integrity systems that integrate natively with public enrollment systems to prevent systematic fraud.'
    },
    {
      title: 'Audit Organizations',
      description:
      'Equip payment review teams with 20 concurrent rules layer checks to complete reviews in minutes rather than arbitrary weeks.'
    }]

  },
  cta: {
    tag: 'INTEGRATED INTEGRITY',
    headline: 'One engine. Before it exists, and after it is filed.',
    description:
    'Every transaction that runs on claims is a market Grelin is natively built to serve. Secure your financial accuracy today.',
    buttonText: 'TALK TO THE CLAIM INTEGRITY TEAM'
  },
  footer: {
    logo: 'Grelin',
    copyright:
    '© 2024 Grelin Revenue Intelligence. Precision moving upstream.',
    links: [
    'Privacy Policy',
    'Terms of Service',
    'Security Architecture',
    'Contact Sales']

  }
};