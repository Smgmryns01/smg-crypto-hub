import { PageLayout } from "@/components/layout/PageLayout";
import { SITE } from "@/constants/site";

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-narrow">
        <div className="mb-12">
          <h1 className="font-display text-display-md font-extrabold text-brand-white">Privacy Policy</h1>
          <p className="mt-3 text-sm text-brand-muted">Last updated: 12 July 2026</p>
        </div>
        <div className="space-y-8">
          {[
            ["Data We Collect (v0.1.0)", "The current platform operates in a pre-production state. No data is transmitted to or stored on any server. Authentication is a client-side mock. No personally identifiable information is collected or stored beyond your browser's sessionStorage, which clears when the tab closes."],
            ["Data at Milestone 5+", "When live, the platform will use ICP Internet Identity for authentication — a cryptographic identity anchored to your device, with no email address or password required. Course progress and certificates will be stored in ICP canisters. We will not store payment card data."],
            ["No Third-Party Tracking", "No analytics SDKs, advertising networks, or tracking scripts are present in the codebase. No gtag, no Segment, no Mixpanel, no Hotjar. This will remain true at production launch."],
            ["No Token, No Wallet Data", "No native token has been launched. No wallet data is collected. Wallet connection features activate at Milestone 5 using Internet Identity and chain-key cryptography."],
            ["Contact", "For privacy enquiries: smgcryptohub@gmail.com"],
          ].map(([title, content]) => (
            <div key={title as string} className="card">
              <h2 className="font-display text-base font-semibold text-brand-white mb-3">{title as string}</h2>
              <p className="text-sm text-brand-muted leading-relaxed">{content as string}</p>
            </div>
          ))}
        </div>
      </div></div>
    </PageLayout>
  );
}