import { AuthClient } from "@dfinity/auth-client";
import type { Identity } from "@dfinity/agent";

import { II_URL, IDLE_TIMEOUT_MS } from "./config";
import { resetAgent } from "./client";

let authClient: AuthClient | null = null;

/**
 * Returns a singleton AuthClient.
 */
export async function createAuthClient(): Promise<AuthClient> {
  if (authClient) {
    return authClient;
  }

  authClient = await AuthClient.create({
    idleOptions: {
      idleTimeout: IDLE_TIMEOUT_MS,
      disableDefaultIdleCallback: true,
    },
  });

  return authClient;
}

/**
 * Login with Internet Identity.
 */
export async function login(): Promise<void> {
  const client = await createAuthClient();

  return new Promise((resolve, reject) => {
    client.login({
      identityProvider: II_URL,

      onSuccess: () => {
  resetAgent();
  resolve();
},

      onError: (error) => {
        reject(error ?? new Error("Internet Identity login failed."));
      },
    });
  });
}

/**
 * Alias kept for backwards compatibility.
 */
export async function loginWithInternetIdentity(): Promise<void> {
  return login();
}

/**
 * Logout current user.
 */
export async function logout(): Promise<void> {
  const client = await createAuthClient();

  await client.logout();

  resetAgent();
}

/**
 * Returns true if user is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const client = await createAuthClient();

  return client.isAuthenticated();
}

/**
 * Returns current Identity.
 */
export async function getIdentity(): Promise<Identity> {
  const client = await createAuthClient();

  return client.getIdentity()
}

/**
 * Returns current Principal as text.
 */
export async function getPrincipal(): Promise<string | null> {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return null;
  }

  const identity = await getIdentity();

  return identity.getPrincipal().toText();
}