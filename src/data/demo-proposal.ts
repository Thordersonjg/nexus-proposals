import type { Proposal } from '@/types/proposal'

export const demoProposal: Proposal = {
  id: 'demo-001',
  shortCode: 'demo',
  clientName: 'Mike Johnson',
  companyName: 'Summit Roofing Co.',
  status: 'sent',
  validUntil: '2026-02-28',
  createdAt: '2026-01-25',
  content: {
    hero: {
      headline: 'Your Growth Engine',
      subheadline: 'A complete system to generate leads, convert customers, and scale your roofing business with confidence.',
    },
    summary: {
      painPoints: [
        'Leads are inconsistent and unpredictable month-to-month',
        'Following up with prospects takes too much time',
        'No clear visibility into which marketing efforts work',
        'Competitors are winning jobs with faster response times',
      ],
      solution: 'We\'ll implement a complete lead generation and conversion system that runs 24/7. From the moment a prospect visits your website to the day they become a customer, every touchpoint is automated, tracked, and optimized for conversion.',
      outcomes: [
        '30-50 qualified leads per month within 90 days',
        'Response time reduced from hours to under 5 minutes',
        'Complete visibility into your sales pipeline',
        'Automated follow-up that never drops the ball',
      ],
    },
    services: [
      {
        id: 'website',
        name: 'High-Converting Website',
        description: 'A modern, mobile-first website designed to convert visitors into leads.',
        features: [
          'Custom design matching your brand',
          'Mobile-optimized for homeowners on the go',
          'Built-in lead capture forms',
          'Real-time chat widget',
          'SEO foundation included',
        ],
        included: true,
        monthly: 0,
        buildout: 2500,
      },
      {
        id: 'seo',
        name: 'Local SEO Package',
        description: 'Dominate local search results when homeowners search for roofers.',
        features: [
          'Google Business Profile optimization',
          'Local keyword targeting',
          'Review generation system',
          'Monthly ranking reports',
          'Citation building (50+ directories)',
        ],
        included: true,
        monthly: 750,
        buildout: 500,
      },
      {
        id: 'ads',
        name: 'Google Ads Management',
        description: 'Targeted ads that put you in front of homeowners actively searching.',
        features: [
          'Campaign setup and strategy',
          'Keyword research and targeting',
          'Ad copywriting and testing',
          'Landing page optimization',
          'Weekly performance reports',
        ],
        included: true,
        monthly: 1000,
        buildout: 750,
      },
      {
        id: 'crm',
        name: 'CRM & Automation',
        description: 'Never lose a lead again with automated follow-up and tracking.',
        features: [
          'Lead management dashboard',
          'Automated email sequences',
          'SMS follow-up automation',
          'Pipeline tracking',
          'Team notifications',
        ],
        included: true,
        monthly: 500,
        buildout: 1000,
      },
    ],
    pricing: {
      buildoutTotal: 4750,
      monthlyTotal: 2250,
      commitment: 6,
      paymentOptions: [
        {
          name: 'Pay in Full',
          description: 'Save 10% on buildout when paid upfront',
        },
        {
          name: 'Split Payment',
          description: '50% to start, 50% at launch (within 30 days)',
        },
      ],
    },
    timeline: [
      {
        phase: 'Discovery & Strategy',
        duration: 'Week 1',
        deliverables: [
          'Kick-off call and goal setting',
          'Competitor analysis',
          'Keyword research',
          'Campaign strategy document',
        ],
      },
      {
        phase: 'Build & Configure',
        duration: 'Weeks 2-3',
        deliverables: [
          'Website design and development',
          'CRM setup and automation',
          'Ad campaign creation',
          'Tracking implementation',
        ],
      },
      {
        phase: 'Launch & Optimize',
        duration: 'Week 4',
        deliverables: [
          'Website goes live',
          'Campaigns activated',
          'Team training session',
          'Monitoring begins',
        ],
      },
      {
        phase: 'Scale & Grow',
        duration: 'Ongoing',
        deliverables: [
          'Weekly performance reviews',
          'A/B testing and optimization',
          'Monthly strategy calls',
          'Continuous improvement',
        ],
      },
    ],
    cta: {
      headline: 'Ready to grow your business?',
      primaryButton: 'Accept Proposal',
      secondaryButton: 'I Have Questions',
    },
  },
}
