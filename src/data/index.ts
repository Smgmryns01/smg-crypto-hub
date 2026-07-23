import type {
  Course,
  CryptoAsset,
  StakingAsset,
  Airdrop,
  BlogPost,
  WalletOption,
} from "@/types";

// ─── Courses ──────────────────────────────────────────────────────────────────

export const COURSES: Course[] = [
  {
    id: "crypto-101",
    title: "Cryptocurrency Fundamentals",
    description:
      "Master the basics of cryptocurrency — what it is, how it works, and how to use it safely.",
    level: "beginner",
    category: "crypto-basics",
    duration: "3h 20min",
    lessons: 12,
    tags: ["Bitcoin", "Ethereum", "Wallets", "Security"],
    featured: true,
  },
  {
    id: "blockchain-basics",
    title: "How Blockchain Works",
    description:
      "Understand distributed ledgers, consensus mechanisms, and why blockchain changes everything.",
    level: "beginner",
    category: "blockchain",
    duration: "4h 10min",
    lessons: 16,
    tags: ["Consensus", "Proof of Work", "Proof of Stake", "Nodes"],
    featured: true,
  },
  {
    id: "icp-intro",
    title: "Introduction to Internet Computer",
    description:
      "Explore ICP's unique architecture — canisters, cycles, subnets, and Internet Identity.",
    level: "beginner",
    category: "icp-development",
    duration: "5h 00min",
    lessons: 20,
    tags: ["ICP", "Canisters", "Internet Identity", "DFINITY"],
    featured: true,
  },
  {
    id: "web3-wallets",
    title: "Web3 Wallets & Identity",
    description:
      "Learn to use crypto wallets securely — from seed phrases to hardware wallets and Internet Identity.",
    level: "beginner",
    category: "web3",
    duration: "2h 45min",
    lessons: 10,
    tags: ["Wallets", "Internet Identity", "Security", "Self-custody"],
  },
  {
    id: "defi-essentials",
    title: "DeFi Essentials",
    description:
      "Discover decentralised finance — DEXes, liquidity pools, yield farming, and lending protocols.",
    level: "intermediate",
    category: "defi",
    duration: "6h 30min",
    lessons: 24,
    tags: ["DeFi", "DEX", "Liquidity", "Yield Farming"],
    featured: true,
  },
  {
    id: "motoko-fundamentals",
    title: "Motoko Programming Fundamentals",
    description:
      "Build your first ICP canister using Motoko — ICP's native programming language.",
    level: "intermediate",
    category: "icp-development",
    duration: "8h 00min",
    lessons: 30,
    tags: ["Motoko", "Canisters", "Smart Contracts", "ICP"],
  },
  {
    id: "nft-creation",
    title: "NFT Creation & Marketplace",
    description:
      "Create, mint, and sell NFTs on ICP using the ICRC-7 standard.",
    level: "intermediate",
    category: "nft",
    duration: "5h 15min",
    lessons: 18,
    tags: ["NFT", "ICRC-7", "Marketplace", "Minting"],
  },
  {
    id: "web3-security",
    title: "Web3 Security & Best Practices",
    description:
      "Protect yourself from scams, phishing, and smart contract vulnerabilities.",
    level: "intermediate",
    category: "security",
    duration: "4h 50min",
    lessons: 16,
    tags: ["Security", "Auditing", "Anti-phishing", "Best Practices"],
  },
  {
    id: "advanced-icp",
    title: "Advanced ICP Development",
    description:
      "Build production-grade dApps — inter-canister calls, HTTPS outcalls, and NNS integration.",
    level: "advanced",
    category: "icp-development",
    duration: "12h 00min",
    lessons: 40,
    tags: ["Advanced ICP", "NNS", "HTTPS Outcalls", "Production"],
  },
];

// ─── Mock Crypto Market Data ──────────────────────────────────────────────────
// NOTE: These are static placeholder values for UI demonstration.
// Live market data will be fetched from CoinGecko API at Milestone 6.

