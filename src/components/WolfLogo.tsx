'use client';

import { motion } from 'framer-motion';

interface WolfLogoProps {
  className?: string;
  animate?: boolean;
}

export function WolfLogo({ className = '', animate = true }: WolfLogoProps) {
  const LogoSvg = (
    <img
      src="/images/wolfmax-logo-white.svg"
      alt="Wolfmax Logo"
      className={className}
    />
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
      className={`flex items-center gap-[10px] ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <WolfLogo className="w-[73px] h-[90px]" animate={false} />
      <div className="flex flex-col">
        <motion.span
          className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          style={{ fontSize: '65px', lineHeight: '73px' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Wolfmax
        </motion.span>
        <motion.span
          className="text-xs md:text-sm text-brand-red font-medium tracking-wide"
          style={{ lineHeight: '16px', fontSize: '14px' }}
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
