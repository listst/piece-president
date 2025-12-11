'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsItem } from '@/data';
import { cn } from '@/lib/utils';

interface NewsCarouselProps {
  items: NewsItem[];
  autoRotateInterval?: number;
  className?: string;
}

const sentimentEmojis = {
  positive: '📈',
  negative: '📉',
  neutral: '➡️',
};

export function NewsCarousel({
  items,
  autoRotateInterval = 5000,
  className,
}: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [isPaused, items.length, autoRotateInterval]);

  if (items.length === 0) {
    return (
      <div className="text-center p-8 text-brown-500">
        No news items available
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel */}
      <div className="relative min-h-[200px] bg-white rounded-xl border-2 border-brown-200 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {/* Source & Date */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-brown-700 uppercase tracking-wider">
                  {currentItem.source}
                </span>
                <span className="text-xl" title={`Sentiment: ${currentItem.sentiment}`}>
                  {currentItem.sentiment ? sentimentEmojis[currentItem.sentiment] : sentimentEmojis['neutral']}
                </span>
              </div>
              <time className="text-xs text-brown-500">
                {new Date(currentItem.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>

            {/* Headline */}
            <h3 className="font-display text-xl font-bold text-brown-900 mb-2 leading-tight">
              {currentItem.headline}
            </h3>

            {/* Summary */}
            {currentItem.summary && (
              <p className="text-sm text-brown-700 leading-relaxed line-clamp-3">
                {currentItem.summary}
              </p>
            )}

            {/* Read more link */}
            {currentItem.sourceUrl && (
              <a
                href={currentItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors"
              >
                Read full article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-gold-500 w-6'
                  : 'bg-brown-300 hover:bg-brown-400'
              )}
              aria-label={`Go to news item ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Item counter */}
      <div className="absolute top-2 right-2 bg-brown-900/80 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
}
