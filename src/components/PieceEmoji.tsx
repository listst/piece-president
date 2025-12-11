'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PieceEmojiProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  spinning?: boolean;
  animated?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
  hero: 'w-32 h-32 md:w-48 md:h-48',
};

export function PieceEmoji({
  size = 'md',
  spinning = false,
  animated = false,
  onClick,
  className
}: PieceEmojiProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldSpin = spinning || animated;

  return (
    <div
      className={cn(
        sizeClasses[size],
        'relative cursor-pointer transition-transform',
        shouldSpin && 'animate-spin',
        isHovered && !shouldSpin && 'scale-110',
        onClick && 'hover:scale-110',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* 
        Replace this with the actual uploaded image.
        For now using a placeholder - Claude Code should update this path
        to point to the actual mascot image in /public/images/piece-emoji.png
      */}
      <Image
        src="/images/piece-emoji.png"
        alt="The Piece President"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

// Spinning loader variant
export function SpinningLoader({ text = 'Whirling the piece...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <PieceEmoji size="xl" spinning />
      <p className="text-lg text-brown-600 font-medium animate-pulse">
        {text}
      </p>
    </div>
  );
}
