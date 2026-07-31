import { HttpAgent } from "@icp-sdk/core/agent";
import { createActor } from "@/declarations/backend";
import { getIdentity } from "@/lib/icp/auth";

let backendActor: ReturnType<typeof createActor> | null = null;

export async function getBackendActor() {
  if (backendActor) {
    return backendActor;
  }

  const identity = await getIdentity();

  const agent = new HttpAgent({
    host: process.env.NEXT_PUBLIC_ICP_HOST,
    identity: identity ?? undefined,
  });

  if (process.env.NODE_ENV !== "production") {
    await agent.fetchRootKey();
  }

  backendActor = createActor(
    process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID!,
    {
      agent,
    }
  );

  return backendActor;
}