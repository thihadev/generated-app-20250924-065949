import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Wish } from '@shared/types';
interface WishLanternProps {
  wish: Wish;
  delay: number;
  initialX: number;
  finalY: number;
}
export const WishLantern: React.FC<WishLanternProps> = ({ wish, delay, initialX, finalY }) => {
  const duration = 10 + Math.random() * 10; // 10-20 seconds to float up
  const drift = (Math.random() - 0.5) * 80; // -40px to +40px horizontal drift
  const lanternVariants = {
    hidden: {
      top: '100%',
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      top: `${finalY}%`,
      x: drift,
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1.0] as const, // Fix: Added 'as const' to resolve TypeScript error
      },
    },
    floating: {
      y: [0, -6, 0],
      transition: {
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="absolute"
            style={{ left: `${initialX}%` }}
            variants={lanternVariants}
            initial="hidden"
            animate={['visible', 'floating']}
          >
            {/* Change: Reduced lantern size for a more refined look */}
            <div className="relative group w-16 h-24 md:w-20 md:h-28">
              <svg
                viewBox="0 0 100 150"
                className="w-full h-full drop-shadow-glow-amber transition-all duration-300 group-hover:drop-shadow-[0_0_35px_rgba(255,193,7,0.8)]"
              >
                <defs>
                  <radialGradient id={`glow-${wish.id}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: '#FFF8E1', stopOpacity: 0.9 }} />
                    <stop offset="70%" style={{ stopColor: '#FFC107', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#FFC107', stopOpacity: 0.4 }} />
                  </radialGradient>
                </defs>
                {/* Change: Replaced star with traditional cylindrical Myanmar lantern */}
                {/* Top Cap */}
                <path d="M30 20 Q50 10 70 20 L75 25 L25 25 Z" fill="#FFC107" opacity="0.8" />
                {/* Lantern Body */}
                <rect x="25" y="25" width="50" height="60" rx="5" fill={`url(#glow-${wish.id})`} />
                {/* Vertical Ribs */}
                <line x1="35" y1="25" x2="35" y2="85" stroke="#FFC107" strokeWidth="1" opacity="0.3" />
                <line x1="50" y1="25" x2="50" y2="85" stroke="#FFC107" strokeWidth="1" opacity="0.3" />
                <line x1="65" y1="25" x2="65" y2="85" stroke="#FFC107" strokeWidth="1" opacity="0.3" />
                {/* Bottom Cap */}
                <path d="M25 85 L75 85 L70 90 Q50 100 30 90 Z" fill="#FFC107" opacity="0.8" />
                {/* Tassel */}
                <line x1="50" y1="95" x2="50" y2="125" stroke="#FFC107" strokeWidth="1.5" />
                <path d="M45 125 L55 125 L50 135 Z" fill="#FFC107" />
              </svg>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-celestial-blue/80 backdrop-blur-sm border-warm-gold/50 text-creamy-white max-w-xs text-center p-4 rounded-lg shadow-lg">
          <p className="font-bold text-warm-gold">{wish.name}</p>
          <p className="text-sm">{wish.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};