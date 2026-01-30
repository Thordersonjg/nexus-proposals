'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Check, Loader2, XCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { ProposalCTA, Proposal } from '@/types/proposal'

type DecisionStatus = 'idle' | 'accepting' | 'accepted' | 'rejecting' | 'rejected' | 'error'

interface CTASectionProps {
  cta: ProposalCTA
  validUntil: string
  proposalId: string
  shortCode: string
  currentStatus: Proposal['status']
}

function trackEvent(shortCode: string, eventType: string, data?: Record<string, unknown>) {
  if (!supabase) return
  try {
    supabase.from('analytics_events').insert({
      proposal_short_code: shortCode,
      event_type: eventType,
      event_data: { ...data, timestamp: new Date().toISOString() },
      user_agent: navigator.userAgent,
    }).then(() => {})
  } catch { /* fire and forget */ }
}

export function CTASection({ cta, validUntil, proposalId, shortCode, currentStatus }: CTASectionProps) {
  const alreadyDecided = currentStatus === 'accepted' || currentStatus === 'rejected'
  const initialStatus: DecisionStatus = alreadyDecided ? currentStatus : 'idle'
  const [status, setStatus] = useState<DecisionStatus>(initialStatus)

  const validDate = new Date(validUntil)
  const formattedDate = validDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  async function handleAccept() {
    setStatus('accepting')
    trackEvent(shortCode, 'proposal_accepted', { proposalId })
    // Small delay so the user sees the loading state
    await new Promise(r => setTimeout(r, 600))
    setStatus('accepted')
  }

  async function handleReject() {
    setStatus('rejecting')
    trackEvent(shortCode, 'proposal_rejected', { proposalId })
    await new Promise(r => setTimeout(r, 600))
    setStatus('rejected')
  }

  function handleQuestions() {
    trackEvent(shortCode, 'questions_clicked', { proposalId })
  }

  const contactEmail = cta.contactEmail || 'team@nexusgrowthengine.com'
  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(`Questions about proposal ${shortCode}`)}&body=${encodeURIComponent('Hi, I have some questions about my proposal.\n\n')}`

  // Accepted state
  if (status === 'accepted') {
    return (
      <section id="cta" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-green-700">
              Proposal Accepted
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              We&apos;ll be in touch within 24 hours to get started.
            </p>
            <a href={mailtoHref}>
              <Button variant="outline" size="lg">
                <MessageCircle className="mr-2 w-4 h-4" />
                Have a question in the meantime?
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    )
  }

  // Rejected state
  if (status === 'rejected') {
    return (
      <section id="cta" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Thanks for letting us know
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              If you change your mind or want to discuss adjustments, we&apos;re here.
            </p>
            <a href={mailtoHref} onClick={handleQuestions}>
              <Button variant="outline" size="lg">
                <MessageCircle className="mr-2 w-4 h-4" />
                Get in touch
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    )
  }

  // Idle / loading states
  return (
    <section id="cta" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            {cta.headline}
          </h2>

          <p className="text-muted-foreground text-lg mb-10">
            This proposal is valid until <span className="font-medium text-foreground">{formattedDate}</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleAccept}
              disabled={status === 'accepting' || status === 'rejecting'}
            >
              {status === 'accepting' ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Accepting...
                </>
              ) : (
                <>
                  {cta.primaryButton}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            {cta.secondaryButton && (
              <a href={mailtoHref} onClick={handleQuestions}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  {cta.secondaryButton}
                </Button>
              </a>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleReject}
              disabled={status === 'accepting' || status === 'rejecting'}
              className="text-muted-foreground text-sm hover:text-foreground transition-colors disabled:opacity-50"
            >
              {status === 'rejecting' ? 'Processing...' : 'Not interested right now'}
            </button>
          </div>

          <p className="text-muted-foreground text-sm mt-8">
            Questions? We&apos;re here to help. Click &quot;{cta.secondaryButton || 'I Have Questions'}&quot; to reach your account manager.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
