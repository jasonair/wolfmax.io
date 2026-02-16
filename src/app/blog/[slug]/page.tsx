import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WolfLogo } from "@/components/WolfLogo";
import { Metadata } from "next";

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

    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-brand-purple/30">
            {/* Background effects */}
            <div className="fixed inset-0 grid-bg opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand-purple/5 blur-[120px] pointer-events-none" />


            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                {/* Article Header */}
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-xs font-semibold text-brand-purple uppercase tracking-[0.2em]">
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight max-w-3xl text-balance">
                        {post.title}
                    </h1>

                    {post.description && (
                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mb-12 font-medium">
                            {post.description}
                        </p>
                    )}

                    {post.image && (
                        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/5 glow-purple/10">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <article className="prose prose-invert prose-purple max-w-none 
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
          prose-a:text-brand-purple prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-blockquote:border-brand-purple
          prose-blockquote:bg-brand-purple/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
          prose-img:rounded-2xl prose-img:border prose-img:border-white/5
          mb-20">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-16 pt-8 border-t border-white/5">
                        {post.tags.map((tag) => (
                            <span key={tag.id} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 flex items-center gap-1">
                                # {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Author / Footer */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Thanks for reading</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Join the conversation on the future of human authorship.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-red text-white font-semibold hover:scale-105 transition-transform pulse-glow"
                    >
                        Join the Waitlist
                    </Link>
                </div>
            </main>

            <footer className="relative z-10 py-12 px-4 border-t border-white/5 mt-20">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <WolfLogo className="w-10 h-10" animate={false} />
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                    <p className="text-gray-600 text-xs text-center">
                        © 2025 Wolfmax Labs. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
