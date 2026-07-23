const PARTNER_SLOTS = [
  { id: 1, label: "ICP Ecosystem Partner" },
  { id: 2, label: "Technology Partner" },
  { id: 3, label: "Education Partner" },
  { id: 4, label: "Blockchain Partner" },
  { id: 5, label: "Community Partner" },
  { id: 6, label: "Media Partner" },
] as const;

export function Partners() {
  return (
    <section
      className="py-16 border-y border-brand-border/50"
      aria-labelledby="partners-heading"
    >
      <div className="container-wide px-4">
        <p
          id="partners-heading"
          className="text-center text-xs font-semibold uppercase tracking-widest text-brand-muted/60 mb-10"
        >
          Partners &amp; Ecosystem — Announcements Pending
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNER_SLOTS.map(({ id, label }) => (
            <div
              key={id}
              className="flex h-16 items-center justify-center rounded-xl border border-dashed border-brand-border/40 bg-brand-card/20 px-4 hover:border-brand-blue/20 transition-all duration-300"
              aria-label={`${label} — slot reserved`}
            >
              <span className="text-xs text-brand-muted/40 text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-brand-muted/40">
          Partner programme opens after platform launch (Milestone 6). Enquiries:{" "}
          <a
            href="mailto:smgcryptohub@gmail.com"
            className="text-brand-muted/60 hover:text-brand-muted transition-colors"
          >
            smgcryptohub@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
