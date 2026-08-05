import { Actor } from "@icp-sdk/core/agent";
import { getAgent } from "./client";

export async function createBackendActor<T>(
  idlFactory: unknown,
  canisterId: string,
): Promise<T> {
  const agent = await getAgent();

  return Actor.createActor(idlFactory as never, {
    agent,
    canisterId,
  }) as T;
}