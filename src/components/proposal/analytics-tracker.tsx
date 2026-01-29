'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface AnalyticsTrackerProps {
  proposalId: string
  shortCode?: string
}

export function AnalyticsTracker({ proposalId, shortCode }: AnalyticsTrackerProps) {
  const hasTrackedView = useRef(false)
  const sectionTimes = useRef<Record<string, number>>({})
  const resolvedShortCode = shortCode || proposalId

  useEffect(() => {
    // Track initial page view
    if (!hasTrackedView.current) {
      hasTrackedView.current = true
      trackEvent('proposal_opened', resolvedShortCode, {
        proposalId,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      })
    }

    // Track time on page
    const startTime = Date.now()
    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackEvent('proposal_closed', resolvedShortCode, {
        proposalId,
        timeSpentSeconds: timeSpent,
        sectionTimes: sectionTimes.current,
      })
    }

    window.addEventListener('beforeunload', handleUnload)

    // Set up intersection observer for section tracking
    const sections = ['summary', 'services', 'pricing', 'timeline', 'cta']
    const sectionStartTimes: Record<string, number | null> = {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          if (entry.isIntersecting) {
            if (!sectionStartTimes[sectionId]) {
              sectionStartTimes[sectionId] = Date.now()
              trackEvent('section_viewed', resolvedShortCode, {
                proposalId,
                section: sectionId,
                timestamp: new Date().toISOString(),
              })
            }
          } else {
            if (sectionStartTimes[sectionId]) {
              const timeSpent = Math.round(
                (Date.now() - sectionStartTimes[sectionId]!) / 1000
              )
              sectionTimes.current[sectionId] =
                (sectionTimes.current[sectionId] || 0) + timeSpent
              sectionStartTimes[sectionId] = null
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      observer.disconnect()
    }
  }, [proposalId, resolvedShortCode])

  return null
}

function trackEvent(
  eventType: string,
  shortCode: string,
  data: Record<string, unknown>
) {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', { type: eventType, ...data })
  }

  // Store in localStorage as backup
  try {
    const stored = localStorage.getItem('nexus_analytics') || '[]'
    const events = JSON.parse(stored)
    events.push({ type: eventType, ...data, timestamp: new Date().toISOString() })
    if (events.length > 100) events.shift()
    localStorage.setItem('nexus_analytics', JSON.stringify(events))
  } catch {
    // Ignore storage errors
  }

  // Send to Supabase (fire-and-forget)
  if (supabase) {
    try {
      supabase
        .from('analytics_events')
        .insert({
          proposal_short_code: shortCode,
          event_type: eventType,
          event_data: data,
          user_agent: navigator.userAgent,
        })
        .then(() => {})
    } catch {
      // Analytics should never break the page
    }
  }
}
