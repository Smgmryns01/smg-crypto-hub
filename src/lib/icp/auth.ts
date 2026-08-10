"use client";

import { AuthClient } from "@icp-sdk/auth/client";
import type { Identity } from "@icp-sdk/core/agent";

let authClient: AuthClient | null = null;

function getAuthClient(): AuthClient {
  if (authClient === null) {
    authClient = new AuthClient();
  }

  return authClient;
}

/**
 * Returns the current Internet Identity.
 */
export async function getIdentity(): Promise<Identity> {
  const client = getAuthClient();
  return client.getIdentity();
}

/**
 * Returns whether the current session is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const client = getAuthClient();
  return client.isAuthenticated();
}

/**
 * Returns the current authenticated Principal as text.
 */
export async function getPrincipal(): Promise<string | null> {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return null;
  }

  const identity = await getIdentity();
  return identity.getPrincipal().toText();
}

/**
 * Sign in with Internet Identity.
 */
export async function login(): Promise<Identity> {
  const client = getAuthClient();

  return client.signIn();
}

/**
 * Backwards-compatible alias.
 */
export async function loginWithInternetIdentity(): Promise<Identity> {
  return login();
}

/**
 * Sign out from Internet Identity.
 */
export async function logout(): Promise<void> {
  const client = getAuthClient();

  await client.signOut();
}