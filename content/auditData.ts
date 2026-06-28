export interface NavData {
  logo: string;
  links: string[];
  loginText: string;
  demoText: string;
}

export interface HeroData {
  eyebrow: string;
  headlinePart1: string;
  headlinePart2: string;
  headlineHighlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  stats: {value: string;label: string;}[];
}

export interface ProblemData {
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  callout: string;
  mockup: {
    legacy: {title: string;steps: string[];};
    audit: {title: string;steps: string[];};
  };
}

export interface EngineData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  layers: {id: number;title: string;description: string;}[];
  matrix: {
    title: string;
    stats: {label: string;value: string;sub: string;}[];
    specialties: string[];
  };
}

export interface VerdictsData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  cards: {
    title: string;
    description: string;
    status: 'passed' | 'denied' | 'hold' | 'vision' | 'coding' | 'unheld';
  }[];
}

export interface SurfacesData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  overview: {label: string;value: string;}[];
  clearVision: {label: string;percentage: number;color: string;}[];
  smartFilter: {
    columns: string[];
    rows: {
      id: string;
      patient: string;
      specialty: string;
      provider: string;
      cpt: string;
      value: string;
      verdict: 'Passed' | 'Denied' | 'Hold' | 'Vision' | 'Coding' | 'Unheld';
      notes: string;
    }[];
  };
}

export interface QuoteData {
  text: string;
  author: string;
  role: string;
}

export interface DemoData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  form: {
    initialsLabel: string;
    valueLabel: string;
    cptLabel: string;
    categoryLabel: string;
    buttonText: string;
  };
  results: {
    name: string;
    status: 'Pending' | 'Passed' | 'Failed' | 'Flagged';
  }[];
}

export interface CtaData {
  headline: string;
  description: string;
  formDescription: string;
  form: {
    emailPlaceholder: string;
    orgPlaceholder: string;
    buttonText: string;
  };
}

export interface FooterData {
  logo: string;
  copyright: string;
  links: string[];
}

export interface AuditSiteData {
  nav: NavData;
  hero: HeroData;
  problem: ProblemData;
  engine: EngineData;
  verdicts: VerdictsData;
  surfaces: SurfacesData;
  quote: QuoteData;
  demo: DemoData;
  cta: CtaData;
  footer: FooterData;
}

