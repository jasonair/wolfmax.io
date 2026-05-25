interface LegalShellProps {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  meta: string;
  note?: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
}

/** Shared chrome for the long-form legal pages (privacy, terms, app privacy). */
export function LegalShell({ eyebrow, title, meta, note, lead, children }: LegalShellProps) {
  return (
    <main className="surface-cream min-h-screen">
      <div className="max-w-[72ch] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24">
        <header className="mb-10">
          <p className="eyebrow text-mute mb-4">{eyebrow}</p>
          <h1 className="font-display text-5xl sm:text-6xl text-navy leading-[1.05] mb-4">{title}</h1>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-mute">{meta}</p>
          {note && <p className="mt-4 text-sm text-mute [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-2">{note}</p>}
        </header>

        {lead && <p className="text-lg text-navy leading-relaxed mb-10">{lead}</p>}

        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-navy prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mb-4 prose-p:text-mute prose-p:leading-relaxed prose-li:text-mute prose-a:text-blue prose-strong:text-navy prose-code:text-navy prose-code:font-mono">
          {children}
        </div>
      </div>
    </main>
  );
}
