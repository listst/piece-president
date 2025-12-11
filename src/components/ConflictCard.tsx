'use client';

import Link from 'next/link';
import { Conflict } from '@/data';
import { StatusBadge, TrophyBadge } from '@/components/Badge';
import { Gauge } from '@/components/Gauge';
import { cn } from '@/lib/utils';

interface ConflictCardProps {
  conflict: Conflict;
  variant?: 'compact' | 'full';
  className?: string;
}

export function ConflictCard({ conflict, variant = 'compact', className }: ConflictCardProps) {
  const isCompact = variant === 'compact';
  
  return (
    <Link href={`/zones/${conflict.slug}`}>
      <article
        className={cn(
          'group relative bg-white rounded-xl border-2 border-brown-200',
          'hover:border-brown-400 hover:shadow-lg transition-all duration-200',
          'overflow-hidden cursor-pointer',
          isCompact ? 'p-4' : 'p-6',
          className
        )}
      >
        {/* Collapsed overlay for tombstone items */}
        {conflict.status === 'collapsed' && (
          <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />
        )}
        
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={conflict.name}>
              {conflict.flagEmojis}
            </span>
            <h3 className={cn(
              'font-display font-bold text-brown-900',
              isCompact ? 'text-lg' : 'text-xl'
            )}>
              {conflict.shortName}
            </h3>
          </div>
          <span className="text-xl">{conflict.emoji}</span>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <StatusBadge status={conflict.status} size="sm" />
          <TrophyBadge type={conflict.trophyType} size="sm" />
        </div>
        
        {/* Score gauge */}
        <div className="flex justify-center mb-4">
          <Gauge 
            value={conflict.pieceScore} 
            size="sm" 
            animated={false}
            showValue
          />
        </div>
        
        {/* Tagline */}
        <p className={cn(
          'text-brown-600 italic',
          isCompact ? 'text-sm line-clamp-2' : 'text-base'
        )}>
          {conflict.tagline}
        </p>
        
        {/* Claim preview (full variant only) */}
        {!isCompact && (
          <blockquote className="mt-4 pl-4 border-l-4 border-gold-400 text-sm text-brown-700">
            <p className="line-clamp-2">&ldquo;{conflict.claim.quote}&rdquo;</p>
            <cite className="text-xs text-brown-500 not-italic mt-1 block">
              — {new Date(conflict.claim.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </cite>
          </blockquote>
        )}
        
        {/* Hover indicator */}
        <div className="mt-4 flex items-center text-sm text-brown-500 group-hover:text-brown-700 transition-colors">
          <span>View details</span>
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  );
}

// Grid of featured conflicts
interface FeaturedConflictsProps {
  conflicts: Conflict[];
  className?: string;
}

export function FeaturedConflicts({ conflicts, className }: FeaturedConflictsProps) {
  return (
    <section className={cn('py-8', className)}>
      <h2 className="text-2xl font-display font-bold text-brown-900 mb-6 text-center">
        Current &ldquo;Peace&rdquo; Portfolio
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {conflicts.map((conflict) => (
          <ConflictCard 
            key={conflict.id} 
            conflict={conflict}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}
