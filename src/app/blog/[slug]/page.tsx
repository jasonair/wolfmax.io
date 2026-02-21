import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogPostClient } from "./BlogPostClient";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const { post } = await wisp.getPost(slug);
        if (!post) return {};

        return {
            title: `${post.title} | Wolfmax Blog`,
            description: post.description || undefined,
            openGraph: {
                title: post.title,
                description: post.description || undefined,
                images: post.image ? [{ url: post.image }] : [],
                type: "article",
                publishedTime: (post.publishedAt || post.createdAt).toISOString(),
            },
        };
    } catch (error) {
        return {
            title: "Blog Post | Wolfmax",
        };
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const { post } = await wisp.getPost(slug);

    if (!post) {
        notFound();
    }

    return <BlogPostClient post={post} />;
}
