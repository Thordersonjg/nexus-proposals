export interface ProposalHero {
  headline: string
  subheadline: string
  backgroundImage?: string
  videoUrl?: string
}

export interface ProposalSummary {
  painPoints: string[]
  solution: string
  outcomes: string[]
}

export interface ProposalService {
  id: string
  name: string
  description: string
  features: string[]
  included: boolean
  monthly: number
  buildout: number
}

export interface ProposalPricing {
  buildoutTotal: number
  monthlyTotal: number
  commitment: number
  paymentOptions: Array<{
    name: string
    description: string
  }>
}

export interface ProposalTimeline {
  phase: string
  duration: string
  deliverables: string[]
}

export interface ProposalTestimonial {
  quote: string
  author: string
  company: string
  image?: string
}

export interface ProposalCTA {
  headline: string
  primaryButton: string
  secondaryButton?: string
}

export interface ProposalContent {
  hero: ProposalHero
  summary: ProposalSummary
  services: ProposalService[]
  pricing: ProposalPricing
  timeline: ProposalTimeline[]
  testimonials?: ProposalTestimonial[]
  cta: ProposalCTA
}

export interface Proposal {
  id: string
  shortCode: string
  clientName: string
  companyName: string
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired'
  content: ProposalContent
  validUntil: string
  createdAt: string
}
