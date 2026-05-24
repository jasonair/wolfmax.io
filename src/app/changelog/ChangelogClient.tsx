'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/Logo";

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
        .replace(/^### (.+)$/gm, '<h3 class="font-display text-lg font-bold text-navy mt-6 mb-2">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="font-display text-xl font-bold text-navy mt-8 mb-3">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="font-display text-2xl font-bold text-navy mt-8 mb-4">$1</h1>')
        // Bold and italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-navy">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-blue/8 text-blue text-sm font-mono">$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue hover:underline">$1</a>')
        // Unordered lists
        .replace(/^[*-] (.+)$/gm, '<li class="flex items-baseline gap-2 text-navy/80"><span class="text-blue shrink-0">•</span><span>$1</span></li>')
        // Paragraphs (blank lines)
        .replace(/\n\n/g, '</p><p class="text-navy/80 leading-relaxed mb-4">')
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
        <div className="surface-cream min-h-screen selection:bg-blue/15">
            <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24">
                {/* Page header */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="eyebrow text-blue mb-4">What's new</p>
                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-navy mb-6 tracking-tight">
                            Changelog
                        </h1>
                        <p className="text-mute text-xl max-w-2xl leading-relaxed">
                            New updates and improvements to Workings.
                        </p>
                    </motion.div>
                </header>

                {/* Releases timeline */}
                {releases.length > 0 ? (
                    <div className="relative">
                        {/* Timeline line */}
                        <div
                            className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-blue/40 via-navy/10 to-transparent hidden sm:block"
                            aria-hidden="true"
                        />

                        {Array.from(grouped.entries()).map(([month, monthReleases], groupIdx) => (
                            <div key={month} className="mb-16">
                                {/* Month header */}
                                <motion.div
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
                                    className="flex items-center gap-4 mb-8 sm:pl-8"
                                >
                                    <h2 className="eyebrow text-blue">
                                        {month}
                                    </h2>
                                    <div className="flex-1 h-px bg-navy/10" aria-hidden="true" />
                                </motion.div>

                                {/* Releases in this month */}
                                {monthReleases.map((release, idx) => (
                                    <motion.div
                                        key={release.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: (groupIdx * 0.08) + (idx * 0.05) }}
                                        className="relative sm:pl-8 mb-10 last:mb-0"
                                    >
                                        {/* Timeline dot */}
                                        <div
                                            className="absolute left-0 top-3 w-[15px] h-[15px] rounded-full border-2 border-blue bg-cream hidden sm:block"
                                            aria-hidden="true"
                                        />

                                        {/* Release card */}
                                        <div className="card-on-cream p-8 sm:p-10 transition-transform duration-300 hover:-translate-y-0.5">
                                            {/* Release header */}
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="px-3 py-1 rounded-full bg-blue/8 border border-blue/20 text-blue text-xs font-bold tracking-wider font-mono">
                                                    {release.tag_name}
                                                </span>
                                                {release.prerelease && (
                                                    <span className="px-3 py-1 rounded-full bg-navy/5 border border-navy/15 text-mute text-xs font-bold tracking-wider">
                                                        PRE-RELEASE
                                                    </span>
                                                )}
                                                <span className="text-xs text-mute">
                                                    {new Date(release.published_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>

                                            {/* Release title */}
                                            <h3 className="font-display text-2xl text-navy mb-6 tracking-tight">
                                                {release.name || release.tag_name}
                                            </h3>

                                            {/* Release body */}
                                            {release.body && (
                                                <div
                                                    className="prose prose-sm max-w-none
                                                        prose-headings:font-display prose-headings:text-navy prose-headings:font-bold
                                                        prose-p:text-navy/80 prose-p:leading-relaxed
                                                        prose-a:text-blue prose-a:no-underline hover:prose-a:underline
                                                        prose-strong:text-navy
                                                        prose-li:text-navy/80"
                                                    dangerouslySetInnerHTML={{ __html: parseMarkdown(release.body) }}
                                                />
                                            )}
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
                        className="text-center py-32 rounded-[22px] border border-navy/10 bg-cream-200"
                    >
                        <p className="text-mute text-lg font-medium">No releases published yet. Stay tuned!</p>
                    </motion.div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-navy/10 py-16 px-4 surface-cream">
                <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
                    <Logo variant="dark" className="h-7 w-auto" />
                    <nav className="flex gap-10 text-sm font-medium text-mute" aria-label="Footer navigation">
                        <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
                        <Link href="/changelog" className="hover:text-navy transition-colors">Changelog</Link>
                        <Link href="/privacy" className="hover:text-navy transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-navy transition-colors">Terms</Link>
                    </nav>
                    <p className="text-navy/40 text-xs tracking-widest uppercase" suppressHydrationWarning>
                        &copy; {new Date().getFullYear()} Workings. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
