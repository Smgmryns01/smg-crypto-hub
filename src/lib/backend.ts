import { Actor } from "@icp-sdk/core/agent";

import {
  createActor,
  canisterId,
} from "@/declarations/backend";

import { agent } from "./ic-agent";

export const backend = createActor(
  canisterId,
  {
    agent,
  }
);