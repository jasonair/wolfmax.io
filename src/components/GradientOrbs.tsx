'use client';

import { motion } from 'framer-motion';

export function GradientOrbs() {
    return (
        <>
            <motion.div
                className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-purple/20 blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-blue/20 blur-[100px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-brand-red/10 blur-[80px]"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 4,
                }}
            />
        </>
    );
}
