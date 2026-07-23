import { PageLayout } from "@/components/layout/PageLayout";
import { SITE } from "@/constants/site";

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-narrow">
        <div className="mb-12">
          <h1 className="font-display text-display-md font-extrabold text-brand-white">Terms of Service</h1>
          <p className="mt-3 text-sm text-brand-muted">Last updated: 12 July 2026</p>
        </div>
        <div className="space-y-8">
          {[
            ["Acceptance", "By accessing SMG Crypto Hub, you agree to these terms. If you do not agree, do not use the platform."],
            ["Platform Status", "SMG Crypto Hub is a pre-production platform (v0.1.0). Features are limited. The production platform deploys at Milestone 6. No financial, investment, or legal advice is provided."],
            ["No Token, No Investment", "SMG Crypto Hub has not issued any token. Nothing on this platform constitutes an investment opportunity. Do not make financial decisions based on platform content alone."],
            ["Open Source", "The codebase is MIT licensed. You may use, fork, and distribute it per MIT licence terms. You may not use the SMG Crypto Hub name or logo to imply official endorsement."],
            ["Educational Content", "Course content is for educational purposes only. We aim for accuracy but do not guarantee that all information is current or complete. Always verify information from authoritative sources."],
            ["Governing Law", "These terms are governed by the laws of the jurisdiction in which SMG Crypto Hub operates. Disputes will be handled in good faith."],
            ["Contact", "Legal queries: " + SITE.email],
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