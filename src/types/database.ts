export interface DbClient {
  id: string
  slug: string
  company_name: string
  industry: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  ghl_contact_id: string | null
  created_at: string
  updated_at: string
}

export interface DbProposal {
  id: string
  client_id: string | null
  short_code: string
  status: string
  title: string
  content: Record<string, unknown>
  pricing: Record<string, unknown>
  valid_until: string | null
  sent_at: string | null
  viewed_at: string | null
  accepted_at: string | null
  rejected_at: string | null
  created_at: string
  updated_at: string
}

export interface DbAnalyticsEvent {
  id?: string
  proposal_short_code: string
  event_type: string
  event_data: Record<string, unknown> | null
  user_agent?: string | null
  created_at?: string
}
