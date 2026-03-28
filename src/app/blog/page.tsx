import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { BlogIndexClient } from "./BlogIndexClient";

export const metadata: Metadata = {
    title: "Blog | Wolfmax",
    description: "Insights on human authorship, AI verification, and protecting your work.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | Wolfmax",
        description: "Insights on human authorship, AI verification, and protecting your work.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Wolfmax",
        description: "Insights on human authorship, AI verification, and protecting your work.",
    },
};

export default async function BlogPage() {
    const result = await wisp.getPosts();
    const posts = result.posts;

    return <BlogIndexClient posts={posts} />;
}
