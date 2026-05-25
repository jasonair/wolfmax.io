// Single source of truth for site identity + schema.org structured data.
// Used by JSON-LD injection, sitemap, and metadata.

export const SITE_URL = "https://workings.io";
export const SITE_NAME = "Workings";
export const LEGAL_NAME = "Human Workings Ltd";
export const CONTACT_EMAIL = "contact@workings.io";

const SITE_DESCRIPTION =
  "Workings is an authorship tool that privately captures how your work is made — by humans, AI, or both. It records your process locally on your Mac or PC and produces cryptographically signed, tamper-evident reports that prove your work is genuinely yours.";

// Organization — sitewide identity. Use @id so other nodes can reference it.
export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    contactType: "customer support",
  },
} as const;

// WebSite — sitewide. Links back to the Organization as publisher.
export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
} as const;

// SoftwareApplication — the product itself. This is the node that answers
// "what is Workings?" for an AI agent.
export const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#app`,
  name: SITE_NAME,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "macOS (Apple Silicon), Windows",
  url: SITE_URL,
  description:
    "A desktop application that privately records your work process — periodic screenshots and typing rhythm — locally and encrypted on your device. It generates cryptographically signed, tamper-evident reports and timelapses that prove when and how work was made, with transparent metrics on AI-tool usage. A privacy-first alternative to AI detection: it captures verifiable evidence of process at the point of creation rather than guessing from finished output.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free during beta (invite-only).",
  },
  featureList: [
    "Local-first, end-to-end encrypted recording (zero-knowledge architecture)",
    "Tamper-evident, cryptographically chained records (SHA-512 hashing)",
    "Verifiable process reports and timelapses",
    "Transparent AI-tool usage metrics without reading your content",
    "Independent report verification with no account required",
  ],
} as const;

// FAQPage — built from the FAQ data so questions/answers stay in one place.
export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// Article — for individual news posts.
export function articleSchema(post: {
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  publishedAt: Date | string | null;
  createdAt: Date | string;
}) {
  const published = new Date(post.publishedAt || post.createdAt).toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || undefined,
    image: post.image || undefined,
    datePublished: published,
    dateModified: published,
    url: `${SITE_URL}/news/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/news/${post.slug}` },
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

// Sitewide graph (Organization + WebSite + SoftwareApplication) emitted once
// in the root layout under a single @graph.
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema, softwareApplicationSchema],
};
