import { Eyebrow } from '@/components/Eyebrow';
import { JsonLd } from '@/components/JsonLd';
import { faqSections, faqItems } from '@/lib/faq';
import { faqPageSchema } from '@/lib/seo';

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-navy/10 py-6">
      <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
        <span className="text-[1.05rem] font-semibold text-navy">{q}</span>
        <span className="shrink-0 text-2xl font-light leading-none text-blue transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <div
        className="mt-3.5 max-w-[65ch] text-[0.98rem] leading-relaxed text-mute [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-navy [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3 [&_li]:mt-1 [&_li]:pl-1 [&_li::marker]:text-blue/60"
        dangerouslySetInnerHTML={{ __html: a }}
      />
    </details>
  );
}

export default function FaqPage() {
  return (
    <main className="surface-cream min-h-screen">
      <JsonLd data={faqPageSchema(faqItems)} />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 text-center">
        <Eyebrow className="text-mute mb-4">Questions &amp; answers</Eyebrow>
        <h1 className="font-display text-5xl sm:text-6xl text-navy leading-[1.04] mb-6">FAQ</h1>
        <p className="font-subtitle text-base sm:text-lg text-mute max-w-xl mx-auto">
          Everything you need to know about Workings - how it works, who it&apos;s for, and how we handle your data.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {faqSections.map((section, si) => (
          <div key={section.heading}>
            <h2 className={`eyebrow text-mute ${si === 0 ? 'mt-4' : 'mt-12'} mb-1`}>{section.heading}</h2>
            {section.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}

        <div className="mt-20 text-center">
          <p className="text-mute mb-4">Still have a question?</p>
          <a href="mailto:info@workings.io" className="btn-blue">
            info@workings.io
          </a>
        </div>
      </section>
    </main>
  );
}
