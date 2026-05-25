import { wisp } from "@/lib/wisp";
import { NewsIndexClient } from "./NewsIndexClient";

export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage() {
  const { posts } = await wisp.getPosts();

  return <NewsIndexClient posts={posts} />;
}
