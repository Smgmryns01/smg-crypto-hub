import { WebAuthnIdentity } from "@icp-sdk/core/identity";

import { createHttpAgent } from "./client";

const IDENTITY_PROVIDER = process.env.NEXT_PUBLIC_ICP_IDENTITY_PROVIDER ?? "https://identity.ic0.app";
const IC_HOST = process.env.NEXT_PUBLIC_ICP_HOST ?? "https://icp-api.io";

type StoredIdentity = {
  publicKey: string;
  rawId: string;
};

let cachedIdentity: WebAuthnIdentity | null = null;
let cachedAgent: Awaited<ReturnType<typeof createHttpAgent>> | null = null;

function getStorageKey(): string {
  return "smg_icp_identity";
}

function getStoredIdentityPayload(): StoredIdentity | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(getStorageKey());

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as StoredIdentity;
  } catch {
    window.localStorage.removeItem(getStorageKey());
    return null;
  }
}

function storeIdentityPayload(payload: StoredIdentity | null): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!payload) {
    window.localStorage.removeItem(getStorageKey());
    return;
  }

  window.localStorage.setItem(getStorageKey(), JSON.stringify(payload));
}

export async function createAuthClient() {
  return {
    identityProvider: IDENTITY_PROVIDER,
    host: IC_HOST,
  };
}

export async function login(): Promise<void> {
  try {
    const storedPayload = getStoredIdentityPayload();

    const identity = storedPayload
      ? WebAuthnIdentity.fromJSON(JSON.stringify(storedPayload))
      : await WebAuthnIdentity.create();

    cachedIdentity = identity;
    cachedAgent = await createHttpAgent(identity);

    storeIdentityPayload(identity.toJSON());
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unable to authenticate with Internet Identity."
    );
  }
}

export async function loginWithInternetIdentity(): Promise<void> {
  await login();
}

export async function logout(): Promise<void> {
  cachedIdentity = null;
  cachedAgent = null;
  storeIdentityPayload(null);
}

export function isAuthenticated(): boolean {
  return Boolean(cachedIdentity);
}

export async function getIdentity(): Promise<WebAuthnIdentity | null> {
  if (cachedIdentity) {
    return cachedIdentity;
  }

  const storedPayload = getStoredIdentityPayload();

  if (!storedPayload) {
    return null;
  }

  try {
    const identity = WebAuthnIdentity.fromJSON(JSON.stringify(storedPayload));
    cachedIdentity = identity;
    return identity;
  } catch {
    storeIdentityPayload(null);
    return null;
  }
}

export async function getPrincipal(): Promise<string | null> {
  const identity = await getIdentity();

  if (!identity?.getPrincipal) {
    return null;
  }

  const principal = identity.getPrincipal();

  return principal ? principal.toString() : null;
}
