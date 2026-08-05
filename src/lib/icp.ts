import { HttpAgent, Actor } from "@icp-sdk/core/agent";

import {
  idlFactory,
  canisterId,
} from "@/declarations/backend";

const host =
  process.env.NEXT_PUBLIC_IC_HOST ??
  "http://127.0.0.1:4943";

const agent = new HttpAgent({
  host,
});

if (process.env.NODE_ENV !== "production") {
  agent.fetchRootKey().catch(console.error);
}

export const backend = Actor.createActor(
  idlFactory,
  {
    agent,
    canisterId,
  }
);