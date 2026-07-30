import { createActor } from "@/declarations/backend";

export const backend = createActor(
  process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID!
);