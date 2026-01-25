'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'
import type { ProposalCTA } from '@/types/proposal'

interface CTASectionProps {
  cta: ProposalCTA
  validUntil: string
}

export function CTASection({ cta, validUntil }: CTASectionProps) {
  const validDate = new Date(validUntil)
  const formattedDate = validDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

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
            <Button size="lg" className="w-full sm:w-auto">
              {cta.primaryButton}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            {cta.secondaryButton && (
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="mr-2 w-4 h-4" />
                {cta.secondaryButton}
              </Button>
            )}
          </div>

          <p className="text-muted-foreground text-sm mt-8">
            Questions? We&apos;re here to help. Click &quot;I Have Questions&quot; to chat with your account manager.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
