'use client';

import { motion } from 'framer-motion';

interface WolfLogoProps {
  className?: string;
  animate?: boolean;
}

export function WolfLogo({ className = '', animate = true }: WolfLogoProps) {
  const LogoSvg = (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left ear */}
      <path
        d="M30 10 L70 90 L40 100 L30 10Z"
        fill="white"
      />
      {/* Right ear */}
      <path
        d="M170 10 L130 90 L160 100 L170 10Z"
        fill="white"
      />
      {/* Left ear inner */}
      <path
        d="M45 35 L65 85 L50 90 L45 35Z"
        fill="black"
      />
      {/* Right ear inner */}
      <path
        d="M155 35 L135 85 L150 90 L155 35Z"
        fill="black"
      />
      {/* Head - left side */}
      <path
        d="M40 100 L70 90 L60 140 L50 180 L100 210 L100 160 L80 130 L40 100Z"
        fill="white"
      />
      {/* Head - right side */}
      <path
        d="M160 100 L130 90 L140 140 L150 180 L100 210 L100 160 L120 130 L160 100Z"
        fill="white"
      />
      {/* Face center */}
      <path
        d="M70 90 L130 90 L120 130 L100 160 L80 130 L70 90Z"
        fill="white"
      />
      {/* Snout */}
      <path
        d="M80 130 L100 160 L120 130 L115 145 L100 180 L85 145 L80 130Z"
        fill="white"
      />
      {/* Nose */}
      <path
        d="M90 165 L100 180 L110 165 L100 175 L90 165Z"
        fill="black"
      />
      {/* Sunglasses frame */}
      <path
        d="M45 105 L95 105 L95 135 L85 140 L55 140 L45 130 L45 105Z"
        fill="black"
      />
      <path
        d="M155 105 L105 105 L105 135 L115 140 L145 140 L155 130 L155 105Z"
        fill="black"
      />
      {/* Sunglasses bridge */}
      <path
        d="M95 115 L105 115 L105 120 L95 120 L95 115Z"
        fill="black"
      />
      {/* Sunglasses reflection left */}
      <path
        d="M50 110 L75 110 L70 115 L50 115 L50 110Z"
        fill="#333"
        opacity="0.5"
      />
      {/* Sunglasses reflection right */}
      <path
        d="M150 110 L125 110 L130 115 L150 115 L150 110Z"
        fill="#333"
        opacity="0.5"
      />
      {/* Chin / jaw line details */}
      <path
        d="M50 180 L70 190 L100 210 L130 190 L150 180"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );

  if (!animate) {
    return LogoSvg;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {LogoSvg}
    </motion.div>
  );
}

interface WolfLogoWithTextProps {
  className?: string;
}

export function WolfLogoWithText({ className = '' }: WolfLogoWithTextProps) {
  return (
    <motion.div
      className={`flex items-center gap-4 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <WolfLogo className="w-16 h-16 md:w-20 md:h-20" animate={false} />
      <div className="flex flex-col">
        <motion.span
          className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Wolfmax
        </motion.span>
        <motion.span
          className="text-sm md:text-base text-brand-red font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          The Origin Layer for Human+AI work
        </motion.span>
      </div>
    </motion.div>
  );
}
