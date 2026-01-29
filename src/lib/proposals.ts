import { supabase } from './supabase'
import type { Proposal, ProposalContent } from '@/types/proposal'
import type { DbProposal } from '@/types/database'

/**
 * Fetch a proposal by short_code from Supabase.
 * Returns null if not found or if Supabase is not configured.
 */
export async function fetchProposal(shortCode: string): Promise<Proposal | null> {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('short_code', shortCode)
      .single()

    if (error || !data) return null

    return mapDbToProposal(data as DbProposal)
  } catch {
    return null
  }
}

function mapDbToProposal(db: DbProposal): Proposal {
  const content = db.content as unknown as ProposalContent
  const raw = db.content as Record<string, unknown>

  return {
    id: db.id,
    shortCode: db.short_code,
    clientName: (raw.clientName as string) || '',
    companyName: (raw.companyName as string) || db.title,
    status: db.status as Proposal['status'],
    content,
    validUntil: db.valid_until || '',
    createdAt: db.created_at,
  }
}
