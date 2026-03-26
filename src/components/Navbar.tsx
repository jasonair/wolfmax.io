'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { WolfLogo } from './WolfLogo';

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
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

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/blog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Blog
                    </Link>
                    <Link href="/changelog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Changelog
                    </Link>
                    <Link
                        href="/#early-access"
                        onClick={() => {
                            if (window.location.pathname === '/') {
                                setTimeout(() => {
                                    document.getElementById('email-input')?.focus();
                                }, 800);
                            }
                        }}
                        className="px-5 py-2.5 bg-brand-red text-white text-sm font-bold rounded-full hover:scale-105 transition-transform"
                    >
                        Get Access
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden relative w-10 h-10 flex items-center justify-center"
                    aria-label="Toggle menu"
                >
                    <span className={`absolute block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
                    <span className={`absolute block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`absolute block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
                </button>
            </div>

        </motion.nav>

            {/* Full-screen mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-gray-300 hover:text-white transition-colors py-2">
                                Blog
                            </Link>
                            <Link href="/changelog" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-gray-300 hover:text-white transition-colors py-2">
                                Changelog
                            </Link>
                            <Link
                                href="/#early-access"
                                onClick={() => {
                                    setMenuOpen(false);
                                    if (window.location.pathname === '/') {
                                        setTimeout(() => {
                                            document.getElementById('email-input')?.focus();
                                        }, 800);
                                    }
                                }}
                                className="mt-2 px-6 py-3.5 bg-brand-red text-white text-base font-bold rounded-full hover:scale-105 transition-transform text-center"
                            >
                                Get Access
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
