import { demoProposal } from '@/data/demo-proposal'
import { lucasProposal } from '@/data/lucas-proposal'
import { ProposalView } from '@/components/proposal/proposal-view'
import { DynamicProposalLoader } from '@/components/proposal/dynamic-loader'
import type { Proposal } from '@/types/proposal'

// Static proposals — pre-rendered at build time (instant load)
const staticProposals: Record<string, Proposal> = {
  demo: demoProposal,
  lucas: lucasProposal,
}

interface ProposalPageProps {
  params: {
    id: string
  }
}

export default function ProposalPage({ params }: ProposalPageProps) {
  const staticProposal = staticProposals[params.id]

  if (staticProposal) {
    return <ProposalView proposal={staticProposal} />
  }

  // For non-static proposals, fetch from Supabase client-side
  return <DynamicProposalLoader />
}

export async function generateStaticParams() {
  return Object.keys(staticProposals).map((id) => ({ id }))
}

export function generateMetadata({ params }: ProposalPageProps) {
  const proposal = staticProposals[params.id]
  if (proposal) {
    return {
      title: `Proposal for ${proposal.companyName} | Nexus`,
      description: proposal.content.hero.subheadline,
    }
  }
  return {
    title: 'Proposal | Nexus',
    description: 'View your custom proposal',
  }
}
