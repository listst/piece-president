'use client';

import Link from 'next/link';
import { Conflict, getEventsByConflict } from '@/data';
import { cn } from '@/lib/utils';

interface TombstoneProps {
  conflict: Conflict;
  className?: string;
}

export function Tombstone({ conflict, className }: TombstoneProps) {
  // Find the collapse event to get the "death" date
  const events = getEventsByConflict(conflict.id);
  const collapseEvent = events.find(e => e.type === 'collapse');
  const dealEvent = events.find(e => e.type === 'deal-signed');
  
  const birthDate = dealEvent 
    ? new Date(dealEvent.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : new Date(conflict.claim.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  const deathDate = collapseEvent
    ? new Date(collapseEvent.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Dec 2025';
  
  return (
    <Link href={`/zones/${conflict.slug}`}>
      <article
        className={cn(
          'group relative cursor-pointer',
          'transition-transform hover:scale-105',
          className
        )}
      >
        {/* Tombstone shape */}
        <div className="relative">
          {/* Stone texture background */}
          <svg
            viewBox="0 0 200 280"
            className="w-48 h-64 md:w-56 md:h-72"
            fill="none"
          >
            {/* Tombstone shape */}
            <path
              d="M20 280 L20 80 Q20 20 100 20 Q180 20 180 80 L180 280 Z"
              fill="url(#stoneGradient)"
              stroke="#4A4A4A"
              strokeWidth="3"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="stoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B8B8B" />
                <stop offset="50%" stopColor="#6B6B6B" />
                <stop offset="100%" stopColor="#5B5B5B" />
              </linearGradient>
            </defs>
            
            {/* RIP text */}
            <text
              x="100"
              y="70"
              textAnchor="middle"
              className="fill-gray-300 font-serif text-2xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              R.I.P.
            </text>
            
            {/* Cross decoration */}
            <line x1="100" y1="85" x2="100" y2="105" stroke="#555" strokeWidth="2" />
            <line x1="90" y1="92" x2="110" y2="92" stroke="#555" strokeWidth="2" />
          </svg>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-6">
            {/* Flag emojis */}
            <span className="text-2xl mb-1">{conflict.flagEmojis}</span>
            
            {/* Name */}
            <h3 className="text-center font-serif text-gray-200 text-sm font-bold leading-tight mb-2">
              {conflict.shortName}
            </h3>
            
            {/* Dates */}
            <p className="text-xs text-gray-400 text-center">
              {birthDate} — {deathDate}
            </p>
            
            {/* Epitaph */}
            <p className="text-xs text-gray-400 text-center mt-3 italic px-2 line-clamp-2">
              &ldquo;{conflict.tagline}&rdquo;
            </p>
            
            {/* Skull decoration */}
            <span className="text-2xl mt-4 opacity-50">💀</span>
          </div>
        </div>
        
        {/* Ground/grass */}
        <div className="h-4 bg-gradient-to-t from-green-900 to-green-800 rounded-b-lg -mt-1 mx-4" />
        
        {/* Hover hint */}
        <p className="text-center text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to view autopsy
        </p>
      </article>
    </Link>
  );
}

// Cemetery layout component
interface CemeteryProps {
  conflicts: Conflict[];
  className?: string;
}

export function Cemetery({ conflicts, className }: CemeteryProps) {
  // Filter to only collapsed deals
  const collapsedConflicts = conflicts.filter(c => c.status === 'collapsed');
  
  if (collapsedConflicts.length === 0) {
    return (
      <section className={cn('py-12 text-center', className)}>
        <p className="text-gray-500 italic">
          No peace deals have died yet... but give it time.
        </p>
      </section>
    );
  }
  
  return (
    <section className={cn('relative py-12', className)}>
      {/* Fog effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none" />
      
      {/* Moon */}
      <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 opacity-30" />
      
      {/* Tombstones grid */}
      <div className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-12">
        {collapsedConflicts.map((conflict) => (
          <Tombstone key={conflict.id} conflict={conflict} />
        ))}
      </div>
      
      {/* Ground line */}
      <div className="mt-8 h-2 bg-gradient-to-r from-transparent via-green-900 to-transparent" />
    </section>
  );
}
