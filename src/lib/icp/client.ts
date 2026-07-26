import type { Identity } from "@icp-sdk/core/agent";
import { HttpAgent } from "@icp-sdk/core/agent";

export async function createHttpAgent(identity?: Identity): Promise<HttpAgent> {
  return await HttpAgent.create({
    host: process.env.NEXT_PUBLIC_ICP_HOST ?? "https://icp-api.io",
    identity,
  });
}
