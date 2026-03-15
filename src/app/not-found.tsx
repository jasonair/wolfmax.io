import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">This page doesn't exist.</p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-brand-red text-white font-bold rounded-full hover:scale-105 transition-transform"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 bg-black text-white font-bold rounded-full border border-white/20 hover:bg-white/10 transition-all"
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}
