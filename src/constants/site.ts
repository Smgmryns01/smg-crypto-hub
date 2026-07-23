type NavigationItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
};
export const SITE = {
  name: "SMG Crypto Hub",
  fullName: "SMG Crypto Hub (Smart Modern Growth)",
  tagline: "Your Gateway to Web3 Success",
  description:
    "SMG Crypto Hub is an open-source Web3 education platform built for Africa and the world, powered by the Internet Computer Protocol (ICP) Blockchain.",
  url: "https://smgcryptohub.xyz",
  github: "https://github.com/Smgmryns01/smg-crypto-hub",
  twitter: "https://x.com/smgcryptohub",
  /** Official broadcast channel — announcements and platform updates only */
  telegramChannel: "https://t.me/SMGCryptohHubChannel",
  /** Community discussion group — learner support, peer conversations */
  telegram: "https://t.me/SMGCryptoHubCommunity",
  email: "smgcryptohub@gmail.com",
  deploymentStatus: "Deployment planned for Milestone 6.",
  version: "0.1.0",
} as const;

export const NAVIGATION: NavigationItem[] = [
  {
    label: "Learn",
    href: "/academy",
    children: [
      { label: "Academy", href: "/academy", description: "All courses" },
      { label: "Web3 Basics", href: "/learn-web3", description: "Start your Web3 journey" },
      { label: "Crypto Basics", href: "/courses/crypto-basics", description: "Understand cryptocurrency" },
      { label: "Blockchain", href: "/courses/blockchain-basics", description: "How blockchains work" },
      { label: "ICP Development", href: "/courses/icp-development", description: "Build on Internet Computer" },
    ],
  },
  {
    label: "Ecosystem",
    href: "/icp-ecosystem",
    children: [
      { label: "ICP Ecosystem", href: "/icp-ecosystem", description: "Explore Internet Computer" },
      { label: "Developer Resources", href: "/icp-ecosystem#resources", description: "Tools and docs" },
      { label: "Staking", href: "/staking", description: "Earn rewards" },
      { label: "Airdrops", href: "/airdrops", description: "Discover opportunities" },
    ],
  },
  {
    label: "Markets",
    href: "/market",
    children: [
      { label: "Live Market", href: "/market", description: "Crypto prices" },
      { label: "Wallet Connect", href: "/wallet", description: "Connect your wallet" },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "Roadmap", href: "/roadmap" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "https://x.com/smgcryptohub", icon: "twitter" },
  { label: "Telegram — Official Channel", href: "https://t.me/SMGCryptohHubChannel", icon: "telegram-channel" },
  { label: "Telegram — Community Group", href: "https://t.me/SMGCryptoHubCommunity", icon: "telegram-community" },
  { label: "GitHub", href: "https://github.com/Smgmryns01/smg-crypto-hub", icon: "github" },
] as const;

export const FOOTER_LINKS = {
  learn: [
    { label: "Academy", href: "/academy" },
    { label: "Web3 Basics", href: "/learn-web3" },
    { label: "Crypto Basics", href: "/courses/crypto-basics" },
    { label: "Blockchain Basics", href: "/courses/blockchain-basics" },
    { label: "ICP Development", href: "/courses/icp-development" },
  ],
  ecosystem: [
    { label: "ICP Ecosystem", href: "/icp-ecosystem" },
    { label: "Live Market", href: "/market" },
    { label: "Airdrops", href: "/airdrops" },
    { label: "Staking", href: "/staking" },
    { label: "Wallet Connect", href: "/wallet" },
  ],
  community: [
    { label: "Community Hub", href: "/community" },
    { label: "Blog", href: "/blog" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "About", href: "/about" },
  ],
};