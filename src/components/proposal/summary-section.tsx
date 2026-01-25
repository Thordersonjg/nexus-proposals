'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Target } from 'lucide-react'
import type { ProposalSummary } from '@/types/proposal'

interface SummarySectionProps {
  summary: ProposalSummary
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <section id="summary" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Challenge & Opportunity
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We&apos;ve analyzed your current situation and identified the path forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pain Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-red-50/50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Current Challenges</h3>
            </div>
            <ul className="space-y-4">
              {summary.painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50/50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Our Solution</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {summary.solution}
            </p>
          </motion.div>

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-emerald-50/50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold">Expected Outcomes</h3>
            </div>
            <ul className="space-y-4">
              {summary.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
