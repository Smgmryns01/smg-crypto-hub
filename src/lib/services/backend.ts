import { createActor } from "@/declarations/backend";
import { getIdentity } from "@/lib/icp/auth";
import { getAgent } from "@/lib/icp/client";

let backendActor: ReturnType<typeof createActor> | null = null;

export async function getBackendActor() {
  if (backendActor) {
    return backendActor;
  }

  const identity = await getIdentity();

  const agent = await getAgent(identity as never);

  backendActor = createActor(
    process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID!,
    {
      agent,
    }
  );

  return backendActor;
}