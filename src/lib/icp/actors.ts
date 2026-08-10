import { Actor } from "@icp-sdk/core/agent";
import type { Identity } from "@icp-sdk/core/agent";

import { getAgent } from "./client";

export async function createBackendActor<T>(
  idlFactory: unknown,
  canisterId: string,
  identity?: Identity,
): Promise<T> {
  const agent = await getAgent(identity);

  return Actor.createActor(idlFactory as never, {
    agent,
    canisterId,
  }) as T;
}