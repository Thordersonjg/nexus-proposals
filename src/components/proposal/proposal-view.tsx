import { HeroSection } from './hero-section'
import { SummarySection } from './summary-section'
import { ServicesSection } from './services-section'
import { PricingSection } from './pricing-section'
import { TimelineSection } from './timeline-section'
import { CTASection } from './cta-section'
import { AnalyticsTracker } from './analytics-tracker'
import { Separator } from '@/components/ui/separator'
import type { Proposal } from '@/types/proposal'

interface ProposalViewProps {
  proposal: Proposal
}

export function ProposalView({ proposal }: ProposalViewProps) {
  return (
    <main className="min-h-screen">
      <AnalyticsTracker proposalId={proposal.id} shortCode={proposal.shortCode} />
      <HeroSection
        hero={proposal.content.hero}
        companyName={proposal.companyName}
        clientName={proposal.clientName}
      />

      <SummarySection summary={proposal.content.summary} />

      <ServicesSection services={proposal.content.services} />

      <PricingSection
        pricing={proposal.content.pricing}
        services={proposal.content.services}
      />

      <TimelineSection timeline={proposal.content.timeline} />

      <CTASection
        cta={proposal.content.cta}
        validUntil={proposal.validUntil}
      />

      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <Separator className="bg-slate-700 mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              Proposal ID: {proposal.shortCode} • Created {new Date(proposal.createdAt).toLocaleDateString()}
            </p>
            <p className="text-slate-400 text-sm">
              Powered by Nexus
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
