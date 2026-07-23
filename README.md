# SMG Crypto Hub — Website

**Smart Modern Growth Crypto Hub**
Open-source Web3 education platform powered by the Internet Computer Protocol (ICP).

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://typescriptlang.org)

> Platform website: https://smgcryptohub.xyz — **Deployment planned for Milestone 6**

---

## About

SMG Crypto Hub is an open-source Web3 education platform built for Africa and the world, powered by ICP Blockchain. This repository contains the production-ready Next.js 15 website.

**Version:** v0.1.0 (Milestone 1 — Foundation)
**GitHub:** https://github.com/Smgmryns01/smg-crypto-hub
**Telegram 🟡 (Official Channel):** https://t.me/SMGCryptohHubChannel  
**Telegram 🔵 (Community Group):** https://t.me/SMGCryptoHubCommunity
**Email:** smgcryptohub@gmail.com

---

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4 — glassmorphism design system
- **Animation:** Framer Motion
- **Data:** TanStack Query, React Hook Form, Zod
- **Icons:** Lucide React
- **Charts:** Recharts (prepared for Milestone 6 market data)
- **Toasts:** Sonner
- **UI Primitives:** Radix UI

---

## Pages (21 routes)

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Features, Courses, ICP, Roadmap, Community |
| `/academy` | Course browser with search and filters |
| `/academy/[id]` | Individual course detail with curriculum |
| `/learn-web3` | Web3 topics guide |
| `/icp-ecosystem` | ICP overview and grant information |
| `/courses/crypto-basics` | Crypto Basics course track |
| `/courses/blockchain-basics` | Blockchain Basics course track |
| `/courses/icp-development` | ICP Development course track |
| `/developer-resources` | Developer tools, ICP SDK, Motoko references |
| `/market` | Crypto market (mock data; live API at Milestone 6) |
| `/airdrops` | Airdrop opportunities with filters |
| `/staking` | Staking calculator (UI ready for Milestone 5) |
| `/wallet` | Wallet connect UI (activates at Milestone 5) |
| `/community` | Community channels and roles |
| `/blog` | Blog with categories and featured posts |
| `/roadmap` | Full 6-milestone development roadmap |
| `/faq` | 12-question accessible FAQ accordion |
| `/dashboard` | Dashboard hub (activates at Milestone 2+) |
| `/about` | Project info and status |
| `/contact` | Contact form (Zod + React Hook Form) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Smgmryns01/smg-crypto-hub.git
cd smg-crypto-hub

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check (tsc --noEmit)
npm run format       # Prettier format
```

---

## Deployment to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Push to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import `Smgmryns01/smg-crypto-hub`
4. Set Framework: **Next.js**
5. Add environment variables from `.env.example`
6. Click **Deploy**

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Custom Domain

1. In Vercel dashboard → Project → **Settings → Domains**
2. Add `smgcryptohub.xyz`
3. Follow DNS configuration instructions
4. SSL is provisioned automatically

---

## Environment Variables

Copy `.env.example` to `.env.local` before running locally.

```env
NEXT_PUBLIC_SITE_URL=https://smgcryptohub.xyz
# Add CoinGecko API key at Milestone 6
# Add Resend email key at Milestone 6
# Add ICP canister IDs at Milestone 5
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── academy/            # Academy and [id] course pages
│   ├── api/contact/        # Contact form API route
│   └── ...                 # All other pages
├── components/
│   ├── layout/             # Navbar, Footer, PageLayout
│   ├── sections/           # Hero, Features, ICPSection, etc.
│   └── ui/                 # Reusable UI components
├── constants/site.ts       # Official project information
├── data/index.ts           # Mock data (courses, market, blog, etc.)
├── hooks/                  # useLocalStorage, useMediaQuery, etc.
├── lib/utils.ts            # cn(), formatPrice(), etc.
├── providers/              # QueryProvider
├── services/api.ts         # API service layer
└── types/index.ts          # TypeScript types
```

---

## ICP Integration Points

The v0.1.0 codebase contains **15 annotated ICP integration points**:

```typescript
// ICP integration point (Milestone 5): replace with canister call
// auth_canister.authenticate(payload)
```

These are located across five service files and will become live
Motoko canister calls at Milestone 5. The `AuthResult<T>` type matches
ICP's Motoko variant shape exactly.

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full contributor guide,
including branch naming, commit message conventions, and the 29-item PR checklist.

Quick start:
```bash
git checkout -b feature/your-feature-name
# make changes
git commit -m "feat(component): add your feature"
git push origin feature/your-feature-name
# open a PR on GitHub
```

---

## License

MIT — © 2026 SMG Crypto Hub. See [LICENSE](../LICENSE).

---

## Token Statement

No native token has been launched in Version 1.0. Any future SCH
(SMG Crypto Hub) token will be announced through the official roadmap
and project documentation.

---

**Built for Africa. Open to the World. ⛓ Powered by ICP Blockchain.**
