import type { ApiResponse, CryptoAsset } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smgcryptohub.xyz";

// ── Generic fetch wrapper ────────────────────────────────────────────────────
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) {
      return { data: null, error: `HTTP ${res.status}: ${res.statusText}`, status: res.status };
    }
    const data = (await res.json()) as T;
    return { data, error: null, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { data: null, error: message, status: 0 };
  }
}

// ── Contact form ─────────────────────────────────────────────────────────────
export async function submitContactForm(data: {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}): Promise<ApiResponse<{ success: boolean; message: string }>> {
  return fetchApi("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Market data ───────────────────────────────────────────────────────────────
// NOTE: Live CoinGecko integration activates at Milestone 6.
// These functions are pre-typed and ready; replace MOCK_CRYPTO_ASSETS
// with a real CoinGecko API call when NEXT_PUBLIC_COINGECKO_API_KEY is set.

export async function fetchMarketData(
  _ids?: string[]
): Promise<ApiResponse<CryptoAsset[]>> {
  // Milestone 6: Replace with:
  // const params = new URLSearchParams({ vs_currency: "usd", order: "market_cap_desc" });
  // if (_ids?.length) params.set("ids", _ids.join(","));
  // return fetchApi(`https://api.coingecko.com/api/v3/coins/markets?${params}`);

  return {
    data: null,
    error: "Live market data available at Milestone 6",
    status: 503,
  };
}

export async function fetchCoinPrice(id: string): Promise<ApiResponse<number>> {
  // Milestone 6: Replace with live CoinGecko simple/price endpoint
  void id;
  return { data: null, error: "Live prices available at Milestone 6", status: 503 };
}

// ── Newsletter ────────────────────────────────────────────────────────────────
export async function subscribeNewsletter(
  email: string
): Promise<ApiResponse<{ subscribed: boolean }>> {
  // Milestone 6: Replace with email service integration (Resend, etc.)
  void email;
  return {
    data: { subscribed: true },
    error: null,
    status: 200,
  };
}
