import { HttpAgent } from "@icp-sdk/core/agent";

export const agent = new HttpAgent({
  host:
    process.env.NEXT_PUBLIC_IC_HOST ??
    "http://127.0.0.1:4943",
});

// Local Replica
if (process.env.NODE_ENV !== "production") {
  agent.fetchRootKey().catch(console.error);
}