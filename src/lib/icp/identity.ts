import type { Identity } from "@icp-sdk/core/agent";
import { Principal } from "@icp-sdk/core/principal";

export interface IdentitySnapshot {
  principal: string;
  isAuthenticated: boolean;
}

/**
 * Returns the principal text for an identity.
 */
export function getPrincipalText(identity: Identity): string {
  return identity.getPrincipal().toText();
}

/**
 * Returns the Principal object.
 */
export function getPrincipal(identity: Identity): Principal {
  return identity.getPrincipal();
}

/**
 * Returns true if the identity is anonymous.
 */
export function isAnonymous(identity: Identity): boolean {
  return identity.getPrincipal().isAnonymous();
}

/**
 * Safely parse a principal string.
 */
export function parsePrincipal(text: string): Principal | null {
  try {
    return Principal.fromText(text);
  } catch {
    return null;
  }
}

/**
 * Creates a serializable identity snapshot.
 */
export function snapshotIdentity(
  identity: Identity,
): IdentitySnapshot {
  return {
    principal: getPrincipalText(identity),
    isAuthenticated: !isAnonymous(identity),
  };
}