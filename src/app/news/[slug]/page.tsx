import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NewsPostClient } from "./NewsPostClient";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/seo";

export const revalidate = 3600; // Revalidate every hour

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { post } = await wisp.getPost(slug);
    if (!post) return {};

    return {
      title: `${post.title} — Workings News`,
      description: post.description || undefined,
      alternates: {
        canonical: `/news/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description || undefined,
        images: post.image ? [{ url: post.image }] : [],
        type: "article",
        siteName: "Workings",
        publishedTime: (post.publishedAt || post.createdAt).toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description || undefined,
        images: post.image ? [post.image] : [],
      },
    };
  } catch {
    return {
      title: "News — Workings",
    };
  }
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const { post } = await wisp.getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleSchema({ ...post, slug })} />
      <NewsPostClient post={post} />
    </>
  );
}
