// ─── Course Types ─────────────────────────────────────────────────────────────

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseCategory =
  | "crypto-basics"
  | "blockchain"
  | "icp-development"
  | "defi"
  | "nft"
  | "security"
  | "web3";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  category: CourseCategory;
  duration: string;
  lessons: number;
  thumbnail?: string;
  tags: string[];
  featured?: boolean;
}

export interface CourseProgress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  certificate?: string;
}

// ─── Market Types ─────────────────────────────────────────────────────────────

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  rank: number;
  image?: string;
}

export interface StakingAsset {
  symbol: string;
  name: string;
  apr: number;
  minLockDays: number;
  maxLockDays: number;
  minAmount: number;
  rewards: string;
  status: "active" | "coming-soon";
}

// ─── Airdrop Types ────────────────────────────────────────────────────────────

export type AirdropStatus = "active" | "upcoming" | "ended";
export type AirdropDifficulty = "easy" | "medium" | "hard";

export interface Airdrop {
  id: string;
  project: string;
  description: string;
  status: AirdropStatus;
  difficulty: AirdropDifficulty;
  estimatedReward: string;
  requirements: string[];
  endDate?: string;
  chain: string;
  tags: string[];
}

// ─── Blog Types ───────────────────────────────────────────────────────────────

export type BlogCategory =
  | "web3"
  | "icp"
  | "defi"
  | "education"
  | "community"
  | "news";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  author: BlogAuthor;
  featured?: boolean;
}

export interface BlogAuthor {
  name: string;
  avatar?: string;
  role: string;
}

// ─── Contact Types ────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: "general" | "partnership" | "support" | "press" | "other";
}

// ─── Wallet Types ─────────────────────────────────────────────────────────────

export type WalletProvider =
  | "internet-identity"
  | "plug"
  | "nfid"
  | "oisy"
  | "metamask"
  | "phantom"
  | "walletconnect";

export interface WalletOption {
  id: WalletProvider;
  name: string;
  description: string;
  icon: string;
  status: "available" | "coming-soon";
  chains: string[];
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
  external?: boolean;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}
