'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { ProposalPricing, ProposalService } from '@/types/proposal'

interface PricingSectionProps {
  pricing: ProposalPricing
  services: ProposalService[]
}

export function PricingSection({ pricing, services }: PricingSectionProps) {
  const includedServices = services.filter(s => s.included)

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Your Investment
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Everything you need to grow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">
              Complete Package
            </span>
          </div>

          {/* Services List */}
          <div className="space-y-4 mb-10">
            {includedServices.map((service) => (
              <div key={service.id} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-slate-200">{service.name}</span>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="border-t border-slate-700 pt-8 space-y-6">
            {pricing.buildoutTotal > 0 && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">One-Time Setup</p>
                  <p className="text-slate-300 text-xs mt-1">
                    Implementation, configuration & training
                  </p>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(pricing.buildoutTotal)}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly Investment</p>
                <p className="text-slate-300 text-xs mt-1">
                  {pricing.commitment}-month commitment
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{formatCurrency(pricing.monthlyTotal)}</p>
                <p className="text-slate-400 text-sm">/month</p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          {pricing.paymentOptions.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm mb-4">Payment Options</p>
              <div className="grid gap-3">
                {pricing.paymentOptions.map((option, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-medium text-white">{option.name}</p>
                    <p className="text-slate-400 text-sm">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
