// Server component (no "use client"): renders a JSON-LD <script> into the
// initial HTML so crawlers and AI agents can read structured facts without
// executing JavaScript.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
