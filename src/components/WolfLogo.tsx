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
      <WolfLogo className="w-[45px] h-[55px] sm:w-[73px] sm:h-[90px]" animate={false} />
      <div className="flex flex-col">
        <motion.span
          className="font-bold text-white tracking-tight text-[40px] leading-[40px] sm:text-[73px] sm:leading-[73px]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Wolfmax
        </motion.span>
        <motion.span
          className="text-brand-red font-medium block text-[16px] leading-[20px] sm:text-[29.5px] sm:leading-[32px] tracking-[0.05em] ml-1 -mt-1 sm:-mt-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Use AI. Stay human.
        </motion.span>
      </div>
    </motion.div>
  );
}
