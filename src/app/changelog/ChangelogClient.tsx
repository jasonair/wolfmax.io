'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { GradientOrbs } from "@/components/GradientOrbs";
import { FloatingParticles } from "@/components/FloatingParticles";
import { WolfLogo } from "@/components/WolfLogo";

interface Release {
    id: number;
    tag_name: string;
    name: string | null;
    body: string | null;
    published_at: string;
    html_url: string;
    prerelease: boolean;
}

function parseMarkdown(md: string): string {
    return md
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
        // Bold and italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-brand-purple text-sm font-mono">$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand-purple hover:underline">$1</a>')
        // Unordered lists
        .replace(/^[*-] (.+)$/gm, '<li class="flex items-baseline gap-2 text-gray-300"><span class="text-brand-red shrink-0">•</span><span>$1</span></li>')
        // Paragraphs (blank lines)
        .replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed mb-4">')
        // Single newlines within content
        .replace(/\n/g, '<br />');
}

function groupByMonth(releases: Release[]): Map<string, Release[]> {
    const groups = new Map<string, Release[]>();

    for (const release of releases) {
        const date = new Date(release.published_at);
        const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(release);
    }

    return groups;
}

export function ChangelogClient({ releases }: { releases: Release[] }) {
    const grouped = groupByMonth(releases);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-brand-purple/30">
            {/* Background effects */}
            <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
            <GradientOrbs />
            <FloatingParticles />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
                {/* Page Header */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Change<span className="text-brand-red">log</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
                            New updates and improvements to Wolfmax.
                        </p>
                    </motion.div>
                </header>

                {/* Releases Timeline */}
                {releases.length > 0 ? (
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-brand-red/50 via-brand-purple/30 to-transparent hidden sm:block" />

                        {Array.from(grouped.entries()).map(([month, monthReleases], groupIdx) => (
                            <div key={month} className="mb-16">
                                {/* Month header */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                                    className="flex items-center gap-4 mb-8 sm:pl-8"
                                >
                                    <h2 className="text-sm font-semibold text-brand-purple uppercase tracking-[0.3em]">
                                        {month}
                                    </h2>
                                    <div className="flex-1 h-px bg-white/5" />
                                </motion.div>

                                {/* Releases in this month */}
                                {monthReleases.map((release, idx) => (
                                    <motion.div
                                        key={release.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: (groupIdx * 0.1) + (idx * 0.05) }}
                                        className="relative sm:pl-8 mb-10 last:mb-0"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-0 top-3 w-[15px] h-[15px] rounded-full border-2 border-brand-red bg-black hidden sm:block" />

                                        {/* Release card */}
                                        <div className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">
                                            {/* Hover glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                                            <div className="relative z-10">
                                                {/* Release header */}
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    <span className="px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold tracking-wider">
                                                        {release.tag_name}
                                                    </span>
                                                    {release.prerelease && (
                                                        <span className="px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-bold tracking-wider">
                                                            PRE-RELEASE
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(release.published_at).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>

                                                {/* Release title */}
                                                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
                                                    {release.name || release.tag_name}
                                                </h3>

                                                {/* Release body */}
                                                {release.body && (
                                                    <div
                                                        className="prose prose-invert prose-sm max-w-none
                                                            prose-headings:text-white prose-headings:font-bold
                                                            prose-p:text-gray-300 prose-p:leading-relaxed
                                                            prose-a:text-brand-purple prose-a:no-underline hover:prose-a:underline
                                                            prose-strong:text-white
                                                            prose-li:text-gray-300
                                                            mb-6"
                                                        dangerouslySetInnerHTML={{ __html: parseMarkdown(release.body) }}
                                                    />
                                                )}

                                                {/* View on GitHub link */}
                                                <a
                                                    href={release.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group/link"
                                                >
                                                    View on GitHub
                                                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 rounded-3xl bg-white/[0.02] border border-white/5"
                    >
                        <p className="text-gray-500 text-lg font-medium">No releases published yet. Stay tuned!</p>
                    </motion.div>
                )}
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-16 px-4 border-t border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
                    <WolfLogo className="w-12 h-12" />
                    <div className="flex gap-10 text-sm font-medium text-gray-500">
                        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                        <Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                    <p className="text-gray-600 text-xs tracking-widest uppercase" suppressHydrationWarning>
                        © {new Date().getFullYear()} Wolfmax Labs. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
