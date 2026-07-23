import type { MetadataRoute } from "next";

const BASE = "https://smgcryptohub.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/academy", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/learn-web3", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/icp-ecosystem", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/courses/crypto-basics", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/courses/blockchain-basics", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/courses/icp-development", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/market", priority: 0.6, changeFrequency: "daily" as const },
    { url: "/airdrops", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/staking", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/community", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/roadmap", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];
  return routes.map(({ url, priority, changeFrequency }) => ({
    url: BASE + url,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
