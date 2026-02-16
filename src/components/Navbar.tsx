'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { WolfLogo } from './WolfLogo';

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <WolfLogo className="w-10 h-10 transition-transform group-hover:scale-110" />
                    <span className="text-xl font-bold text-white tracking-tight">Wolfmax</span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/blog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Blog
                    </Link>
                    <a
                        href="/#early-access"
                        className="px-5 py-2.5 bg-brand-red text-white text-sm font-bold rounded-full hover:scale-105 transition-transform"
                    >
                        Get Access
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
