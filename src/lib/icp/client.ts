import type { Identity } from "@icp-sdk/core/agent";
import { AnonymousIdentity, HttpAgent } from "@icp-sdk/core/agent";
import { ICP_HOST } from "./config";

let agent: HttpAgent | null = null;
let currentIdentity: Identity | null = null;

/**
 * Returns a singleton HttpAgent.
 *
 * If the identity changes (anonymous → authenticated or vice versa),
 * a new agent is created automatically.
 */
export async function getAgent(
  identity: Identity = new AnonymousIdentity(),
): Promise<HttpAgent> {
  const identityChanged =
    !currentIdentity ||
    currentIdentity.getPrincipal().toText() !==
      identity.getPrincipal().toText();

  if (!agent || identityChanged) {
    agent = await HttpAgent.create({
      host: ICP_HOST,
      identity,
    });

    currentIdentity = identity;

    if (process.env.NODE_ENV !== "production") {
      try {
        await agent.fetchRootKey();
      } catch (error) {
        console.warn("Failed to fetch root key:", error);
      }
    }
  }

  return agent;
}

/**
 * Clears the cached agent.
 * Used after logout.
 */
export function resetAgent(): void {
  agent = null;
  currentIdentity = null;
}