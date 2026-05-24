'use client';

import { motion } from "framer-motion";
import Link from "next/link";

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
        <div className="surface-cream min-h-screen selection:bg-blue/15">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24">
                {/* Page header */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="eyebrow text-blue mb-4">Journal</p>
                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-navy mb-6 tracking-tight">
                            Workings Blog
                        </h1>
                        <p className="text-mute text-xl max-w-2xl leading-relaxed">
                            Exploring the boundaries of human work and AI in the digital age.
                        </p>
                    </motion.div>
                </header>

                {/* Post grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block h-full"
                            >
                                <div className="card-on-cream h-full flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                                    {post.image && (
                                        <div className="aspect-[16/9] overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    <div className="p-8 flex flex-col flex-1">
                                        <p className="eyebrow text-mute mb-4">
                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </p>

                                        <h2 className="font-display text-2xl text-navy mb-4 group-hover:text-blue transition-colors duration-200">
                                            {post.title}
                                        </h2>

                                        <p className="text-mute text-base leading-relaxed mb-8 line-clamp-3 flex-1">
                                            {post.description}
                                        </p>

                                        <div className="mt-auto flex items-center text-blue text-sm font-semibold gap-1.5">
                                            Read Article
                                            <svg
                                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
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
                        className="text-center py-32 rounded-[22px] border border-navy/10 bg-cream-200"
                    >
                        <p className="text-mute text-lg font-medium">No posts published yet. Stay tuned!</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
