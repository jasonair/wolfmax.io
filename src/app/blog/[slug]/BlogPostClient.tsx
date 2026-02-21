'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { GradientOrbs } from "@/components/GradientOrbs";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Navbar } from "@/components/Navbar";
import { WolfLogo } from "@/components/WolfLogo";

interface Post {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    image: string | null;
    publishedAt: Date | string | null;
    createdAt: Date | string;
    content: string;
    tags: Array<{ id: string; name: string }>;
}

export function BlogPostClient({ post }: { post: Post }) {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-brand-purple/30">
            <Navbar />

            {/* Background effects */}
            <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
            <GradientOrbs />
            <FloatingParticles />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
                {/* Article Header */}
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-sm font-semibold text-brand-purple uppercase tracking-[0.3em]">
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight text-balance">
                        {post.title}
                    </h1>

                    {post.description && (
                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 font-medium">
                            {post.description}
                        </p>
                    )}

                    {post.image && (
                        <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <article className="prose prose-invert prose-purple max-w-none 
          prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
          prose-a:text-brand-purple prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-blockquote:border-brand-purple
          prose-blockquote:bg-white/[0.02] prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic
          prose-img:rounded-3xl prose-img:border prose-img:border-white/5
          mb-20">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-20 pt-10 border-t border-white/5">
                        {post.tags.map((tag: any) => (
                            <span key={tag.id} className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-gray-400 flex items-center gap-2 hover:bg-white/[0.06] hover:border-white/20 transition-colors">
                                <span className="text-brand-purple">#</span> {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Author / Footer Card */}
                <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 text-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Thanks for reading</h3>
                        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                            Join the conversation on the future of human authorship and stay protected in the AI age.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-brand-red text-white font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,51,102,0.3)]"
                        >
                            Join the Waitlist
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 py-16 px-4 border-t border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
                    <WolfLogo className="w-12 h-12" />
                    <div className="flex gap-10 text-sm font-medium text-gray-500">
                        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                    <p className="text-gray-600 text-xs tracking-widest uppercase">
                        © 2026 Wolfmax Labs. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
