export async function createAuthClient() {
  return null;
}

export async function login(): Promise<void> {
  throw new Error(
    "Internet Identity authentication is temporarily unavailable while migrating to @icp-sdk/core."
  );
}

export async function loginWithInternetIdentity() {
  return login();
}

export async function logout(): Promise<void> {}

export async function isAuthenticated(): Promise<boolean> {
  return false;
}

export async function getIdentity() {
  return null;
}

export async function getPrincipal(): Promise<string | null> {
  return null;
}