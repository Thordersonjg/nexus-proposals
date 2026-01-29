import { demoProposal } from '@/data/demo-proposal'
import { lucasProposal } from '@/data/lucas-proposal'
import { HeroSection } from '@/components/proposal/hero-section'
import { SummarySection } from '@/components/proposal/summary-section'
import { ServicesSection } from '@/components/proposal/services-section'
import { PricingSection } from '@/components/proposal/pricing-section'
import { TimelineSection } from '@/components/proposal/timeline-section'
import { CTASection } from '@/components/proposal/cta-section'
import { AnalyticsTracker } from '@/components/proposal/analytics-tracker'
import { Separator } from '@/components/ui/separator'
import type { Proposal } from '@/types/proposal'

// Proposal registry - add new proposals here
const proposals: Record<string, Proposal> = {
  demo: demoProposal,
  lucas: lucasProposal,
}

interface ProposalPageProps {
  params: {
    id: string
  }
}

export default function ProposalPage({ params }: ProposalPageProps) {
  const proposal = proposals[params.id] || demoProposal

  return (
    <main className="min-h-screen">
      <AnalyticsTracker proposalId={proposal.id} />
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

      {/* Footer */}
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

export async function generateStaticParams() {
  return Object.keys(proposals).map((id) => ({ id }))
}

export function generateMetadata({ params }: ProposalPageProps) {
  const proposal = proposals[params.id] || demoProposal
  return {
    title: `Proposal for ${proposal.companyName} | Nexus`,
    description: proposal.content.hero.subheadline,
  }
}
