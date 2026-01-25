# Nexus Proposals

Beautiful, interactive proposal viewer for the Nexus platform.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion
- **Hosting:** Cloudflare Pages (static export)

## Development

```bash
npm install
npm run dev     # Start development server
npm run build   # Build for production
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── p/[id]/page.tsx # Proposal page
├── components/
│   ├── proposal/       # Proposal sections
│   │   ├── hero-section.tsx
│   │   ├── summary-section.tsx
│   │   ├── services-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── timeline-section.tsx
│   │   └── cta-section.tsx
│   └── ui/             # Reusable UI components
├── data/
│   └── demo-proposal.ts # Demo proposal data
├── lib/
│   └── utils.ts        # Utility functions
└── types/
    └── proposal.ts     # TypeScript types
```

## Deployment

Deploy to Cloudflare Pages:

```bash
npm run build
npx wrangler pages deploy out --project-name=nexus-proposals
```

Or connect your GitHub repo to Cloudflare Pages for automatic deployments.

## Proposal URL Structure

```
https://proposals.nexushq.io/p/[shortCode]
```

Example: `https://proposals.nexushq.io/p/demo`

## Related Repos

- `nexus-client-os` - Client data and proposal generation scripts
- `nexus-bridge` - GHL webhook integration (Railway)
