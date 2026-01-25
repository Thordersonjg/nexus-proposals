'use client'

import { motion } from 'framer-motion'
import type { ProposalTimeline } from '@/types/proposal'

interface TimelineSectionProps {
  timeline: ProposalTimeline[]
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <section id="timeline" className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Implementation Timeline
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A clear path from kickoff to results. Here&apos;s how we&apos;ll get you there.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-0.5" />

          {timeline.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[22px] md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1.5 mt-2 ring-4 ring-white z-10" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className={`flex items-center gap-3 mb-3 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                    <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                      <h3 className="font-semibold text-lg">{phase.phase}</h3>
                      <p className="text-muted-foreground text-sm">{phase.duration}</p>
                    </div>
                  </div>
                  <ul className={`space-y-2 mt-4 ${
                    index % 2 === 0 ? 'md:text-right' : ''
                  }`}>
                    {phase.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-slate-600 text-sm flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${
                          index % 2 === 0 ? 'md:order-last' : ''
                        }`} />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
