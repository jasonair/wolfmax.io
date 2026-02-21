'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Single Pulse Line Component
const PulseLine = ({
    delay,
    top,
    duration = 5,
    color = '#FF265E',
    direction = 'ltr'
}: {
    delay: number;
    top: string;
    duration?: number;
    color?: string;
    direction?: 'ltr' | 'rtl';
}) => {
    const [path, setPath] = useState('');
    const [viewBoxWidth, setViewBoxWidth] = useState(2000);

    useEffect(() => {
        // Generate a path that is wide enough for most screens
        const width = typeof window !== 'undefined' ? Math.max(window.innerWidth, 2000) : 2000;
        setViewBoxWidth(width);

        // Pattern parameters
        const pulseSegmentWidth = 200; // Width of one "beat" cycle
        const numPulses = Math.ceil(width / pulseSegmentWidth) + 2; // Extra buffer

        let d = `M 0 50`;

        for (let i = 0; i < numPulses; i++) {
            const startX = i * pulseSegmentWidth;
            const baseline = 50;

            // Randomize the spike heights and positions slightly for variety
            const spikeHeight = 40 + Math.random() * 20; // 40-60px height

            // Flat start of segment
            d += ` L ${startX + 40} ${baseline}`;

            // P wave (small bump)
            d += ` L ${startX + 50} ${baseline - 10} L ${startX + 55} ${baseline + 5} L ${startX + 60} ${baseline}`;

            // Short Flat
            d += ` L ${startX + 80} ${baseline}`;

            // QRS complex (The big spike)
            // Up/Down sharp movements
            d += ` L ${startX + 85} ${baseline - spikeHeight} L ${startX + 95} ${baseline + (spikeHeight * 0.6)} L ${startX + 105} ${baseline}`;

            // T wave (medium bump)
            d += ` L ${startX + 120} ${baseline - 15} L ${startX + 135} ${baseline}`;

            // Flat to end of segment
            d += ` L ${startX + 200} ${baseline}`;
        }

        setPath(d);
    }, []); // Run only on mount

    if (!path) return null;

    return (
        <div
            className="absolute left-0 right-0 h-[150px] overflow-visible pointer-events-none z-0"
            style={{
                top,
                transform: direction === 'rtl' ? 'scaleX(-1)' : 'none'
            }}
        >
            {/* The moving light/glow following the pulse */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
                style={{
                    background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`, // 33 is approx 20% opacity
                    filter: 'blur(20px)',
                    mixBlendMode: 'screen',
                }}
                initial={{ left: '-10%', opacity: 0 }}
                animate={{
                    left: '110%',
                    opacity: [0, 1, 1, 0]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "linear",
                    repeatDelay: 0.5
                }}
            />

            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${viewBoxWidth} 100`}
                preserveAspectRatio="none"
                className="overflow-visible w-full h-full opacity-40 mix-blend-screen"
            >
                <motion.path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0, 0.8, 0.8, 0]
                    }}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        delay: delay,
                        ease: "linear",
                        repeatDelay: 0.5
                    }}
                    style={{
                        filter: `drop-shadow(0 0 8px ${color})`
                    }}
                />
            </svg>
        </div>
    );
};

export function HeartbeatBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            {/* Main prominent line - Left to Right */}
            <PulseLine
                delay={0}
                top="calc(70% + 41px)"
                duration={6}
                color="#FF265E" // Brand Red
            />
        </div>
    );
}
