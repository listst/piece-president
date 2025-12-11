'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Conflict, TrophyType } from '@/data';
import { cn } from '@/lib/utils';

interface TrophyProps {
  conflict: Conflict;
  onClick?: () => void;
  className?: string;
}

// Trophy visual configurations
const trophyConfig: Record<TrophyType, {
  emoji: string;
  bgClass: string;
  borderClass: string;
  glowClass: string;
  label: string;
}> = {
  gold: {
    emoji: '🏆',
    bgClass: 'bg-gradient-to-br from-yellow-200 to-amber-300',
    borderClass: 'border-yellow-500',
    glowClass: 'shadow-yellow-400/50',
    label: 'Gold Trophy',
  },
  silver: {
    emoji: '🥈',
    bgClass: 'bg-gradient-to-br from-gray-200 to-gray-300',
    borderClass: 'border-gray-400',
    glowClass: 'shadow-gray-400/50',
    label: 'Silver Trophy',
  },
  participation: {
    emoji: '🎀',
    bgClass: 'bg-gradient-to-br from-pink-100 to-pink-200',
    borderClass: 'border-pink-300',
    glowClass: 'shadow-pink-300/50',
    label: 'Participation Ribbon',
  },
  tombstone: {
    emoji: '🪦',
    bgClass: 'bg-gradient-to-br from-stone-300 to-stone-400',
    borderClass: 'border-stone-500',
    glowClass: 'shadow-stone-500/50',
    label: 'Rest in Piece',
  },
  phantom: {
    emoji: '👻',
    bgClass: 'bg-gradient-to-br from-slate-100 to-slate-200',
    borderClass: 'border-slate-300',
    glowClass: 'shadow-slate-300/50',
    label: 'Phantom Achievement',
  },
};

export function Trophy({ conflict, onClick, className }: TrophyProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = trophyConfig[conflict.trophyType];
  
  // Add crack effect for shaky deals
  const isShaky = conflict.status === 'shaky';
  const isCollapsed = conflict.status === 'collapsed';
  
  return (
    <Link href={`/zones/${conflict.slug}`}>
      <article
        className={cn(
          'group relative cursor-pointer transition-all duration-300',
          'hover:scale-110 hover:-translate-y-2',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Trophy pedestal */}
        <div className="flex flex-col items-center">
          {/* Trophy display */}
          <div
            className={cn(
              'relative w-24 h-24 md:w-28 md:h-28 rounded-xl',
              'border-2 flex items-center justify-center',
              'transition-all duration-300',
              config.bgClass,
              config.borderClass,
              isHovered && `shadow-lg ${config.glowClass}`,
              // Opacity for phantom trophies
              conflict.trophyType === 'phantom' && 'opacity-60',
            )}
          >
            {/* Trophy emoji */}
            <span 
              className={cn(
                'text-5xl md:text-6xl transition-transform duration-300',
                isHovered && 'scale-110',
                // Shake animation for shaky deals
                isShaky && 'animate-pulse',
              )}
            >
              {config.emoji}
            </span>
            
            {/* Crack overlay for shaky/collapsed */}
            {(isShaky || isCollapsed) && (
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
                  <path
                    d="M50 10 L55 30 L45 35 L52 50 L43 55 L48 70 L40 90"
                    fill="none"
                    stroke={isCollapsed ? '#991B1B' : '#92400E'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
            
            {/* Dust/tarnish overlay for collapsed */}
            {isCollapsed && (
              <div className="absolute inset-0 bg-gray-500/30 rounded-xl" />
            )}
          </div>
          
          {/* Pedestal */}
          <div className="w-20 h-3 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-sm mt-1" />
          <div className="w-24 h-2 bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-md" />
          
          {/* Nameplate */}
          <div className="mt-3 px-3 py-1 bg-amber-100 border border-amber-300 rounded text-center min-w-[100px]">
            <p className="text-xs font-bold text-amber-900 truncate">
              {conflict.shortName}
            </p>
            <p className="text-[10px] text-amber-700">
              {conflict.flagEmojis}
            </p>
          </div>
          
          {/* Trophy type label (on hover) */}
          <div
            className={cn(
              'mt-2 px-2 py-0.5 rounded text-xs font-medium',
              'transition-opacity duration-200',
              isHovered ? 'opacity-100' : 'opacity-0',
              conflict.trophyType === 'gold' && 'bg-yellow-200 text-yellow-800',
              conflict.trophyType === 'silver' && 'bg-gray-200 text-gray-700',
              conflict.trophyType === 'participation' && 'bg-pink-200 text-pink-800',
              conflict.trophyType === 'tombstone' && 'bg-stone-300 text-stone-800',
              conflict.trophyType === 'phantom' && 'bg-slate-200 text-slate-600',
            )}
          >
            {config.label}
          </div>
        </div>
      </article>
    </Link>
  );
}

// Trophy case display
interface TrophyCaseProps {
  conflicts: Conflict[];
  className?: string;
}

export function TrophyCase({ conflicts, className }: TrophyCaseProps) {
  // Sort by trophy type (gold first, then silver, etc.)
  const sortOrder: TrophyType[] = ['gold', 'silver', 'participation', 'phantom', 'tombstone'];
  const sortedConflicts = [...conflicts].sort(
    (a, b) => sortOrder.indexOf(a.trophyType) - sortOrder.indexOf(b.trophyType)
  );
  
  return (
    <section className={cn('py-8', className)}>
      {/* Glass case effect */}
      <div className="relative bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-xl">
        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-2xl" />
        
        {/* Trophy grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {sortedConflicts.map((conflict) => (
            <Trophy key={conflict.id} conflict={conflict} />
          ))}
        </div>
        
        {/* Shelf lines */}
        <div className="absolute left-8 right-8 bottom-1/3 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
      </div>
    </section>
  );
}