export const MOCK_CRYPTO_ASSETS: CryptoAsset[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67420.5,
    change24h: 2.34,
    marketCap: 1_328_450_000_000,
    volume24h: 28_400_000_000,
    rank: 1,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3580.25,
    change24h: -0.87,
    marketCap: 430_200_000_000,
    volume24h: 14_200_000_000,
    rank: 2,
  },
  {
    id: "internet-computer",
    symbol: "ICP",
    name: "Internet Computer",
    price: 11.42,
    change24h: 5.21,
    marketCap: 4_190_000_000,
    volume24h: 78_000_000,
    rank: 28,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 178.6,
    change24h: 1.15,
    marketCap: 82_300_000_000,
    volume24h: 3_100_000_000,
    rank: 5,
  },
  {
    id: "bnb",
    symbol: "BNB",
    name: "BNB",
    price: 585.3,
    change24h: -1.22,
    marketCap: 85_100_000_000,
    volume24h: 1_800_000_000,
    rank: 4,
  },
  {
    id: "sui",
    symbol: "SUI",
    name: "Sui",
    price: 3.87,
    change24h: 8.45,
    marketCap: 11_400_000_000,
    volume24h: 890_000_000,
    rank: 18,
  },
  {
    id: "ton",
    symbol: "TON",
    name: "TON",
    price: 7.23,
    change24h: -2.1,
    marketCap: 18_700_000_000,
    volume24h: 450_000_000,
    rank: 8,
  },
  {
    id: "ckbtc",
    symbol: "ckBTC",
    name: "ckBTC",
    price: 67380.0,
    change24h: 2.31,
    marketCap: 0,
    volume24h: 12_000_000,
    rank: 0,
  },
];

// ─── Staking Assets ───────────────────────────────────────────────────────────

export const STAKING_ASSETS: StakingAsset[] = [
  {
    symbol: "ICP",
    name: "Internet Computer",
    apr: 12.5,
    minLockDays: 180,
    maxLockDays: 2920,
    minAmount: 1,
    rewards: "Voting rewards + maturity",
    status: "active",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    apr: 4.2,
    minLockDays: 30,
    maxLockDays: 365,
    minAmount: 0.001,
    rewards: "BTC + ICP rewards",
    status: "coming-soon",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    apr: 5.8,
    minLockDays: 30,
    maxLockDays: 365,
    minAmount: 0.01,
    rewards: "ETH staking rewards",
    status: "coming-soon",
  },
  {
    symbol: "SOL",
    name: "Solana",
    apr: 7.1,
    minLockDays: 0,
    maxLockDays: 90,
    minAmount: 0.1,
    rewards: "SOL rewards",
    status: "coming-soon",
  },
  {
    symbol: "TON",
    name: "TON",
    apr: 5.5,
    minLockDays: 30,
    maxLockDays: 180,
    minAmount: 10,
    rewards: "TON rewards",
    status: "coming-soon",
  },
  {
    symbol: "SUI",
    name: "Sui",
    apr: 9.3,
    minLockDays: 14,
    maxLockDays: 90,
    minAmount: 1,
    rewards: "SUI + delegator rewards",
    status: "coming-soon",
  },
];

// ─── Airdrops ─────────────────────────────────────────────────────────────────

