'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';

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

export function NewsPostClient({ post }: { post: Post }) {
  const { open } = useWaitlist();

  return (
    <main className="surface-cream min-h-screen selection:bg-blue/15">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24">
        {/* Article header */}
        <motion.header
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/news#blog"
              className="eyebrow text-mute hover:text-blue transition-colors"
              aria-label="Back to blog"
            >
              ← Back to blog
            </Link>
            <span className="text-navy/20" aria-hidden="true">/</span>
            <p className="eyebrow text-mute">
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-navy leading-[1.1] mb-8 tracking-tight text-balance">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-xl md:text-2xl text-mute leading-relaxed mb-12">
              {post.description}
            </p>
          )}

          {post.image && (
            <div className="relative aspect-[21/9] rounded-[22px] overflow-hidden border border-navy/10 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </motion.header>

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-navy prose-headings:tracking-tight
            prose-p:text-navy/80 prose-p:leading-relaxed
            prose-a:text-blue prose-a:no-underline hover:prose-a:underline
            prose-strong:text-navy
            prose-blockquote:border-blue prose-blockquote:not-italic
            prose-blockquote:bg-blue/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-2xl
            prose-img:rounded-[22px] prose-img:border prose-img:border-navy/10
            prose-code:font-mono prose-code:text-blue prose-code:bg-blue/8 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
            mb-20"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-20 pt-10 border-t border-navy/10">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-4 py-1.5 rounded-full bg-cream-200 border border-navy/10 text-xs font-medium text-mute flex items-center gap-1.5 hover:border-blue/30 hover:text-navy transition-colors"
              >
                <span className="text-blue" aria-hidden="true">#</span>{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Footer back link — keeps the post navigable without scrolling to top */}
        <div className="mb-14">
          <Link
            href="/news#blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline underline-offset-4"
          >
            ← Back to blog
          </Link>
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="surface-navy rounded-[2.5rem] p-10 md:p-16 text-center"
        >
          <h2 className="font-display text-2xl text-cream mb-4 tracking-tight">Thanks for reading</h2>
          <p className="text-cream/70 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Join the waitlist to follow what we&apos;re building and be first to try Workings.
          </p>
          <Button variant="blue" onClick={open} withArrow>
            Join the waitlist
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
