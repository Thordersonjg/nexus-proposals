import type { Proposal } from '@/types/proposal'

export const lucasProposal: Proposal = {
  id: 'lucas-001',
  shortCode: 'lucas',
  clientName: 'Lucas',
  companyName: 'Lucas Insulation',
  status: 'sent',
  validUntil: '2026-02-28',
  createdAt: '2026-01-24',
  content: {
    hero: {
      headline: 'Dominate Your Market',
      subheadline: 'A complete AI-powered growth system to generate leads, close more jobs, and scale Lucas Insulation to the next level.',
    },
    summary: {
      painPoints: [
        'Inconsistent lead flow makes revenue unpredictable',
        'Too much time spent chasing leads instead of closing',
        'Competitors are showing up first and winning jobs',
        'No system to nurture leads who aren\'t ready to buy today',
      ],
      solution: 'We\'ll deploy a full-stack growth engine combining AI automation, aggressive marketing, and a trained sales team. Every lead gets instant response, professional nurturing, and relentless follow-up until they buy or die.',
      outcomes: [
        '40-60 qualified leads per month within 90 days',
        'AI responds to every lead in under 2 minutes, 24/7',
        'Dedicated sales reps closing deals on your behalf',
        'Complete visibility into your pipeline and revenue forecast',
      ],
    },
    services: [
      {
        id: 'ai',
        name: 'AI Automation System',
        description: 'Never miss a lead again with instant AI-powered response and qualification.',
        features: [
          '24/7 instant lead response (under 2 min)',
          'AI qualification and appointment booking',
          'Automated follow-up sequences',
          'Smart lead scoring and routing',
          'CRM integration and tracking',
        ],
        included: true,
        monthly: 3000,
        buildout: 5000,
      },
      {
        id: 'marketing',
        name: 'Marketing Engine',
        description: 'Aggressive lead generation that puts you in front of ready-to-buy homeowners.',
        features: [
          'Google Ads management',
          'Facebook/Instagram campaigns',
          'Landing page optimization',
          'Review generation system',
          'Local SEO domination',
        ],
        included: true,
        monthly: 3000,
        buildout: 5000,
      },
      {
        id: 'sales-team',
        name: 'Sales Team Build-Out',
        description: 'Trained closers who sell your services while you run your business.',
        features: [
          'Dedicated sales representative(s)',
          'Script development and training',
          'Call recording and coaching',
          'Performance tracking dashboard',
          'Commission-based compensation',
        ],
        included: true,
        monthly: 3000,
        buildout: 5000,
      },
    ],
    pricing: {
      buildoutTotal: 8500,
      monthlyTotal: 5000,
      commitment: 4,
      paymentOptions: [
        {
          name: 'Pay in Full (10% off)',
          description: 'Case study agreement required for discount',
        },
        {
          name: 'Split Payment',
          description: '50% to start, 50% at launch',
        },
      ],
    },
    timeline: [
      {
        phase: 'Discovery & Setup',
        duration: 'Week 1',
        deliverables: [
          'Kickoff call and strategy session',
          'CRM and tracking setup',
          'Ad account configuration',
          'Sales script development',
        ],
      },
      {
        phase: 'Build & Train',
        duration: 'Weeks 2-3',
        deliverables: [
          'AI automation deployment',
          'Campaign creation and launch',
          'Sales team onboarding',
          'Integration testing',
        ],
      },
      {
        phase: 'Launch',
        duration: 'Week 4',
        deliverables: [
          'Full system go-live',
          'Lead flow begins',
          'Daily monitoring starts',
          'Performance baseline set',
        ],
      },
      {
        phase: 'Optimize & Scale',
        duration: 'Ongoing',
        deliverables: [
          'Weekly performance reviews',
          'Campaign optimization',
          'Sales coaching sessions',
          'Scale winning channels',
        ],
      },
    ],
    cta: {
      headline: 'Ready to dominate your market?',
      primaryButton: 'Accept Proposal',
      secondaryButton: 'I Have Questions',
    },
  },
}
