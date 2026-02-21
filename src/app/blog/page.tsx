import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { BlogIndexClient } from "./BlogIndexClient";

export const metadata: Metadata = {
    title: "Blog | Wolfmax",
    description: "Insights on human authorship, AI verification, and the origin layer for work.",
};

export default async function BlogPage() {
    const result = await wisp.getPosts();
    const posts = result.posts;

    return <BlogIndexClient posts={posts} />;
}
