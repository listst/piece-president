import { Claim } from '@/data';
import { cn } from '@/lib/utils';

interface ClaimQuoteProps {
  claim: Claim;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ClaimQuote({ claim, size = 'md', className }: ClaimQuoteProps) {
  const formattedDate = new Date(claim.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <figure
      className={cn(
        'relative bg-gradient-to-br from-amber-50 to-yellow-50',
        'border-2 border-gold-300 rounded-xl',
        'shadow-lg',
        size === 'sm' && 'p-4',
        size === 'md' && 'p-6',
        size === 'lg' && 'p-8',
        className
      )}
    >
      {/* Decorative gold corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gold-500 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gold-500 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gold-500 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gold-500 rounded-br-xl" />
      
      {/* Section label */}
      <span className="inline-block px-3 py-1 bg-gold-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
        The Claim
      </span>
      
      {/* Quote marks */}
      <div className="relative">
        <span 
          className={cn(
            'absolute -left-2 -top-4 text-gold-300 font-serif select-none',
            size === 'sm' && 'text-4xl',
            size === 'md' && 'text-6xl',
            size === 'lg' && 'text-8xl',
          )}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        
        <blockquote
          className={cn(
            'relative font-display text-brown-900 italic leading-relaxed',
            'pl-6',
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-xl md:text-2xl',
            size === 'lg' && 'text-2xl md:text-3xl',
          )}
        >
          {claim.quote}
        </blockquote>
        
        <span 
          className={cn(
            'absolute -right-2 bottom-0 text-gold-300 font-serif select-none',
            size === 'sm' && 'text-4xl',
            size === 'md' && 'text-6xl',
            size === 'lg' && 'text-8xl',
          )}
          aria-hidden="true"
        >
          &rdquo;
        </span>
      </div>
      
      {/* Attribution */}
      <figcaption className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 text-brown-600">
          <span className="text-2xl">💩</span>
          <span className="font-medium">Donald J. Trump</span>
        </div>
        
        <div className="text-sm text-brown-500">
          <time dateTime={claim.date}>{formattedDate}</time>
          {claim.source && (
            <>
              <span className="mx-2">•</span>
              {claim.sourceUrl ? (
                <a 
                  href={claim.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brown-700 underline"
                >
                  {claim.source}
                </a>
              ) : (
                <span>{claim.source}</span>
              )}
            </>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
