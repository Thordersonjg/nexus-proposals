'use client'

import { useEffect, useRef } from 'react'

interface AnalyticsTrackerProps {
  proposalId: string
}

export function AnalyticsTracker({ proposalId }: AnalyticsTrackerProps) {
  const hasTrackedView = useRef(false)
  const sectionTimes = useRef<Record<string, number>>({})

  useEffect(() => {
    // Track initial page view
    if (!hasTrackedView.current) {
      hasTrackedView.current = true
      trackEvent('proposal_opened', {
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
      trackEvent('proposal_closed', {
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
            // Section came into view
            if (!sectionStartTimes[sectionId]) {
              sectionStartTimes[sectionId] = Date.now()
              trackEvent('section_viewed', {
                proposalId,
                section: sectionId,
                timestamp: new Date().toISOString(),
              })
            }
          } else {
            // Section left view
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

    // Observe all sections
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
  }, [proposalId])

  return null
}

// Analytics event tracker
// For now, just logs to console. Later, send to Supabase or API.
function trackEvent(eventType: string, data: Record<string, unknown>) {
  const event = {
    type: eventType,
    ...data,
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event)
  }

  // In production, this would send to an API endpoint
  // Example:
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event),
  // }).catch(() => {})

  // For now, store in localStorage for demo purposes
  try {
    const stored = localStorage.getItem('nexus_analytics') || '[]'
    const events = JSON.parse(stored)
    events.push({ ...event, timestamp: new Date().toISOString() })
    // Keep only last 100 events
    if (events.length > 100) events.shift()
    localStorage.setItem('nexus_analytics', JSON.stringify(events))
  } catch {
    // Ignore storage errors
  }
}
