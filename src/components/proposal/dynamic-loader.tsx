'use client'

import { useEffect, useState } from 'react'
import { fetchProposal } from '@/lib/proposals'
import { ProposalView } from './proposal-view'
import type { Proposal } from '@/types/proposal'

export function DynamicProposalLoader() {
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Extract short code from URL path: /p/<shortCode>
    const path = window.location.pathname
    const shortCode = path.split('/p/')[1]?.replace(/\/$/, '')

    if (!shortCode || shortCode === '_dynamic') {
      setError(true)
      setLoading(false)
      return
    }

    fetchProposal(shortCode)
      .then((p) => {
        if (p) setProposal(p)
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-slate-800 border-t-transparent rounded-full mx-auto" />
          <p className="text-slate-500">Loading proposal...</p>
        </div>
      </main>
    )
  }

  if (error || !proposal) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Proposal Not Found</h1>
          <p className="text-slate-500">This proposal link may be expired or invalid.</p>
        </div>
      </main>
    )
  }

  return <ProposalView proposal={proposal} />
}
