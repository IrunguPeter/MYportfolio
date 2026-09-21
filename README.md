# DevStudio

A conversion-focused website for DevStudio, a Kenya-based web studio helping freelancers, creators, and small businesses get discovered, trusted, and paid online.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Wouter
- Lucide icons

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm check
pnpm build
```

The site includes a responsive homepage, generated website mockups, Launch/Sell/Scale service structure, FAQ accordion, enquiry form success state, WhatsApp CTA, and a favicon-ready DevStudio logo mark.

## Admin workspace

Open `/admin` to edit the business description and starting prices, and to review enquiries submitted by visitors. The workspace uses Supabase for shared storage, row-level security, and passwordless magic-link authentication for `irungupeter204@gmail.com`.
