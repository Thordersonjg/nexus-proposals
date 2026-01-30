'use client'

import { useEffect, useState } from 'react'
import { DynamicProposalLoader } from '@/components/proposal/dynamic-loader'

export default function NotFound() {
  const [isProposalPath, setIsProposalPath] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const path = window.location.pathname
    if (path.startsWith('/p/')) {
      setIsProposalPath(true)
    }
    setChecked(true)
  }, [])

  if (!checked) return null

  if (isProposalPath) {
    return <DynamicProposalLoader />
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-slate-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    </main>
  )
}