export const auditData: AuditSiteData = {
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
    demoText: 'Request Demo'
  },
  hero: {
    eyebrow: 'AI-DRIVEN CLAIMS INTELLIGENCE',
    headlinePart1: 'Audit every claim.',
    headlinePart2: 'Not a',
    headlineHighlight: 'sample.',
    description:
    'A payer can decide to audit one hundred percent of claims. The limit was never the decision, it was the time to build the logic, run it, and assemble the findings. Audit.ai runs every claim through 29 checks in minutes and hands the auditor a ranked, reasoned queue.',
    primaryCta: 'See Audit.ai on your own claims',
    secondaryCta: 'How the engine works',
    stats: [
    { value: '100%', label: 'OF CLAIMS AUDITED, NOT SAMPLED' },
    { value: '29 CHECKS', label: 'PER CLAIM' },
    { value: '6 LAYERS', label: 'OF AUDIT' },
    { value: 'MINUTES', label: 'TO A REASONED QUEUE' }]

  },
  problem: {
    eyebrow: 'Order of operations',
    headline: 'The problem.',
    highlight: 'Recovery starts before payment.',
    description:
    'Pay and chase is the order of operations almost everywhere. The claim gets paid. The dollar leaves the plan. Recovery becomes a slow negotiation that clears cents on the dollar.',
    callout:
    'Audit.ai changes the order. Six audit layers run before adjudication. When fraud or overpayment shows up, the dollar does not.',
    mockup: {
      legacy: {
        title: 'Legacy Order',
        steps: ['1. Pay First', '2. Audit Claim', '3. Chase Dollar']
      },
      audit: {
        title: 'Audit Order',
        steps: [
        '1. Audit Claim (Pre-pay)',
        '2. Intervene / Deny',
        '3. Pay Compliant']

      }
    }
  },
  engine: {
    eyebrow: 'ENGINE ARCHITECTURE',
    headline: 'The engine. How a claim gets audited.',
    subheadline:
    'Six layers per facility, adapting to specialty. Thirty stages. Twenty-nine audit functions. From layer checks per line of business: vision, dental, medical, DME, pharmacy.',
    layers: [
    {
      id: 1,
      title: 'Layer 1. Intake and Eligibility',
      description:
      'Standardizes and validates member data, coverage mapping, and historical linkage.'
    },
    {
      id: 2,
      title: 'Layer 2. Classification',
      description:
      'Categorizes the claim by specialty, facility type, and risk profile.'
    },
    {
      id: 3,
      title: 'Layer 3. Coding and Clinical',
      description:
      'Cross-references CPT/ICD codes against clinical guidelines and historical patterns.'
    },
    {
      id: 4,
      title: 'Layer 4. Billing and Authorization',
      description:
      'Verifies prior authorizations, billing limits, and contract terms.'
    },
    {
      id: 5,
      title: 'Layer 5. Documentation and Utilization',
      description:
      'Analyzes attached medical records for necessity and proper utilization.'
    },
    {
      id: 6,
      title: 'Layer 6. Fraud, Risk and Payment',
      description:
      'Final check for anomalous patterns, upcoding, and payment integrity.'
    }],

    matrix: {
      title: 'Multi-specialty Retool Matrix',
      stats: [
      { label: 'TOTAL CHECKS RUN', value: '30', sub: 'Angles Known' },
      {
        label: 'INDEPENDENT SIGNALS VERIFIED',
        value: '29',
        sub: 'Code-Defined'
      },
      {
        label: 'LEVELS OF ADJUDICATION TRIGGERED',
        value: '6',
        sub: 'Calc the data'
      }],

      specialties: ['Med', 'Surg', 'Vision', 'Dental', 'OB', 'Pharma']
    }
  },
  verdicts: {
    eyebrow: 'STRUCTURED VERDICT OUTPUT',
    headline: 'Every claim gets a verdict.',
    subheadline:
    'Six outcomes, easily reasoned. No claim leaves without a verdict, its category, and the checks behind it.',
    cards: [
    {
      title: 'Passed',
      description: 'Fully compliant, ready to pay. Proceed to payment.',
      status: 'passed'
    },
    {
      title: 'Denied',
      description: 'Violates policy or coverage. Deny, policy cited.',
      status: 'denied'
    },
    {
      title: 'Fraud',
      description:
      'Intentional deceptive billing, such as phantom billing. SIU escalation.',
      status: 'hold'
    },
    {
      title: 'Abuse',
      description:
      'Excessive or improper utilization, such as duplicate component billing. Investigation.',
      status: 'vision'
    },
    {
      title: 'Coding Issue',
      description: 'Coding or documentation mismatch, such as a revenue code error. Route to correction.',
      status: 'coding'
    },
    {
      title: 'On hold',
      description: 'Awaiting manual review. Review queue.',
      status: 'unheld'
    }]

  },
  surfaces: {
    eyebrow: 'One payer view',
    headline: 'What one audit surfaces.',
    subheadline:
    'Figures shown represent a complete pre-payment health plan audit, not sampled.',
    overview: [
    { label: 'CLAIMS Volume', value: '9,716' },
    { label: 'CLAIMS VALUE', value: '$18.27M' },
    { label: 'FACILITIES CHECKED', value: '5' },
    { label: 'ACTIVE PROVIDERS', value: '324' }],

    clearVision: [
    { label: 'Passed', percentage: 65, color: 'bg-green-500' },
    { label: 'Denied', percentage: 17.9, color: 'bg-red-500' },
    { label: 'Fraud', percentage: 10.7, color: 'bg-cyan-500' },
    { label: 'Abuse', percentage: 14.4, color: 'bg-orange-500' },
    { label: 'Coding', percentage: 16.6, color: 'bg-blue-500' },
    { label: 'On hold', percentage: 8.6, color: 'bg-slate-400' }],

    smartFilter: {
      columns: [
      'CLAIM ID',
      'PATIENT',
      'SPECIALTY',
      'PROVIDER',
      'CPT CODE',
      'VALUE (USD)',
      'VERDICT',
      'AUDIT FINDINGS / NOTES'],

      rows: [
      {
        id: 'CLM-9832',
        patient: 'J. D.',
        specialty: 'Vision',
        provider: 'Dr. Smith',
        cpt: '92014',
        value: '$1,250',
        verdict: 'Passed',
        notes: 'Routine billing, fully compliant.'
      },
      {
        id: 'CLM-7741',
        patient: 'A. M.',
        specialty: 'Surgery',
        provider: 'Mercy Gen',
        cpt: '22551',
        value: '$14,400',
        verdict: 'Coding',
        notes: 'Modifier 59 missing on secondary.'
      },
      {
        id: 'CLM-5529',
        patient: 'R. K.',
        specialty: 'Dental',
        provider: 'Valley Dental',
        cpt: 'D2740',
        value: '$1,100',
        verdict: 'Vision',
        notes: 'Duplicate crown billing detected.'
      },
      {
        id: 'CLM-1184',
        patient: 'S. T.',
        specialty: 'Medical',
        provider: 'City Clinic',
        cpt: '99215',
        value: '$350',
        verdict: 'Hold',
        notes: 'Level 5 visit without supporting documentation.'
      },
      {
        id: 'CLM-3920',
        patient: 'M. P.',
        specialty: 'Pharma',
        provider: 'CareRx',
        cpt: 'J0178',
        value: '$4,800',
        verdict: 'Denied',
        notes: 'Prior authorization missing for specialty drug.'
      },
      {
        id: 'CLM-8842',
        patient: 'L. L.',
        specialty: 'OB/GYN',
        provider: "Women's Health",
        cpt: '59400',
        value: '$3,200',
        verdict: 'Passed',
        notes: 'Global maternity package verified.'
      },
      {
        id: 'CLM-2105',
        patient: 'E. C.',
        specialty: 'Medical',
        provider: 'Dr. Jones',
        cpt: '93000',
        value: '$150',
        verdict: 'Unheld',
        notes: 'Awaiting manual review for unbundling.'
      }]

    }
  },
  quote: {
    text: 'Audit.ai does not replace the auditor and does not change the recovery-based model. It lets a one hundred percent audit ship verdicts more, faster, with the reasoning already attached, in more recovery dollars for auditor on the run for...',
    author: 'Chief Medical Officer',
    role: 'National Health Plan'
  },
  demo: {
    eyebrow: 'HANDS-ON PROOF',
    headline: 'See Audit.ai on your own claims.',
    subheadline:
    'Bring a representative claim parameters below. Run it through our interactive AI layers and generate a reasoned, defensible queue verdict instantly.',
    form: {
      initialsLabel: 'Patient Initials',
      valueLabel: 'Claim Value (USD)',
      cptLabel: 'Service CPT Code',
      categoryLabel: 'Claim/Facility Type',
      buttonText: 'PROCESS 29 AUDIT CHECKS'
    },
    results: [
    { name: 'Intake & Eligibility Verified', status: 'Passed' },
    { name: 'Historical Linkage Check', status: 'Passed' },
    { name: 'CPT/ICD Cross-reference', status: 'Flagged' },
    { name: 'Prior Auth Verification', status: 'Passed' },
    { name: 'Documentation Analysis', status: 'Pending' },
    { name: 'Payment Integrity Check', status: 'Pending' }]

  },
  cta: {
    headline: 'Who it is for, and the close.',
    description: 'Built for the payer side of the wire. Payers and health plans. Audit organizations. SIU and payment integrity teams. Government program integrity.',
    formDescription:'See Audit.ai on your own claims. Bring a representative claim file. We will run it through the six layers and hand back a reasoned queue you can defend.',
    form: {
      emailPlaceholder: 'e.g. jsmith@healthplan.com',
      orgPlaceholder: 'e.g. Blue Shield Alliance',
      buttonText: 'BOOK A DEMO',
    }
  },
  footer: {
    logo: 'Grelin',
    copyright: '© 2024 Grelin Systems Inc. All rights reserved.',
    links: [
    'Privacy Policy',
    'Terms of Service',
    'Security Architecture',
    'Contact Sales']

  }
};