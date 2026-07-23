import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";
import { BLOG_POSTS } from "@/data";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

const CATEGORY_STYLE: Record<string, string> = { web3:"badge-blue", icp:"badge-blue", defi:"badge-gold", education:"badge-green", community:"badge-purple", news:"badge-gold" };

export default function BlogPage() {
  const featured = BLOG_POSTS.filter(p=>p.featured);
  const rest = BLOG_POSTS.filter(p=>!p.featured);
  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4"><div className="container-wide">
        <div className="mb-12 text-center">
          <div className="badge-blue mb-4 mx-auto w-fit">Blog</div>
          <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">Web3 <span className="gradient-text">Insights</span></h1>
          <p className="mt-4 text-brand-muted max-w-xl mx-auto">ICP, blockchain, and Web3 education articles from the SMG Crypto Hub team.</p>
        </div>
        {featured.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-sm font-semibold text-brand-muted uppercase tracking-widest mb-5">Featured</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map(post => (
                <article key={post.id} className="card-glow group flex flex-col">
                  <div className="rounded-xl bg-gradient-to-br from-brand-blue/20 to-icp-secondary/10 h-36 mb-4 flex items-center justify-center border border-brand-border">
                    <span className="text-4xl" aria-hidden="true">{post.category === "icp" ? "⛓" : post.category === "defi" ? "💹" : post.category === "news" ? "📢" : "📖"}</span>
                  </div>
                  <span className={"badge w-fit mb-3 " + (CATEGORY_STYLE[post.category] || "badge-blue")}>{post.category}</span>
                  <h3 className="font-display text-sm font-semibold text-brand-white mb-2 flex-1 group-hover:text-brand-blue transition-colors leading-snug">{post.title}</h3>
                  <p className="text-xs text-brand-muted mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-brand-muted">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{post.readingTime} min</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
        <div>
          <h2 className="font-display text-sm font-semibold text-brand-muted uppercase tracking-widest mb-5">All Articles</h2>
          <div className="space-y-4">
            {rest.map(post => (
              <article key={post.id} className="card flex items-start gap-5">
                <div className="rounded-xl bg-brand-card border border-brand-border h-14 w-14 flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">{post.category === "icp" ? "⛓" : post.category === "defi" ? "💹" : "📖"}</div>
                <div className="flex-1">
                  <span className={"badge w-fit mb-2 " + (CATEGORY_STYLE[post.category] || "badge-blue")}>{post.category}</span>
                  <h3 className="font-display text-sm font-semibold text-brand-white mb-1 hover:text-brand-blue transition-colors">{post.title}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-brand-muted mt-2">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{post.readingTime} min</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div></div>
    </PageLayout>
  );
}