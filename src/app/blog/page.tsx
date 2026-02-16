import { wisp } from "@/lib/wisp";
import { motion } from "framer-motion";
import Link from "next/link";
import { WolfLogo } from "@/components/WolfLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Wolfmax",
    description: "Insights on human authorship, AI verification, and the origin layer for work.",
};

export default async function BlogPage() {
    const result = await wisp.getPosts();
    const posts = result.posts;

    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-brand-purple/30">
            {/* Background effects */}
            <div className="fixed inset-0 grid-bg opacity-50" />
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-purple/10 blur-[100px]" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-blue/10 blur-[100px]" />

            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Wolfmax <span className="gradient-text">Blog</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Exploring the boundaries of human work and AI in the digital age.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group block relative p-px rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Border Gradient on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col">
                                {post.image && (
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                )}

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-medium text-brand-purple uppercase tracking-wider">
                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.description}
                                    </p>

                                    <div className="mt-auto flex items-center text-brand-purple text-sm font-medium">
                                        Read more
                                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 border border-white/5 rounded-3xl bg-white/5">
                        <p className="text-gray-500">No posts published yet. Stay tuned!</p>
                    </div>
                )}
            </main>

        </div>
    );
}
