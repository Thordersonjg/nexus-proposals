import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Nexus Proposals</h1>
        <p className="text-muted-foreground text-lg max-w-md">
          Beautiful, interactive proposals that help you close more deals.
        </p>
        <div className="pt-4">
          <Link
            href="/p/demo"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            View Demo Proposal
          </Link>
        </div>
      </div>
    </main>
  )
}
