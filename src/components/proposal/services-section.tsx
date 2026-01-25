'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import type { ProposalService } from '@/types/proposal'

interface ServicesSectionProps {
  services: ProposalService[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const includedServices = services.filter(s => s.included)

  return (
    <section id="services" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What&apos;s Included
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive package designed specifically for your business goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {includedServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
                <Badge variant="success">Included</Badge>
              </div>

              <ul className="space-y-3 mt-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-sm">
                {service.buildout > 0 && (
                  <div>
                    <span className="text-muted-foreground">Setup:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(service.buildout)}</span>
                  </div>
                )}
                {service.monthly > 0 && (
                  <div>
                    <span className="text-muted-foreground">Monthly:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(service.monthly)}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
