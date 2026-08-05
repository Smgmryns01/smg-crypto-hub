import {
  idlFactory,
  canisterId,
} from "@/declarations/backend";

import type { _SERVICE } from "@/declarations/backend/backend.did";

import { createBackendActor } from "./actors";

export async function getBackend() {
  return createBackendActor<_SERVICE>(
    idlFactory,
    canisterId,
  );
}