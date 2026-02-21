'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { GradientOrbs } from "@/components/GradientOrbs";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Navbar } from "@/components/Navbar";

interface Post {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    image: string | null;
    publishedAt: Date | string | null;
    createdAt: Date | string;
}

export function BlogIndexClient({ posts }: { posts: Post[] }) {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-brand-purple/30">
            <Navbar />

            {/* Background effects */}
            <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
            <GradientOrbs />
            <FloatingParticles />

            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Wolfmax <span className="text-brand-red">Blog</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
                            Exploring the boundaries of human work and AI in the digital age.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block relative h-full"
                            >
                                <div className="relative h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,51,102,0.1)] group-hover:translate-y-[-4px]">
                                    {/* Animated Border Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {post.image && (
                                        <div className="aspect-[16/9] relative overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>
                                    )}

                                    <div className="p-8 flex flex-col h-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-xs font-semibold text-brand-purple uppercase tracking-[0.2em]">
                                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-400 text-base leading-relaxed mb-8 line-clamp-3">
                                            {post.description}
                                        </p>

                                        <div className="mt-auto flex items-center text-white text-sm font-bold group-hover:gap-2 transition-all">
                                            Read Article
                                            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 rounded-3xl bg-white/[0.02] border border-white/5"
                    >
                        <p className="text-gray-500 text-lg font-medium">No posts published yet. Stay tuned!</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
