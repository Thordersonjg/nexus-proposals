import { DynamicProposalLoader } from '@/components/proposal/dynamic-loader'

export default function DynamicProposalPage() {
  return <DynamicProposalLoader />
}

export function generateMetadata() {
  return {
    title: 'Proposal | Nexus',
    description: 'View your custom proposal',
  }
}
