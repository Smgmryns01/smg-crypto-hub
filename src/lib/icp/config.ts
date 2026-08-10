/**
 * src/lib/icp/config.ts
 * Central configuration for the ICP layer.
 */

// ------------------------------
// Network
// ------------------------------

export const ICP_HOST =
  process.env.NEXT_PUBLIC_IC_HOST ??
  "https://icp-api.io";

export const II_URL =
  process.env.NEXT_PUBLIC_II_URL ??
  "https://identity.ic0.app";

export const IDLE_TIMEOUT_MS =
  Number(
    process.env.NEXT_PUBLIC_IDLE_TIMEOUT_MS ??
      1000 * 60 * 30
  );

// ------------------------------
// Canisters
// ------------------------------

export const BACKEND_CANISTER_ID =
  process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID ??
  "";

// ------------------------------
// Environment
// ------------------------------

export const IS_LOCAL =
  ICP_HOST.includes("127.0.0.1") ||
  ICP_HOST.includes("localhost");