export const AIRDROPS: Airdrop[] = [
  {
    id: "icp-neurons",
    project: "ICP Neuron Rewards",
    description:
      "Stake ICP in the NNS governance system and earn voting rewards distributed as maturity.",
    status: "active",
    difficulty: "medium",
    estimatedReward: "8–15% APY",
    requirements: [
      "Hold ICP tokens",
      "Create a neuron in the NNS",
      "Set dissolve delay (minimum 6 months for rewards)",
      "Vote on governance proposals",
    ],
    chain: "ICP",
    tags: ["ICP", "NNS", "Governance", "Staking"],
  },
  {
    id: "web3-edu-quest",
    project: "Web3 Education Quest",
    description:
      "Complete learning quests on SMG Crypto Hub to earn early-access rewards and recognition.",
    status: "upcoming",
    difficulty: "easy",
    estimatedReward: "Platform certificates + future rewards",
    requirements: [
      "Complete 3 beginner courses",
      "Earn your first certificate",
      "Join the Telegram community",
      "Share your progress",
    ],
    endDate: "TBA — coming at Milestone 3",
    chain: "ICP",
    tags: ["SMG", "Education", "Community", "Certificates"],
  },
  {
    id: "icp-dev-grant",
    project: "ICP Developer Grant Track",
    description:
      "Complete the ICP Development course and submit a project to qualify for DFINITY ecosystem grants.",
    status: "upcoming",
    difficulty: "hard",
    estimatedReward: "Up to $25,000 USD in ICP",
    requirements: [
      "Complete ICP Development course",
      "Build a working canister",
      "Submit via DFINITY grant portal",
      "Pass technical review",
    ],
    chain: "ICP",
    tags: ["ICP", "Development", "Grant", "Canister"],
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "what-is-internet-computer-protocol",
    title: "What Is the Internet Computer Protocol (ICP)?",
    excerpt:
      "A beginner-friendly guide to understanding ICP — the blockchain designed to host applications at web speed.",
    category: "icp",
    tags: ["ICP", "Blockchain", "DFINITY", "Beginner"],
    readingTime: 7,
    publishedAt: "2026-07-01",
    featured: true,
    author: {
      name: "SMG Crypto Hub",
      role: "Editorial Team",
    },
  },
  {
    id: "2",
    slug: "web3-education-africa-opportunity",
    title: "Web3 Education in Africa: The Opportunity of a Decade",
    excerpt:
      "Why Africa's 1.4 billion population and youngest median age make it the most important Web3 frontier.",
    category: "education",
    tags: ["Africa", "Web3", "Education", "ICP"],
    readingTime: 9,
    publishedAt: "2026-07-05",
    featured: true,
    author: {
      name: "SMG Crypto Hub",
      role: "Editorial Team",
    },
  },
  {
    id: "3",
    slug: "internet-identity-passwordless-web3",
    title: "Internet Identity: Passwordless Web3 Authentication",
    excerpt:
      "How ICP's Internet Identity eliminates seed phrases and makes Web3 accessible to everyone.",
    category: "icp",
    tags: ["Internet Identity", "Authentication", "UX", "ICP"],
    readingTime: 6,
    publishedAt: "2026-07-10",
    author: {
      name: "SMG Crypto Hub",
      role: "Editorial Team",
    },
  },
  {
    id: "4",
    slug: "canisters-vs-smart-contracts",
    title: "Canisters vs Smart Contracts: What's the Difference?",
    excerpt:
      "ICP canisters bundle code and data together — here's how they differ from EVM smart contracts.",
    category: "icp",
    tags: ["Canisters", "Smart Contracts", "ICP", "Comparison"],
    readingTime: 8,
    publishedAt: "2026-07-12",
    author: {
      name: "SMG Crypto Hub",
      role: "Editorial Team",
    },
  },
  {
    id: "5",
    slug: "defi-beginners-guide",
    title: "DeFi for Beginners: Your Complete Guide",
    excerpt:
      "From DEXes to yield farming — everything you need to know to start participating in DeFi safely.",
    category: "defi",
    tags: ["DeFi", "Beginner", "DEX", "Yield"],
    readingTime: 12,
    publishedAt: "2026-07-08",
    author: {
      name: "SMG Crypto Hub",
      role: "Editorial Team",
    },
  },
  {
    id: "6",
    slug: "smg-crypto-hub-milestone-1-complete",
    title: "Milestone 1 Complete: What We Built at SMG Crypto Hub",
    excerpt:
      "A transparent look at what's in the v0.1.0 release — 69 source files, 17 routes, 15 ICP integration points.",
    category: "news",
    tags: ["SMG", "Milestone", "Open Source", "Update"],
    readingTime: 5,
    publishedAt: "2026-07-12",
    featured: true,
    author: {
      name: "SMG Crypto Hub",
      role: "Editorial Team",
    },
  },
];

// ─── Wallet Options ───────────────────────────────────────────────────────────

export const WALLET_OPTIONS: WalletOption[] = [
  {
    id: "internet-identity",
    name: "Internet Identity",
    description: "ICP's native passwordless authentication. No seed phrase required.",
    icon: "🔐",
    status: "coming-soon",
    chains: ["ICP"],
  },
  {
    id: "plug",
    name: "Plug Wallet",
    description: "Browser extension wallet for ICP tokens and NFTs.",
    icon: "🔌",
    status: "coming-soon",
    chains: ["ICP"],
  },
  {
    id: "nfid",
    name: "NFID",
    description: "Non-Fungible Identity — portable ICP identity across dApps.",
    icon: "🪪",
    status: "coming-soon",
    chains: ["ICP"],
  },
  {
    id: "oisy",
    name: "Oisy",
    description: "Multi-chain wallet built on ICP with chain-key cryptography.",
    icon: "🌐",
    status: "coming-soon",
    chains: ["ICP", "ETH", "BTC"],
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "The most popular Ethereum wallet — for EVM-compatible chains.",
    icon: "🦊",
    status: "coming-soon",
    chains: ["ETH", "BNB", "Polygon"],
  },
  {
    id: "phantom",
    name: "Phantom",
    description: "Multi-chain wallet for Solana, Ethereum, and Bitcoin.",
    icon: "👻",
    status: "coming-soon",
    chains: ["SOL", "ETH", "BTC"],
  },
];
