import { idlFactory } from "@/declarations/backend";
import type { _SERVICE } from "@/declarations/backend/backend.did";

import { BACKEND_CANISTER_ID } from "./config";
import { createBackendActor } from "./actors";
import { getIdentity } from "./auth";

let backend: _SERVICE | null = null;
let backendPrincipal: string | null = null;

export async function getBackend(): Promise<_SERVICE> {
  const identity = await getIdentity();
  const principal = identity.getPrincipal().toText();

  if (backend && backendPrincipal === principal) {
    return backend;
  }

  backend = await createBackendActor<_SERVICE>(
    idlFactory,
    BACKEND_CANISTER_ID,
    identity,
  );

  backendPrincipal = principal;

  return backend;
}

/**
 * Clears the cached backend actor.
 * Used after logout or identity changes.
 */
export function resetBackend(): void {
  backend = null;
  backendPrincipal = null;
}