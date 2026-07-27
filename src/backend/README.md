# SMG Crypto Hub Backend Canister

The ICP backend for SMG Crypto Hub is built with Motoko and manages all on-chain operations including certificates, payments, and governance logic.

## Quick Start

### Local Development

Start the local ICP replica:
```bash
npm run dfx:start
```

In a new terminal, deploy the backend canister:
```bash
npm run dfx:deploy
```

Generate TypeScript declarations for the frontend:
```bash
npm run generate
```

### Current State

**Version:** 0.1.0 (Foundation)

The backend is in **foundation mode** and provides basic health checks:
- `health()` - Returns "SMG Crypto Hub backend is ready"
- `version()` - Returns the current version string

### File Structure

```
src/backend/
├── main.mo           # Main Motoko actor and service definitions
├── backend.did       # Candid interface definition
└── README.md         # This file
```

### Generated Declarations

TypeScript declarations are automatically generated to `src/declarations/backend/` after running `npm run generate` or `npm run dfx:deploy`.

Use them in the frontend:

```typescript
import { createActor } from "@/declarations/backend";

const actor = createActor(process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID!);
const health = await actor.health();
```

### ICP Resources

- [Motoko Docs](https://internetcomputer.org/docs/current/motoko/main/about)
- [Candid Reference](https://internetcomputer.org/docs/current/references/candid-ref)
- [dfx Command Reference](https://internetcomputer.org/docs/current/references/dfx-cli-reference)
- [Internet Computer SDK](https://internetcomputer.org/docs/current/developer-docs/getting-started/install)

### Next Steps (Milestone 5+)

At Milestone 5, the backend will expand to include:
- On-chain certificate registration
- Payment processing (ICP, ckUSDT)
- NNS governance integration
- Internet Identity session validation
